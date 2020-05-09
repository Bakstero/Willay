import React, { Component } from 'react'
import { firestore, firebaseAuth, firebaseStorage } from '../components/Firebase/firebase'
import {Link} from 'react-router-dom'
import FileUploader from 'react-firebase-file-uploader'
import { Wrapper,
	BackDiv,
	Postdiv,
	AvatarImg,
	StyledPostInfo,
	StyledInfoContainer,
	StyledUserName,
	StyledData,
	Styledcontent,
	StyledStatContainer,
	StyledCommentContainer,
	AvatarContainer,
	ButtonsCommentContainer,
	CommentContainer,
	CommantInput,
	CommentsContainter,
	StyledSpan ,
	StyledCommentsInfo,
	PostImage,
	Button } from '../components/styles/styledPostPage'


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
			likeButton: true,
			deletePostModal: false,
			post: [],
			comments: [],
			key: '',
			comment: '',
			commentImage: '',
			ProgressUpolad: 0,
		};
	}

	onCollectionUpdate = (querySnapshot) => {
		const comments = [];
		querySnapshot.forEach((doc) => {
			const { content, userName, dataText, userAvatar, userLink, postImage, commentImage } = doc.data();
			comments.push({
				key: doc.id,
				doc, // DocumentSnapshot
				content,
				userName,
				dataText,
				userAvatar,
				userLink,
				postImage,
				commentImage,
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
					.set({commentsInPost: commentsInPost + 1}, { merge: true })
				}
			})
	}

	handleUploadSuccess = filename => {
		firebaseStorage().ref('postsImages').child(filename).getDownloadURL()
			.then(url => this.setState({
				commentImage: url,
				ProgressUpolad: 100,
				userAvatarEvent: 'Upload success!',
			}))
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
				commentImage: this.state.commentImage,
			}, { merge: true })
			.then(() => {this.setState({ comment: '' })})
			.then(() => {this.AddCommentNumber()})
	}

	AddLikeNumber =() => {
		this.firestore
			.get().then((doc) => {
				const { likes } = doc.data();
				if (doc.exists) {
					this.firestore.set({likes: likes + 1},{ merge: true })
				}
			})
	}
	addLike = () => {
		this.firestore.collection('likes').doc(this.auth)
			.set({userUid: this.auth}, { merge: true })
			.then(() => { this.setState({ comment: '', likeButton: false }) })
			.then(() => { this.AddLikeNumber() })
	}

	disLikeNumber = () => {
		this.firestore
			.get().then((doc) => {
				const { likes } = doc.data();
				if (doc.exists) {
					this.firestore.set({likes: likes - 1}, { merge: true })
				}
			})
	}

	disLike = () => {
		this.firestore.collection('likes').doc(this.auth).delete()
			.then(() => { this.setState({ comment: '', likeButton: true }) })
			.then(() => { this.disLikeNumber() })
	}

	likeAuth = () => {
		this.firestore.collection('likes').doc(this.auth)
		.get().then((doc) => {
			if (doc.exists) {
				this.setState({ likeButton: false })
			} else {
				this.setState({ likeButton: true })
			}
		})
	}

	handleProgress = progress => { this.setState({ ProgressUpolad: progress }) }

	handleOpenModal() {
		this.setState({ showModal: true });
	}

	removePost = () => {
		this.firestore
			.get().then((doc) => {
				const { UserUid } = doc.data();
				if (doc.exists) {
					if (UserUid === this.auth) {
						this.setState({ deletePostModal: true })
					} else if (this.auth === 'CvGl1eJfvEgUAajV42fLAVXAvnq1') {
						this.setState({ deletePostModal: true })
					}
				}
			});
	}

	removePostAction = () => {
		this.firestore.delete();
	}

	componentDidMount() {
		this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
		this.dataTextInterval = setInterval(() => this.setState({ dataText: new Date().toLocaleString("en-us") }), 1000)
		this.DataInterval = setInterval(() => this.setState({ data: Date.now().toString() }), 1000)
		this.GetPostData();
		this.likeAuth();
		this.removePost();
	}

	render() {
		const { userAvatar, UserName, dataText, content, userLink, postImage } = this.state.post
		return (
			< Wrapper >
				<BackDiv onClick={this.props.history.goBack}></BackDiv>
				<Postdiv>
					< StyledPostInfo>
						<div>
							<Link to={`/user/${userLink}`}><AvatarImg src={userAvatar} /></Link>
						</div>
						<StyledInfoContainer>
							<StyledUserName>{UserName}</StyledUserName>
							<StyledData relative date={dataText} />
							<div>
								{this.state.deletePostModal === true
									?
									<button onClick={this.removePostAction}>Delete Post</button>
									:
									null
								}
							</div>
						</StyledInfoContainer>
					</ StyledPostInfo>
					<div>
						<Styledcontent>{content}</Styledcontent>
						<PostImage src={postImage} />
					</div>
					<StyledStatContainer>
						<Styledcontent >
							{this.state.likeButton === true
								?
								<Button like onClick={this.addLike}>Like</Button>
								:
								<Button unlike onClick={this.disLike}>UnLike</Button>
							}
						</Styledcontent>
					</StyledStatContainer>
					<StyledCommentContainer>
						<AvatarContainer>
							<Link to={`/user/${this.auth}`}>	<AvatarImg comment src={this.userNameAuth.photoURL} /></Link>
						</AvatarContainer>
						<CommentContainer>
							<CommantInput maxLength="700"
								onChange={this.handleChange}
								name="comment"
								type="text"
								placeholder="Write a comment..."
								maxRows={9}
								value={this.state.comment}
							/>
							<ButtonsCommentContainer>
								<FileUploader
									accept='image/*'
									name='image'
									storageRef={firebaseStorage().ref('postsImages')}
									onUploadSuccess={this.handleUploadSuccess}
									onProgress={this.handleProgress}
								/>
								<Button onClick={this.AddComment}>Post</Button>
							</ButtonsCommentContainer>
						</CommentContainer>
					</StyledCommentContainer>
					<CommentsContainter>
						<StyledSpan commentTag >All comment</StyledSpan >
						{this.state.comments.map(comment =>
							<div>
								<StyledCommentsInfo>
									<div>
										<Link to={`/user/${comment.userLink}`}><AvatarImg Usercomment src={comment.userAvatar} /></Link>
									</div>
									<StyledInfoContainer>
										<StyledUserName comment >{comment.userName}</StyledUserName>
										<StyledData relative date={comment.dataText} />
									</StyledInfoContainer>
								</ StyledCommentsInfo>
								<div>
									<Styledcontent>{comment.content}</Styledcontent>
									<PostImage comment src={comment.commentImage} />
								</div>

							</div>
						)}
					</CommentsContainter>
				</Postdiv>
				<BackDiv onClick={this.props.history.goBack}></BackDiv>
			</ Wrapper>
		)
	}
}
export default PostPage
