const React = require("react");
const Component = React.Component;

const ImagePost = require("./ImagePost");

export default class Post extends Component {
	render() {
		if(this.props.id) {
			var baseImage = (<ImagePost {...this.props} />);

			var comments = this.props.comments.map((comment) => {
				return (
					<ImagePost {...comment}/>
				);
			});
			return (
				<div className="row-container">
					<div className="row">
						{baseImage}
						{comments}
					</div>
				</div>
			);
		}
	}
}