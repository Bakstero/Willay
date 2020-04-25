import React from 'react'
import AllUsers from '../components/Homepage/AllUsers'
import AllPosts from '../components/Homepage/AllPosts'
import Navbar from '../components/layout/Navbar/Navbar'
import CreatePost from '../components/Posts/CratePost'
import styled from 'styled-components';

const StyledHome = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
`
const NotContainer = styled.div`
	width: 20%;
	height: 100vh;
	display: flex;
	justify-content:center;
	margin-left:100px;
	@media screen and (max-width: 800px){
		display: none;
		margin-left:0px;
	}
`
const MainBoard = styled.div`
	width: 40%;
	margin-left:100px;
	@media screen and (max-width: 800px){
		width: 100%;
		margin-left:0px;
	}
`

function Home() {
	return (
		<StyledHome>
			<Navbar/>
			<NotContainer>
				<AllUsers />
			</NotContainer>
			<MainBoard>
				<CreatePost />
				<AllPosts />
			</MainBoard>
		</StyledHome>
	)
}

export default Home
