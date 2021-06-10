const axios = require('axios').default;

export const setFavorite = card => ({
	type: 'SET__FAVORITE',
	payload: card,
});

export const deleteFavorite = id => ({
	type: 'DELETE__FAVORITE',
	payload: id,
});

export const setRegister = payload => ({
	type: 'REGISTER',
	payload,
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

export const setError = error => ({
	type: 'ERROR',
	payload: error,
});

export const registerUser = (user, redirectUrl) => dispatch => {
	axios
		.post('/auth/sign-up', user)
		.then(({ data }) => dispatch(setRegister(data)))
		.then(() => {
			window.location.href = redirectUrl;
		})
		.catch(err => dispatch(setError(err)));
};
