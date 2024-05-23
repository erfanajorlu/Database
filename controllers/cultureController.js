var cultureModel = require('../models/cultureModel');
const path = require('path');

module.exports = {
    getAllCultureBooks: function (req, res) {
        const acceptHeader = req.headers.accept || '';
        if (acceptHeader.includes('text/html')) {
            res.sendFile(path.join(__dirname, '../public/culture/culture.html'));
        } else {
            cultureModel.getAllCultureBooks(function (err, books) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).json(books);
                }
            });
        }
    },

    getCultureBook: function (req, res) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send("Invalid book ID");
        }

        cultureModel.getCultureBook(id, function (err, book) {
            if (err) {
                res.status(500).send(err);
            } else if (!book) {
                res.status(404).send({ error: "Book not found" });
            } else {
                res.status(200).json(book);
            }
        });
    },

    updateCultureBook: function (req, res) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send("Invalid book ID");
        }

        var updatedBook = req.body;
        console.log(updatedBook);
        cultureModel.updateCultureBook(id, updatedBook, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send("Book updated successfully");
            }
        });
    }
};
