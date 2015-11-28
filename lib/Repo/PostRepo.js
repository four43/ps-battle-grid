var httpUtil = require('./../http-util'),
	Post = require('./../Post');

function PostRepo(url) {
	this.url = url;
}

PostRepo.prototype.fetchAll = function (callback) {
	httpUtil.getJson(this.url, function (err, responseData) {
		if (err) {
			return callback(err);
		}
		var posts = responseData.data.children;
		var regularPosts = posts
			.filter(function (post) {
				return post.kind === 't3' && post.data.stickied !== true;
			})
			.map(function (postData) {
				return new Post(postData.data);
			});
		return callback(null, regularPosts);
	});
};

module.exports = PostRepo;