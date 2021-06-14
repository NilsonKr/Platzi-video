const axios = require('axios').default;
const config = require('../config/index');

async function getFavorites(token, id) {
	try {
		const { data: references } = await axios({
			method: 'get',
			url: `${config.apiUrl}/api/userMovies?userId=${id}`,
			headers: { Authorization: `Bearer ${token}` },
		});

		const favPromises = references.data.map(favRef => {
			return axios({
				method: 'get',
				url: `${config.apiUrl}/api/movies/${favRef.movieId}`,
				headers: { Authorization: `Bearer ${token}` },
			});
		});

		const favs = await Promise.all(favPromises);

		const refactFavorites = favs.map(favPromise => favPromise.data.data);

		return refactFavorites;
	} catch (error) {
		throw new Error(error);
	}
	// const movies = favoritesReferences.map
}

module.exports = getFavorites;
