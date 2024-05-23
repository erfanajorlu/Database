var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const path = require('path')
var app = express();
var bookRoutes = require('./routes/bookRoutes');
var memberRoutes = require('./routes/memberRoutes');
var cultureRoutes = require('./routes/cultureRoutes');
var professionRoutes = require('./routes/professionRoutes');
var storyRoutes = require('./routes/storyRoutes');
var employeeRoutes = require('./routes/employeeRoutes');
var librarianRoutes = require('./routes/librarianRoutes');
var managerRoutes = require('./routes/managerRoutes');
var connection = require('./config/dbConfig');

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, 'public'))); // Public folder for static files

app.use(cors());
app.use(bodyParser.json());
app.use('/api', bookRoutes);
app.use('/api', memberRoutes);
app.use('/api', cultureRoutes);
app.use('/api', professionRoutes);
app.use('/api', storyRoutes);
app.use('/api', employeeRoutes);
app.use('/api', librarianRoutes);
app.use('/api', managerRoutes);

connection.on('connect', function (err) {
    if (err) {
        console.log('Error: ', err);
    } else {
        console.log("Connected to the database");
        app.listen(3000, function () {
            console.log("Server is running on port 3000");
        });
    }
});

connection.connect();
