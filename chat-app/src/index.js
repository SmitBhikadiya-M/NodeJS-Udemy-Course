const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words');

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const { generateMessage, generateLocationMessage } = require('./utils/messages');

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('join', ({username, room}) => {
        socket.join(room)

        // socket.emit - specific connection
        // io.emit - all the every connected client
        // io.broadcast.emit - all the connected client accept itself

        socket.emit('message', generateMessage('Welcome!!'));
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!!`));

    })
    
    socket.on('sendMessage', (message, callback) => {

        const filter =new Filter();

        if(filter.isProfane(message)){
            return callback('Profanity is not allowed!');
        }

        io.to('').emit('message', generateMessage(message));
        callback();
    });

    socket.on('sendLocation', (coords, callback) => {
        if(!coords.latitude || !coords.longitude){
            return callback('Coordinates Not Found!!');
        }
        io.emit('location', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
    });

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('User left from the chat'))
    });
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
})