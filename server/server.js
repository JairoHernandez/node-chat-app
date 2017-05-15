const path=require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const port = process.env.PORT || 3000; //process.env.PORT  used by Heroku
const publicPath = path.join(__dirname, '/../public');
// console.log(__dirname + '/../public');
// console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server); // This is our websockets server.

// Registers an event listener to do something when event happens.
// 'connnection' let's you listen for new connection. The arrow function is the callback funcion.
io.on('connection', (socket) => {
    console.log('New user connected');

    // Only fires on the local tab browser.
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // Fires only in all other tabs. In other words broadcast to everyone excep that socket(myself).
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    /// Custom event listener waiting for 'createMessage' form socket.emit.
    socket.on('createMessage', (message, callback) => {
        console.log('Create message', message);
        // Send to every connection.
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server.');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected')
    });
});

app.use(express.static(publicPath));

//app.listen(port, () => {
server.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});