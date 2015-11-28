var assert = require('assert'),
	debug = require('debug')('test'),
	http = require('http'),
	nock = require('nock'),
	url = require('url');

var CommentRepository = require('../../../lib/Repo/CommentRepo'),
	Post = require('../../../lib/Post');

var commentUrlTemplate = 'http://www.reddit.com/r/photoshopbattles/comments/{{id}}.json';

describe("Comment Repo", function () {

	var commentRepo,
		postA,
		postB,
		nockA,
		nockB;

	beforeEach(function () {
		nock.disableNetConnect();
		nock.enableNetConnect('127.0.0.1');

		postA = new Post({id: '3u7qso'});
		nockB = nock('http://www.reddit.com')
			.get('/r/photoshopbattles/comments/3u7qso.json')
			.reply(200, require('./../../mocks/comments.3u7qso.json'));

		postB = new Post({id: '3u7zhy'});
		nockB = nock('http://www.reddit.com')
			.get('/r/photoshopbattles/comments/3u7zhy.json')
			.reply(200, require('./../../mocks/comments.3u7zhy.json'));

		commentRepo = new CommentRepository(commentUrlTemplate);
	});

	afterEach(function () {
		nock.cleanAll();
		nock.enableNetConnect();
	});

	it("Should return non stickied posts", function (done) {
		commentRepo.findByPost(postA, function (err, comments) {
			assert.equal(comments.length, 23);
			done();
		});
	});
});