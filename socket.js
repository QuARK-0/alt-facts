

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



    socket.on('disconnect', () => {
      console.log('a user disconnected');
    })
  })
}
