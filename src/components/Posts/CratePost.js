import React from 'react'
import{ firestore, firebaseAuth } from '../Firebase/firebase'
import styled from 'styled-components';
import ReactModal from 'react-modal';
import FileUploader from 'react-firebase-file-uploader'
import {firebaseStorage} from '../Firebase/firebase'
import TextareaAutosize from 'react-textarea-autosize';
const WrapperContainter = styled.div`
margin-top: 10%;
width:100%;
`

const Wrapper = styled.div`
	width:100%;
	height:100%;
	display: flex;
	align-items: center;
	justify-content: center;

`
const BackContainter = styled.div`
	width:25%;
	height:100%;
	cursor: pointer;
`

const MainContainer = styled.div`
width:50%;
height:100%;
padding-top:10%;
background: #202020;
display: flex;
flex-direction: column;
align-items: center;
`

const Form = styled.form`
	width:70%;
	height:80%;
	text-align: center;
	border: solid 1px white;
`

const CommantInput = styled(TextareaAutosize)`
	width:85%;
	min-height:40px;
	overflow: hidden;
	outline: none;
	resize: none;
	background-color: #202020;
	border:none;
	color:white;
`

const Button = styled.button`
width: 110px;
height: 45px;
color: white;
background: none;
border: solid 1px #FFC045;
border-radius: 10px;
`
const Img = styled.img`
	width:85%;
`

const Modal = styled(ReactModal)`
	background-color: rgba(0,0,0,.9);
	height:100%;
	width:100%;
	outline: none;
	display:flex;
	align-items: center;
	justify-content: center;
`

export class CratePost extends React.Component {
	constructor() {
		super();
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.state = {
		userAuth: firebaseAuth().currentUser.uid,
		createPostModal: false,
		showModal: false,
		data: '',
		dataText: '',
		UserContent: '',
		UserUid: '',
		UserName: '',
		userAvatar: '',
		postImage: '',
		userAvatarEvent: '',
		likes: 0,
		commentsInPost: 0,
		ProgressUpolad: 0,
	}
}

	componentDidMount() {
		this.DataInterval = setInterval(() => this.setState({ data: Date.now().toString() }), 1000)
		this.dataTextInterval = setInterval(() => this.setState({ dataText: new Date().toLocaleString("en-us") }), 1000)
		const { userAuth } = this.state;
		firestore().collection('users').doc(userAuth).get().then((doc) => {
			if (doc.exists) {
				this.setState({
					userAvatar: doc.data().avatar,
					UserName: doc.data().userName,
					UserUid: doc.data().userUid,
				})
			}
		})
	}

	componentWillUnmount() {
		clearInterval(this.DataInterval);
		clearInterval(this.dataTextInterval);
	}

	formIsEmpty = ({ UserContent}) => {
		return !UserContent.length;
	}

	isFormValid = () => {
		if (this.formIsEmpty(this.state)) {
			return false
		} else {
			return true
		}
	}

	handleUploadSuccess = filename => {
		firebaseStorage().ref('postsImages').child(filename).getDownloadURL()
			.then(url => this.setState({
				postImage: url,
				ProgressUpolad: 100,
				userAvatarEvent: 'Upload success!',
			}))
	}

	handleSubmit = event => {
		event.preventDefault()
		if (this.isFormValid()) {
			const { UserContent, data, UserName, UserUid, userAvatar, dataText, userAuth, likes, commentsInPost, postImage} = this.state;
		firestore().collection('posts').doc(`${data}-${userAuth}`).set({
			content: UserContent,
			data: data,
			userAvatar,
			UserName,
			UserUid,
			dataText,
			userLink: userAuth,
			likes,
			commentsInPost,
			postImage,
		})
			this.setState({ createPostModal: false, UserContent: ''})
		}
	}
	handleProgress = progress => { this.setState({ ProgressUpolad: progress }) }
	handleOpenModal() {
		this.setState({ showModal: true });
	}

	handleCloseModal() {
		this.setState({ showModal: false, UserContent: '' });
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	};

	render() {
		const { UserContent } = this.state;
		return (
			<WrapperContainter>
				<Button onClick={this.handleOpenModal} >Add Post</Button>
				<Modal isOpen={this.state.showModal}>
					<Wrapper>
						<BackContainter onClick={this.handleCloseModal}/>
						<MainContainer>
							<Form onSubmit={this.handleSubmit}>
									<h1>Crate Post</h1>
										<CommantInput
											onChange={this.handleChange}
											placeholder="Write something.."
											name="UserContent"
											type="text"
											value={UserContent} />
										<Img src={this.state.postImage} />
								<div>
									<FileUploader
										accept='image/*'
										name='image'
										storageRef={firebaseStorage().ref('postsImages')}
										onUploadSuccess={this.handleUploadSuccess}
										onProgress={this.handleProgress}
									/>
									<button type="submit">Create Post</button>
								</div>
							</Form>
						</MainContainer>
						<BackContainter onClick={this.handleCloseModal}/>
					</Wrapper>
				</Modal>

			</WrapperContainter>
		)
	}
}

export default CratePost