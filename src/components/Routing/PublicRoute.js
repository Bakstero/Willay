import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
export default function PublicRoute({ component: Component, authed, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) => authed === false
				? <Component {...props} />
				: <Redirect to={ROUTES.HOME} />} // '/dashboard' - gdzie ma isc po zalogowaniu
		/>
	)
}