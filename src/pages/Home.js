import React from 'react'
import { Link } from 'react-router-dom'
import {logout} from '../components/Logout/index'
import * as ROUTES from '../constants/routes'
import AllUsers from '../components/Homepage/AllUsers'

function Home() {
	return (
		<div>
			<h1>HomePage</h1>
			<Link to={ROUTES.INDEX}><h1>Go to index</h1></Link>
			 <AllUsers />
			<button onClick={() => logout()}>Logout</button>
		</div>
	)
}

export default Home
