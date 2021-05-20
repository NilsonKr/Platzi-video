const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: [
		'./src/frontend/index.js',
		'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
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
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(svg|png|jpg|webp)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.html$/,
				use: 'html-loader',
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		// new HtmlWebpackPlugin({
		// 	template: './public/index.html',
		// 	filename: 'index.html',
		// }),
	],
	// devServer: {
	// 	contentBase: path.join(__dirname, 'dist'),
	// 	compress: true,
	// 	historyApiFallback: true,
	// 	open: true,
	// },
};
