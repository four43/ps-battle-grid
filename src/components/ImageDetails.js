const React = require("react"),
	Component = React.Component;

export default class ImageDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false
		};
	}

	componentDidMount() {
		var modalDom = $(this.modal.getDOMNode());
		//modalDom.modal({show: true});
		console.log("Binding click event to: ", modalDom);
		modalDom.on('click', this.props.onClose);
	}

	showModal() {
		this.setState({show: true});
	}

	hideModal() {
		this.setState({show: false});
	}

	handleClick() {
		console.log("Modal:", this.modal.getDOMNode());
		$(this.modal.getDOMNode()).modal('show');
	}

	render() {
		var post = this.props.post,
			title = post.title || post.bodyText,
			caption;
		if(title.length) {
			caption = title + " - /u/" + post.author;
		}
		else {
			caption = "Posted by /u/" + post.author;
		}
		return (
			<div className="lightbox" tabIndex="-1" role="dialog" ref={(ref) => this.modal = ref}>
				<div className="lightbox-header">
					<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
							aria-hidden="true">&times;</span></button>
					<h4 className="modal-title" id="myModalLabel">{title}</h4>
				</div>
				<div className="lightbox-content">
					<img src={post.images.source.url} alt={caption} />
				</div>
				<div className="lightbox-footer">
					{caption}
				</div>
			</div>
		);
	}
};