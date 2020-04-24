import React, { Component } from 'react'
import { firestore } from '../components/Firebase/firebase'

class PostPage extends Component {
	constructor(props) {
		super(props);
		this.ref = firestore().collection('posts').doc(this.props.match.params.id).collection('comments').orderBy("data", "desc");
		this.firestore = firestore().collection('posts').doc(this.props.match.params.id)
		this.unsubscribe = null;
		this.state = {
			data: this.DataInterval,
			likes: null,
			commentsInPost: null,
			post: [],
			comments: [],
			key: '',
			comment: '',
		};
	}

	onCollectionUpdate = (querySnapshot) => {
		const comments = [];
		querySnapshot.forEach((doc) => {
			const { content } = doc.data();
			comments.push({
				key: doc.id,
				doc, // DocumentSnapshot
				content,
			});
		});
		this.setState({
			comments
		});
	}

	GetPostData = () => {
		this.firestore
			.get().then((doc) => {
				if (doc.exists) {
					this.setState({
						post: doc.data(),
						key: doc.id,
						likes: doc.likes
					});
				}
			});
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	};


	AddCommentNumber = () => {
		this.firestore
			.get().then((doc) => {
				const { commentsInPost } = doc.data();
				if (doc.exists) {
					this.firestore
						.set({
							commentsInPost: commentsInPost + 1
						}, { merge: true })
				}
			})
	}

	AddComment = event => {
		event.preventDefault()
		this.firestore.collection('comments').doc(this.state.data)
			.set({
				content: this.state.comment,
				data: this.state.data,
			}, { merge: true })
			.then(() => { this.setState({ comment: '' }) })
			.then(() => {this.AddCommentNumber()})
	}

	AddLikes =() => {
		this.firestore
			.get().then((doc) => {
				const { likes } = doc.data();
				if (doc.exists) {
					this.firestore
						.set({
							likes: likes + 1
						},{ merge: true })
				}
			})
	}

	componentDidMount() {
		this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
		this.DataInterval = setInterval(() => this.setState({ data: Date.now().toString() }), 1000)
		this.GetPostData()
	}


	render() {
		const { userAvatar, UserName, dataText, content, likes } = this.state.post
		return (
			<div >
				<div>
					<img src={userAvatar} alt='User Avatar' />
					<h1>{UserName}</h1>
					<h1>{dataText}</h1>
					<h1>{content}</h1>
					<h1>{likes}</h1>
				</div>
				<div>
					<input
							onChange={this.handleChange}
							name="comment"
							type="text"
							value={this.state.comment}
					/>
					<button onClick={this.AddComment}>Add comment</button>
				</div>
				<div>
					<button onClick={this.AddLikes}>Like</button>
				</div>
				<div>
					<h1>All comment</h1>
					{this.state.comments.map(comment =>
						<h1>{comment.content}</h1>
					)}
				</div>
				<button onClick={this.props.history.goBack}>Back</button>
			</div>
		)
	}
}
export default PostPage

/*
		this.unsubscribe = null;
		this.ref = firestore().collection('posts').doc(this.props.match.params.id).collection('commnets').orderBy("data", "desc")
*/