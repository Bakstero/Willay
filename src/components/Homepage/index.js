import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class index extends Component {
	render() {
		return (
			<div>
				<div>Helo world</div>
				<Link to='/home'><h1>Go to home</h1></Link>
			</div>
		)
	}
}

export default index
