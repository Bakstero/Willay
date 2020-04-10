import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
	return (
		<div>
			<h1>HomePage</h1>
			<Link to='/'><h1>Go to index</h1></Link>
		</div>
	)
}

export default Home
