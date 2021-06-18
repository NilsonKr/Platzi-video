require('dotenv').config();

const config = {
	ENV: process.env.NODE_ENV || 'development',
	PORT: process.env.PORT || 8000,
	rememberTime: 30 * 24 * 60 * 60 * 1000,
	defaultTime: 4 * 60 * 60 * 1000,
	apiToken: process.env.API_TOKEN,
	apiUrl: process.env.API_URL,
	sessionSecret: process.env.SESSION_SECRET,
	googleClientId: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	twitterKey: process.env.TWITTER_KEY,
	twitterSecret: process.env.TWITTER_SECRET,
};

module.exports = config;
