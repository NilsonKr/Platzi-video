const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: [
		'./src/frontend/index.js',
		'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
	],
	output: {
		path: path.resolve(__dirname, 'src', 'server', 'public'),
		filename: 'assets/bundle.js',
		publicPath: '/',
		assetModuleFilename: 'assets/[hash][ext]',
	},
	mode: 'development',
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'@assets': path.resolve(__dirname, './src/frontend/assets/'),
			'@components': path.resolve(__dirname, './src/frontend/components/'),
			'@pages': path.resolve(__dirname, './src/frontend/pages/'),
			'@styles': path.resolve(__dirname, './src/frontend/styles/'),
			'@hooks': path.resolve(__dirname, './src/frontend/hooks/'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.(css|s[ac]ss)$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.html$/,
				use: 'html-loader',
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			filename: 'assets/app.css',
		}),
	],
	// devServer: {
	// 	contentBase: path.join(__dirname, 'dist'),
	// 	compress: true,
	// 	historyApiFallback: true,
	// 	open: true,
	// },
};
