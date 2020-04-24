import React, { Component } from 'react';
import { firestore} from '../Firebase/firebase';
import { Link } from 'react-router-dom'

class AllPosts extends Component {
	constructor(props) {
		super(props);
		this.ref = firestore().collection('posts').orderBy("data", "desc");
		this.unsubscribe = null;
		this.state = {
			posts: [],
			comment: '',
		};
	}

	onCollectionUpdate = (querySnapshot) => {
		const posts = [];
		querySnapshot.forEach((doc) => {
			const { userAvatar, content, UserName, data, UserUid, likes, commentsInPost, } = doc.data();
			posts.push({
				key: doc.id,
				doc, // DocumentSnapshot
				userAvatar,
				content,
				UserName,
				data,
				UserUid,
				likes,
				commentsInPost,
			});
		});
		this.setState({
			posts
		});
	}

	componentDidMount() {
		this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
	}
	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	};

	render() {
		return (
			<div>
				{this.state.posts.map(post =>
					<Link to={`/post/${post.data}-${post.UserUid}`}>
							<div>
								<h1>{post.UserName}</h1>
							<h1>{post.content}</h1>
							<h5>{`likes ${post.likes}`}</h5>
							<h5>{`Comments ${post.commentsInPost}`}</h5>
							</div>
						</Link>
				)}
			</div>
		);
	}
}

export default AllPosts;