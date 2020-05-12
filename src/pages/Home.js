import React, { useState } from 'react'
import AllUsers from '../components/Homepage/AllUsers'
import AllPosts from '../components/Homepage/AllPosts'
import ChatModal from '../components/Chat/Global/chatModal'
import Navbar from '../components/layout/Navbar/Navbar'
import CreatePost from '../components/Posts/createPost'
import styled from 'styled-components';
import Modal from 'react-modal';

const StyledHome = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction:column;
	align-items: center;
`
const StyledModal = styled(Modal)`
	display: flex;
`
const NotContainer = styled.div`
	@media screen and (max-width: 800px){
		display: none;
		margin-left:0px;
	}
`

const StyledAllUsers = styled.div`
	width:10%;
	height:100vh;
	position:fixed;
	left:10px;
`
const MainBoard = styled.div`
	width: 35%;
	@media screen and (max-width: 800px){
		width: 100%;
		margin-left:0px;
	}
`
const ModalContainer = styled.div`
	position:fixed;
	right:20px;
	bottom: 20px;
`

const GlobalMessageButton = styled.button`
	right:1%;
	bottom: 1%;
	width:50px;
	height:50px;
	z-index:100;
	position:fixed;
	border-radius: 5px;
	border:none;
	background: #353535;
	color: white;
	outline:none;
	box-shadow:  5px 5px 10px #1e1e1e,
             	-5px -5px 10px #222222;
`

function Home() {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<StyledHome>
			<Navbar/>
			<NotContainer>
				<StyledAllUsers>
					<AllUsers />
				</StyledAllUsers>
			</NotContainer>
			<MainBoard>
				<CreatePost />
				<AllPosts />
			</MainBoard>
			<ModalContainer>
				<GlobalMessageButton onClick={openModal}>Chat</GlobalMessageButton>
				<StyledModal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
					style={{
						overlay: {
							backgroundColor: 'none'
						}
					}}
				>
				<ChatModal />
				</StyledModal>
			</ModalContainer>
			<NotContainer></NotContainer>
		</StyledHome>
	)
}

export default Home
