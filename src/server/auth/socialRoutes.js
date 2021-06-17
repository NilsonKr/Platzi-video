const passport = require('passport');
const express = require('express');

const boom = require('@hapi/boom');
const config = require('../config/index');
const axios = require('axios').default;

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

			res.redirect('/social/sign-in/succesful');
		}
	);

	//Start OAuth with Google
	router.get('/google-oauth', passport.authenticate('google', { scope: ['profile', 'email', 'openid'] }));

	//Callback Google OAuth

	router.get(
		'/google-oauth/callback',
		passport.authenticate('google', { session: false }),
		async (req, res, next) => {
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
				maxAge: 60 * 2000,
			});

			// res.status(200).json(user);
			res.redirect('/social/sign-in/succesful');
		}
	);

	//Get Social Media User
	router.get('/social-user', async (req, res, next) => {
		const { user, token } = req.cookies;
		const { remember } = req.query;

		if (!user || !token) {
			return next(boom.unauthorized());
		}

		try {
			const { data: authToken } = await axios({
				method: 'post',
				url: `${config.apiUrl}/api/auth/authorizate?remember=${remember}`,
				headers: { Authorization: `Bearer ${token}` },
			});

			//Set Auth jwt in a cookie

			const time = remember === 'true' ? config.rememberTime : config.defaultTime;

			res.cookie('token', authToken, {
				httpOnly: config.ENV === 'development' ? false : true,
				secure: config.ENV === 'development' ? false : true,
				maxAge: time,
			});

			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	});
}

module.exports = socialRoutes;
