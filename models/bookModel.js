var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var connection = require('../config/dbConfig');

module.exports = {
    getAllBooks: function (callback) {
        console.log("Executing query to get all books");
        var request = new Request("SELECT * FROM Book;", function (err) {
            if (err) {
                console.log("Error executing query:", err);
                callback(err, null);
            }

            callback(null, result);
        });

        var result = [];

        request.on('row', function (columns) {
            var book = {};
            columns.forEach(function (column) {
                console.log(column.metadata.colName + ": " + column.value); // Log each column's value
                book[column.metadata.colName] = column.value;
            });
            result.push(book);
        });
        request.on('done', function (rowCount, more) {
            console.log(rowCount + ' rows returned');
        });

        connection.execSql(request);
    },

    addBook: function (book, callback) {
        var request = new Request(
            "INSERT INTO Book (categoryID, Title, Author, ISBN, Description, price, stock, EmpId) VALUES (@categoryID, @Title, @Author, @ISBN, @Description, @price, @stock, @EmpId);",
            function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            }
        );
        request.addParameter('categoryID', TYPES.Int, book.categoryID > 3 ? 1 : book.categoryID);
        request.addParameter('Title', TYPES.NVarChar, book.Title);
        request.addParameter('Author', TYPES.NVarChar, book.Author);
        request.addParameter('ISBN', TYPES.NVarChar, book.ISBN);
        request.addParameter('Description', TYPES.NVarChar, book.Description || null); // Handle optional Description
        request.addParameter('price', TYPES.Float, book.price);
        request.addParameter('stock', TYPES.Int, book.stock);
        request.addParameter('EmpId', TYPES.Int, book.EmpId);
        connection.execSql(request);
    },
    getBook: function (id, callback) {
        var request = new Request("SELECT * FROM Book WHERE ID = @ID;", function (err) {
            if (err) {
                console.log("Error executing query:", err);
                callback(err, null);
            }

            callback(null, result);
        });

        var result = [];

        request.on('row', function (columns) {
            var book = {};
            columns.forEach(function (column) {
                console.log(column.metadata.colName + ": " + column.value); // Log each column's value
                book[column.metadata.colName] = column.value;
            });
            result.push(book);
        });
        request.on('done', function (rowCount, more) {
            console.log(rowCount + ' rows returned');
        });

        request.addParameter('ID', TYPES.Int, id); // Ensure ID is passed as an integer
        connection.execSql(request);
    }
    
    ,
    updateBook: function (id, book, callback) {
        // Array to hold the parts of the SQL update statement
        let updateFields = [];

        // Object to map the keys to their respective TYPES
        const fieldTypes = {
            categoryID: TYPES.Int,
            Title: TYPES.NVarChar,
            Author: TYPES.NVarChar,
            ISBN: TYPES.NVarChar,
            Description: TYPES.NVarChar,
            price: TYPES.Float,
            stock: TYPES.Int,
            EmpId: TYPES.Int
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
        let sqlQuery = `UPDATE Book SET ${updateFields.join(", ")} WHERE ID = @ID;`;
        request.sqlTextOrProcedure = sqlQuery;

        // Execute the query
        connection.execSql(request);
    },

    deleteBook: function (id, callback) {
        // Log the ID to ensure it is correct
        console.log(`Deleting book with ID: ${id}`);
    
        // Create a new Request
        var request = new Request("DELETE FROM Book WHERE ID = @ID;", function (err) {
            if (err) {
                console.error("Error executing SQL query:", err);
                callback(err);
            } else {
                console.log("Book deleted successfully.");
                callback(null);
            }
        });
    
        // Add ID parameter
        request.addParameter('ID', TYPES.Int, id);
    
        // Execute the query
        connection.execSql(request);
    }
    
};
