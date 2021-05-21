const config = require('./config/index');
const webpack = require('webpack');

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes/routes';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../frontend/reducers/reducer';
import INITIAL_STATE from '../frontend/initialState';

const express = require('express');
const app = express();

if (config.ENV === 'development') {
	console.log('Development Configuration');

	const webpackConfig = require('../../webpack.config.dev');
	const devMiddleware = require('webpack-dev-middleware');
	const hotMiddleware = require('webpack-hot-middleware');

	const compiler = webpack(webpackConfig);
	const serverConfig = { serverSideRender: true };

	app.use(devMiddleware(compiler, serverConfig));
	app.use(hotMiddleware(compiler));
}

const setHtml = html => {
	return `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="stylesheet" href="assets/app.css" type="text/css">
				<link rel="icon" type="image/png" href="./favicon.ico" />
				<title>React Video</title>
			</head>
			<body>
				<div id="app">${html}</div>
				<script src="assets/bundle.js" type="text/javascript"></script>
			</body>
		</html>
`;
};

const renderApp = (req, res) => {
	const store = createStore(reducer, INITIAL_STATE);
	const html = ReactDOMServer.renderToString(
		<Provider store={store}>
			<StaticRouter location={req.url} context={{}}>
				{renderRoutes(routes)}
			</StaticRouter>
		</Provider>
	);

	res.send(setHtml(html));
};

app.get('*', renderApp);

app.use('*', express.static('public'));

app.listen(config.PORT, () => {
	console.log(`Magic Happen's at http://localhost:${config.PORT}`);
});
