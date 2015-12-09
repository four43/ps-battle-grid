var Content = require('./Content'),
	util = require('util');

function Post(options) {
	Content.call(this, options);

	this.title = options.title || "";
	this.numComments = options.num_comments || 0;
	this.nsfw = (options.over_18 !== undefined) ? options.over_18 : false;

	if (options.url !== undefined) {
		var imgurResults = Content.parseImgur(options.url);
		if (imgurResults) {
			this.images = {
				source: {
					url: imgurResults.imgur.full
				},
				thumb: {
					url: imgurResults.imgur.medium
				}
			}
		}
		else {
			console.error("Couldn't find an imgur URL in: " + options.url + ", falling back to full size");
			this.images = {
				source: {
					url: options.url
				},
				thumb: {
					url: options.url
				}
			}
		}
	}
	this.comments = [];
}
util.inherits(Post, Content);

module.exports = Post;
