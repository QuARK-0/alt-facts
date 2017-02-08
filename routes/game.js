const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/', (req, res, next) => {
  // const user = req.session.user;
  // if (!user) return res.redirect('/');
  // console.log(user)
  res.render('game');
});


module.exports = router;
