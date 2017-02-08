console.log('hi from game.js');

var socket = io();

socket.on('welcome-msg', welcome => {
  $('#welcome-msg').text(welcome);
})

socket.on('user-join', msg => {
  $('.connected-users').append(`<h3>${msg}</h3>`);
})
