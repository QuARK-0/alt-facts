require('./config')
var Game = require('./game.js');

var UserSchema = new mongoose.Schema({
  userName: String,
  f_name: String,
  l_name: String,
  // gameHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
  // write a method that will query all game collection and return back game id's
  // instance and static mongoose methods
  gamesPlayed: Number,
  totalScore: Number,
  curScore: Number
})

module.exports = mongoose.model('User', UserSchema);
