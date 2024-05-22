var bookModel = require('../models/bookModel');
const path = require('path')

module.exports = {

    getAllBooks: function (req, res) {
        // Check if the request is coming from a browser
        const acceptHeader = req.headers.accept || '';
        if (acceptHeader.includes('text/html')) {
            // Serve the HTML page
            res.sendFile(path.join(__dirname, '../public/book/books.html')); // Adjust the path to your index.html
        } else {
            // Serve the JSON data
            bookModel.getAllBooks(function (err, books) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).json(books);
                }
            });
        }
    },

    addBook: function (req, res) {
        var newBook = req.body;

        // Ensure all required fields are present
        const requiredFields = ['categoryID', 'Title', 'Author', 'ISBN', 'price', 'stock', 'publisherId', 'EmpId'];
        for (const field of requiredFields) {
            if (!newBook[field]) {
                return res.status(400).send(`Missing required field: ${field}`);
            }
        }

        bookModel.addBook(newBook, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send("Book added successfully");
            }
        });
    },
    getBook: function (req, res) {
        var id = parseInt(req.params.id, 10); // Parse the ID as an integer
        if (isNaN(id)) {
            return res.status(400).send("Invalid book ID"); // Handle invalid IDs
        }

        const acceptHeader = req.headers.accept || '';
        if (acceptHeader.includes('text/html')) {
            // Serve the HTML page
            res.sendFile(path.join(__dirname, '../public/book/book.html')); // Adjust the path to your index.html
        } else {
            console.log('fdfd');
            // Serve the JSON data
            bookModel.getBook(id ,function (err,books) {
                if (err) {
                    res.status(500).send(err);
                } else if (!books) {
                    return res.status(404).send({ error: "Book not found" });
                }else {
                    res.status(200).json(books);
                }
            });
        }
    },

    updateBook: function (req, res) {
        var id = req.params.id;
        var updatedBook = req.body;
        bookModel.updateBook(id, updatedBook, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send("Book updated successfully");
            }
        });
    },

    deleteBook: function (req, res) {
        var id = req.params.id;
        bookModel.deleteBook(id, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send("Book deleted successfully");
            }
        });
    }
};
