const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('/disconnect', (req, res, next) => {
    req.session.destroy( () => {
      res.redirect('/');
    });
})

module.exports = router
