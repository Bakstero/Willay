import React, { Component } from 'react'
import{ firestore, firebaseAuth } from '../Firebase/firebase'


export class CratePost extends Component {
	state = {
		userAuth: firebaseAuth().currentUser.displayName,
		data: '',
		dataText: '',
		UserContent: '',
		UserUid: '',
		UserName: '',
		userAvatar: '',
		userLink:  firebaseAuth().currentUser.displayName,
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

	handleSubmit = event => {
		event.preventDefault()
		const { UserContent, data, UserName, UserUid, userAvatar, dataText, userAuth, userLink} = this.state;
		firestore().collection('posts').doc(`${data} ${userAuth}`).set({
			content: UserContent,
			data: data,
			userAvatar,
			UserName,
			UserUid,
			dataText,
			userLink,
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