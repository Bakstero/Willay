import React, { Component } from 'react'
import { firestore, firebaseAuth } from '../../Firebase/firebase'
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
		const userAuth = firebaseAuth().currentUser.uid;
		firestore().collection('users').doc(userAuth)
		.get().then((doc) => {
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
		const { user, avatar} = this.state
		return (
			<div >
				<Link to={`/user/${user}`}><Avatar src={avatar} alt='User Avatar' /></Link>
			</div>
		)
	}
}
export default UserIcon