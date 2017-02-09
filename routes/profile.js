const express = require('express');
const request = require('request');
const router = express.Router();

require('../db/config');
const User = require('../models/user.js');

router.get('/', (req, res, next) => {
	const user = req.session.user;
	if (!user) return res.redirect('/');
	console.log(user)
	res.render('profile', {
		user
	});
});

router.get('/me', (req, res, next) => {
	const url = 'https://www.googleapis.com/plus/v1/people/me';
	const access_token = req.session.access_token;
	if (!access_token) return res.redirect('/');
	const options = {
		method: 'GET',
		url,
		headers: {
			'Authorization': `Bearer ${access_token}`
		}
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
			} else if (!data[0]) {
				const newUser = new User({
					googleId: user.id,
					userName: user.displayName,
					f_name: user.name.givenName,
					l_name: user.name.familyName,
					email: user.emails[0].value
				})
				newUser.save(err => {
					if (err) console.log(err);
					else console.log(`unique user created: ${user.displayName}`);
				})
			}
		})
		return res.redirect('/game');
	})
});

module.exports = router;
