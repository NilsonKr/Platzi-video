const config = require('./config/index');

const express = require('express');
const app = express();

app.get('*', (req, res) => {
	res.json({ hello: 'Server Side Rendering' });
});

app.listen(config.PORT, err => {
	if (err) return console.error(err);

	console.log(`Magic Happen's at http://localhost:${config.PORT}`);
});
