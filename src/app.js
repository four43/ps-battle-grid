const React = require("react");
const Component = React.Component;
const _ = require("lodash");

const PostRepo = require("../lib/Repo/PostRepo");
const CommentsRepo = require("../lib/Repo/CommentRepo");

const PostList = require("./components/PostList");

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: []
		};
	}

	componentDidMount() {
		this.getPosts();
	}

	getPosts(offset=0) {
		console.log("Fetching posts...");
		var postRepo = new PostRepo(this.props.psBattleUrl);
		var commentsRepo = new CommentsRepo(this.props.commentUrlTemplate);
		postRepo.fetchAll((err, posts) => {
			console.log("Got posts, setting to state", posts);
			this.setState({posts: posts});
			posts.map((post) => {
				commentsRepo.findByPost(post, (err, comments) => {
					post.comments = comments;
					console.log("Updating posts with comments");
					this.setState({posts: posts});
				});
			})
		});
	}

	render() {
		var portListConfig = {
			posts: this.state.posts
		};
		return (
			<div>
				<PostList {...portListConfig} />
			</div>
		);
	}
}
