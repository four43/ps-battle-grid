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
Comment.imgurImageRegex = /^(.*?)http[s]?:\/\/i.imgur.com\/([\w\d]+)(\.\S+)?\/?(.*?)$/m;
Comment.imgurPageRegex = /^(.*?)http[s]?:\/\/(www\.)?imgur.com\/([\w\d]+)(.*?)$/m;
Comment.imgurGallery = /^(.*?)http[s]?:\/\/(www\.)?imgur.com\/gallery\/([\w\d]+)\/new(.*?)$/m;

/**
 * Parse image and text data from the combined body.
 * @param body
 * @private
 */
Comment._parseBody = function (body) {
	//Markdown style regex
	var matches,
		imgurData;
	if (matches = body.match(Comment.linkRegex)) {
		matches = Comment._undefinedToEmpty(matches);
		var imgurId = Comment._parseImgur(matches[3]).imgurId;
		return {
			bodyText: Comment._cleanText(matches[1] + matches[2] + matches[4]),
			images: {
				source: {
					url: Comment.IMGUR_BASE_URL + '/' + imgurId + '.jpg'
				},
				thumb: {
					url: Comment.IMGUR_BASE_URL + '/' + imgurId + '.jpg'
				}
			}
		}
	}
	else if (imgurData = Comment._parseImgur(body)) {
		return {
			bodyText: imgurData.textWithoutMatch,
			images: {
				source: {
					url: Comment.IMGUR_BASE_URL + '/' + imgurData.imgurId + '.jpg'
				},
				thumb: {
					url: Comment.IMGUR_BASE_URL + '/' + imgurData.imgurId + '.jpg'
				}
			}
		}
	}
	else {
		throw new Error("Body does not contain an image");
	}
};

/**
 * Returns an object with url and imgurId
 * @param text
 * @private
 */
Comment._parseImgur = function (text) {
	if (matches = text.match(Comment.imgurGallery)) {
		//This goes first, most specific.
		return {
			fullMatch: matches[0],
			imgurId: matches[3]
		};
	}
	else if (matches = text.match(Comment.imgurImageRegex)) {
		return {
			fullMatch: matches[0],
			imgurId: matches[2],
			textWithoutMatch: Comment._cleanText(matches[1] + matches[4])
		};
	}
	else if (matches = text.match(Comment.imgurPageRegex)) {
		return {
			fullMatch: matches[0],
			imgurId: matches[3],
			textWithoutMatch: Comment._cleanText(matches[1] + matches[4])
		};
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
