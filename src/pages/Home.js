import React from 'react'
import AllUsers from '../components/Homepage/AllUsers'
import styled from 'styled-components';
import LeftSection from '../components/layout/LeftSection/LeftSection'
import RightSection from '../components/layout/RightSection/RightSection'

const Wrapper = styled.div`
	height:100vh;
	width:100%;
	display: flex;
	flex-direction: row;
`


function Home() {
	return (
		<Wrapper>
			<LeftSection/>
			 <AllUsers />
			<RightSection />
		</Wrapper>
	)
}

export default Home
