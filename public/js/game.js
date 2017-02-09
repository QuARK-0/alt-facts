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
  $('#ques-container').remove();

  $('.connected-users')
    .css('visibility', 'hidden');
  $('#welcome-msg')
    .text(question);
  $('#welcome-msg')
    .after(`
      <div id="ques-container" class="container">
          <p class="control has-addons has-addons-centered">
              <input class="answer-input input" type="text" placeholder="your answer">
              <button class="answer-button button">Submit</button>
          </p>
      </div>
      `);
})

socket.on('display-choices', obj => {
  var keyNames = Object.keys(obj);
  //input field still on the right side of displayed answers due
  //to visibility hidden on line 38
  for (var i = 0; i < keyNames.length; i++) {
    // $('#welcome-msg').after(`
    //     <div id="${obj[keyNames[i]].answer}"><button class="button answers">${obj[keyNames[i]].answer}</button></div>
    //     `)
    $('#ques-container').append( $('<div>').attr('id', `${obj[keyNames[i]].answer}`).append( $('<button>').attr('class', 'button answers').text(`${obj[keyNames[i]].answer}`) ) );
  }
})

socket.on('show-answers', obj => {
  for (let user in obj) {
    console.log('show-answers', obj[user].selected)
    let $li = $('<li>').text(`${user}`);
    $(`#${obj[user].selected}`).append( $li );
  }
  setTimeout( () => {
    socket.emit('get-scores', user);
  }, 3000);
});

socket.on('send-scores', userObj => {
  console.log('render user scores on page', userObj)
  //render score on page

  $('body')
         .on('click', '#ready-button', readyHandle);
    $('#welcome-msg')
        .text('waiting for other players to ready up...');
    $('#ready-button')
        .css('visibility', 'visible');
});

socket.on('final-round', userObj => {
  console.log('this is final round score, winner is ....')
  //render final score on page

  //render new game button
});

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
  console.log('INSIDE ANSWER HANDLE')
    var userAnswer = {

        userName: user.googleId, //pulls name from global user object
        answer: $('.answer-input').val()
    };
    console.log('user answer ', userAnswer);
    // $('body')
    //     .off('click', '.answer-button', answerHandle);
    // $('.answer-input')
    //     .val('');
    // $('.answer-input')
    //     .css('display', 'none');
    // $('.answer-button')
    //     .css('visibility', 'hidden');

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
