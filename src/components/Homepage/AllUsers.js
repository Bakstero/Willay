import React, { useState, useEffect } from 'react';
import firebase from '../Firebase/firebase';
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
function GetAllUsers() {
	const [user, setUser] = useState([])
	useEffect(() => {
		firebase
			.firestore()
			.collection("users")
			.onSnapshot(snapshot => {
				const user = snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
				}))
				setUser(user)
			})
	}, [])
	return user
}

const AllUsers = () => {
	const user = GetAllUsers()

	return (
		<Wrapper>
			<h1>All Users</h1>
			{user.map(user =>
				<UserContainer>
					<StyledLink to={`/user/${user.id}`} key={`${user.key}`}>
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
export default AllUsers