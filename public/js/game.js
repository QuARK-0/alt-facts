// console.log('hi from game.js');

var socket = io();

console.log('my name from game.js', nameUser); // logged in session user
socket.emit('send-name', nameUser);

socket.on('welcome-msg', welcome => {
  $('#welcome-msg').text(welcome);
  $('#welcome-msg').after(`
      <button class="button" id="ready-button">Ready?</button>
      `)
})

socket.on('user-join', msg => {
  $('.connected-users').append(`<p><small>${msg}</small></p>`);
})

socket.on('question', question => {
  $('.connected-users').css('visibility', 'hidden');
  $('#welcome-msg').text(question);
  $('#welcome-msg').after(`
      <div class="container">
          <p class="control has-addons has-addons-centered">
              <input class="answer-input input" type="text" placeholder="your answer">
              <br>
              <button class="answer-button button">Submit</button>
              <br>
          </p>
      </div>
      `);
})

socket.on('display-choices', obj => {
  var keyNames = Object.keys(obj);
  // console.log(keyNames);
  //input field still on the right side of displayed answers due
  //to visibility hidden on line 38
  for (var i = 0; i < keyNames.length; i++) {
    $('#welcome-msg').after(`
        <button class="button" id="${i}">${obj[keyNames[i]]}</button>
        `)
  }
})


function readyHandle(evt) {
    // console.log('haha clicked');
    $('body').off('click', '#ready-button', readyHandle);
    $('#welcome-msg').text('waiting for other players to ready up...');
    $('#ready-button').css('visibility', 'hidden');
    socket.emit('ready', 1);
}

$('body').on('click', '#ready-button', readyHandle);

function answerHandle(evt) {
    var userAnswer = {
        userName: nameUser,
        answer: $('.answer-input').val()
    };
    console.log('user answer ', userAnswer);
    $('body').off('click', '.answer-button', answerHandle);
    $('.answer-input').val('');
    $('.answer-input').css('display', 'none');
    $('.answer-button').css('visibility', 'hidden');
    socket.emit('send-answer', userAnswer);
}

$('body').on('click', '.answer-button', answerHandle);

$('#game-container').click( event => {
    var selection = {
        answer: $(event.target).text(),
        id: $(event.target).attr('id')
    }
    console.log('value ', selection)

    // socket.emit('send-selection', selection)
    // console.log('id ', event.target.attr('id'))
})
