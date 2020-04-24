import React, { Component } from 'react'
import { firebaseAuth, firestore, firebaseStorage } from '../Firebase/firebase'
import FileUploader from 'react-firebase-file-uploader'

class EditUser extends Component {
	state = {
		defaultAvatar: 'https://firebasestorage.googleapis.com/v0/b/appwillay.appspot.com/o/avatars%2FDefaultUserAvatar.jpg?alt=media&token=aa410a73-9c7f-4d93-926c-37dae73dc136',
		currentUser: firebaseAuth().currentUser,
		userName: '',
		photoURL: '',
		userAvatarEvent: '',
		defaultAvatarEvent: '',
		userNameEvent: '',
		ProgressUpolad: 0,
	}


	handleEditUserName = () => {
		const { userName, currentUser } = this.state;
		firestore().collection('users').doc(currentUser.uid)
			.set({ userName: userName }, { merge: true })
		this.setState({ userNameEvent: 'Nick changed!', userName: '' })
	}

	editUserNamePosts = () => {
		const { userName, currentUser } = this.state;
		firestore().collection('posts').where("UserUid", "==", currentUser.uid)
		.get().then(querySnapshot => {
			querySnapshot.forEach(doc => {
				firestore().collection('posts').doc(doc.id)
				.set({ UserName: userName }, { merge: true })
			});
		});
	}

	EditUserName = event => {
		event.preventDefault()
		if (!this.state.userName.length){
			this.setState({ userNameEvent: 'Form is empty' })
		} else {
			this.handleEditUserName()
			this.editUserNamePosts()
		}
	}

	handleProgress = progress => {this.setState({ProgressUpolad: progress})}

	changeuserImage = () => {
		const { photoURL, currentUser } = this.state;
		firestore().collection('users').doc(currentUser.uid)
		.set({avatar: photoURL }, { merge: true })
	}

	changePostsUserImage = () => {
		const { photoURL, currentUser } = this.state;
		firestore().collection('posts').where("UserUid", "==", currentUser.uid)
			.get().then(querySnapshot => {
				querySnapshot.forEach(doc => {
					firestore().collection('posts').doc(doc.id)
					.set({userAvatar: photoURL }, { merge: true })
				});
			});
	}

	handleUploadSuccess = filename => {
		firebaseStorage().ref('avatars').child(filename).getDownloadURL()
			.then(url => this.setState({
				photoURL: url,
				ProgressUpolad: 100,
				userAvatarEvent: 'Upload success!',
			}))
			.then(() => {this.changeuserImage()})
			.then(() => {this.changePostsUserImage()})
	}

	changePostsDefaultImage = () => {
		const { defaultAvatar, currentUser } = this.state;
		firestore().collection('posts').where("UserUid", "==", currentUser.uid)
			.get().then(querySnapshot => {
				querySnapshot.forEach(doc => {
					firestore().collection('posts').doc(doc.id)
					.set({userAvatar: defaultAvatar}, { merge: true })
				});
			});
	}

	handleSetDefaultAvatar = () => {
		const { defaultAvatar, currentUser } = this.state;
		firestore().collection('users').doc(currentUser.uid)
		.set({avatar: defaultAvatar}, { merge: true })
		.then(() => { this.setState({ defaultAvatarEvent : 'Success you changed the default avatar',})})
		.then(() => { this.changePostsDefaultImage() })
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
								storageRef={firebaseStorage().ref('avatars')}
								onUploadSuccess={this.handleUploadSuccess}
								onProgress={this.handleProgress}
							/>
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