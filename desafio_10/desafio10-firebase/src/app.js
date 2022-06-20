const express = require('express');
const path = require('path');

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json);
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(require('./routes/products'));


// Static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;