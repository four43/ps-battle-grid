const React = require("react");
const Component = React.Component;

export default class ImagePost extends Component {
	handleImageClick(e) {
		e.preventDefault();
		console.log("Image Clicked (Image Post)");
		this.props.imageClickCallback(this.props.post);
	}
	render() {
		var post = this.props.post;
		var thumbUrl = post.images.thumb.url;
		var origUrl = post.images.source.url;
		var title = post.title || post.bodyText;
		var author = post.author;
		return (
			<figure itemProp="associatedMedia" itemScope itemType="http://schema.org/ImageObject">
				<a href={origUrl} itemProp="contentUrl" onClick={this.handleImageClick.bind(this)}>
					<img src={thumbUrl} itemProp="thumbnail" alt={title + " - /u/" + author} />
				</a>
				<figcaption itemProp="caption description">
					{title} - <a href={"https://reddit.com/u/" + author}>/u/{author}</a>
				</figcaption>
			</figure>
		)
	}
}