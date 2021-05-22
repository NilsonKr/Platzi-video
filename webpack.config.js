const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './src/frontend/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'statics/bundle-[contenthash].js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
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
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'statics/app-[contenthash].css',
		}),
		new WebpackManifestPlugin(),
		new CleanWebpackPlugin(),
	],
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
	},
};
