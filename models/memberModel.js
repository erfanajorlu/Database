var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var connection = require('../config/dbConfig');

module.exports = {
    getAllMembers: function (callback) {
        const sql = `
            SELECT m.*, a.ADDRESS_MEM
            FROM Member m
            LEFT JOIN address_member a ON m.ID = a.MemID
        `;

        const request = new Request(sql, function (err) {
            if (err) {
                console.log(err);
                callback(err, null);
            }
            callback(null, result);
        });

        const result = [];

        request.on('row', function (columns) {
            const member = {};
            columns.forEach(function (column) {
                if (column.metadata.colName !== 'ADDRESS_MEM' && column.metadata.colName !== 'Address') {
                    member[column.metadata.colName] = column.value;
                } else if (column.metadata.colName === 'ADDRESS_MEM') {
                    member.Address = column.value;
                }
            });
            result.push(member);

        });

        request.on('done', function (rowCount, more) {
            console.log(rowCount + ' rows returned');
        });

        connection.execSql(request);
    },

    addMember: function (member, callback) {
        console.log('Adding member:', member);
        var request = new Request(
            "INSERT INTO Member (Fname, Lname, Email, PhoneNumber) OUTPUT INSERTED.ID VALUES (@Fname, @Lname, @Email, @PhoneNumber);",
            function (err, rowCount, rows) {
                if (err) {
                    console.error('Error inserting member:', err);
                    callback(err);
                } else {
                    if (rows && rows.length > 0 && rows[0] && rows[0].length > 0) {
                        const memberId = rows[0][0].value;
                        console.log('Inserted member ID:', memberId);
                        if (member.Address && member.Address.length > 0) {
                            addMemberAddresses(memberId, member.Address, callback);
                        } else {
                            callback(null);
                        }
                    } else {
                        const errorMsg = "Failed to retrieve the inserted member ID";
                        console.error(errorMsg);
                        callback(new Error(errorMsg));
                    }
                }
            }
        );
        request.addParameter('Fname', TYPES.NVarChar, member.Fname);
        request.addParameter('Lname', TYPES.NVarChar, member.Lname);
        request.addParameter('Email', TYPES.NVarChar, member.Email || null);
        request.addParameter('PhoneNumber', TYPES.NVarChar, member.PhoneNumber);
        connection.execSql(request);
    },

    getMember: function (id, callback) {
        var request = new Request("SELECT m.*, a.ADDRESS_MEM FROM MEMBER AS M LEFT JOIN address_member a ON m.ID = a.MemID WHERE ID = @ID;", function (err) {
            if (err) {
                callback(err, null);
            }
            callback(null, result);
        });

        var result = [];

        request.on('row', function (columns) {
            const member = {};
            columns.forEach(function (column) {
                if (column.metadata.colName !== 'ADDRESS_MEM' && column.metadata.colName !== 'Address') {
                    member[column.metadata.colName] = column.value;
                } else if (column.metadata.colName === 'ADDRESS_MEM') {
                    member.Address = column.value;
                }
            });
            result.push(member);
        });

        request.addParameter('ID', TYPES.Int, id);
        connection.execSql(request);
    },

    updateMember: function (id, member, callback) {
        let updateFields = [];
        const fieldTypes = {
            Fname: TYPES.NVarChar,
            Lname: TYPES.NVarChar,
            Email: TYPES.NVarChar,
            PhoneNumber: TYPES.NVarChar
        };

        var request = new Request("", function (err) {
            if (err) {
                callback(err);
            } else {
                if (member.Address && member.Address.length > 0) {
                    updateMemberAddresses(id, member.Address, callback);
                } else {
                    callback(null);
                }
            }
        });

        request.addParameter('ID', TYPES.Int, id);

        for (let key in member) {
            if (member.hasOwnProperty(key) && fieldTypes.hasOwnProperty(key)) {
                updateFields.push(`${key} = @${key}`);
                request.addParameter(key, fieldTypes[key], member[key] || null);
            }
        }

        let sqlQuery = `UPDATE Member SET ${updateFields.join(", ")} WHERE ID = @ID;`;
        request.sqlTextOrProcedure = sqlQuery;

        connection.execSql(request);
    },

    deleteMember: function (id, callback) {
        var request = new Request("DELETE FROM Member WHERE ID = @ID;", function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });

        request.addParameter('ID', TYPES.Int, id);
        connection.execSql(request);
    }
};

function addMemberAddresses(memberId, addresses, callback) {
    console.log('Adding addresses for member ID:', memberId, 'Addresses:', addresses);
    if (!Array.isArray(addresses)) {
        addresses = [addresses];
    }

    const addressQueries = addresses.map(address => {
        return `INSERT INTO address_member (MemID, ADDRESS_MEM) VALUES (${memberId}, '${address.replace(/'/g, "''")}');`;
    }).join(" ");

    var request = new Request(addressQueries, function (err) {
        if (err) {
            console.error('Error adding addresses:', err);
            callback(err);
        } else {
            callback(null);
        }
    });

    connection.execSqlBatch(request);
}

function updateMemberAddresses(memberId, addresses, callback) {
    const deleteQuery = `DELETE FROM address_member WHERE MemID = ${memberId};`;
    var deleteRequest = new Request(deleteQuery, function (err) {
        if (err) {
            console.error('Error deleting old addresses:', err);
            callback(err);
        } else {
            addMemberAddresses(memberId, addresses, callback);
        }
    });

    connection.execSql(deleteRequest);
}
