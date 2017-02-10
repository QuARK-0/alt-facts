// console.log('hi from game.js');

var socket = io();

var user;


$.fn.extend({
	animateCss: function(animationName) {
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
	// $('.hero-head').
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
		.css('visibility', 'hidden')
	$('#welcome-msg')
		.text(question)
	$('#welcome-msg')
		.after(`
      <div id="ques-container" class="container">
          <p class="control has-addons has-addons-centered">
              <input class="answer-input input" type="text" placeholder="your answer">
              <button class="answer-button button">Submit</button>
          </p>
      </div>
      `)
})

socket.on('timer', num => {
	// console.log(num)
	$('.timer').css('visibility', 'visible')
	$('.timer-value').text(num);
	if (num === 0) {
		var userAnswer = {
			userName: user.userName, //pulls name from global user object
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
		$('#ques-container').append($('<div>').attr('id', `${obj[keyNames[i]].answer}`).append($('<button>').attr('class', 'button answers').text(`${obj[keyNames[i]].answer}`)));
	}
})

socket.on('show-answers', obj => {
    console.log('show-answers', obj)
	for (let _user in obj) {
		let $li = $('<li class="is-small">').css('font-size', '0.5rem').text(`${_user}`);
		$(`#${obj[_user].selected}`).append($li);
	}
	setTimeout(() => {
		socket.emit('get-scores', user);
	}, 5000);
});

socket.on('send-scores', userObj => {
	console.log('render user scores on page', userObj)
	//render score on page
    $('#ques-container').empty()
    $('<div>').addClass('.container').attr('id', 'scores-div').appendTo('#ques-container')
    $('#scores-div')
        .html(`
            <p class="control has-addons has-addons-centered is-large">
                <input class="input is-primary is-disabled is-small" type="text" placeholder="current round:">
                <a class="button is-disabled is-small">${userObj[user.userName].score}</a>
            </p>
            <p class="control has-addons has-addons-centered is-large">
                <input class="input is-primary is-disabled is-small" type="text" placeholder="total:">
                <a class="button is-disabled is-small">${userObj[user.userName].total}</a><br>
            </p>
            `)
    // $('#scores-div').append('<p>')
    //     .addClass('control has-addons has-addons-centered')
    //     .html(`
    //         <input class="input is-primary is-disabled" type="text" placeholder="total:">
    //         <a class="button is-disabled">${userObj[user.googleId].total}</a><br>
    //         `)

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
		.text('waiting for other players to ready up...')
	$('#ready-button')
		.css('visibility', 'hidden')
	socket.emit('ready', 1);
}

$('body').on('click', '#ready-button', readyHandle);

function answerHandle(evt) {
    var answerInput = $('.answer-input').val()
    answerInput.toLowerCase()
	var userAnswer = {

		userName: user.userName, //pulls name from global user object
		answer: answerInput
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
		userName: user.userName,
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
		.appendTo('#welcome-msg')
	console.log('selection sent');
	socket.emit('send-selection', selection);
})

// socket.on('redirect', url => {
//   // socket.emit('success-redirect');
//   socket.disconnect();
//   window.location.pathname = '/';
// })
