var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var connection = require('../config/dbConfig');

module.exports = {
    getAllpublishBook: function (callback) {
        console.log("Executing query to get all publisherBooks");
        var request = new Request("SELECT * FROM Publisher_book;", function (err) {
            if (err) {
                console.log("Error executing query:", err);
                callback(err, null);
            }

            callback(null, result);
        });

        var result = [];

        request.on('row', function (columns) {
            var dpublisherBook = {};
            columns.forEach(function (column) {
                console.log(column.metadata.colName + ": " + column.value); // Log each column's value
                dpublisherBook[column.metadata.colName] = column.value;
            });
            result.push(dpublisherBook);
        });
        request.on('done', function (rowCount, more) {
            console.log(rowCount + ' rows returned');
        });

        connection.execSql(request);
    },

    addpublishBook: function (publisherBook, callback) {
        var request = new Request(
            "INSERT INTO Publisher_book (PublisherId , BookID) VALUES (@PublisherId, @BookID);",
            function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            }
        );
        request.addParameter('BookID', TYPES.Int, publisherBook.BookID);
        request.addParameter('publisherId', TYPES.Int, publisherBook.PublisherId);
        connection.execSql(request);
    },
    getpublishBook: function (id, callback) {
        var request = new Request("SELECT * FROM Publisher_book WHERE ID = @ID;", function (err) {
            if (err) {
                console.log("Error executing query:", err);
                callback(err, null);
            }

            callback(null, result);
        });

        var result = [];

        request.on('row', function (columns) {
            var dpublisherBook = {};
            columns.forEach(function (column) {
                console.log(column.metadata.colName + ": " + column.value); // Log each column's value
                dpublisherBook[column.metadata.colName] = column.value;
            });
            result.push(dpublisherBook);
        });
        request.on('done', function (rowCount, more) {
            console.log(rowCount + ' rows returned');
        });

        request.addParameter('ID', TYPES.Int, id); // Ensure ID is passed as an integer
        connection.execSql(request);
    },
    updatepublishBook: function (id, book, callback) {
        // Array to hold the parts of the SQL update statement
        let updateFields = [];

        // Object to map the keys to their respective TYPES
        const fieldTypes = {
            BookID: TYPES.Int,
            PublisherId: TYPES.Int
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

        // Iterate over the book object to construct the query and add parameters
        for (let key in book) {
            if (book.hasOwnProperty(key) && fieldTypes.hasOwnProperty(key)) {
                updateFields.push(`${key} = @${key}`);
                request.addParameter(key, fieldTypes[key], book[key]);
            }
        }

        // Construct the SQL query
        let sqlQuery = `UPDATE Publisher_book SET ${updateFields.join(", ")} WHERE ID = @ID;`;
        request.sqlTextOrProcedure = sqlQuery;

        // Execute the query
        connection.execSql(request);
    }
    ,
    deletepublishBook: function (id, callback) {
        // Log the ID to ensure it is correct
        console.log(`Deleting Publisher_book with ID: ${id}`);
    
        // Create a new Request
        var request = new Request("DELETE FROM Publisher_book WHERE ID = @ID;", function (err) {
            if (err) {
                console.error("Error executing SQL query:", err);
                callback(err);
            } else {
                console.log("publisherBook deleted successfully.");
                callback(null);
            }
        });
    
        // Add ID parameter
        request.addParameter('ID', TYPES.Int, id);
    
        // Execute the query
        connection.execSql(request);
    }
    
};
