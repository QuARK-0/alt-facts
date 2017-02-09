const express = require('express');
const request = require('request');
const router = express.Router();

require('../db/config');
const User = require ('../models/user.js');

router.get('/', (req, res, next) => {
  // using req.session for entire user object
  // const user = req.session.user;
  // if (!user) return res.redirect('/');
  // console.log(user)
  // res.render('profile', {user});

  // using req.session for googleid to look up in mongo
  // then retrieve DB stored user object
  var userId = req.session.user.id;
  User.find({
      googleId: userId
    }, (err, data) => {
      if (err) {
        throw err;
      }
      else {
        const user = data[0];
        console.log(user)
        res.render('profile', {user});
      }
    })
});

router.get('/me', (req, res, next) => {
  const url = 'https://www.googleapis.com/plus/v1/people/me';
  const access_token = req.session.access_token;
  if (!access_token) return res.redirect('/');
  const options = {
    method: 'GET',
    url,
    headers: { 'Authorization' : `Bearer ${access_token}`}
  }
  request(options, (err, response, body) => {
    const user = JSON.parse(body);
    req.session.user = user;
    // console.log(req.session.user);
    console.log(user.id);
    User.find({
      googleId: user.id
    }, (err, data) => {
      if (err) {
        throw err;
      }
      else if ( !data[0] ) {
        const newUser = new User({
          googleId: user.id,
          userName: user.displayName,
          f_name: user.name.givenName,
          l_name: user.name.familyName,
          email: user.emails[0].value
        })
        newUser.save( err => {
          if (err) console.log(err);
          else console.log(`unique user created: ${user.displayName}`);
        })
      }
    })
    return res.redirect('/game');
  })
});

router.post('/me/update', (req, res, next) => {
  var updatedUserName = req.body.newUserName;
  User.findOneAndUpdate({
    googleId: req.session.user.id
  }, {
    userName: updatedUserName
  }, (err, success) => {
    console.log(success); // logs updated user document from mongo
    res.json({status: 200})
  }
  )
})

module.exports = router;
