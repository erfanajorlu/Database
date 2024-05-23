var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var connection = require('../config/dbConfig');

module.exports = {
    getAllLoans: function (callback) {
        console.log("Executing query to get all loans");
        var request = new Request("SELECT * FROM Loan;", function (err) {
            if (err) {
                console.log("Error executing query:", err);
                callback(err, null);
            }

            callback(null, result);
        });

        var result = [];

        request.on('row', function (columns) {
            var loan = {};
            columns.forEach(function (column) {
                console.log(column.metadata.colName + ": " + column.value); // Log each column's value
                loan[column.metadata.colName] = column.value;
            });
            result.push(loan);
        });
        request.on('done', function (rowCount, more) {
            console.log(rowCount + ' rows returned');
        });

        connection.execSql(request);
    },

    addLoan: function (loan, callback) {
        var request = new Request(
            "INSERT INTO Loan (BookId, MemberId, lendingDate, ReturnDate, EmpId) VALUES (@BookId, @MemberId, @lendingDate, @ReturnDate, @EmpId);",
            function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            }
        );

        request.addParameter('BookId', TYPES.Int, loan.BookId);
        request.addParameter('MemberId', TYPES.Int, loan.MemberId);
        request.addParameter('lendingDate', TYPES.Date, new Date(loan.lendingDate));
        request.addParameter('ReturnDate', TYPES.Date,  null);
        request.addParameter('EmpId', TYPES.Int, loan.EmpId);
        
        connection.execSql(request);
    },

    getLoan: function (id, callback) {
        var request = new Request("SELECT * FROM Loan WHERE ID = @ID;", function (err) {
            if (err) {
                console.log("Error executing query:", err);
                callback(err, null);
            }

            callback(null, result);
        });

        var result = [];

        request.on('row', function (columns) {
            var loan = {};
            columns.forEach(function (column) {
                console.log(column.metadata.colName + ": " + column.value); // Log each column's value
                loan[column.metadata.colName] = column.value;
            });
            result.push(loan);
        });
        request.on('done', function (rowCount, more) {
            console.log(rowCount + ' rows returned');
        });

        request.addParameter('ID', TYPES.Int, id); // Ensure ID is passed as an integer
        connection.execSql(request);
    },

    updateLoan: function (id, loan, callback) {
        // Array to hold the parts of the SQL update statement
        let updateFields = [];

        // Object to map the keys to their respective TYPES
        const fieldTypes = {
            BookId: TYPES.Int,
            MemberId: TYPES.Int,
            lendingDate: TYPES.Date,
            ReturnDate: TYPES.Date,
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

        // Iterate over the loan object to construct the query and add parameters
        for (let key in loan) {
            if (loan.hasOwnProperty(key) && fieldTypes.hasOwnProperty(key)) {
                updateFields.push(`${key} = @${key}`);
                request.addParameter(key, fieldTypes[key], loan[key]);
            }
        }

        // Construct the SQL query
        let sqlQuery = `UPDATE Loan SET ${updateFields.join(", ")} WHERE ID = @ID;`;
        request.sqlTextOrProcedure = sqlQuery;

        // Execute the query
        connection.execSql(request);
    },

    deleteLoan: function (id, callback) {
        // Log the ID to ensure it is correct
        console.log(`Deleting loan with ID: ${id}`);
    
        // Create a new Request
        var request = new Request("DELETE FROM Loan WHERE ID = @ID;", function (err) {
            if (err) {
                console.error("Error executing SQL query:", err);
                callback(err);
            } else {
                console.log("Loan deleted successfully.");
                callback(null);
            }
        });
    
        // Add ID parameter
        request.addParameter('ID', TYPES.Int, id);
    
        // Execute the query
        connection.execSql(request);
    }
};
