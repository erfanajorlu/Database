var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var connection = require('../config/dbConfig');

module.exports = {
    getAllEmployees: function (callback) {
        const sql = `
            SELECT *
            FROM Employee e
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
            const employee = {};
            columns.forEach(function (column) {
                employee[column.metadata.colName] = column.value;
            });
            result.push(employee);
        });

        request.on('done', function (rowCount, more) {
            console.log(rowCount + ' rows returned');
        });

        connection.execSql(request);
    },
    addEmployee: function (employee, callback) {
        var request = new Request(
            "INSERT INTO Employee (Name, Post, Start_work) VALUES (@Name, @Post, @Start_work);",
            function (err) {
                if (err) {
                    console.error('Error inserting employee:', err);
                    callback(err);
                } else {
                    callback(null);
                }
            }
        );
        request.addParameter('Name', TYPES.NVarChar, employee.Name);
        request.addParameter('Post', TYPES.NVarChar, employee.Post);
        request.addParameter('Start_work', TYPES.Date, employee.Start_work);
        connection.execSql(request);
    },
    getEmployee: function (id, callback) {
        var request = new Request(`
            SELECT *
            FROM Employee e
            WHERE e.ID = @ID;`,
            function (err) {
                if (err) {
                    callback(err, null);
                }
                callback(null, result);
            }
        );

        var result = [];

        request.on('row', function (columns) {
            const employee = {};
            columns.forEach(function (column) {
                employee[column.metadata.colName] = column.value;
            });
            result.push(employee);
        });

        request.addParameter('ID', TYPES.Int, id);
        connection.execSql(request);
    },
    updateEmployee: function (id, employee, callback) {
        let updateFields = [];
        const fieldTypes = {
            Name: TYPES.NVarChar,
            Post: TYPES.NVarChar,
            Start_work: TYPES.Date
        };

        var request = new Request("", function (err) {
            if (err) {
                callback(err);
            } else {
                console.log(employee.Post);
                callback(null);
            }
        });

        request.addParameter('ID', TYPES.Int, id);

        for (let key in employee) {
            if (employee.hasOwnProperty(key) && fieldTypes.hasOwnProperty(key)) {
                updateFields.push(`${key} = @${key}`);
                request.addParameter(key, fieldTypes[key], employee[key] || null);
            }
        }

        let sqlQuery = `UPDATE Employee SET ${updateFields.join(", ")} WHERE ID = @ID;`;
        request.sqlTextOrProcedure = sqlQuery;

        connection.execSql(request);
    },
    deleteEmployee: function (id, callback) {
        var request = new Request("DELETE FROM Employee WHERE ID = @ID;", function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null)
            }
        });

        request.addParameter('ID', TYPES.Int, id);
        connection.execSql(request);
    }
}
