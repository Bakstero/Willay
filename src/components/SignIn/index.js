import React, { Component } from 'react'
import firebase from '../Firebase/firebase'

export default class SignInForm extends Component {
	state = {
		email: '',
		password: '',
		errors: [],
		PssError: '',
		error: false,
	}

	formIsEmpty = ({email, password }) => {
		return !email.length || !password.length;
	}

	displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

	isFormValid = () => {
		let errors = [];
		let error;

		if (this.formIsEmpty(this.state)) {
			error = { message: 'Fill all fields' }
			this.setState({ errors: errors.concat(error) })
			return false
		} else {
			return true
		}
	}

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
		const { email, password, errors, error, PssError } = this.state;
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
					{errors.length > 0 && (
						<div >
							<h3>Error</h3>
							{this.displayErrors(errors)}
						</div>
					)}
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