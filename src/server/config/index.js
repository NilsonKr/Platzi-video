require('dotenv').config();

const config = {
	ENV: process.env.NODE_ENV || 'development',
	PORT: process.env.PORT,
	apiToken: process.env.API_TOKEN,
	apiUrl: process.env.API_URL,
	sessionSecret: process.env.SESSION_SECRET,
	googleClientId: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

module.exports = config;
