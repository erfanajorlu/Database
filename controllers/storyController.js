var storyModel = require('../models/storyModel');
const path = require('path');

module.exports = {
    getAllStoryBooks: function (req, res) {
        const acceptHeader = req.headers.accept || '';
        if (acceptHeader.includes('text/html')) {
            res.sendFile(path.join(__dirname, '../public/story/story.html'));
        } else {
            storyModel.getAllStoryBooks(function (err, books) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).json(books);
                }
            });
        }
    },

    getStoryBook: function (req, res) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send("Invalid book ID");
        }

        storyModel.getStoryBook(id, function (err, book) {
            if (err) {
                res.status(500).send(err);
            } else if (!book) {
                res.status(404).send({ error: "Book not found" });
            } else {
                res.status(200).json(book);
            }
        });
    },

    updateStoryBook: function (req, res) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send("Invalid book ID");
        }

        var updatedBook = req.body;
        console.log(updatedBook);
        storyModel.updateStoryBook(id, updatedBook, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send("Book updated successfully");
            }
        });
    }
};
