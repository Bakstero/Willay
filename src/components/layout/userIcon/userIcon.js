import React, { useState } from 'react'
import { firestore, firebaseAuth } from '../../firebase/firebase'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
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
const StyledUserModal = styled(Modal)`
	top: 0%;
	right:6%;
	width: 40px;
	z-index: 999;
	position:fixed;
	outline:none;

`
export const StyledLink = styled(Link)`
	text-decoration:none;
	color: white;
`

const StyledButton = styled.button`
	width:120px;
	height:40px;
	z-index:100;
	border:none;
	border-top:1px solid #FFC045;
	background: none;
	outline:none;

`
const StyledContainer = styled.div`
	background-color: #202020;
	position:fixed;
	height:19%;
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
			<div >
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
						<StyledButton><StyledLink to={`/user/${user}`}>See your profile</StyledLink></StyledButton>
						<StyledButton><StyledLink to={`/edit/user/${user}`}>Edit profile</StyledLink></StyledButton>
						<StyledButton><Span>2020, by Kamil Adamowski</Span></StyledButton>
					</StyledContainer>
				</StyledUserModal>
			</div>
		)
}
//<Link to={`/user/${user}`}><Avatar src={avatar} alt='User Avatar' /></Link>