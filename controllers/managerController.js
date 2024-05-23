var managerModel = require('../models/managerModel');
const path = require('path');

module.exports = {
    getAllManager: function (req, res) {
        const acceptHeader = req.headers.accept || '';
        if (acceptHeader.includes('text/html')) {
            res.sendFile(path.join(__dirname, '../public/manager/manager.html'));
        } else {
            managerModel.getAllManager(function (err, books) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).json(books);
                }
            });
        }
    },

    getManager: function (req, res) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send("Invalid employee ID");
        }

        managerModel.getManager(id, function (err, book) {
            if (err) {
                res.status(500).send(err);
            } else if (!book) {
                res.status(404).send({ error: "Employee not found" });
            } else {
                res.status(200).json(book);
            }
        });
    },

    updateManager: function (req, res) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send("Invalid Employee ID");
        }

        var updatedBook = req.body;
        console.log(updatedBook);
        managerModel.updateManager(id, updatedBook, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send("Employee updated successfully");
            }
        });
    }
};
