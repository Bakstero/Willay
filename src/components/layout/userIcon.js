import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { firestore, firebaseAuth } from '../Firebase/firebase'

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const StyledBadge = withStyles((theme) => ({
	badge: {
		backgroundColor: '#44b700',
		color: '#44b700',
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		'&::after': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			animation: '$ripple 1.2s infinite ease-in-out',
			border: '1px solid currentColor',
			content: '""',
		},
	},
	'@keyframes ripple': {
		'0%': {
			transform: 'scale(.8)',
			opacity: 1,
		},
		'100%': {
			transform: 'scale(2.4)',
			opacity: 0,
		},
	},
}))(Badge);

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

export default function UserIcon() {
	const [avatar, setavatar] = useState()
	const [anchorEl, setAnchorEl] = React.useState(null);
	const classes = useStyles();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const userAuth = firebaseAuth().currentUser.uid;

	firestore().collection('users').doc(userAuth)
		.get().then((doc) => {
			if (doc.exists) {
				setavatar(doc.data().avatar)
			}
		});

	const logout = () => {
		firestore().collection('users').doc(userAuth)
			.set({ isActive: false }, { merge: true })
			.then(() => { firebaseAuth().signOut() })
	}

	return (
		<div>
			<StyledBadge
				overlap="circle"
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				variant="dot"
				onClick={handleClick}
			>
				<Avatar alt="Remy Sharp" src={avatar} className={classes.large} />
			</StyledBadge>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem component={Link} to={`/user/${userAuth}`}>Profile</MenuItem>
				<MenuItem component={Link} to={`/edit/user/${userAuth}`} >Edit profile</MenuItem>
				<MenuItem onClick={() => { logout() }}>Logout</MenuItem>
			</Menu>
		</div>
	)
}