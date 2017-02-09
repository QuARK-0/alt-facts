const express = require('express');
const request = require('request');
const router = express.Router();
require('./db/config');
const User = require('./models/user.js')

var readyUsers = 0;
var userObj = {};
var answerObj = {};
var list;
// var user = 'player';

//being required in server.js
module.exports = function(io) {
	io.on('connection', socket => {
		console.log('from socket.js: a user connected');
		// console.log(req.session.user);
		// console.log('from socket.js', socket.user);
		// console.log(io);


		socket.on('send-id', id => {
			// gets name from client-side script
			User.find({
				googleId: id
			}, (err, user) => {
				if (err) {
					throw (err);
				} else {
					console.log(user);
					console.log('id from socket.js', id);
					//send message to user who just connected
					// var welcomeUser = `Welcome, ${socket.userName}!`;
					socket.emit('welcome-msg', user[0]); //sends the user object from mongoose

					//sends message to anyone whos already connected
					var welcomeJoined = `${user[0].userName} has Joined`;
					socket.broadcast.emit('user-join', welcomeJoined);

				}
			})
		})

		// console.log('socket.js outside', socket.userName);


		socket.on('ready', () => {
			// readyUsers += num;
			// console.log('on ready socket object', socket)
			readyUsers++
			//   console.log(readyUsers);
			if (readyUsers === 2) {
				request('http://jservice.io/api/random?count=10', (err, response, body) => {
					list = JSON.parse(body);
					// maybe store questions into database
					//   console.log(list[0]); //displays first question in array
					var msg = list.shift();
					answerObj.trueAns = {
						answer: msg.answer
					};
					io.emit('question', msg.question);

					//timer code
					var timerCount = 21;

					var timerID = setInterval(timerFunc, 1000)

					function timerFunc() {
						timerCount -= 1;
						if (timerCount < 0) {
							clearInterval(timerID)
							return
						}
						io.emit('timer', timerCount)
					}

				});
			}
		})

		socket.on('send-answer', answer => {

			answerObj[answer.userName] = {
				answer: answer.answer
			};
			userObj[answer.userName] = {
				answer: answer.answer
			};

			if (Object.keys(answerObj).length === 3) {
				io.emit('display-choices', answerObj);
			}
		})

		socket.on('send-selection', selection => {
			// console.log('answerObj @ selection.userName selected ', answerObj[selection.userName])
			answerObj[selection.userName].selected = selection.selected
			userObj[selection.userName].selected = selection.selected;
			console.log('userObj ', userObj)
			// console.log('answerObj @ selection.userName selected ', answerObj)
			// console.log(answerObj[selection.user], answerObj[selection.user].answer)

			if (haveAllUsersSelected(userObj)) {
				console.log('who-answered server side');
				io.emit('who-answered', userObj);
			}

			if (selection.selected === answerObj.trueAns.answer) {
				console.log('ur right')
				var correct = 'ur right'
				// socket.boradcast.emit('correct', correct)
			}
		})

		socket.on('disconnect', () => {
			// if (window.location.pathname !== '/game'){
			//     return false;
			// } else {
			//     readyUsers--;
			// }
			console.log(`a user disconnected. remaining: ${readyUsers}`);
		})

	})

	function haveAllUsersSelected(userObj) {

		var objKeysArray = Object.keys(userObj);
		var tester = true;

		for (var j = 0; j < objKeysArray.length; j++) {
			var held = userObj[objKeysArray[j]];
			if (Object.keys(held).length !== 2) {
				tester = false;
				console.log(tester);
			}
		}
		return tester;
	}
}
