// require('../db/config')
var mongoose = require('mongoose');
var Game = require('./game.js');

var UserSchema = new mongoose.Schema({
  googleId: String, // google ID
  userName: String, // google displayName
  f_name: String, //google name.givenName
  l_name: String, //google name.familyName
  email: String,
  // gameHistory:
  // write a method that will query all game collection and return back game id's
  // instance and static mongoose methods
  gamesPlayed: Number,
  totalScore: Number
  // curScore: Number //hold into session then after game is finish, push at once
})

module.exports = mongoose.model('User', UserSchema);

//
// { kind: 'plus#person',
//   etag: '"FT7X6cYw9BSnPtIywEFNNGVVdio/ySfPq6YsJvbXDU3_ZTqs-EjhDVk"',
//   emails: [ { value: 'ritwikr@gmail.com', type: 'account' } ],
//   objectType: 'person',
//   id: '100761763622898023421',
//   displayName: 'ritwikr',
//   name: { familyName: '.', givenName: 'ritwikr' },
//   url: 'https://plus.google.com/100761763622898023421',
//   image:
//    { url: 'https://lh4.googleusercontent.com/-qzEyY0HkrL0/AAAAAAAAAAI/AAAAAAAAABY/DZWdmolLPWs/photo.jpg?sz=50',
//      isDefault: false },
//   isPlusUser: true,
//   language: 'en',
//   circledByCount: 1,
//   verified: false }


// { kind: 'plus#person',
//   etag: '"FT7X6cYw9BSnPtIywEFNNGVVdio/ubJHGh9TmWQEFnTAicGvWzPfo4E"',
//   gender: 'male',
//   emails: [ { value: 'rruia@allstate.in', type: 'account' } ],
//   urls:
//    [ { value: 'http://www.gdata.in',
//        type: 'contributor',
//        label: 'General Data' },
//      { value: 'http://www.gdata.in/blog',
//        type: 'contributor',
//        label: 'General Data Blog' } ],
//   objectType: 'person',
//   id: '108023807432551392048',
//   displayName: 'Ritwik Ruia',
//   name: { familyName: 'Ruia', givenName: 'Ritwik' },
//   url: 'https://plus.google.com/108023807432551392048',
//   image:
//    { url: 'https://lh3.googleusercontent.com/-fOrn7pX-ro8/AAAAAAAAAAI/AAAAAAAAAAA/YBpL9fHmelo/photo.jpg?sz=50',
//      isDefault: true },
//   organizations: [ { name: 'Allstate Group', type: 'work', primary: false } ],
//   placesLived: [ { value: 'Mumbai, India', primary: true } ],
//   isPlusUser: true,
//   language: 'en',
//   circledByCount: 22,
//   verified: false,
//   domain: 'allstate.in' }
