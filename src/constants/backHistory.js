import React from 'react'
import { useHistory } from 'react-router-dom'
export const BackHistory = () => {
	let history = useHistory();
	return (
		<>
			<button onClick={() => history.goBack()}>X</button>
		</>
	);
}