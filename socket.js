

//being required in server.js
module.exports = function(io) {
  io.on('connection', socket => {
    console.log('from socket.js: a user connected');
    // console.log(req.session.user);
    // console.log('from socket.js', socket.user);

    socket.on('send-name', name => {
      console.log('name from socket.js', name);
    })

    //send message to user who just connected
    var welcomeUser = 'Welcome Unique User';
    socket.emit('welcome-msg', welcomeUser);


    //sends message to anyone whos already connected
    var welcomeJoined = 'A New User has Joined';
    socket.broadcast.emit('user-join', welcomeJoined);



    socket.on('disconnect', () => {
      console.log('a user disconnected');
    })
  })
}
