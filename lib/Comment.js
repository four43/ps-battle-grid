var Content = require('./Content'),
	util = require('util');

function Comment(options) {
	Content.call(this, options);

	this.body = options.body || "";
	this.bodyText = "";
	this.images = {};

	try {
		var parts = Content.parseBody(this.body);
		this.bodyText = parts.bodyText;
		this.images = parts.images;
	}
	catch (err) {
		this.bodyText = "";
		this.images = {};
	}
}
util.inherits(Comment, Content);

module.exports = Comment;
