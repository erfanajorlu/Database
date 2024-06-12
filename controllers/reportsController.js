var reportsModel = require('../models/reportsModel');

module.exports = {
    getAllLogs: function (req, res) {
        // Serve the JSON data
        reportsModel.getAllLogs(function (err, logs) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(logs);
            }
        });
    },

    getDailyLogs: function (req, res) {
        // Serve the JSON data
        reportsModel.getDailyLogs(function (err, logs) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(logs);
            }
        });
    },

    getLogsByUser: function (req, res) {
        var username = req.query.username;
        console.log("Received request for username:", username);  // Log received username
        // Serve the JSON data
        reportsModel.getLogsByUser(username, function (err, logs) {
            if (err) {
                console.error("Error fetching logs:", err);  // Log error if any
                res.status(500).send(err);
            } else {
                console.log("Logs fetched successfully:", logs);  // Log fetched logs
                res.status(200).json(logs);
            }
        });
    },


    getChangesInMember: function (req, res) {
        reportsModel.getChangesInMember(function (err, logs) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(logs);
            }
        });
    },

    getChangesInLoan: function (req, res) {
        reportsModel.getChangesInLoan(function (err, logs) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(logs);
            }
        });
    },

    getChangesInEmployee: function (req, res) {
        reportsModel.getChangesInEmployee(function (err, logs) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(logs);
            }
        });
    },

    getChangesInBook: function (req, res) {
        reportsModel.getChangesInBook(function (err, logs) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(logs);
            }
        });
    },

    getChangesInPublisher: function (req, res) {
        reportsModel.getChangesInPublisher(function (err, logs) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(logs);
            }
        });
    }
};
