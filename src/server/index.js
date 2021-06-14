require('ignore-styles');

require('@babel/register')({
	presets: ['@babel/preset-env', '@babel/preset-react'],
	plugins: ['@babel/plugin-transform-runtime', 'react-hot-loader/babel'],
});

require('./server');
