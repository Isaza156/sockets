const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public'))); // archivos que no interactuan con el backend, no envian ni reciben información.

const server = app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

// Debemos crear otro puerto diferente al que ya está funcionando para el servidor de socket
const socketIO = require('socket.io');
const io = socketIO(server);

// cada que actualizamos la pagina nos da un nuevo socket, en consola se puede ver
io.on('connection', (socket) => {
    console.log('user connected with socket: ', socket.id);
    socket.on('messages', (data => {       
        console.log(data);
        socket.emit('messages', data);
    })
    );
    socket.on('typing', (data) =>{
        console.log(data + ' esta escribiendo...')
        socket.broadcast.emit('typing', data); 
    });
});
