import React, { Component } from 'react'
import firebase from '../Firebase/firebase'

export default class SignInForm extends Component {
	state = {
		email: '',
		password: '',
		TextError: '',
		error: false,
	}

	handleSubmit = event => {
		event.preventDefault()
		firebase
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.catch(err => {
				console.log(err)
				console.log(err.message)
				this.setState({
					error: true,
					TextError: err.message
				})
			})
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	};

	render() {
		const { email, password } = this.state;
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
					{this.state.error === true
						?
						<h5>{this.state.TextError}</h5>
						: null
					}
				</div>
			</div>
		)
	}

}