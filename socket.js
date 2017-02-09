const express = require('express');
const request = require('request');
const router = express.Router();
require('./db/config');
const User = require('./models/user.js')

var readyUsers = 0;
var answerObj = {};
var list;
// var user = 'player';

//being required in server.js
module.exports = function(io) {
  io.on('connection', socket => {
    console.log('from socket.js: a user connected');
    // console.log(req.session.user);
    // console.log('from socket.js', socket.user);


    socket.on('send-id', id => {
      // gets name from client-side script
      User.find({
        googleId: id
    }, (err, user) => {
        if (err) {
          throw (err);
        }
        else {
          console.log(user);
          console.log('id from socket.js', id);
          //send message to user who just connected
          // var welcomeUser = `Welcome, ${socket.userName}!`;
          socket.emit('welcome-msg', user[0]); //sends the user object from mongoose
        }
      })



    })

    console.log('socket.js outside', socket.userName);

    //sends message to anyone whos already connected
    var welcomeJoined = 'A New User has Joined';
    socket.broadcast.emit('user-join', welcomeJoined);

    socket.on('ready', num => {
      readyUsers += num;
    //   console.log(readyUsers);
      if (readyUsers === 2) {
        request('http://jservice.io/api/random?count=10', (err, response, body) => {
          list = JSON.parse(body);
          // maybe store questions into database
        //   console.log(list[0]); //displays first question in array
          var msg = list.shift();
          answerObj.trueAns = { answer: msg.answer };
          io.emit('question', msg.question);
        });
      }
    })

    socket.on('send-answer', answer => {
        // user += '1';
      answerObj[answer.userName] = {
          answer: answer.answer
      };
      if (Object.keys(answerObj).length === 3) {
        io.emit('display-choices', answerObj);
      }
    })

    socket.on('send-selection', selection => {
        console.log('answerObj @ selection.userName selected ', answerObj[selection.userName])
        answerObj[selection.userName].selected = selection.selected
        console.log('answerObj @ selection.userName selected ', answerObj)
        // console.log(answerObj[selection.user], answerObj[selection.user].answer)
        if (answerObj[selection.userName].selected === 2) {

        }


        if (selection.selected === answerObj.trueAns.answer) {
            console.log('ur right')
            var correct = 'ur right'
            // socket.boradcast.emit('correct', correct)
        }
    })

    socket.on('disconnect', () => {
      console.log('a user disconnected');
    })
  })
}
