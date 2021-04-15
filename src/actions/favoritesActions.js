export const setFavorite = card => ({
	type: 'SET__FAVORITE',
	payload: card,
});

export const deleteFavorite = id => ({
	type: 'DELETE__FAVORITE',
	payload: id,
});
