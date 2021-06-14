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
		//Formating movies
		const favs = await Promise.all(favPromises);
		const refactFavorites = favs.map(({ data: favResponse }) => favResponse.data);

		//Adding db reference id
		const favsWithReferenceId = refactFavorites.map((fav, index) => ({
			...fav,
			id: references.data[index].id,
		}));

		return favsWithReferenceId;
	} catch (error) {
		throw new Error(error);
	}
	// const movies = favoritesReferences.map
}

module.exports = getFavorites;
