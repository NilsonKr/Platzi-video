const passport = require('passport');
const express = require('express');

const axios = require('axios').default;
const boom = require('@hapi/boom');
const config = require('../config/index');

//Basic Strategy

require('./strategies/basicStrategy');

function authRoutes(app) {
	const router = express.Router();
	app.use('/auth', router);

	router.post('/sign-in', (req, res, next) => {
		passport.authenticate('basic', async (error, data) => {
			if (error || !data) {
				return next(boom.unauthorized());
			}

			const { token, user } = data;
			const { remember } = req.query;

			try {
				const { data: authToken } = await axios({
					method: 'post',
					url: `${config.apiUrl}/api/auth/authorizate?remember=${remember}`,
					headers: { Authorization: `Bearer ${token}` },
				});

				req.login(user, { session: false }, err => {
					if (err) {
						return next(err);
					}

					//Response Cookie with jwt
					const time = remember === 'true' ? config.rememberTime : config.defaultTime;

					res.cookie('token', authToken, {
						httpOnly: config.ENV === 'development' ? false : true,
						secure: config.ENV === 'development' ? false : true,
						maxAge: time,
					});

					res.status(200).json(user);
				});
			} catch (error) {
				next(error);
			}
		})(req, res, next);
	});

	router.post('/sign-up', async (req, res, next) => {
		try {
			const { status } = await axios({
				method: 'post',
				url: `${config.apiUrl}/api/auth/sign-up`,
				data: req.body,
			});

			if (status !== 201) {
				next(boom.badRequest());
			}

			res.status(201).json({
				name: req.body.name,
				email: req.body.email,
			});
		} catch (error) {
			next(error);
		}
	});
}

module.exports = authRoutes;
