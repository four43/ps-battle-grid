var assert = require('assert'),
	Comment = require('../../lib/Comment');

describe("Comment", function() {
	describe("_parseBody", function() {

		it("Should parse basic full body link", function() {
			var parts = Comment._parseBody("[Hmm...quite nice actually!](http://i.imgur.com/o3chijc.jpg?1)");
			assert.equal(parts.bodyText, "Hmm...quite nice actually!");
			assert.equal(parts.images.source.url, "http://i.imgur.com/o3chijc.jpg?1");
			assert.equal(parts.images.thumb.url, "http://i.imgur.com/o3chijc.jpg?1");
		});

		it("Should parse basic full body link with pre text", function() {
			var parts = Comment._parseBody("Here is what I came up [with](http://i.imgur.com/MpPlMK5.png)");
			assert.equal(parts.bodyText, "Here is what I came up with");
			assert.equal(parts.images.source.url, "http://i.imgur.com/MpPlMK5.png");
			assert.equal(parts.images.thumb.url, "http://i.imgur.com/MpPlMK5.png");
		});

		it("Should parse basic full body link with pre and post text", function() {
			var parts = Comment._parseBody("Here is what I came up [with](http://i.imgur.com/MpPlMK5.png), pretty cool huh?");
			assert.equal(parts.bodyText, "Here is what I came up with, pretty cool huh?");
			assert.equal(parts.images.source.url, "http://i.imgur.com/MpPlMK5.png");
			assert.equal(parts.images.thumb.url, "http://i.imgur.com/MpPlMK5.png");
		});

		it("Should parse imgur links", function() {
			var parts = Comment._parseBody("Some before https://i.imgur.com/4fVCo5v.jpg and after text");
			assert.equal(parts.bodyText, "Some before and after text");
			assert.equal(parts.images.source.url, "https://i.imgur.com/4fVCo5v.jpg");
			assert.equal(parts.images.thumb.url, "https://i.imgur.com/4fVCo5v.jpg");
		});

		it("Should parse imgur page links", function() {
			var parts = Comment._parseBody("Here is my submission: http://imgur.com/4fVCo5v neat huh?");
			assert.equal(parts.bodyText, "Here is my submission: neat huh?");
			assert.equal(parts.images.source.url, "https://i.imgur.com/4fVCo5v.jpg");
			assert.equal(parts.images.thumb.url, "https://i.imgur.com/4fVCo5v.jpg");
		});

		it("Should parse imgur images with before test", function() {
			var parts = Comment._parseBody("Titanic http://i.imgur.com/HJd5nb0.jpg");
			assert.equal(parts.bodyText, "Titanic");
			assert.equal(parts.images.source.url, "https://i.imgur.com/HJd5nb0.jpg");
			assert.equal(parts.images.thumb.url, "https://i.imgur.com/HJd5nb0.jpg");
		});
	});
});
