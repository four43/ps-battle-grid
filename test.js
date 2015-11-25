var debug = require('debug')('test'),
	http = require('http');

var url = 'https://www.reddit.com/r/photoshopbattles/hot.json';

function getJson(url, callback) {
	http.get(url, function (res) {
		var body = '';

		res.on('data', function (chunk) {
			body += chunk;
		});

		res.on('end', function () {
			var response = JSON.parse(body);
			debug("Got a response: ", response);
			return callback(null, body);
		});
	}).on('error', function (e) {
		debug("Got an error: ", e);
		return callback(e);
	});
}

getJson(url, function(err, posts) {
	posts.filter(function(post) {
		return post.kind === 't3' && post.stickied !== true;
	});
});