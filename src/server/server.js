const express = require('express');
const config = require('./config/index');
const path = require('path');
const getManifest = require('./utils/getManifest');
//Middlewares
const session = require('express-session');
const passport = require('passport');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { wrapBooomError, handleError } = require('./utils/middlewares/handleErrors');
//Render
const renderApp = require('./ssr/render');
//Routes
const authRoutes = require('./auth/routes');
const socialAuthRoutes = require('./auth/socialRoutes');
const moviesRoutes = require('./movies/routes');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: config.sessionSecret, saveUninitialized: false, resave: false }));
app.use(passport.initialize());
app.use(passport.session());

if (config.ENV === 'development') {
	console.log('Development Configuration');

	const webpack = require('webpack');
	const webpackConfig = require('../../webpack.config.dev');
	const devMiddleware = require('webpack-dev-middleware');
	const hotMiddleware = require('webpack-hot-middleware');

	const compiler = webpack(webpackConfig);

	app.use(devMiddleware(compiler, { serverSideRender: true }));
	app.use(hotMiddleware(compiler));
} else {
	app.use('*/statics', express.static(path.resolve(__dirname, '../../dist/statics')));
	//Get Statics hash routes
	app.use((req, res, next) => {
		if (!req.hashManifest) {
			req.hashManifest = getManifest();
		}

		next();
	});

	//Security
	app.use(
		helmet({
			contentSecurityPolicy: false, //Load external data
		})
	);

	app.disable('x-powered-by');
}

//Serve images and static files
app.use('*/assets', express.static(path.join(__dirname, '../../assets')));

authRoutes(app);
socialAuthRoutes(app);
moviesRoutes(app);
//Handle Errors
app.use(wrapBooomError);
app.use(handleError);

app.get('*', renderApp);

app.listen(config.PORT, () => {
	console.log(`Magic Happen's at http://localhost:${config.PORT}`);
});
