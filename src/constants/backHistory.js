import React from 'react'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'fixed',
		width: '100%',
		height: '100%',
		zIndex: 1,
	},
}));

export const BackHistory = () => {
	const classes  = useStyles();
	let history = useHistory();
	return (
		<div className={classes.root} onClick={() => history.goBack()}></div>
	);
}