import React from 'react'

import AllPosts from './AllPosts'
import AllUsers from './AllUsers'
import { mainListItems } from '../layout/listItems';
import { ReactComponent as Logo } from '../Static/Icons/logo/Logo.svg'
import UserIcon from '../layout/userIcon'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';

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
		position: 'fixed',
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
	paper: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(2),
		overflow: 'auto',
		flexDirection: 'column',
		background: 'none',
		boxShadow: 'none',
	},
	fixedHeight: {
		height: '100%',
	},

}));

export default function Dashboard() {
	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		if(open === true) {
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
							<Logo/>
						:
							<Logo />
						}
					</IconButton>
				</div>
				<Divider />
				<List>{mainListItems}</List>
				<Divider />
				<List><AllUsers/></List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
							<Paper className={fixedHeightPaper}>
								<AllPosts />
							</Paper>
				</Container>
			</main>
		</div>
	);
}