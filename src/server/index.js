require('@babel/register')({
	plugins: ['@babel/plugin-transform-runtime'],
	presets: ['@babel/preset-env', '@babel/preset-react'],
});

require('./server');
