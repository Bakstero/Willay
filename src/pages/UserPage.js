import React, { Component } from 'react'
import { firebaseAuth, firestore }  from '../components/Firebase/firebase'
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
		};
	}

	EditUserButton = () => {
		if (firebaseAuth().currentUser.displayName !== this.props.match.params.id) {
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
		firestore().collection('users').doc(this.props.match.params.id)
		.get().then((doc) => {
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
		const { avatar, userEmail, userName, key } = this.state.user
		const { isEdit } = this.state
		return (
			<div >
				<Navbar />
				<div>
					<Avatar src={avatar} alt='User Avatar' />
					<h1>{userEmail}</h1>
					<h1>{userName}</h1>
				</div>
				<div>
					{isEdit === true
						?
						<Link to={`/edit/user/${key}`}><button>Edit</button></Link>
						:
						null //In the future, there will be a "add friend" / "remove friend" button
					}
				</div>
			</div>
		)
	}
}
export default UserPage