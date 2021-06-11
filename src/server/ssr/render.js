//React App
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes/routes';
import Layout from '../../frontend/components/Layout';

//Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../frontend/reducers/reducer';
import INITIAL_STATE from '../../frontend/initialState';

const setHtml = (html, preloadedState, manifest) => {
	const mainBundle = manifest ? manifest['main.js'] : '"statics/bundle.js"';
	const mainCss = manifest ? manifest['main.css'] : '"statics/app.css"';

	return `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="stylesheet" href=${mainCss} type="text/css">
				<link rel="icon" type="image/png" href="./favicon.ico" />
				<title>React Video</title>
			</head>
			<body>
				<div id="app">${html}</div>
				<script>
					window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>
				<script src=${mainBundle} type='text/javascript'></script>;
			</body>
		</html>
	`;
};

const renderApp = (req, res) => {
	if (req.url.includes('video')) {
		res.redirect('/');
	}

	const { name, email, id } = req.cookies;

	const initialState = {
		user: {},
		playing: null,
		myList: [],
		searchItems: [],
		trends: [],
		originals: [],
	};

	if (id) {
		initialState.user = {
			id,
			name,
			email,
		};
	}

	const store = createStore(reducer, initialState);
	const html = ReactDOMServer.renderToString(
		<Provider store={store}>
			<StaticRouter location={req.url} context={{}}>
				<Layout>{renderRoutes(routes(Boolean(id)))}</Layout>
			</StaticRouter>
		</Provider>
	);

	//Preloaded state from server
	const preloadedState = store.getState();
	res.send(setHtml(html, preloadedState, req.hashManifest));
};

module.exports = renderApp;
