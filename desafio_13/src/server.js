const express = require('express');
const path = require('path');
require('dotenv').config();
require('./database');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'coderhouse',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// GLOBAL VARIABLES
app.use((req, res, next) => {
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ROUTES
app.use(require('./routes/userRoutes'));

const server = app.listen(app.get('port'), () => {
    console.log(`Servidor escuchando en el puerto: http://localhost:${app.get('port')}`);
});

server.on("error", (error) => console.log(`Error del servidor ${error}`));
