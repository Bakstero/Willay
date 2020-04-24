import React, { Component } from 'react'
import{ firestore, firebaseAuth } from '../Firebase/firebase'
import styled from 'styled-components';


const Wrapper = styled.div`
margin-top: 100px;
`

export class CratePost extends Component {
	state = {
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

	handleCloseModalAddPost = () => {
		this.setState({ createPostModal: false, UserContent: '' })
	};
	handleModalAddPost = () => {
		this.setState({ createPostModal: true })
	};

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	};

	render() {
		const { UserContent, createPostModal } = this.state;
		return (
			<Wrapper>
				{createPostModal === false
					?
					<button onClick={this.handleModalAddPost} >Add Post</button>
					:
					<div>
						<form onSubmit={this.handleSubmit}>
							<div>
								<label>Crate Post</label>
								<input
									onChange={this.handleChange}
									placeholder="What's up dude?"
									name="UserContent"
									type="text"
									value={UserContent} />
							</div>
							<button type="submit" >Create Post</button>
						</form>
						<button onClick={this.handleCloseModalAddPost}>Close</button>
					</div>
				}
			</Wrapper>
		)
	}
}
export default CratePost