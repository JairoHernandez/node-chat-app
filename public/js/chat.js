var socket = io();

function scrollToBottom () {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight'); // prop works on cross-browsers and it's non-jQuery
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight(); // calculates height of message along with css padding.
    console.log(newMessageHeight);
    var lastMessageHeight = newMessage.prev().innerHeight();
    console.log(newMessageHeight);

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        //console.log('Should scroll');
        messages.scrollTop(scrollHeight);
    }
}

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
    var template = jQuery('#message-template').html(); // html() returns html markup inside of #message-template, which is <p>This is a template</p>.
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
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