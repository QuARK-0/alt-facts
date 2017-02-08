const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/', (req, res, next) => {
  // const user = req.session.user;
  // if (!user) return res.redirect('/');
  // console.log(user)
  // console.log('from game.js', req.session.user); //prints user from sessions
  // console.log('from game.js');
  var name = req.session.user.displayName;
  res.render('game', {data: name} );
});


module.exports = router;
