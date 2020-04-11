import React, { Component } from 'react'
import firebase from '../Firebase/firebase'
import { Link } from 'react-router-dom'
class UserPageForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			isEdit: false,
		};
	}

	componentDidMount() {
		const userAuth = firebase.auth().currentUser;

		const ref = firebase.firestore().collection('users').doc(this.props.match.params.id);
		ref.get().then((doc) => {
			if (doc.exists) {
				this.setState({
					user: doc.data(),
					key: doc.id,
				});
				if (userAuth.uid === this.state.user.userUid) {
					this.setState({
						isEdit: true,
					})
				}
			}
		});
	}
	render() {
		return (
			<div >
				<div>
					<img src={this.state.user.avatar} alt='User Avatar' />
					<h1>{this.state.user.userEmail}</h1>
					<h1>{this.state.user.userName}</h1>
				</div>
				<div>
					{this.state.isEdit === true
						?
						<Link to={`/edit/${this.state.key}`}><button>Edit</button></Link>
						:
						null
					}
				</div>
			</div>
		)
	}
}
export default UserPageForm