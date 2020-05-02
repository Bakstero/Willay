import React, { useState } from 'react'
import { firestore, firebaseAuth } from '../../Firebase/firebase'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
import {logout} from '../../Logout/index'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
	z-index: 100;
`

const Avatar = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
		@media screen and (max-width: 1024px){
	width: 40px;
	height:40px;
	}
`
const StyledUserModal = styled(Modal)`
	top: 60px;
	right:250px;
	width: 40px;
	position:fixed;
	outline:none;

`
export const StyledLink = styled(Link)`
	text-decoration:none;
	color: white;
`

const StyledButton = styled.button`
	width:100%;
	height:55px;
	z-index:100;
	border:none;
	border-top:1px solid rgba(255,192,69,.5);
	color:white;
	background: #202020;
	outline:none;
	cursor: pointer;
	${props => props.information && css`
		border-radius:0px 0px 0px 10px;
		cursor: auto;
	`}
	:hover {
		background-color:#353535;
	}
`
const StyledContainer = styled.div`
	width: 300px;
	height:200px;
	background-color: #202020;
	position:fixed;
	height:23%;
	display:flex;
	flex-direction:column;
	justify-content: flex-end;
	border-radius:10px;
`
const Span = styled.span`
	color:white;
	font-size:10px;
`


export default function UserIcon() {
	const [avatar, setavatar] = useState()
	const [user, setuser] = useState()
	const [userSettingsIsOpen, setUserSettingsOpen] = React.useState(false);

	const userAuth = firebaseAuth().currentUser.uid;
	firestore().collection('users').doc(userAuth)
		.get().then((doc) => {
			if (doc.exists) {
				setavatar(doc.data().avatar)
				setuser(userAuth)
			}
		});

	function openModal() {
		setUserSettingsOpen(true);
	}

	function closeModal() {
		setUserSettingsOpen(false);
	}

	return (
		<Wrapper>
			<Avatar onClick={openModal} src={avatar} alt='User Avatar' />
			<StyledUserModal
				isOpen={userSettingsIsOpen}
				onRequestClose={closeModal}
				style={{
					overlay: {
						backgroundColor: 'none'
					}
				}}
			>
				<StyledContainer>
					<StyledLink to={`/user/${user}`}><StyledButton>See your profile</StyledButton></StyledLink>
					<StyledLink to={`/edit/user/${user}`}><StyledButton>Edit profile</StyledButton></StyledLink>
					<StyledButton onClick={logout}>Log out</StyledButton>
					<StyledButton information><Span>2020, by Kamil Adamowski</Span></StyledButton>
				</StyledContainer>
			</StyledUserModal>
		</Wrapper>
	)
}