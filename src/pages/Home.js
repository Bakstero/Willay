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
	@media screen and (max-width: 500px){
		display: none;
	}
`
const MainBoard = styled.div`
	width: 50%;

	@media screen and (max-width: 500px){
		width: 100%;
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
				<CratePost />
			</MainBoard>
			<NotContainer>
				<AllUsers />
			</NotContainer>
		</StyledHome>
	)
}

export default Home
