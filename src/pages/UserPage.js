import React, { Component } from 'react'
import firebase from '../components/Firebase/firebase'
import { Link } from 'react-router-dom'
import AllUsers from '../components/Homepage/AllUsers'
class UserPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			isEdit: false,
		};
	}

	EditUser = () => {
		const userAuth = firebase.auth().currentUser.displayName;
		if (userAuth !== this.props.match.params.id) {
			this.setState ({
				isEdit: false
			})
		} else {
			this.setState ({
				isEdit: true
			})
		}
	}

	GetUserData = () => {
		const ref = firebase.firestore().collection('users').doc(this.props.match.params.id);
		ref.get().then((doc) => {
			if (doc.exists) {
				this.setState({
					user: doc.data(),
					key: doc.id,
				});
			}
			this.EditUser()
		});
	}

	componentDidMount () {
		this.GetUserData()
	}

	componentDidUpdate () {
		if (this.props.match.params.id !== this.state.user.userName) {
			this.GetUserData()
		}
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
				<AllUsers />
			</div>
		)
	}
}
export default UserPage