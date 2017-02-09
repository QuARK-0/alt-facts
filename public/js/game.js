// console.log('hi from game.js');

var socket = io();

var user;


console.log('my name from game.js', userGId); // logged in session user
socket.emit('send-id', userGId);

socket.on('welcome-msg', userObj => {
  user = userObj; // saves user object to the global user variable
  $('#welcome-msg')
    .text(`Welcome, ${user.userName}!`);
  $('#welcome-msg')
    .after(`
      <button class="button" id="ready-button">Ready?</button>
      `)
})

socket.on('user-join', msg => {
  $('.connected-users')
    .append(`<p><small>${msg}</small></p>`);
})

socket.on('question', question => {
  $('.connected-users')
    .css('visibility', 'hidden');
  $('#welcome-msg')
    .text(question);
  $('#welcome-msg')
    .after(`
      <div class="container">
          <p class="control has-addons has-addons-centered">
              <input class="answer-input input" type="text" placeholder="your answer">
              <button class="answer-button button">Submit</button>
          </p>
      </div>
      `);
})

socket.on('display-choices', obj => {
  var keyNames = Object.keys(obj);
  console.log(obj)
  // userHolder = obj.user
  // console.log('obj ', obj);
  //input field still on the right side of displayed answers due
  //to visibility hidden on line 38
  for (var i = 0; i < keyNames.length; i++) {
    $('#welcome-msg').after(`
        <button class="button answers" id="a${i}">${obj[keyNames[i]].answer}</button>
        `)
  }
})


function readyHandle(evt) {
    // console.log('haha clicked');
    $('body')
        .off('click', '#ready-button', readyHandle);
    $('#welcome-msg')
        .text('waiting for other players to ready up...');
    $('#ready-button')
        .css('visibility', 'hidden');
    socket.emit('ready', 1);
}

$('body').on('click', '#ready-button', readyHandle);

function answerHandle(evt) {
    var userAnswer = {

        userName: user.googleId, //pulls name from global user object
        answer: $('.answer-input').val()
    };
    console.log('user answer ', userAnswer);
    $('body')
        .off('click', '.answer-button', answerHandle);
    $('.answer-input')
        .val('');
    $('.answer-input')
        .css('display', 'none');
    $('.answer-button')
        .css('visibility', 'hidden');
    socket.emit('send-answer', userAnswer);
}

$('body').on('click', '.answer-button', answerHandle);

$('#game-container').on('click', '.answers', event => {
    var selection = {
        userName: user.googleId,
        selected: $(event.target).text(),
        id: $(event.target).attr('id')
    }
    console.log('value ', selection)
    $(event.target)
        .siblings()
        .not('h6')
        .addClass('disabled');
    $('#game-container')
        .off('click');
    $('<h6>')
        .html('<small>waiting for everyone to make their selection...</small>')
        .appendTo('#welcome-msg');
    console.log('selection sent');
    socket.emit('send-selection', selection);
})
