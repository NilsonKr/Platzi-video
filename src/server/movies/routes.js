const express = require('express');

const config = require('../config/index');
const boom = require('@hapi/boom');
const axios = require('axios').default;

function moviesRoutes(app) {
	const router = express.Router();
	app.use('/api', router);

	router.post('/newFavorite', async (req, res, next) => {
		try {
			const { data, status } = await axios({
				url: `${config.apiUrl}/api/userMovies`,
				method: 'post',
				headers: { Authorization: `Bearer ${req.cookies.token}` },
				data: req.body,
			});

			if (status !== 201) {
				return next(boom.badRequest());
			}

			res.status(201).json(data);
		} catch (error) {
			next(error);
		}
	});
}

module.exports = moviesRoutes;
