var loanModel = require('../models/loanModel');
const path = require('path');

module.exports = {
    getAllLoans: function (req, res) {
        const acceptHeader = req.headers.accept || '';
        if (acceptHeader.includes('text/html')) {
            res.sendFile(path.join(__dirname, '../public/loan/loans.html')); // Adjust the path to your loans.html
        } else {
            loanModel.getAllLoans(function (err, loans) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).json(loans);
                }
            });
        }
    },

    addLoan: function (req, res) {
        var newLoan = req.body;

        // Ensure all required fields are present
        const requiredFields = ['BookId', 'MemberId', 'lendingDate', 'EmpId'];
        for (const field of requiredFields) {
            if (!newLoan[field]) {
                return res.status(400).send(`Missing required field: ${field}`);
            }
        }

        loanModel.addLoan(newLoan, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send("Loan added successfully");
            }
        });
    },

    getLoan: function (req, res) {
        var id = parseInt(req.params.id, 10); // Parse the ID as an integer
        if (isNaN(id)) {
            return res.status(400).send("Invalid loan ID"); // Handle invalid IDs
        }

        const acceptHeader = req.headers.accept || '';
        if (acceptHeader.includes('text/html')) {
            res.sendFile(path.join(__dirname, '../public/loan/loans.html')); // Adjust the path to your loan.html
        } else {
            loanModel.getLoan(id, function (err, loan) {
                if (err) {
                    res.status(500).send(err);
                } else if (!loan) {
                    return res.status(404).send({ error: "Loan not found" });
                } else {
                    res.status(200).json(loan);
                }
            });
        }
    },

    updateLoan: function (req, res) {
        var id = req.params.id;
        var updatedLoan = req.body;
        loanModel.updateLoan(id, updatedLoan, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send("Loan updated successfully");
            }
        });
    },

    deleteLoan: function (req, res) {
        var id = req.params.id;
        loanModel.deleteLoan(id, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send("Loan deleted successfully");
            }
        });
    }
};
