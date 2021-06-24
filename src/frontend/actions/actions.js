const axios = require('axios').default;
const REMEMBER_TIME = 30 * 24 * 60 * 60; //30days in seconds
const DEFAULT_TIME = 60 * 60 * 4; //4hrs in seconds

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

export const setLoad = () => ({
	type: 'LOADING',
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

export const loginUser = (user, redirectUrl, rememberMe) => dispatch => {
	const time = rememberMe === true ? REMEMBER_TIME : DEFAULT_TIME;

	dispatch(setLoad());

	axios({
		url: `/auth/sign-in?remember=${rememberMe}`,
		method: 'post',
		auth: {
			username: user.email,
			password: user.password,
		},
	})
		.then(({ data }) => {
			document.cookie = `id=${data.id}; max-age=${time}`;
			document.cookie = `name=${data.name}; max-age=${time}`;
			document.cookie = `email=${data.email}; max-age=${time}`;
			dispatch(setLogin(data));
		})
		.then(() => (window.location.href = redirectUrl))
		.catch(err => {
			console.log(err);
			dispatch(setError('Oh, Password or Email are Wrong! Try Again'));
		});
};

export const handleLogOut = () => dispatch => {
	document.cookie = `id=`;
	document.cookie = `name=`;
	document.cookie = `email=`;
	document.cookie = `token=`;
	document.cookie = `user=`;

	dispatch(logOut());

	window.location.href = '/login';
};

export const socialLogin = rememberMe => dispatch => {
	const time = rememberMe === true ? REMEMBER_TIME : DEFAULT_TIME;
	dispatch(setLoad());

	axios({
		method: 'get',
		url: `/social/social-user?remember=${rememberMe}`,
	})
		.then(({ data }) => {
			document.cookie = `id=${data.id}; max-age=${time}`;
			document.cookie = `name=${data.name}; max-age=${time}`;
			document.cookie = `email=${data.email}; max-age=${time}`;

			dispatch(setLogin(data));
			window.location.href = '/';
		})
		.catch(err => {
			dispatch(setError('Oh, Password or Email are Wrong! Try Again'));
			console.log(err);
		});
};

export const setFavorite = movie => (dispatch, getState) => {
	// dispatch({ type: 'SET__FAVORITE', payload: movie });
	const { user } = getState();

	const newFavoriteMovie = {
		movieId: movie.id,
		userId: user.id,
	};

	axios
		.post(`/api/newFavorite`, newFavoriteMovie)
		.then(({ data }) => {
			console.log(`New Favorite ${data.data}`);
			dispatch({ type: 'SET__FAVORITE', payload: movie });
		})
		.catch(err => console.log(err));
};

export const deleteFavorite = id => dispatch => {
	console.log(id);

	// axios
	// 	.delete(`/api/favorite/${id}`)
	// 	.then(({ data }) => {
	// 		console.log('Movie Removed ' + data.data);
	// 		dispatch({ type: 'DELETE__FAVORITE', payload: id });
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	});
};
