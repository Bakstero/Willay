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
		errors: [],
	}

	formIsEmpty = ({ userName, email, password, passwordConfirmation }) => {
		return !userName.length || !email.length || !password.length || !passwordConfirmation.length;
	}

	isPasswordValid = (password, passwordConfirmation) => {
		if(password < 5 || passwordConfirmation < 5) {
			return false
		} else if ( password !== passwordConfirmation ) {
			return false
		} else {
			return true
		}
	}

	displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

	isFormValid = () => {
		let errors = [];
		let error;

		if(this.formIsEmpty(this.state)) {
			error = {message: 'Fill all fields'}
			this.setState({ errors: errors.concat(error) })
			return false
		} else if (!this.isPasswordValid()) {
			error = { message: 'Password is invalid' }
			this.setState({ errors: errors.concat(error) })
			return false
		} else {
			return true
		}
	}

	handleSubmit = event => {
		const { email, userName, password } = this.state;
		event.preventDefault()
		if(this.isFormValid()){
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(createdUser => {
				createdUser.user.updateProfile({
					displayName: userName,
					photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSBFTlkikWa2vJOC88Yet3MiaVIqZbftnPCx3xH6CP0AYb-SKsl',
					email: email,
				})
				.then(() => {
					this.saveUser(createdUser).then(() => {

					})
				})
				.catch(err => {
					console.log(err)
					console.log(err.message)
				})
			})
		}

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
		const { userName, email, password, passwordConfirmation, errors } = this.state;
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
				<div>
					{errors.length > 0 && (
						<div >
							<h3>Error</h3>
							{this.displayErrors(errors)}
						</div>
					)}
				</div>
			</div>
		)
	}
}
export default SignUpForm