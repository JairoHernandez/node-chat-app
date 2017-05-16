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
    // console.log('New message', message);
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>'); // create element
    li.text(`${message.from}: ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li); // append it
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>'); // open in new tab

    li.text(`${message.from}: ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {    // acknowledgement callback insid of emit.
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Sending location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});