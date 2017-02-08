console.log('hi from game.js');

var socket = io();

console.log('my name from game.js', nameUser); // logged in session user
socket.emit('send-name', nameUser);

socket.on('welcome-msg', welcome => {
  $('#welcome-msg').text(welcome);
})

socket.on('user-join', msg => {
  $('.connected-users').append(`<h3>${msg}</h3>`);
})
