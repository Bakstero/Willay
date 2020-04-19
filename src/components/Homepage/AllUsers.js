import React, { Component } from 'react';
import { firestore } from '../Firebase/firebase';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { logout } from '../Logout/index'
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const UserSection = styled.div`
	width: 400px;
	height: 100px;
	background-color: #202020;
	border-radius: 10px;
	display: flex;
	flex-direction:row;
	margin-top: 20px;
		@media screen and (max-width: 320px){
			width: 150px;
			height: 50px;
	}
		@media screen and (max-width: 500px){
			width: 200px;
			height: 75px;
	}
`
const InsideSection = styled.div`
	width: 100%;
	height: 100px;
	display: flex;
	flex-direction:column;
	align-items: center;

		@media screen and (max-width: 320px){
			font-size: 12px;
	}
`

const UserLink = styled(Link)`
	color: white;
	text-decoration: none;
`

const UserAvatar = styled.img`
	width: 100px;
	height: 100px;
	border-radius: 10px 0px 0px 10px;
			@media screen and (max-width: 320px){
			width: 50px;
			height: 50px;
	}
			@media screen and (max-width: 500px){
			width: 75px;
			height: 75px;
	}
`

class AllUsers extends Component {
	constructor(props) {
		super(props);
		this.ref = firestore().collection('users');
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
			<Wrapper>
				<h1>All Users</h1>
					{this.state.users.map(user =>
						<UserLink to={`/user/${user.key}`} key={`${user.key}`}>
							<UserSection>
								<div>
									<UserAvatar src={user.avatar} alt='' />
								</div>
								<InsideSection>
									<h3>{user.userName}</h3>
								</InsideSection>
							</UserSection>
						</UserLink>
					)}
				<button onClick={logout}>logout</button>
			</Wrapper>
		);
	}
}

export default AllUsers;