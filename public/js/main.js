console.log('hey from main.js');

// var socket = io();
var $updButton = $('.username-button');

function updateUsername(evt) {
  console.log('clicked');
}

$updButton.on('click', updateUsername);
