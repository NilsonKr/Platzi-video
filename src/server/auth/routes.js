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
