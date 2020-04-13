import React, { Component } from 'react'
import firebase from '../Firebase/firebase'


class EditUser extends Component {
	state = {
		userName: '',
		photoURL: '',
		usersRef: firebase.firestore().collection('users'),
		userAuth: firebase.auth().currentUser.displayName,
		AvatarEvent: '',
		UserNameEvent: ''
	}
	EditUserName = event => {
		event.preventDefault()
		if (!this.state.userName.length){
			this.setState({ UserNameEvent: 'Form is empty' })
		} else {
			this.state.usersRef.doc(this.state.userAuth).set({
				userName: this.state.userName,
			}, { merge: true })
			this.setState({UserNameEvent: 'Nick changed!', userName: '' })
		}
	}

	EditUserAvatar = event => {
		event.preventDefault()
		if (!this.state.photoURL.length) {
			this.setState({ AvatarEvent: 'Form is empty' })
		} else {
			this.state.usersRef.doc(this.state.userAuth).set({
				avatar: this.state.photoURL,
			}, { merge: true })
			this.setState({UserNameEvent: 'Avatar changed!', photoURL: '' })
		}
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	};

	render() {
		const { userName, photoURL, AvatarEvent, UserNameEvent } = this.state;
		return (
			<div >
				<h1>Edit user</h1>
				<form onSubmit={this.EditUserName}>
					<div >
						<label>user name</label>
						<input
							onChange={this.handleChange}
							placeholder="Nick"
							name="userName"
							type="text"
							value={userName} />
					</div>
					<button type="submit">Edit userName</button>
					<div>{UserNameEvent}</div>
				</form>

				<form onSubmit={this.EditUserAvatar}>
					<div >
						<label>Avatar</label>
						<input
							onChange={this.handleChange}
							placeholder="Paste photo URL"
							name="photoURL"
							type="photoURL"
							value={photoURL} />
					</div>
					<button type="submit">Edit Avatar</button>
					<div>{AvatarEvent}</div>
				</form>
			</div>
		)
	}
}
export default EditUser
