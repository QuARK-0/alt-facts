var readyUsers = 0;
var answerObj = {};

//being required in server.js
module.exports = function(io) {
  io.on('connection', socket => {
    console.log('from socket.js: a user connected');
    // console.log(req.session.user);
    // console.log('from socket.js', socket.user);

    // User.find({})

    socket.on('send-name', name => {
      // gets name from client-side script
      console.log('name from socket.js', name);
      socket.userName = name;

      //send message to user who just connected
      var welcomeUser = `Welcome ${socket.userName}`;
      socket.emit('welcome-msg', welcomeUser);
    })

    console.log('socket.js outside', socket.userName);

    //sends message to anyone whos already connected
    var welcomeJoined = 'A New User has Joined';
    socket.broadcast.emit('user-join', welcomeJoined);

    socket.on('ready', num => {
      readyUsers += num;
      console.log(readyUsers);
      if (readyUsers === 2) {
        var question = 'Know the meaning of fast?'
        io.emit('question', question);
      }
    })

    socket.on('send-answer', answer => {
      answerObj[answer] = answer;
      var trueAns = 'RIGHT ANSWER';
      answerObj.trueAns = trueAns;
      console.log(answerObj);
      if (Object.keys(answerObj).length === 3) {
        io.emit('display-choices', answerObj);
      }
    })

    socket.on('disconnect', () => {
      console.log('a user disconnected');
    })
  })
}
