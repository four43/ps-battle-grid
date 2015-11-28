var handlebars = require('handlebars'),
	httpUtil = require('./../http-util'),
	Comment = require('./../Comment'),
	Content = require('./../Content'),
	Post = require('./../Post');

function CommentRepo(urlTemplateStr) {
	this.urlTemplate = handlebars.compile(urlTemplateStr);
}

CommentRepo.prototype.findByPost = function (post, callback) {
	var url = this.urlTemplate(post);
	httpUtil.getJson(url, function (err, responseData) {
		if (err) {
			return callback(err);
		}
		var comments = responseData[1].data.children;
		var topLevelComments = comments
			.filter(function (comment) {
				return comment.kind === Content.TYPE_COMMENT;
			})
			.map(function (commentData) {
				return new Comment(commentData.data);
			})
			.filter(function(comment) {
				return Object.keys(comment.images).length;
			});
		return callback(null, topLevelComments);
	});
};

module.exports = CommentRepo;