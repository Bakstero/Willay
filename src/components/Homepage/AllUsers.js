import React, { Component } from 'react';
import firebase from '../Firebase/firebase';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const Avatar = styled.img`
	width: 200px;
	height: 200px;
`

class AllUsers extends Component {
	constructor(props) {
		super(props);
		this.ref = firebase.firestore().collection('users');
		this.unsubscribe = null;
		this.state = {
			users: []
		};
	}

	onCollectionUpdate = (querySnapshot) => {
		const users = [];
		querySnapshot.forEach((doc) => {
			const { avatar, userEmail, userName } = doc.data();
			users.push({
				key: doc.id,
				doc, // DocumentSnapshot
				avatar,
				userEmail,
				userName,
			});
		});
		this.setState({
			users
		});
	}

	componentDidMount() {
		this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
	}

	render() {
		return (
			<div >
				<div>
					{this.state.users.map(user =>
						<Link to={`/user/${user.key}`} key={`${user.key}`}><Avatar src={user.avatar} alt='' /></Link>
					)}
				</div>
			</div>
		);
	}
}

export default AllUsers;