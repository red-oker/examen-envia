const express = require('express')
const cors = require('cors')
const socketio = require('socket.io')
const path = require('path')
const app = express()

// Configuraciones
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));

//Middlewares
app.use(cors({
    origin: "*",
    methods: "GET"
}));

// Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))


/// Aranque del servidor Express
const server = app.listen(app.get('port'), '0.0.0.0', () =>{
    console.log(`Server on http://0.0.0.0:${app.get('port')}`)
    console.log(`Server on http://localhost:${app.get('port')}`)
});

// Configuración del servior SocketIO
const io = socketio(server,{
    cors:{
        origin: '*',
        methods: 'GET,POST'
    }
})


// Evento de conexión de cliente nuevo
io.on('connect', (socket) => {

    socket.on('generate', (data) => {
        socket.broadcast.emit('generate', data)
    })

})
