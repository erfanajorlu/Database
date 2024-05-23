var professionModel = require('../models/professionModel');
const path = require('path');

module.exports = {
    getAllProfessionBooks: function (req, res) {
        const acceptHeader = req.headers.accept || '';
        if (acceptHeader.includes('text/html')) {
            res.sendFile(path.join(__dirname, '../public/profession/profession.html'));
        } else {
            professionModel.getAllProfessionBooks(function (err, books) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).json(books);
                }
            });
        }
    },

    getProfessionBook: function (req, res) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send("Invalid book ID");
        }

        professionModel.getProfessionBook(id, function (err, book) {
            if (err) {
                res.status(500).send(err);
            } else if (!book) {
                res.status(404).send({ error: "Book not found" });
            } else {
                res.status(200).json(book);
            }
        });
    },

    updateProfessionBook: function (req, res) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send("Invalid book ID");
        }

        var updatedBook = req.body;
        console.log(updatedBook);
        professionModel.updateProfessionBook(id, updatedBook, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send("Book updated successfully");
            }
        });
    }
};
