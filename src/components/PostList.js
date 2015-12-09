const React = require("react");
const Component = React.Component;

const Post = require('./Post');

export default class PostList extends Component {
	render() {
		console.log("[PostList] Rendering ", this.props.posts);
		var posts = this.props.posts.map((post) => {
			post.key = post.id
			return (
				<Post {...post}/>
			);
		});

		return (
			<div className="container-fluid gallery-wrapper">
				{posts}
			</div>
		)
	}
}