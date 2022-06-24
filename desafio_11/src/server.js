const express = require('express');
const path = require('path');
const routes = require('./routes')

// Initializations
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/api', routes());

// Server Listenning
app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
    console.log(`Servidor escuchando en el puerto: http://localhost:${app.get('port')}/api`);
});

server.on('error', error => console.log(`Error del servidor ${error}`));