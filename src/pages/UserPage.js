import React, { Component } from 'react'
import firebase from '../components/Firebase/firebase'
import Navbar from '../components/layout/Navbar/Navbar'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const Avatar = styled.img`
	width: 300px;
	height: 300px;
	border-radius: 50%;
`

class UserPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			isEdit: false,
			userAuth: firebase.auth().currentUser.displayName,
		};
	}

	EditUserButton = () => {
		if (this.state.userAuth !== this.props.match.params.id) {
			this.setState({
				isEdit: false
			})
		} else {
			this.setState({
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
		});
	}

	componentDidMount () {
		this.GetUserData()
		this.EditUserButton()
	}

	componentDidUpdate () {
		if (this.props.match.params.id !== this.state.user.userName) {
			this.GetUserData()
		}
	}

	render() {
		return (
			<div >
				<Navbar />
				<div>
					<Avatar src={this.state.user.avatar} alt='User Avatar' />
					<h1>{this.state.user.userEmail}</h1>
					<h1>{this.state.user.userName}</h1>
				</div>
				<div>
					{this.state.isEdit === true
						?
						<Link to={`/edit/user/${this.state.key}`}><button>Edit</button></Link>
						:
						null //In the future, there will be a "add friend" / "remove friend" button
					}
				</div>
			</div>
		)
	}
}
export default UserPage