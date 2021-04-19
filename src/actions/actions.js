export const setFavorite = card => ({
	type: 'SET__FAVORITE',
	payload: card,
});

export const deleteFavorite = id => ({
	type: 'DELETE__FAVORITE',
	payload: id,
});

export const setLogin = user => ({
	type: 'LOGIN',
	payload: user,
});

export const logOut = () => ({
	type: 'LOGOUT',
});

export const SetPlaying = id => ({
	type: 'SET_PLAYING',
	payload: id,
});

export const filteredItems = items => ({
	type: 'FILTERED_ITEMS',
	payload: items,
});
