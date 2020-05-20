import React from 'react'
import { ReactComponent as BuildIcon } from '../components/Static/Images/BuildImg.svg'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

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

function GameLibrary() {
	const classes = useStyles();
	let history = useHistory();
	return (
		<div className={classes.root}>
			<h1>SITE UNDER CONSTRUCTION</h1>
			<button onClick={() => history.goBack()}><h1>BACK TO LAST PAGE</h1></button>
			<BuildIcon />
		</div>
	)
}

export default GameLibrary