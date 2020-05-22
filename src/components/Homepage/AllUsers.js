import React, { useState, useEffect } from 'react';
import firebase from '../Firebase/firebase';
import { Link } from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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

const StyledBadgeRed = withStyles((theme) => ({
	badge: {
		backgroundColor: '#f44336',
		color: '#f44336',
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
		marginTop: '5px',
		maxWidth: 250,
		background: 'none',
		height: 60,
		boxShadow: 'none'
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: 'none',
	},
	postInformation: {
		display: 'fled',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '12px',
		borderBottomStyle: 'solid',
		borderBottomColor: '#fb8c00',
		border: '1px',
	},
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},

}));

function GetAllUsers() {
	const [user, setUser] = useState([])

	useEffect(() => {
		firebase
			.firestore()
			.collection("users")
			.onSnapshot(snapshot => {
				const user = snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
				}))
				setUser(user)
			})
	}, [])
	return user
}

const AllUsers = () => {
	const user = GetAllUsers()
	const classes = useStyles();
	return (
			<div>
			{user.map(user =>
				<div>
					{user.isActive === true
						?
						<Card className={classes.root} >
							<CardHeader
								avatar={
									<StyledBadge
										overlap="circle"
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'right',
										}}
										variant="dot"
									>
										<Avatar alt="Remy Sharp" src={user.avatar} className={classes.large} />
									</StyledBadge>
								}
								action={
									<IconButton aria-label="settings" component={Link} to={`/user/${user.userUid}`}>
										<MoreVertIcon />
									</IconButton>
								}
								title={user.userName}
							/>
						</Card>
						:
						<Card className={classes.root} >
							<CardHeader
								avatar={
									<StyledBadgeRed
										overlap="circle"
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'right',
										}}
										variant="dot"
									>
										<Avatar alt="Remy Sharp" src={user.avatar} className={classes.large} />
									</StyledBadgeRed>
								}
								action={
									<IconButton aria-label="settings" component={Link} to={`/user/${user.userUid}`}>
										<MoreVertIcon />
									</IconButton>
								}
								title={user.userName}
							/>
						</Card>
					}
				</div>
			)}
		</div>
	);
}
export default AllUsers

/*
	<div>
					<Link to={`/user/${user.id}`} key={`${user.key}`}>
						<img src={user.avatar} />
						<div>
							<h2>{user.userName}</h2>
						</div>
					</Link>
				</div>
*/
