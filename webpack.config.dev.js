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
		filename: 'statics/bundle.js',
		publicPath: '/',
	},
	mode: 'development',
	resolve: {
		extensions: ['.js', '.jsx'],
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
			filename: 'statics/app.css',
		}),
	],
	// devServer: {
	// 	contentBase: path.join(__dirname, 'dist'),
	// 	compress: true,
	// 	historyApiFallback: true,
	// 	open: true,
	// },
};
