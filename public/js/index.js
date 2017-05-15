var socket = io();

// listeners need callback
socket.on('connect', function () {
    console.log('Connected to server');

    // Put createMessage emitter event in here since we need to be connected to server first. Sends message to server.
    // socket.emit('createMessage', {
    //     from: 'jairo@emc.com',
    //     text: 'Hey. This is Jairo message.'
    // });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

//Custom event listener waiting for 'newMessage' from socket.emit.
// message is the object form soscket.io.
socket.on('newMessage', function (message) {
    console.log('New message', message);

    var li = jQuery('<li></li>'); // create element
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li); // append it
});

socket.emit('createMessage', {
    from: 'Frank',
    text: "Hi"
}, function (data) {
    console.log('Got it', data);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
});