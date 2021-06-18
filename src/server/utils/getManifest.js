const fs = require('fs');
const path = require('path');

const getManifest = () => {
	try {
		return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../dist/manifest.json')));
	} catch (error) {
		return console.error(error);
	}
};

module.exports = getManifest;
