var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var connection = require('../config/dbConfig');

module.exports = {
    getAllCultureBooks: function (callback) {
        const sql = `
            SELECT b.*, c.subject 
            FROM Book b
            JOIN Culture c ON b.ID = c.BookID
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
            const book = {};
            columns.forEach(function (column) {
                book[column.metadata.colName] = column.value;
            });
            result.push(book);
        });

        request.on('done', function (rowCount, more) {
            console.log(rowCount + ' rows returned');
        });

        connection.execSql(request);
    },

    getCultureBook: function (id, callback) {
        const sql = `
            SELECT b.*, c.subject 
            FROM Book b
            JOIN Culture c ON b.ID = c.BookID
            WHERE b.ID = @ID
        `;

        const request = new Request(sql, function (err) {
            if (err) {
                console.log(err);
                callback(err, null);
            }
            callback(null, result);
        });

        request.addParameter('ID', TYPES.Int, id);

        const result = [];

        request.on('row', function (columns) {
            const book = {};
            columns.forEach(function (column) {
                book[column.metadata.colName] = column.value;
            });
            result.push(book);
        });

        connection.execSql(request);
    },

    updateCultureBook: function (id, book, callback) {
        const updateFields = [];
        const fieldTypes = {
            subject: TYPES.NVarChar
        };
    
        console.log(book);
    
        var request = new Request("", function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    
        request.addParameter('ID', TYPES.Int, id);
        for (let key in book) {
            if (book.hasOwnProperty(key) && fieldTypes.hasOwnProperty(key)) {
                updateFields.push(`${key} = @${key}`);
                request.addParameter(key, fieldTypes[key], book[key] || null);
            }
        }
        
        console.log(request);
        console.log(updateFields);

        const sqlQuery = `
            UPDATE Culture SET subject = @subject WHERE BookID = @ID;
        `;
        console.log(sqlQuery);
        request.sqlTextOrProcedure = sqlQuery;
    
        connection.execSql(request);
    }    
};
