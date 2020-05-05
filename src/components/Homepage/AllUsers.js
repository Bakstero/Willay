import React, { Component } from 'react';
import { firestore } from '../Firebase/firebase';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
const Wrapper = styled.div`
	width: 25%;
	display: flex;
	flex-direction: column;
`

const UserContainer = styled.div`
	width:100%;
	display: flex;
	flex-direction: row;
	align-items: center;
`

const Test = styled.div`
	z-index: 1;
	margin-left: -40px;
	width: 0px;
	height:80px;
	background: #202020;
	border-radius: 0px 10px 10px 0px;
	transition-duration: 0.5s;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	color: rgba(0,0,0,0);
`

const StyledImg = styled.img`
	z-index: 2;
	width:80px;
	height:80px;
	border-radius: 50%;
	transition-duration: 0.5s;
`

const StyledLink = styled(Link)`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 5px;
	text-decoration: none;
	&:hover ${Test} {
    	width:200px;
			transition-duration: 0.5s;
			color: rgba(255,255,255,1);
  }
	&:hover ${StyledImg} {
		transition-duration: 0.5s;
		transform: rotate(20deg);
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
						<UserContainer>
							<StyledLink to={`/user/${user.key}`} key={`${user.key}`}>
								<StyledImg src={user.avatar} />
								<Test>
									<h2>{user.userName}</h2>
								</Test>
							</StyledLink>
						</UserContainer>
					)}
			</Wrapper>
		);
	}
}

export default AllUsers;