const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
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
		new MiniCssExtractPlugin({
			filename: 'statics/app.css',
		}),
	],
};
