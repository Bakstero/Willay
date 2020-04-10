import React, { Component } from 'react'
import firebase from '../Firebase/firebase'


class SignUpForm extends Component {
	state = {
		userName: '',
		email: '',
		password: '',
		passwordConfirmation: '',
		photoURL: '',
		usersRef: firebase.firestore().collection('users'),
	}


	handleSubmit = event => {
		event.preventDefault()
		firebase
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then(createdUser => {
				createdUser.user.updateProfile({
					displayName: this.state.userName,
					photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSBFTlkikWa2vJOC88Yet3MiaVIqZbftnPCx3xH6CP0AYb-SKsl',
					email: this.state.email,
				})
				.then(() => {
					this.saveUser(createdUser).then(() => {
						console.log(createdUser)
					})
				})
				.catch(err => {
					console.log(err)
					console.log(err.message)
				})
			})
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	};

	saveUser = createdUser => {
		return this.state.usersRef.doc(this.state.userName).set({
			userName: createdUser.user.displayName,
			avatar: createdUser.user.photoURL,
			userUid: createdUser.user.uid,
			userEmail: createdUser.user.email,
		})
	}

	render() {
		const { userName, email, password, passwordConfirmation } = this.state;
		return (
			<div >
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					<div >
						<label>username</label>
						<input
							onChange={this.handleChange}
							placeholder="userName"
							name="userName"
							type="text"
							value={userName} />
					</div>
					<div >
						<label>Email</label>
						<input
							onChange={this.handleChange}
							placeholder="email"
							name="email"
							type="email"
							value={email} />
					</div>
					<div>
						<label>Password</label>
						<input
							onChange={this.handleChange}
							name="password"
							type="password"
							placeholder="Password"
							value={password} />
					</div>
					<div>
						<label>password Confirmation</label>
						<input
							onChange={this.handleChange}
							type="password"
							name="passwordConfirmation"
							placeholder="password Confirm"
							value={passwordConfirmation} />
					</div>
					<button type="submit">Register</button>
				</form>
			</div>
		)
	}
}
export default SignUpForm