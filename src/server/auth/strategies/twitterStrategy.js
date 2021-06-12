const passport = require('passport');
const { Strategy: TwitterStrategy } = require('passport-twitter');

const axios = require('axios').default;
const boom = require('@hapi/boom');
const config = require('../../config/index');

passport.use(
	new TwitterStrategy(
		{
			consumerKey: config.twitterKey,
			consumerSecret: config.twitterSecret,
			callbackURL: '/social/twitter-oauth/callback',
			includeEmail: true,
		},
		async (token, tokenSecret, profile, done) => {
			try {
				const { data, status } = await axios({
					method: 'post',
					url: `${config.apiUrl}/api/auth/sign-provider`,
					data: {
						name: profile.username,
						email: profile.emails[0].value,
						password: profile.id,
						apiToken: config.apiToken,
					},
				});

				if (status !== 200) {
					return done(boom.unauthorized(), false);
				}

				return done(false, data);
			} catch (error) {
				return done(error, false);
			}
		}
	)
);
