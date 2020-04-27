import React from 'react'
import{ firestore, firebaseAuth } from '../Firebase/firebase'
import styled from 'styled-components';
import ReactModal from 'react-modal';

const WrapperContainter = styled.div`
margin-top: 100px;
`
const Button = styled.button`
width: 110px;
height: 45px;
color: white;
background: none;
border: solid 1px #FFC045;
border-radius: 10px;
`
const Modal = styled(ReactModal)`
	background-color: rgba(0,0,0,.9);
	height:100%;
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
		data: '',
		dataText: '',
		UserContent: '',
		UserUid: '',
		UserName: '',
		userAvatar: '',
		likes: 0,
		commentsInPost: 0,
		showModal: false
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

	handleSubmit = event => {
		event.preventDefault()
		if (this.isFormValid()) {
			const { UserContent, data, UserName, UserUid, userAvatar, dataText, userAuth, likes, commentsInPost} = this.state;
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
		})
			this.setState({ createPostModal: false, UserContent: ''})
		}
	}

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
					<div>
						<form onSubmit={this.handleSubmit}>
							<div>
								<label>Crate Post</label>
								<textarea
									onChange={this.handleChange}
									placeholder="Write something.."
									name="UserContent"
									type="text"
									value={UserContent}></textarea>
							</div>
							<button type="submit">Create Post</button>
						</form>
						<button onClick={this.handleCloseModal}>Close</button>
					</div>
				</Modal>
			</WrapperContainter>
		)
	}
}

export default CratePost