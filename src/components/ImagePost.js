const React = require("react");
const Component = React.Component;

export default class ImagePost extends Component {
	render() {
		var imgSrc = this.props.images.thumb.url;
		return (
			<div className="row-elem"><img src={imgSrc}/></div>
		)
	}
}