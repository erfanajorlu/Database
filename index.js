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
var publisherRoutes = require('./routes/publisherRoutes');
var loanRoutes = require('./routes/loanRoutes');
var publisherBookRoutes = require('./routes/publisherBookRoutes');
var reportRoutes = require('./routes/reportRoutes');
var connection = require('./config/dbConfig');

app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
// Set up EJS
app.set('view engine', 'ejs');

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, 'public'))); // Public folder for static files

  
app.use(bodyParser.json());
app.use('/api', bookRoutes);
app.use('/api', memberRoutes);
app.use('/api', cultureRoutes);
app.use('/api', professionRoutes);
app.use('/api', storyRoutes);
app.use('/api', employeeRoutes);
app.use('/api', librarianRoutes);
app.use('/api', managerRoutes);
app.use('/api', publisherRoutes);
app.use('/api', loanRoutes);
app.use('/api', publisherBookRoutes);
app.use('/api', reportRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.get('/reports', (req, res) => {
    res.render('reports');
});
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
