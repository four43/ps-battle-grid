const React = require("react");
const Component = React.Component;

const ImagePost = require("./ImagePost");

export default class Post extends Component {

	componentDidUpdate() {
		dragscroll.reset();
	}

	imageClicked(post) {
		console.log("Image Clicked (Post)");
		this.props.imageDetailCallback(post);
	}

	render() {
		var post = this.props.post;

		if (post && post.id) {
			var id = post.id;
			var baseImage = (
				<ImagePost
					post={post}
					key={"post-main-" + post.id}
					imageClickCallback={this.imageClicked.bind(this)}
				/>);

			var comments = post.comments.map((comment) => {
				return (
					<ImagePost
							post={comment}
							key={"comment-" + comment.id}
					        imageClickCallback={this.imageClicked.bind(this)}
					/>
				);
			});

			// Thanks to: http://photoswipe.com/documentation/seo.html
			return (
				<div className="post-container">
					<div id={"post-"+id} className="post dragscroll" itemScope
					     itemType="http://schema.org/ImageGallery">
						{baseImage}
						{comments}
					</div>
				</div>
			);
		}
	};
}