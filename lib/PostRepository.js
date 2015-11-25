var httpUtil = require('./http-util');

function PostRepository(url) {
	this.url = url;
}

PostRepository.prototype.fetchAll = function (callback) {
	httpUtil.getJson(this.url, function (err, responseData) {
		if(err) {
			return callback(err);
		}
		var posts = responseData.data.children;
		var regularPosts = posts.filter(function (post) {
			return post.kind === 't3' && post.data.stickied !== true;
		});
		return callback(null, regularPosts);
	});
};

module.exports = PostRepository;