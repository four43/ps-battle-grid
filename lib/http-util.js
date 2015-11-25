var debug = require('debug')('http-util'),
	http = require('http');

function getJson(url, callback) {
	http.get(url, function (res) {
		var body = '';

		res.on('data', function (chunk) {
			body += chunk;
		});

		res.on('end', function () {
			var response = JSON.parse(body);
			debug("Got a response: ", response);
			return callback(null, response);
		});
	}).on('error', function (e) {
		debug("Got an error: ", e);
		return callback(e);
	});
}

module.exports = {
	getJson: getJson
};