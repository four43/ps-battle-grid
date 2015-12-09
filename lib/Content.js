var moment = require('moment');

function Content(options) {
	if (options === undefined) {
		options = {};
	}
	this.id = options.id || "";
	this.author = options.author || "";
	this.createdTime = moment(options.created, "x") || moment();

	//Scoring
	this.score = options.score || 0;
	this.ups = options.ups || 0;
	this.downs = options.downs || 0;
}

Content.TYPE_COMMENT = "t1";
//Content.TYPE_ACCOUNT = "t2";
Content.TYPE_LINK = "t3";
//Content.TYPE_MESSAGE = "t4";
//Content.TYPE_SUBREDDIT = "t5";
//Content.TYPE_AWARD = "t6";
//Content.TYPE_PROMO_CAMPAIGN = "t7";

Content.IMGUR_BASE_URL = 'https://i.imgur.com';

Content.linkRegex = /^(.*?)\[(.*?)\]\((.*?)\)(.*?)$/;
Content.imgurImageRegex = /^(.*?)http[s]?:\/\/[im].imgur.com\/([\w\d]+)(\.\S+)?\/?(.*?)$/m;
Content.imgurPageRegex = /^(.*?)http[s]?:\/\/(www\.)?imgur.com\/([\w\d]+)(.*?)$/m;
Content.imgurGallery = /^(.*?)http[s]?:\/\/(www\.)?imgur.com\/gallery\/([\w\d]+)\/new(.*?)$/m;

/**
 * Parse image and text data from the combined body.
 * @param body
 * @private
 */
Content.parseBody = function (body) {
	//Markdown style regex
	var matches,
		imgurData;
	if (matches = body.match(Content.linkRegex)) {
		matches = Content._undefinedToEmpty(matches);
		imgurData = Content.parseImgur(matches[3]);
		return {
			bodyText: Content._cleanText(matches[1] + matches[2] + matches[4]),
			images: {
				source: {
					url: imgurData.imgur.full
				},
				thumb: {
					url: imgurData.imgur.medium
				}
			}
		}
	}
	else if (imgurData = Content.parseImgur(body)) {
		return {
			bodyText: imgurData.textWithoutMatch,
			images: {
				source: {
					url: imgurData.imgur.full
				},
				thumb: {
					url: imgurData.imgur.medium
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
 * @return {fullMatch,textWithoutMatch,imgur}
 */
Content.parseImgur = function (text) {
	var imgurId,
		matches;
	if (matches = text.match(Content.imgurGallery)) {
		//This goes first, most specific.
		imgurId = matches[3];
		return {
			fullMatch: matches[0],
			textWithoutMatch: Content._cleanText(matches[1] + matches[4]),
			imgur: {
				id: imgurId,
				full: Content.IMGUR_BASE_URL + '/' + imgurId + '.jpg',
				medium: Content.IMGUR_BASE_URL + '/' + imgurId + 'm.jpg'
			}
		};
	}
	else if (matches = text.match(Content.imgurImageRegex)) {
		imgurId = matches[2];
		return {
			fullMatch: matches[0],
			textWithoutMatch: Content._cleanText(matches[1] + matches[4]),
			imgur: {
				id: imgurId,
				full: Content.IMGUR_BASE_URL + '/' + imgurId + '.jpg',
				medium: Content.IMGUR_BASE_URL + '/' + imgurId + 'm.jpg'
			}
		};
	}
	else if (matches = text.match(Content.imgurPageRegex)) {
		imgurId = matches[3];
		return {
			fullMatch: matches[0],
			textWithoutMatch: Content._cleanText(matches[1] + matches[4]),
			imgur: {
				id: imgurId,
				full: Content.IMGUR_BASE_URL + '/' + imgurId + '.jpg',
				medium: Content.IMGUR_BASE_URL + '/' + imgurId + 'm.jpg'
			}
		};
	}
};

Content._undefinedToEmpty = function (arr) {
	return arr.map(function (val) {
		if (val === undefined) {
			return "";
		}
		return val;
	});
};

Content._cleanText = function (str) {
	return str.trim().replace(/\s\s/, ' ');
};

module.exports = Content;