import React from 'react'
import { Link } from 'react-router-dom'
import {logout} from '../components/Logout/index'

function Home() {
	return (
		<div>
			<h1>HomePage</h1>
			<Link to='/'><h1>Go to index</h1></Link>
			<button onClick={() => logout()}>Logout</button>
		</div>
	)
}

export default Home
