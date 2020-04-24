import React, { Component } from 'react'
import { firestore, firebaseAuth } from '../components/Firebase/firebase'

class PostPage extends Component {
	constructor(props) {
		super(props);
		this.ref = firestore().collection('posts').doc(this.props.match.params.id).collection('comments').orderBy("data", "desc");
		this.firestore = firestore().collection('posts').doc(this.props.match.params.id)
		this.auth = firebaseAuth().currentUser.uid
		this.userNameAuth = firebaseAuth().currentUser
		this.unsubscribe = null;
		this.state = {
			data: this.DataInterval,
			dataText: this.dataTextInterval,
			likes: null,
			commentsInPost: null,
			post: [],
			comments: [],
			key: '',
			comment: '',
			likeButton: true,
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
				dataText: this.state.dataText,
				userName: this.userNameAuth.displayName,
				userLink: this.auth,
				userAvatar: this.userNameAuth.photoURL,
			}, { merge: true })
			.then(() => {this.setState({ comment: '' })})
			.then(() => {this.AddCommentNumber()})
	}

	AddLikeNumber =() => {
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
	AddLike = () => {
		this.firestore.collection('likes').doc(this.auth)
			.set({userUid: this.auth}, { merge: true })
			.then(() => { this.setState({ comment: '', likeButton: false }) })
			.then(() => { this.AddLikeNumber() })
	}

	likeAuth = () =>  {
		this.firestore.collection('likes').doc(this.auth)
			.get().then((doc) => {
				if (doc.exists) {
					this.setState({ likeButton: false})
				} else {
					this.setState({ likeButton: true})
				}
			})

	}

	componentDidMount() {
		this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
		this.dataTextInterval = setInterval(() => this.setState({ dataText: new Date().toLocaleString("en-us") }), 1000)
		this.DataInterval = setInterval(() => this.setState({ data: Date.now().toString() }), 1000)
		this.GetPostData()
		this.likeAuth();
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
					{this.state.likeButton === true
					?
						<button type="submit" onClick={this.AddLike}>Like</button>
					:
					null
					}
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