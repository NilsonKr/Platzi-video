require('dotenv').config();

const config = {
	ENV: process.env.NODE_ENV || 'development',
	PORT: process.env.PORT,
};

module.exports = config;
