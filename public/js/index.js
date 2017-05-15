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

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>'); // open in new tab

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location.');
    });

});