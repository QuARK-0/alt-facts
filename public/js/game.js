console.log('hi from game.js');

var socket = io();

console.log('my name from game.js', userGId); // logged in session user
socket.emit('send-id', userGId);

socket.on('welcome-msg', welcome => {
  $('#welcome-msg').text(welcome);
  $('#welcome-msg').after('<button id="ready-button">Ready?</button>')
})

socket.on('user-join', msg => {
  $('.connected-users').append(`<h3>${msg}</h3>`);
})

function readyHandle(evt) {
  console.log('haha clicked');
  $('body').off('click', '#ready-button', readyHandle);
  $('#welcome-msg').text('waiting for other players to ready up...');
  $('#ready-button').css('visibility', 'hidden');
  socket.emit('ready', 1);
}

$('body').on('click', '#ready-button', readyHandle);

socket.on('question', question => {
  $('.connected-users').css('visibility', 'hidden');
  $('#welcome-msg').text(question);
  $('#welcome-msg').after('<input class="answer-input" type="text"><br><button class="answer-button">Submit Answer</button><br>');
})

function answerHandle(evt) {
  var userAnswer = $('.answer-input').val();
  console.log(userAnswer);
  $('body').off('click', '.answer-button', answerHandle);
  $('.answer-input').val('');
  $('.answer-input').css('display', 'none');
  $('.answer-button').css('visibility', 'hidden');
  socket.emit('send-answer', userAnswer);
}

$('body').on('click', '.answer-button', answerHandle);

socket.on('display-choices', obj => {
  var keyNames = Object.keys(obj);
  console.log(keyNames);
  //input field still on the right side of displayed answers due
  //to visibility hidden on line 38
  for (var i = 0; i < keyNames.length; i++) {
    $('#welcome-msg').after(`<button>${obj[keyNames[i]]}</button>`)
  }
})
