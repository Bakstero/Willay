import React from 'react'
import AllUsers from '../components/Homepage/AllUsers'
import Navbar from '../components/layout/Navbar/Navbar'
import PostsSection from '../components/Posts/PostSection'
import styled from 'styled-components';
import CratePost from '../components/Posts/CratePost'

const StyledHome = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
`
const NotContainer = styled.div`
	width: 25%;
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
	width: 50%;
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
				<PostsSection />
			</MainBoard>
		</StyledHome>
	)
}

export default Home
