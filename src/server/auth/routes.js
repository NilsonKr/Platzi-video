const passport = require('passport');
const express = require('express');

const axios = require('axios').default;
const boom = require('@hapi/boom');
const config = require('../config/index');

//Basic Strategy

require('./strategies/basicStrategy');

//Google Strategy

require('./strategies/googleStrategy');

function authRoutes(app) {
	const router = express.Router();
	app.use('/auth', router);

	//Start OAuth with Google
	router.get(
		'/google-oauth',
		passport.authenticate('google', { scope: ['profile', 'email', 'openid'] })
	);

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

			res.status(200).json(user);
		}
	);

	router.post('/sign-in', (req, res, next) => {
		passport.authenticate('basic', (error, data) => {
			if (error || !data) {
				next(boom.unauthorized());
			}

			const { token, user } = data;

			try {
				req.login(user, { session: false }, err => {
					if (err) {
						next(err);
					}

					//Response Cookie with jwt
					res.cookie('token', token, {
						httpOnly: config.ENV === 'development' ? false : true,
						secure: config.ENV === 'development' ? false : true,
					});

					res.status(200).send(user);
				});
			} catch (error) {
				next(error);
			}
		})(req, res, next);
	});

	router.post('/sign-up', async (req, res, next) => {
		try {
			const { data, status } = await axios({
				method: 'post',
				url: `${config.apiUrl}/api/auth/sign-up`,
				data: req.body,
			});

			if (status !== 201) {
				next(boom.badRequest());
			}

			res.status(201).json(data);
		} catch (error) {
			next(error);
		}
	});
}

module.exports = authRoutes;
