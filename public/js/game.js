// console.log('hi from game.js');

var socket = io();

var user;

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});


console.log('my name from game.js', userGId); // logged in session user
socket.emit('send-id', userGId);

socket.on('welcome-msg', userObj => {
	user = userObj; // saves user object to the global user variable
    // $('.hero-head').animateCss('bounceIn')
	$('#welcome-msg')
		.text(`Welcome, ${user.userName}!`);
	$('#welcome-msg')
		.after(`
      <button class="button" id="ready-button">Ready?</button>
      `).animateCss('bounceIn')
})

socket.on('user-join', msg => {
	$('.connected-users')
		.append(`<p><small>${msg}</small></p>`);
})

socket.on('question', question => {

  $('#ques-container').remove();

	$('.connected-users')
		.css('visibility', 'hidden').animateCss('fadeOut');
	$('#welcome-msg')
		.text(question).animateCss('bounceIn');
  $('#welcome-msg')
    .after(`
      <div id="ques-container" class="container">
          <p class="control has-addons has-addons-centered">
              <input class="answer-input input" type="text" placeholder="your answer">
              <button class="answer-button button">Submit</button>
          </p>
      </div>
      `).animateCss('bounceIn');
})

socket.on('timer', num => {
	// console.log(num)
	$('.timer').css('visibility', 'visible').animateCss('bounceIn')
	$('.timer-value').text(num);
	if (num === 0) {
		var userAnswer = {
			userName: user.googleId, //pulls name from global user object
			answer: 'OMGUHAD20'
		};
		console.log('user answer ', userAnswer);
		$('body').off('click', '.answer-button', answerHandle);
		$('.answer-input').val('');
		$('.answer-input').css('display', 'none')
		$('.answer-button').css('visibility', 'hidden');
    // $('.timer').animateCss('fadeOut').css('visibility', 'hidden')
		$('.timer').css('visibility', 'hidden')
		socket.emit('send-answer', userAnswer);
	}

})

socket.on('display-choices', obj => {

	// $('.timer').css('visibility', 'hidden') // not working
	var keyNames = Object.keys(obj);

	//input field still on the right side of displayed answers due
	//to visibility hidden on line 38
	for (var i = 0; i < keyNames.length; i++) {
		// $('#welcome-msg').after(`
  //       <button class="button answers animated fadeIn" id="a${i}">${obj[keyNames[i]].answer}</button>
  //       `)
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
	$('body')
		.off('click', '#ready-button', readyHandle);
	$('#welcome-msg')
		.text('waiting for other players to ready up...').animateCss('pulse');
	$('#ready-button')
		.css('visibility', 'hidden').animateCss('fadeOut');
	socket.emit('ready', 1);
}

$('body').on('click', '#ready-button', readyHandle);

function answerHandle(evt) {
	var userAnswer = {

		userName: user.googleId, //pulls name from global user object
		answer: $('.answer-input').val()
	};
	console.log('user answer ', userAnswer);
	// $('body')
	// 	.off('click', '.answer-button', answerHandle);
	// $('.answer-input')
	// 	.val('');
	// $('.answer-input')
	// 	.css('display', 'none');
	// $('.answer-button')
	// 	.css('visibility', 'hidden');
	socket.emit('send-answer', userAnswer);
	$('.timer').css('visibility', 'hidden') // not working
	socket.off('timer')
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
	$('<h6>').attr('style', 'color: grey;')
		.html('<small>waiting for everyone to make their selection...</small>')
		.appendTo('#welcome-msg').animateCss('pulse');
	console.log('selection sent');
	socket.emit('send-selection', selection);
})

// socket.on('redirect', url => {
//   // socket.emit('success-redirect');
//   socket.disconnect();
//   window.location.pathname = '/';
// })
