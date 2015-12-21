var assert = require('assert'),
	Content = require('../../lib/Content');

describe("Contnet", function() {
	describe("parseBody", function() {

		it("Should parse basic full body link", function() {
			var parts = Content.parseBody("[Hmm...quite nice actually!](http://i.imgur.com/o3chijc.jpg?1)");
			assert.equal(parts.bodyText, "Hmm...quite nice actually!");
			assert.equal(parts.images.source.url, "https://i.imgur.com/o3chijc.jpg");
			assert.equal(parts.images.thumb.url, "https://i.imgur.com/o3chijcm.jpg");
		});

		it("Should parse basic full body link with pre text", function() {
			var parts = Content.parseBody("Here is what I came up [with](http://i.imgur.com/MpPlMK5.png)");
			assert.equal(parts.bodyText, "Here is what I came up with");
			assert.equal(parts.images.source.url, "https://i.imgur.com/MpPlMK5.jpg");
			assert.equal(parts.images.thumb.url, "https://i.imgur.com/MpPlMK5m.jpg");
		});

		it("Should parse mobile imgur links", function() {
			var parts = Content.parseBody("Here is what I came up [with](http://m.imgur.com/MpPlMK5.png)");
			assert.equal(parts.bodyText, "Here is what I came up with");
			assert.equal(parts.images.source.url, "https://i.imgur.com/MpPlMK5.jpg");
			assert.equal(parts.images.thumb.url, "https://i.imgur.com/MpPlMK5m.jpg");
		});

		it("Should parse basic full body link with pre and post text", function() {
			var parts = Content.parseBody("Here is what I came up [with](http://i.imgur.com/MpPlMK5.png), pretty cool huh?");
			assert.equal(parts.bodyText, "Here is what I came up with, pretty cool huh?");
			assert.equal(parts.images.source.url, "https://i.imgur.com/MpPlMK5.jpg");
			assert.equal(parts.images.thumb.url, "https://i.imgur.com/MpPlMK5m.jpg");
		});

		it("Should remove markdown even if there is a space (bad markdown)", function() {
			var parts = Content.parseBody("[ANGRY hippos] (http://i.imgur.com/J6xPYBj.jpg)");
			assert.equal(parts.bodyText, "ANGRY hippos");
			assert.equal(parts.images.source.url, "https://i.imgur.com/J6xPYBj.jpg");
			assert.equal(parts.images.thumb.url, "https://i.imgur.com/J6xPYBjm.jpg");
		});

		it("Should parse punctuation in comment area", function() {
			var parts = Content.parseBody("[Stephen Cating.](http://i.imgur.com/PwPyh1W.jpg)");
			assert.equal(parts.bodyText, "Stephen Cating.");
			assert.equal(parts.images.source.url, "https://i.imgur.com/PwPyh1W.jpg");
			assert.equal(parts.images.thumb.url, "https://i.imgur.com/PwPyh1Wm.jpg");
		});

		it("Should parse imgur links", function() {
			var parts = Content.parseBody("Some before https://i.imgur.com/4fVCo5v.jpg and after text");
			assert.equal(parts.bodyText, "Some before and after text");
			assert.equal(parts.images.source.url, "https://i.imgur.com/4fVCo5v.jpg");
			assert.equal(parts.images.thumb.url, "https://i.imgur.com/4fVCo5vm.jpg");
		});

		it("Should parse imgur page links", function() {
			var parts = Content.parseBody("Here is my submission: http://imgur.com/4fVCo5v neat huh?");
			assert.equal(parts.bodyText, "Here is my submission: neat huh?");
			assert.equal(parts.images.source.url, "https://i.imgur.com/4fVCo5v.jpg");
			assert.equal(parts.images.thumb.url, "https://i.imgur.com/4fVCo5vm.jpg");
		});

		it("Should parse imgur images with before test", function() {
			var parts = Content.parseBody("Titanic http://i.imgur.com/HJd5nb0.jpg");
			assert.equal(parts.bodyText, "Titanic");
			assert.equal(parts.images.source.url, "https://i.imgur.com/HJd5nb0.jpg");
			assert.equal(parts.images.thumb.url, "https://i.imgur.com/HJd5nb0m.jpg");
		});

		it("Should parse imgur image, full website, in markdown", function() {
			var parts = Content.parseBody("[Just watching the world burn](http://imgur.com/qHDJ0SP)");
			assert.equal(parts.bodyText, "Just watching the world burn");
			assert.equal(parts.images.source.url, "https://i.imgur.com/qHDJ0SP.jpg");
			assert.equal(parts.images.thumb.url, "https://i.imgur.com/qHDJ0SPm.jpg");
		});

		it("Should parse /new endings", function() {
			var parts = Content.parseBody("[Don't make Mr. Fox Choke a bitch](http://imgur.com/gallery/c5EoP9E/new)");
			assert.equal(parts.bodyText, "Don't make Mr. Fox Choke a bitch");
			assert.equal(parts.images.source.url, "https://i.imgur.com/c5EoP9E.jpg");
			assert.equal(parts.images.thumb.url, "https://i.imgur.com/c5EoP9Em.jpg");
		});
	});
});
