const socket = io.connect();

socket.on('message', data => {
    renderMensajes(data)
});

const addMensajes = () => {
    const mensajes = {
        autor: document.getElementById('autor').value,
        mensaje: document.getElementById('mensaje').value
    }
    socket.emit('new-message', mensajes);

    document.getElementById('autor').value = ''
    document.getElementById('mensaje').value = ''
    return false
    
};


const renderMensajes = (message) =>{
    const ejs = message.map((element, index) => {
        return (`
        <div class="panel" style="margin-top: 2rem">
            <strong>${index} - ${element.autor}:</strong>
            <em>${element.mensaje}</em>
            <hr>
        </div>
        `)
    }).join(' ')

    console.log(ejs);

    document.getElementById('message').innerHTML = ejs;
}