import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import ErrorImage from '../components/page404/errorImage'
const useStyles = makeStyles((theme) => ({
	root: {
		position: 'fixed',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		width: '100%',
		height: '100%',
		zIndex: 1,
	},
}));

function Page404() {
	const classes = useStyles();
	let history = useHistory();
	return (
		<div className={classes.root}>
			<Button onClick={() => history.goBack()}>BACK TO LAST PAGE</Button>
			<ErrorImage />

		</div>
	)
}

export default Page404