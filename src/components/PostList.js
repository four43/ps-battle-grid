const React = require("react");
const Component = React.Component;

const Post = require('./Post');
const ImageDetails = require("./ImageDetails");

export default class PostList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			detailPost: null
		};
	}

	displayImageDetail(post) {
		console.log("post.displayImageDetail", post);
		this.setState({detailPost: post});
	}

	closeImageDetail() {
		this.setState({detailPost: null});
	}

	render() {
		//console.log("[PostList] Rendering ", this.props.posts);
		var posts = this.props.posts.map((post) => {
			post.key = post.id;
			return (
				<Post
					post={post}
				    imageDetailCallback={this.displayImageDetail.bind(this)}
				/>
			);
		});

		if (this.state.detailPost) {
			var detailsTest = (<ImageDetails post={this.state.detailPost} onClose={this.closeImageDetail.bind(this)}/>);
		}

		return (
			<div>
				<div className="container-fluid gallery-wrapper">
					{posts}
				</div>
				{detailsTest}
			</div>
		)
	}
}