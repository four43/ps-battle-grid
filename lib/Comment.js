var Content = require('./Content'),
	util = require('util');

function Comment(options) {
	Content.call(this, options);

	this.body = options.body || "";
	this.bodyText = "";
	this.images = {};

	try {
		var parts = Comment._parseBody(this.body);
		this.bodyText = parts.bodyText;
		this.images = parts.images;
	}
	catch (err) {
		this.bodyText = "";
		this.images = {};
	}
}
util.inherits(Comment, Content);

Comment.IMGUR_BASE_URL = 'https://i.imgur.com';

Comment.linkRegex = /^(.*?)\[(.*?)\]\((.*?)\)(.*?)$/;
Comment.imgurImageRegex = /^(.*?)http[s]?:\/\/i.imgur.com\/(\S+?)(\s(.*))?$/m;
Comment.imgurPageRegex = /^(.*?)http[s]?:\/\/(www\.)?imgur.com\/(\S*)(.*?)$/m;
Comment.imgurGallery = /^(.*?)http[s]?:\/\/(www\.)?imgur.com\/gallery\/(\S*)\/new(.*?)$/m;

/**
 * Parse image and text data from the combined body.
 * @param body
 * @private
 */
Comment._parseBody = function (body) {
	//Markdown style regex
	var matches;
	if (matches = body.match(Comment.linkRegex)) {
		matches = Comment._undefinedToEmpty(matches);
		var imgUrl = Comment._parseBody(matches[3]).images.source.url;
		return {
			bodyText: Comment._cleanText(matches[1] + matches[2] + matches[4]),
			images: {
				source: {
					url: imgUrl
				},
				thumb: {
					url: imgUrl
				}
			}
		}
	}
	else if (matches = body.match(Comment.imgurGallery)) {
		matches = Comment._undefinedToEmpty(matches);
		return {
			bodyText: Comment._cleanText(matches[1] + matches[4]),
			images: {
				source: {
					url: Comment.IMGUR_BASE_URL + '/' + matches[3] + '.jpg'
				},
				thumb: {
					url: Comment.IMGUR_BASE_URL + '/' + matches[3] + '.jpg'
				}
			}
		}
	}
	else if (matches = body.match(Comment.imgurImageRegex)) {
		matches = Comment._undefinedToEmpty(matches);
		return {
			bodyText: Comment._cleanText(matches[1] + matches[3]),
			images: {
				source: {
					url: Comment.IMGUR_BASE_URL + '/' + matches[2]
				},
				thumb: {
					url: Comment.IMGUR_BASE_URL + '/' + matches[2]
				}
			}
		}
	}
	else if (matches = body.match(Comment.imgurPageRegex)) {
		matches = Comment._undefinedToEmpty(matches);
		return {
			bodyText: Comment._cleanText(matches[1] + matches[4]),
			images: {
				source: {
					url: Comment.IMGUR_BASE_URL + '/' + matches[3] + '.jpg'
				},
				thumb: {
					url: Comment.IMGUR_BASE_URL + '/' + matches[3] + '.jpg'
				}
			}
		}
	}
	else {
		throw new Error("Body does not contain an image");
	}
};

Comment._undefinedToEmpty = function (arr) {
	return arr.map(function (val) {
		if (val === undefined) {
			return "";
		}
		return val;
	});
};

Comment._cleanText = function (str) {
	return str.trim().replace(/\s\s/, ' ');
};

module.exports = Comment;
