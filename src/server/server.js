const config = require('./config/index');
const path = require('path');
const webpack = require('webpack');

const express = require('express');
const app = express();

//React App
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes/routes';
import Layout from '../frontend/components/Layout';

//Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../frontend/reducers/reducer';
import INITIAL_STATE from '../frontend/initialState';

if (config.ENV === 'development') {
	console.log('Development Configuration');

	const webpackConfig = require('../../webpack.config.dev');
	const devMiddleware = require('webpack-dev-middleware');
	const hotMiddleware = require('webpack-hot-middleware');

	const compiler = webpack(webpackConfig);

	app.use(devMiddleware(compiler, { serverSideRender: true }));
	app.use(hotMiddleware(compiler));
}

const setHtml = (html, preloadedState) => {
	return `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<link rel="stylesheet" href="assets/app.css" type="text/css">
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" type="image/png" href="./favicon.ico" />
				<title>React Video</title>
			</head>
			<body>
				<div id="app">${html}</div>
				<script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
					/</g,
					'\\u003c'
				)}</script>
				<script src='assets/bundle.js' type='text/javascript'></script>;
			</body>
		</html>
	`;
};

const renderApp = (req, res) => {
	const store = createStore(reducer, INITIAL_STATE);
	const html = ReactDOMServer.renderToString(
		<Provider store={store}>
			<StaticRouter location={req.url} context={{}}>
				<Layout>{renderRoutes(routes)}</Layout>
			</StaticRouter>
		</Provider>
	);

	//Preloaded state from server
	const preloadedState = store.getState();

	res.send(setHtml(html, preloadedState));
};

//Serve images and static files
app.use('/assets', express.static(path.join(__dirname, '../../assets')));

app.get('*', renderApp);

app.listen(config.PORT, () => {
	console.log(`Magic Happen's at http://localhost:${config.PORT}`);
});
