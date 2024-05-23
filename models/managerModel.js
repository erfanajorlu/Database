var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var connection = require('../config/dbConfig');

module.exports = {
    getAllManager: function (callback) {
        const sql = `
            SELECT e.*, m.Respansibility 
            FROM Employee e
            JOIN manager m ON e.ID = m.EmpID
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

    getManager: function (id, callback) {
        const sql = `
         SELECT e.*, m.Respansibility 
            FROM Employee e
            JOIN manager m ON e.ID = m.EmpID
            WHERE m.EmpID = @ID
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

    updateManager: function (id, book, callback) {
        const updateFields = [];
        const fieldTypes = {
            Respansibility: TYPES.NVarChar
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
            UPDATE manager SET Respansibility = @Respansibility WHERE EmpID = @ID;
        `;
        console.log(sqlQuery);
        request.sqlTextOrProcedure = sqlQuery;

        connection.execSql(request);
    }
};
