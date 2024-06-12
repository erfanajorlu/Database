var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var connection = require('../config/dbConfig');

module.exports = {
    getAllLogs: function (callback) {
        var request = new Request("SELECT * FROM ChangeLog;", function (err) {
            if (err) {
                callback(err, null);
            }
            callback(null, result);
        });

        var result = [];

        request.on('row', function (columns) {
            var log = {};
            columns.forEach(function (column) {
                log[column.metadata.colName] = column.value;
            });
            result.push(log);
        });

        connection.execSql(request);
    },

    getDailyLogs: function (callback) {
        var request = new Request("SELECT * FROM DailyChanges;", function (err) {
            if (err) {
                callback(err, null);
            }
            callback(null, result);
        });

        var result = [];

        request.on('row', function (columns) {
            var log = {};
            columns.forEach(function (column) {
                log[column.metadata.colName] = column.value;
            });
            result.push(log);
        });

        connection.execSql(request);
    },
    getLogsByUser: function (username, callback) {
        console.log("Preparing to fetch logs for username:", username);  // Log before executing query
        var request = new Request("SELECT * FROM dbo.GetChangesByUser (@username);", function (err) {
            if (err) {
                console.error("Error in request:", err);  // Log any errors in the request
                callback(err, null);
                return;
            }
            callback(null, result);
        });

        var result = [];

        request.on('row', function (columns) {
            var log = {};
            columns.forEach(function (column) {
                log[column.metadata.colName] = column.value;
            });
            result.push(log);
        });

        request.on('requestCompleted', function () {
            console.log("Request completed with result:", result);  // Log the result
        });

        request.addParameter('username', TYPES.NVarChar, username);
        connection.execSql(request);
    },
    getChangesInMember: function (callback) {
        var request = new Request("SELECT * FROM ChangesInMember;", function (err) {
            if (err) {
                callback(err, null);
            }
            callback(null, result);
        });

        var result = [];

        request.on('row', function (columns) {
            var log = {};
            columns.forEach(function (column) {
                log[column.metadata.colName] = column.value;
            });
            result.push(log);
        });

        connection.execSql(request);
    },

    getChangesInLoan: function (callback) {
        var request = new Request("SELECT * FROM ChangesInLoan;", function (err) {
            if (err) {
                callback(err, null);
            }
            callback(null, result);
        });

        var result = [];

        request.on('row', function (columns) {
            var log = {};
            columns.forEach(function (column) {
                log[column.metadata.colName] = column.value;
            });
            result.push(log);
        });

        connection.execSql(request);
    },

    getChangesInEmployee: function (callback) {
        var request = new Request("SELECT * FROM ChangesInEmployee;", function (err) {
            if (err) {
                callback(err, null);
            }
            callback(null, result);
        });

        var result = [];

        request.on('row', function (columns) {
            var log = {};
            columns.forEach(function (column) {
                log[column.metadata.colName] = column.value;
            });
            result.push(log);
        });

        connection.execSql(request);
    },

    getChangesInBook: function (callback) {
        var request = new Request("SELECT * FROM ChangesInBook;", function (err) {
            if (err) {
                callback(err, null);
            }
            callback(null, result);
        });

        var result = [];

        request.on('row', function (columns) {
            var log = {};
            columns.forEach(function (column) {
                log[column.metadata.colName] = column.value;
            });
            result.push(log);
        });

        connection.execSql(request);
    },

    getChangesInPublisher: function (callback) {
        var request = new Request("SELECT * FROM ChangesInPublisher;", function (err) {
            if (err) {
                callback(err, null);
            }
            callback(null, result);
        });

        var result = [];

        request.on('row', function (columns) {
            var log = {};
            columns.forEach(function (column) {
                log[column.metadata.colName] = column.value;
            });
            result.push(log);
        });

        connection.execSql(request);
    }
};
