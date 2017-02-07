require('./config');
var User = require('./user.js');

var GameSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  questions: Array
})

module.exports = mongoose.model('Game', GameSchema);
