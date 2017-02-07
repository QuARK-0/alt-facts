require('./config')
var Game = require('./game.js');

var UserSchema = new mongoose.Schema({
  userName: String,
  f_name: String,
  l_name: String,
  // gameHistory:
  // write a method that will query all game collection and return back game id's
  // instance and static mongoose methods
  gamesPlayed: Number,
  totalScore: Number
  // curScore: Number //hold into session then after game is finish, push at once
})

module.exports = mongoose.model('User', UserSchema);
