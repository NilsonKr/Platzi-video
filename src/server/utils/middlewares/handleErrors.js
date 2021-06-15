const boom = require('@hapi/boom');

function logError(err) {
	console.log(err);
}

function wrapBooomError(err, req, res, next) {
	if (err.isBoom) {
		return next(err);
	}
	next(boom.badImplementation());
}

function handleError(err, req, res, next) {
	logError(err);

	const { statusCode, payload } = err.output;

	res.status(statusCode).json(payload);
}

module.exports = {
	wrapBooomError,
	handleError,
};
