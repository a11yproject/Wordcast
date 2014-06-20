var config = {
	dev : {
		baseURI: 'localhost:3000'
	},

	production : {
		baseURI: 'http://wordcast.io'
	}

};

module.exports = function(mode) {
	return config[mode || process.argv[2] || 'dev'] || config.dev;
}
