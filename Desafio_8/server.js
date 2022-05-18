const express = require("express");
const path = require("path");
const router = require('./routes/router.js');
const bodyParser = require('body-parser');
const {Server: HTTPServer} = require('http');
const {Server: SocketServer} = require('socket.io');
const { getMensajes, saveMensajes } = require('./models/message')


const app = express();
const server = new HTTPServer(app);
const io = new SocketServer(server);

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, '/public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', router);

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    const message = getMensajes();
    socket.emit('message', message);

    socket.on('new-message', mensajes =>{
        saveMensajes(mensajes);

        const allMessage = getMensajes();
        io.sockets.emit('message', allMessage);
        
    })
})


app.set('port', process.env.PORT || 3000);
server.listen(app.get('port'), () => {
    console.log(`Servidor escuchando en el puerto: http://localhost:${app.get('port')}/products`);
});