var publisherModel = require('../models/publisherModel');
const path = require('path')

module.exports = {

    getAllPublishers: function (req, res) {
        // Check if the request is coming from a browser
        const acceptHeader = req.headers.accept || '';
        if (acceptHeader.includes('text/html')) {
            // Serve the HTML page
            res.sendFile(path.join(__dirname, '../public/publisher/publishers.html')); // Adjust the path to your index.html
        } else {
            // Serve the JSON data
            publisherModel.getAllPublishers(function (err, publishers) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).json(publishers);
                }
            });
        }
    },

    addPublisher: function (req, res) {
        var newpublisher = req.body;

        // Ensure all required fields are present
        const requiredFields = ['Name', 'PhoneNumber'];
        for (const field of requiredFields) {
            if (!newpublisher[field]) {
                return res.status(400).send(`Missing required field: ${field}`);
            }
        }
        console.log(newpublisher)
        publisherModel.addpublisher(newpublisher, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send("publisher added successfully");
            }
        });
    },
    getPublisher: function (req, res) {
        var id = parseInt(req.params.id, 10); // Parse the ID as an integer
        if (isNaN(id)) {
            return res.status(400).send("Invalid publisher ID"); // Handle invalid IDs
        }

        const acceptHeader = req.headers.accept || '';
        if (acceptHeader.includes('text/html')) {
            // Serve the HTML page
            res.sendFile(path.join(__dirname, '../public/publisher/publishers.html')); // Adjust the path to your index.html
        } else {
            console.log('fdfd');
            // Serve the JSON data
            publisherModel.getPublisher(id ,function (err,publishers) {
                if (err) {
                    res.status(500).send(err);
                } else if (!publishers) {
                    return res.status(404).send({ error: "publisher not found" });
                }else {
                    res.status(200).json(publishers);
                }
            });
        }
    },

    updatePublisher: function (req, res) {
        var id = req.params.id;
        var updatedpublisher = req.body;
        publisherModel.updatePublisher(id, updatedpublisher, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send("publisher updated successfully");
            }
        });
    },

    deletePublisher: function (req, res) {
        var id = req.params.id;
        publisherModel.deletePublisher(id, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send("publisher deleted successfully");
            }
        });
    }
};
