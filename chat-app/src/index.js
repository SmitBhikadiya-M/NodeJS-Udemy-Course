const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const { generateMessage, generateLocationMessage } = require('./utils/messages');

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('join', (options, callback) => {

        const { error, user } = addUser({ id: socket.id, ...options });

        if(error){
            return callback(error);
        }

        socket.join(user.room)

        // socket.emit - specific connection
        // io.emit - all the every connected client
        // io.broadcast.emit - all the connected client accept itself

        socket.emit('message', generateMessage('Welcome!!', 'Admin'));
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!!`, 'Admin'));
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });
        callback();
    })
    
    socket.on('sendMessage', (message, callback) => {

        const filter =new Filter();

        if(filter.isProfane(message)){
            return callback('Profanity is not allowed!');
        }

        const user = getUser(socket.id);
        if(user.length <= 0){
            return callback('User is not exits in room!!!');
        }

        io.to(user.room).emit('message', generateMessage(message, user.username));
        callback();
    });

    socket.on('sendLocation', (coords, callback) => {

        const user = getUser(socket.id);
        if(user.length <= 0){
            return callback('User is not exits in room!!!');
        }

        if(!coords.latitude || !coords.longitude){
            return callback('Coordinates Not Found!!');
        }
        io.emit('location', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`, user.username))
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user){
            io.emit('message', generateMessage(`${user.username} has left!`, 'Admin'));
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            });
        }

    });
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
})