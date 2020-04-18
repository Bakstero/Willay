import React, { Component } from 'react'
import firebase from '../Firebase/firebase'


export class CratePost extends Component {
	state = {
		postsRef: firebase.firestore().collection('posts'),
		usersRef: firebase.firestore().collection('users'),
		userAuth: firebase.auth().currentUser.displayName,
		data: Date.now().toString(),
		dataText: new Date().toLocaleString(),
		UserContent: '',
		UserUid: '',
		UserName: '',
		userAvatar: '',
	}

	componentDidMount() {
		const { userAuth } = this.state;
		this.state.usersRef.doc(userAuth).get().then((doc) => {
			if (doc.exists) {
				this.setState({
					userAvatar: doc.data().avatar,
					UserName: doc.data().userName,
					UserUid: doc.data().userUid,
				})
			}
		})
	}

	handleSubmit = event => {
		event.preventDefault()
		const { UserContent, data, UserName, UserUid, userAvatar, dataText,userAuth} = this.state;
		this.state.postsRef.doc(`${data} ${userAuth}`).set({
			content: UserContent,
			data: data,
			userAvatar,
			UserName,
			UserUid,
			dataText,
		})
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	};

	render() {
		const { UserContent } = this.state;
		return (
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
					<button type="submit">Add Post</button>
				</form>
			</div>
		)
	}
}
export default CratePost