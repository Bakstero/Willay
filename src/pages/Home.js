import React from 'react'
import AllUsers from '../components/Homepage/AllUsers'
import styled from 'styled-components';
import Navbar from '../components/layout/Navbar/Navbar'

function Home() {
	return (
		<div>
			<Navbar/>
			<AllUsers/>
		</div>
	)
}

export default Home
