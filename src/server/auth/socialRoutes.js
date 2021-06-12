const passport = require('passport');
const express = require('express');

const boom = require('@hapi/boom');
const config = require('../config/index');

//Google Strategy

require('./strategies/googleStrategy');

//Twitter Strategy

require('./strategies/twitterStrategy');

function socialRoutes(app) {
	const router = express.Router();
	app.use('/social', router);

	//Start OAuth with Twitter

	router.get('/twitter-oauth', passport.authenticate('twitter'));

	//Callback Twitter Oauth

	router.get(
		'/twitter-oauth/callback',
		passport.authenticate('twitter', { session: false }),
		(req, res, next) => {
			if (!req.user) {
				next(boom.unauthorized());
			}

			const { token, user } = req.user;

			res.cookie('token', token, {
				httpOnly: config.ENV === 'development' ? false : true,
				secure: config.ENV === 'development' ? false : true,
			});

			res.cookie('user', user, {
				httpOnly: config.ENV === 'development' ? false : true,
				secure: config.ENV === 'development' ? false : true,
			});

			res.status(200).json(user);
		}
	);

	//Start OAuth with Google
	router.get('/google-oauth', passport.authenticate('google', { scope: ['profile', 'email', 'openid'] }));

	//Callback Google OAuth

	router.get(
		'/google-oauth/callback',
		passport.authenticate('google', { session: false }),
		(req, res, next) => {
			if (!req.user) {
				next(boom.unauthorized());
			}

			const { token, user } = req.user;

			res.cookie('token', token, {
				httpOnly: config.ENV === 'development' ? false : true,
				secure: config.ENV === 'development' ? false : true,
			});

			res.cookie('user', user, {
				httpOnly: config.ENV === 'development' ? false : true,
				secure: config.ENV === 'development' ? false : true,
			});

			res.status(200).json(user);
		}
	);

	//Get Social Media User
	router.get('/social-user', (req, res, next) => {
		const { user } = req.cookies;

		if (!user) {
			return next(boom.unauthorized());
		}

		res.status(200).json(user);
	});
}

module.exports = socialRoutes;
