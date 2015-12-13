const React = require("react");
const Component = React.Component;

const ImagePost = require("./ImagePost");

export default class Post extends Component {

	componentDidUpdate() {
		console.log("Starting PhotoSwipe on: #post-"+this.props.id);
		dragscroll.reset();
	}

	render() {
		if(this.props.id) {
			var id = this.props.id;
			var baseImage = (<ImagePost {...this.props} key={"post-main-" + this.props.id}/>);

			var comments = this.props.comments.map((comment) => {
				comment.key = "comment-"+comment.id;
				return (
					<ImagePost {...comment}/>
				);
			});

			// Thanks to: http://photoswipe.com/documentation/seo.html
			return (
				<div className="post-container">
					<div id={"post-"+id} className="post dragscroll" itemScope itemType="http://schema.org/ImageGallery">
						{baseImage}
						{comments}
					</div>
				</div>
			);
		}
	};
}