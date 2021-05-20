const config = require('./config/index');
const webpack = require('webpack');

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

// app.get('*', (req, res) => {
// 	res.setHeader('Content-Type', 'text/html');
// 	res.send(`
// 		<!DOCTYPE html>
// 	<html lang="en">
// 		<head>
// 			<meta charset="UTF-8" />
// 			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
// 			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
// 			<link rel="icon" type="image/png" href="./favicon.ico" />
// 			<title>React Video</title>
// 		</head>
// 		<body>
// 			<div id="app"></div>
// 			<script src="assets/bundle.js" type="text/javascript"></script>
// 		</body>
// 	</html>
// `);
// });

app.use('*', express.static('public'));

app.listen(config.PORT, err => {
	if (err) return console.error(err);

	console.log(`Magic Happen's at http://localhost:${config.PORT}`);
});
