import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import * as ROUTES from  '../../constants/routes'
export default function PrivateRoute({ component: Component, authed, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) => authed === true
				? <Component {...props} />
				: <Redirect to={{ pathname:  ROUTES.INDEX , state: { from: props.location } }} />} // '/' - gdzie ma isc po wylogowaniu
		/>
	)
}

