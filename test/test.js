var assert = require('assert'),
	debug = require('debug')('test'),
	http = require('http'),
	nock = require('nock'),
	url = require('url');

var PostRepository = require('../lib/PostRepository');

var psUrl = 'http://www.reddit.com/r/photoshopbattles/hot.json';

describe("Posts Repository", function() {

	var postRepo,
		urlNock;
	beforeEach(function() {
		nock.disableNetConnect();
		nock.enableNetConnect('127.0.0.1');
		var urlParts = url.parse(psUrl);
		urlNock = nock(urlParts.protocol + "//" + urlParts.host)
			.get(urlParts.path)
			.reply(200, require('./mocks/psbattles.hot.json'));


		postRepo = new PostRepository(psUrl);
	});

	afterEach(function() {
		nock.enableNetConnect();
	});

	it("Should return non stickied posts", function(done) {
		var posts = postRepo.fetchAll(function(err, posts) {
			assert.equal(posts.length, 25);
			done();
		});
	});
});