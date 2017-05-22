const path=require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000; //process.env.PORT  used by Heroku
const publicPath = path.join(__dirname, '/../public');
// console.log(__dirname + '/../public');
// console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server); // This is our websockets server.
var users = new Users();

// Registers an event listener to do something when event happens.
// 'connnection' let's you listen for new connection. The arrow function is the callback funcion.
io.on('connection', (socket) => {
    console.log('New user connected');

    // Validate data that came through for user joining.
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.') // the return prevents rest of code from firing.
        }
        //console.log(params);

        socket.join(params.room);
        users.removeUser(socket.id); // Remove user from previous potentil rooms. 
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        //socket.leave(params.room)

        // io.emit -- Emits to every connected user.
        //     io.to('The Office Fans') -- sends to everyone in room.
        // socket.broadcast.emit -- sends to everyone except that user.
        //     socket.broadcast.to('The Office Fans').emit -- sends to everyone in room except that user.
        // socket.emit -- emits to one user.

        // Only fires on the local tab browser.
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        // Fires only in all other tabs. In other words broadcast to everyone excep that socket(myself).
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

        callback(); // should still call callback but without parameters because it's reserved for passing back only errors to be handled by socket.emit function(err) at client.
    });

    /// Custom event listener waiting for 'createMessage' form socket.emit.
    socket.on('createMessage', (message, callback) => {
        console.log('Create message', message);
        // Send to every connection.
        io.emit('newMessage', generateMessage(message.from, message.text));
        //callback('This is from the server.');
        callback('');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        //console.log('User was disconnected')
        var user = users.removeUser(socket.id);

        if  (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has letf.`));
        }
    });
});

app.use(express.static(publicPath));

//app.listen(port, () => {
server.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});