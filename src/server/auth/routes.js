const passport = require('passport');
const express = require('express');

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

					res.status(200).send(user);
				});
			} catch (error) {
				next(error);
			}
		})(req, res, next);
	});
}

module.exports = authRoutes;
