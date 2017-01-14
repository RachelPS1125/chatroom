$(document).ready(function() {
    var socket = io();
    var chatInput = $('.js-chat-input');
    var username;
    var messages = $('.js-messages');

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    function addUser(username) {
        $('.js-users').append('<div>' + username + '</div>');
    }
    $('.js-join').click(function() {
        username = $('.js-username-input').val().trim();
        if (!username) {
            alert('Please enter a user name');
            return;
        }
        addUser(username);
        $('.js-username').addClass('_hide');
        $('.js-chat-area').removeClass('_hide');
        $('.js-users').removeClass('_hide');
        socket.emit('username', username);
    })
    chatInput.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = chatInput.val();
        addMessage(message);
        socket.emit('message', message);
        chatInput.val('');
    });

    socket.on('message', addMessage);
    socket.on('username', addUser)
});