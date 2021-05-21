const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './src/frontend/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.[contenthash].js',
		assetModuleFilename: 'assets/[hash][ext]',
	},
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
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.(css|s[ac]ss)$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
					'sass-loader',
				],
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
		new HtmlWebpackPlugin({
			template: './public/index.html',
			filename: 'index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'styles/[name].[contenthash].css',
		}),
		new CleanWebpackPlugin(),
	],
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
	},
};
