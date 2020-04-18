import React from 'react'
import AllUsers from '../components/Homepage/AllUsers'
import Navbar from '../components/layout/Navbar/Navbar'
import PostsContainer from '../components/Posts/PostsContainer'
import styled from 'styled-components';
import CratePost from '../components/Posts/CratePost'
const StyledHome = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content:space-around;
`

function Home() {
	return (
		<StyledHome>
			<Navbar/>
			<AllUsers />
			<div>

				<PostsContainer />
				<CratePost />
			</div>
			<AllUsers />
		</StyledHome>
	)
}

export default Home
