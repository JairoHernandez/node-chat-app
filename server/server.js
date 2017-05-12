const path=require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

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
    socket.on('disconnect', () => {
        console.log('User was disconnected')
    });
});

app.use(express.static(publicPath));

//app.listen(port, () => {
server.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});