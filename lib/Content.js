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

module.exports = Content;