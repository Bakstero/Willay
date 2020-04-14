import React, { Component } from 'react'
import firebase from '../Firebase/firebase'
import FileUploader from 'react-firebase-file-uploader'

class EditUser extends Component {
	state = {
		userName: '',
		photoURL: '',
		defaultAvatar: 'https://firebasestorage.googleapis.com/v0/b/appwillay.appspot.com/o/avatars%2FDefaultUserAvatar.jpg?alt=media&token=aa410a73-9c7f-4d93-926c-37dae73dc136',
		usersRef: firebase.firestore().collection('users'),
		userAuth: firebase.auth().currentUser.displayName,
		userAvatarEvent: '',
		defaultAvatarEvent: '',
		userNameEvent: '',
		ProgressUpolad: 0,
	}

	EditUserName = event => {
		event.preventDefault()
		if (!this.state.userName.length){
			this.setState({ userNameEvent: 'Form is empty' })
		} else {
			this.state.usersRef.doc(this.state.userAuth).set({
				userName: this.state.userName,},{ merge: true })

			this.setState({userNameEvent: 'Nick changed!', userName: '' })
		}
	}

	handleProgress = progress => {this.setState({ProgressUpolad: progress})}

	handleUploadSuccess = filename => {
		firebase.storage().ref('avatars').child(filename).getDownloadURL()
			.then(url => this.setState({
				photoURL: url,
				ProgressUpolad: 100,
				userAvatarEvent: 'Upload success!',
			}))
			.then(() => {
				this.state.usersRef.doc(this.state.userAuth).set({
					avatar: this.state.photoURL,
				}, { merge: true })
			})
	}

	handleSetDefaultAvatar = () => {
		this.state.usersRef.doc(this.state.userAuth).set({
			avatar: this.state.defaultAvatar,}, { merge: true })
			.then(() => { this.setState({ defaultAvatarEvent : 'Success you changed the default avatar',})})
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	};

	render() {
		const { userName, userAvatarEvent, defaultAvatarEvent, userNameEvent, ProgressUpolad } = this.state;
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
					<div>{userNameEvent}</div>
				</form>

				<div>
					<div >
						<label>Avatar</label>
							<FileUploader
								accept='image/*'
								name='image'
								storageRef={firebase.storage().ref('avatars')}
								onUploadSuccess={this.handleUploadSuccess}
								onProgress={this.handleProgress}
							/>
					</div>

					<div>
						<h2>Progress:</h2>
						<p>{ProgressUpolad}</p>
						<p>{userAvatarEvent}</p>
					</div>

					<div>
						<button onClick={this.handleSetDefaultAvatar}>Set default Avatar</button>
						<p>{defaultAvatarEvent}</p>
					</div>

				</div>
			</div>
		)
	}
}
export default EditUser

/*
EditUserAvatar = event => {
	event.preventDefault()
	if (!this.state.photoURL.length) {
		this.setState({ AvatarEvent: 'Form is empty' })
	} else {
		this.state.usersRef.doc(this.state.userAuth).set({
			avatar: this.state.photoURL,
		}, { merge: true })
		this.setState({ userNameEvent: 'Avatar changed!', photoURL: '' })
	}
}
*/