import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class index extends Component {
	render() {
		return (
			<div>
				<div>Helo world</div>
				<Link to='/home'><h1>Go to home(private)</h1></Link>
				<Link to='/signup'><h1>singup</h1></Link>
				<Link to='/signin'><h1>singin</h1></Link>
			</div>
		)
	}
}

export default index
