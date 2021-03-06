import React, {useState, useEffect} from 'react'
import {  firestore }  from '../components/Firebase/firebase'
import { useParams } from 'react-router-dom'

import { mainListItems } from '../components/layout/listItems';
import { ReactComponent as Logo } from '../components/Static/Icons/logo/Logo.svg'
import UserIcon from '../components/layout/userIcon'
import UserPosts from '../components/userPage/userPosts'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
	appBar: {
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'center',
		background: 'none',
		boxShadow: 'none',

	},
	root: {
		display: 'flex',
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',

	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},

	drawerPaper: {
		whiteSpace: 'nowrap',
		width: drawerWidth,
		borderColor: '#fb8c00',
		background: '#202020',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	papesr: {
		backgroundColor: '#fff',
		display: 'flex',
		height: '200px'
	},
	avatar: {
		width: '100%',
		height: '100%',
		borderRadius: '5px',
	},
	background: {
		width: '100%',
		height: '200px',
		borderRadius: '5px',
	},
	containerBackground: {
		width: '100%',
		height: '200px',
		backgroundColor: '#202020',
		borderRadius: '5px',
	},
	test: {
		backgroundColor: '#303030',
		borderRadius: '5px',
	},
}));

const UserPage = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [user, setUser] = useState([])
	const { id } = useParams()

	useEffect(() => {
		const fetchUser = async () => {
			const result = await firestore().collection('users').doc(id).get()
			setUser(result.data())
		}
		fetchUser()
	}, [id])



	const handleDrawerOpen = () => {
		if (open === true) {
			setOpen(false);
		} else {
			setOpen(true);
		}
	};
	return (
		<div className={classes.root} >
			<CssBaseline />
			<AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
				<Toolbar className={classes.toolbar}>
					<div>
						<IconButton  >
							<Badge badgeContent={1} color="secondary" fontSize="small">
								<NotificationsIcon fontSize="medium" />
							</Badge>
						</IconButton>
						<IconButton >
							<Badge>
								<UserIcon />
							</Badge>
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerOpen} >
						{open === false
							?
							<Logo />
							:
							<Logo />
						}
					</IconButton>
				</div>
				<Divider />
				<List>{mainListItems}</List>
				<Divider />
			</Drawer>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container className={classes.container}>
					<Grid container spacing={2} className={classes.test} >
						<Grid item xs={12}>
							<CardMedia image={user.backgroundImage} className={classes.background} />
						</Grid>
						<Grid item xs={2}>
							<CardMedia image={user.avatar} className={classes.avatar} />
						</Grid>
						<Grid item xs={3}>
							<CardContent className={classes.containerBackground}>
								<Typography color="textPrimary" variant="h4" component="h4">{user.userName}</Typography>
								<Typography color="textPrimary" variant="h5" component="h5">{`Active - ${user.isActive}`}</Typography>
								<Typography color="textPrimary" variant="h5" component="h5">{`Level - ${user.level}`}</Typography>
							</CardContent>
						</Grid>
						<Grid item xs={7}>
							<CardContent className={classes.containerBackground}>
								<Typography color="textPrimary" variant="h5" component="h5">Awards:</Typography>
							</CardContent>
						</Grid>
						<Grid item xs={5}>
							<CardContent className={classes.containerBackground}>
								<Typography color="textPrimary" variant="h5" component="h5">{`Country ${user.country}`}</Typography>
							</CardContent>
						</Grid>
						<Grid item xs={7}>
							<UserPosts />
						</Grid>
					</Grid>
				</Container>
			</main>
		</div>
	);
}

export default UserPage;
