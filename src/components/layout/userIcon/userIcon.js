import React, { Component } from 'react'
import firebase from '../../Firebase/firebase'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Avatar = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
		@media screen and (max-width: 1024px){
	width: 40px;
	height:40px;
	}
`

class UserIcon extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatar: '',
			user: '',
		};
	}

	GetUserIcon = () => {
		const userAuth = firebase.auth().currentUser.displayName;
		const ref = firebase.firestore().collection('users').doc(userAuth);
		ref.get().then((doc) => {
			if (doc.exists) {
				this.setState({
					avatar: doc.data().avatar,
					user: userAuth
				});
			}
		});
	}

	componentDidMount() {
		this.GetUserIcon()
	}

	render() {
		return (
			<div >
				<Link to={`user/${this.state.user}`}><Avatar src={this.state.avatar} alt='User Avatar' /></Link>
			</div>
		)
	}
}
export default UserIcon