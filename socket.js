const express = require('express');
const request = require('request');
const router = express.Router();
require('./db/config');
const User = require('./models/user.js')

var connectedUsers = 0;
var readyUsers = 0;
var userObj = {};
var answerObj = {};
var list = [];
var numRounds = 5;

//being required in server.js
module.exports = function(io) {
// <<<<<<< multi-Qs
	io.on('connection', socket => {
		console.log('from socket.js: a user connected');
		connectedUsers++;
		console.log('connected users', connectedUsers);
		if (connectedUsers > 2) {
			// var maxRoomUrl = "http://google.com/"
			// socket.emit('redirect', maxRoomUrl);
			socket.disconnect();
			connectedUsers--;
			console.log('connected users', connectedUsers);
			console.log('ready users', readyUsers);
		}
		// console.log(req.session.user);
		// console.log('from socket.js', socket.user);
		// console.log(io);


		socket.on('send-id', id => {
			// console.log(id)

			// gets name from client-side script
			User.find({
				googleId: id
			}, (err, user) => {
				if (err) {
					throw (err);
				} else {
                    userObj[user[0].userName] = {};
                    userObj[user[0].userName].score = 0;
                    userObj[user[0].userName].total = 0;
					// console.log(user);
					// console.log('id from socket.js', id);

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

		//sends message to anyone whos already connected
		// var welcomeJoined = 'A New User has Joined';
		// socket.broadcast.emit('user-join', welcomeJoined);

		socket.on('ready', num => {
			var msg;
			readyUsers++
			// console.log('READY Users >>> for ', readyUsers, 'LIST size ', list.length)
			if (readyUsers === 2 && list.length > 0) {
				// console.log('READY Users inside if() ', readyUsers)
				msg = list.shift();
				answerObj = {};
				answerObj.trueAns = {
					answer: msg.answer
				};
				io.emit('question', msg.question)
			}
			if (readyUsers === 2 && list.length === 0) {
				request(`http://jservice.io/api/random?count=${numRounds}`, (err, response, body) => {
					list = JSON.parse(body);
					// console.log('LIST >>> ', list)
					// maybe store questions into database
					//   console.log(list[0]); //displays first question in array
					msg = list.shift();
					msg.answer = msg.answer.replace(/(<([^>]+)>)/ig, '')
						.replace(/[^a-z0-9-\s\']/gi, '').toLowerCase();
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

						if (connectedUsers === 0) {
							clearInterval(timerID)
							return
						}

						io.emit('timer', timerCount)
					}
				});
			}
		})

		socket.on('send-answer', answer => {
			// user += '1';
			answerObj[answer.userName] = {
				answer: answer.answer
			};
            // console.log('answerObj ', answerObj)
			userObj[answer.userName].answer = answer.answer;
			// console.log('ANSWEROBJECT >>>', answerObj)

			if (Object.keys(answerObj).length === 3) {
				io.emit('display-choices', answerObj);
			}
		})

		socket.on('send-selection', selection => {
			// console.log('answerObj @ selection.userName selected ', answerObj[selection.userName])
			answerObj[selection.userName].selected = selection.selected
			userObj[selection.userName].selected = selection.selected;
			// console.log('SEND SELECTION userObj : ', userObj)
			// console.log('answerObj @ selection.userName selected ', answerObj)
			// console.log(answerObj[selection.user], answerObj[selection.user].answer)

			if (haveAllUsersSelected(userObj)) {
				// console.log('show-answers server side');
				io.emit('show-answers', userObj);
				// or who-answered - from merge
			}

			if (selection.selected === answerObj.trueAns.answer) {

				// console.log('ur right')
				// var correct = 'ur right'
				// socket.boradcast.emit('correct', correct)
			}
		})

		socket.on('get-scores', user => {
			// console.log('GET SCORES', userObj)
			// console.log(userObj[user.googleId].selected)
			var round = 0;
			if (userObj[user.userName].selected === answerObj.trueAns.answer) {
				round += 1000;
			}
			for (let player in userObj) {
				// console.log(userObj[player].selected)
				if (userObj[user.userName].answer === userObj[player].selected && !userObj[user]) {
					round += 1000;
				}
			}
			userObj[user.userName].score = round;
			userObj[user.userName].total += round;
			readyUsers = 0;
			// console.log('Num Questions in get-scores ', list.length)
			if (list.length) {
				io.emit('send-scores', userObj)
			} else {
				io.emit('final-round', userObj)
			}
		});

		socket.on('disconnect', () => {
			console.log('a user disconnected');
			connectedUsers--;
			if (readyUsers > connectedUsers) {
				readyUsers = connectedUsers;
			}
			console.log('connected users', connectedUsers);
			console.log('ready users', readyUsers);
		})

	})

	function haveAllUsersSelected(userObj) {

		var objKeysArray = Object.keys(userObj);
		var tester = true;

		for (var j = 0; j < objKeysArray.length; j++) {
			var held = userObj[objKeysArray[j]];
			if (Object.keys(held).length !== 4) {
				tester = false;
				// console.log(tester);
			}

		}
		return tester;
	}

}
