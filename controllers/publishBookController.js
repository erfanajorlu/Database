var publishBookModel = require('../models/publishBookModel');
const path = require('path')

module.exports = {

    getAllpublishBook: function (req, res) {
        // Check if the request is coming from a browser
        const acceptHeader = req.headers.accept || '';
        if (acceptHeader.includes('text/html')) {
            // Serve the HTML page
            res.sendFile(path.join(__dirname, '../public/publishBook/publishBook.html')); // Adjust the path to your index.html
        } else {
            // Serve the JSON data
            publishBookModel.getAllpublishBook(function (err, publishBook) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).json(publishBook);
                }
            });
        }
    },

    addpublishBook: function (req, res) {
        var newpublishBook = req.body;

        // Ensure all required fields are present
        const requiredFields = ['PublisherId' , 'BookID'];
        for (const field of requiredFields) {
            if (!newpublishBook[field]) {
                return res.status(400).send(`Missing required field: ${field}`);
            }
        }

        publishBookModel.addpublishBook(newpublishBook, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send("publishBook added successfully");
            }
        });
    },
    getpublishBook: function (req, res) {
        var id = parseInt(req.params.id, 10); // Parse the ID as an integer
        if (isNaN(id)) {
            return res.status(400).send("Invalid publishBook ID"); // Handle invalid IDs
        }

        const acceptHeader = req.headers.accept || '';
        if (acceptHeader.includes('text/html')) {
            // Serve the HTML page
            res.sendFile(path.join(__dirname, '../public/publishBook/publishBook.html')); // Adjust the path to your index.html
        } else {
            // Serve the JSON data
            publishBookModel.getpublishBook(id ,function (err,publishBook) {
                if (err) {
                    res.status(500).send(err);
                } else if (!publishBook) {
                    return res.status(404).send({ error: "publishBook not found" });
                }else {
                    res.status(200).json(publishBook);
                }
            });
        }
    },
    
    updatepublishBook: function (req, res) {
        var id = req.params.id;
        var updatedBook = req.body;
        publishBookModel.updatepublishBook(id, updatedBook, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send("Book updated successfully");
            }
        });
    }
    ,
    deletepublishBook: function (req, res) {
        var id = req.params.id;
        publishBookModel.deletepublishBook(id, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send("publishBook deleted successfully");
            }
        });
    }
};
