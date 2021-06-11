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
	payload: {},
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

export const loginUser = (user, redirectUrl) => dispatch => {
	axios({
		url: '/auth/sign-in',
		method: 'post',
		auth: {
			username: user.email,
			password: user.password,
		},
	})
		.then(({ data }) => {
			document.cookie = `id=${data.id}`;
			document.cookie = `name=${data.name}`;
			document.cookie = `email=${data.email}`;
			dispatch(setLogin(data));
		})
		.then(() => (window.location.href = redirectUrl))
		.catch(err => dispatch(setError(err)));
};
