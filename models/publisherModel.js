var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var connection = require('../config/dbConfig');

module.exports = {
    getAllPublishers: function (callback) {
        console.log("Executing query to get all publishers");
        var request = new Request("SELECT * FROM Publisher;", function (err) {
            if (err) {
                console.log("Error executing query:", err);
                callback(err, null);
            }

            callback(null, result);
        });

        var result = [];

        request.on('row', function (columns) {
            var publisher = {};
            columns.forEach(function (column) {
                console.log(column.metadata.colName + ": " + column.value); // Log each column's value
                publisher[column.metadata.colName] = column.value;
            });
            result.push(publisher);
        });
        request.on('done', function (rowCount, more) {
            console.log(rowCount + ' rows returned');
        });

        connection.execSql(request);
    },

    addpublisher: function (publisher, callback) {
        var request = new Request(
            "INSERT INTO Publisher (Name , PhoneNumber) VALUES (@Name , @PhoneNumber);",
            function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            }
        );
        request.addParameter('Name', TYPES.NVarChar, publisher.Name);
        request.addParameter('PhoneNumber', TYPES.NVarChar, publisher.PhoneNumber);
        console.log(request);
        connection.execSql(request);
    },
    getPublisher: function (id, callback) {
        var request = new Request("SELECT * FROM Publisher WHERE ID = @ID;", function (err) {
            if (err) {
                console.log("Error executing query:", err);
                callback(err, null);
            }

            callback(null, result);
        });

        var result = [];

        request.on('row', function (columns) {
            var publisher = {};
            columns.forEach(function (column) {
                console.log(column.metadata.colName + ": " + column.value); // Log each column's value
                publisher[column.metadata.colName] = column.value;
            });
            result.push(publisher);
        });
        request.on('done', function (rowCount, more) {
            console.log(rowCount + ' rows returned');
        });

        request.addParameter('ID', TYPES.Int, id); // Ensure ID is passed as an integer
        connection.execSql(request);
    },
    updatePublisher: function (id, publisher, callback) {
        // Array to hold the parts of the SQL update statement
        let updateFields = [];

        // Object to map the keys to their respective TYPES
        const fieldTypes = {
            Name: TYPES.NVarChar,
            PhoneNumber: TYPES.NVarChar,
        };

        // Create a new Request
        var request = new Request("", function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });

        // Add ID parameter
        request.addParameter('ID', TYPES.Int, id);

        // Iterate over the publisher object to construct the query and add parameters
        for (let key in publisher) {
            if (publisher.hasOwnProperty(key) && fieldTypes.hasOwnProperty(key)) {
                updateFields.push(`${key} = @${key}`);
                request.addParameter(key, fieldTypes[key], publisher[key]);
            }
        }

        // Construct the SQL query
        let sqlQuery = `UPDATE Publisher SET ${updateFields.join(", ")} WHERE ID = @ID;`;
        request.sqlTextOrProcedure = sqlQuery;

        // Execute the query
        connection.execSql(request);
    },

    deletePublisher: function (id, callback) {
        // Log the ID to ensure it is correct
        console.log(`Deleting Publisher with ID: ${id}`);
    
        // Create a new Request
        var request = new Request("DELETE FROM Publisher WHERE ID = @ID;", function (err) {
            if (err) {
                console.error("Error executing SQL query:", err);
                callback(err);
            } else {
                console.log("publisher deleted successfully.");
                callback(null);
            }
        });
    
        // Add ID parameter
        request.addParameter('ID', TYPES.Int, id);
    
        // Execute the query
        connection.execSql(request);
    }
    
};
