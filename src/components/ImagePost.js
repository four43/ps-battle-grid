const React = require("react");
const Component = React.Component;

export default class ImagePost extends Component {
	render() {
		var thumbUrl = this.props.images.thumb.url;
		var origUrl = this.props.images.source.url;
		var title = this.props.title || this.props.bodyText;
		var author = this.props.author;
		return (
			<figure itemProp="associatedMedia" itemScope itemType="http://schema.org/ImageObject">
				<a href={origUrl} itemProp="contentUrl">
					<img src={thumbUrl} itemProp="thumbnail" alt={title + " - /u/" + author} />
				</a>
				<figcaption itemProp="caption description">
					{title} - <a href={"https://reddit.com/u/" + author}>/u/{author}</a>
				</figcaption>
			</figure>
		)
	}
}