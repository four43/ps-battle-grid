var Content = require('./Content'),
	util = require('util');

function Post(options) {
	Content.call(this, options);

	this.title = options.title || "";
	this.numComments = options.num_comments || 0;
	this.nsfw = (options.over_18 !== undefined) ? options.over_18 : false;

	if (options.preview !== undefined) {
		try {
			this.images = {
				source: options.preview.images[0].source,
				thumb: options.preview.images[0].resolutions.pop()
			}
		} catch (err) {
			console.error(err);
		}
	}
	else if (options.url !== undefined) {
		//NSFW images aren't pre-processed by reddit
		this.images = {
			source: {
				url: options.url
			},
			thumb: {
				url: options.url
			}
		}
	}
	this.comments = [];
}
util.inherits(Post, Content);

module.exports = Post;
