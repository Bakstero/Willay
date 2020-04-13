import React, { Component } from 'react'
import firebase from '../Firebase/firebase'

export default class SignInForm extends Component {
	state = {
		email: '',
		password: '',
		PssError: '',
		error: false,
	}

	formIsEmpty = ({email, password }) => {
		return !email.length || !password.length;
	}

	isFormValid = () => {
		if (this.formIsEmpty(this.state)) {
			this.setState({
				PssError: 'Fill all fields',
				error: true,
			 })
			return false
		} else {
			return true
		}
	}
x

	handleSubmit = event => {
		event.preventDefault()
		if (this.isFormValid()) {
		firebase
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.catch(err => {
				console.log(err)
				console.log(err.message)
				this.setState({
					PssError: err.message,
					error: true,
				})
				})
		}
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	};

	render() {
		const { email, password, error, PssError } = this.state;
		return (
			<div >
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<div >
						<label>Email</label>
						<input onChange={this.handleChange} placeholder="email" name="email" type="email" value={email} />
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
					<button type="submit">Login</button>
				</form>
				<div>
					{error === true
						?
						<div>
							<h3>{PssError}</h3>
						</div>
						: null}
				</div>
			</div>
		)
	}

}