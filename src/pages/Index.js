import React from 'react'
import { Link } from 'react-router-dom'
import WelcomeContainer from '../components/index/welcomeContainer'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { ReactComponent as Icon } from '../components/Static/Icons/logo/Logo.svg'

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<a color="inherit" href='https://optimistic-mcnulty-9c4478.netlify.app/'>
				Willay
      </a>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	'@global': {
		ul: {
			margin: 0,
			padding: 0,
			listStyle: 'none',
		},
	},
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	toolbar: {
		flexWrap: 'wrap',
	},
	toolbarTitle: {
		flexGrow: 1,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	buttonRegister: {
		margin: theme.spacing(15	, 1.5),
	},
	heroContent: {
		padding: theme.spacing(0, 0, 10, 0),
	},
	helloContent: {
		padding: theme.spacing(8, 0,),
		display: 'flex',
		justifyContent: 'center',
		maxWidth: '100%',
		height: '85vh',
	},
	helloRightSetion: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
	},
	cardPricing: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'baseline',
		marginBottom: theme.spacing(2),
	},
	footer: {
		borderTop: `1px solid ${theme.palette.divider}`,
		marginTop: theme.spacing(8),
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		[theme.breakpoints.up('sm')]: {
			paddingTop: theme.spacing(6),
			paddingBottom: theme.spacing(6),
		},
	},
}));

const footers = [
	{
		title: 'Company',
		description: ['Team', 'History', 'Contact us', 'Locations'],
	},
	{
		title: 'Features',
		description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
	},
	{
		title: 'Resources',
		description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
	},
	{
		title: 'Legal',
		description: ['Privacy policy', 'Terms of use'],
	},
];

function Index() {
	const classes = useStyles();

	return (
		<div>
			<CssBaseline />
			<AppBar position="static" color="default" elevation={0} className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
						<Icon />
          </Typography>
					<Button component={Link} to='/signup' color="primary" variant="outlined" className={classes.link}>
						Register
          </Button>
					<Button component={Link} to='/signin' color="primary" variant="outlined" className={classes.link}>
						Login
          </Button>
				</Toolbar>
			</AppBar>
			<Container maxWidth="lg" className={classes.helloContent}>
				<WelcomeContainer />
				<Container className={classes.helloRightSetion} >
					<Typography component="h2" variant="h2" align="center" color="textPrimary">
						FAVORITE PLATFORM FOR EVERY PLAYER
        	</Typography>
					<Typography variant="h5" color="textSecondary" align="center" component="p">
						Join the best platform for players share experiences and search for people to play together
        </Typography>
					<Button component={Link} to='/signup' color="primary" variant="contained" className={classes.buttonRegister}>
						Get started for free
          </Button>
				</Container>
			</Container>
			<Container maxWidth="lg" component="main" className={classes.heroContent}>
				<Typography component="h3" variant="h3" align="center" color="textPrimary" >
					Find players for every game
        </Typography>
			</Container>
			<Container maxWidth="md" component="footer" className={classes.footer}>
				<Grid container spacing={4} justify="space-evenly">
					{footers.map((footer) => (
						<Grid item xs={6} sm={3} key={footer.title}>
							<Typography variant="h6" color="textPrimary" gutterBottom>
								{footer.title}
							</Typography>
							<ul>
								{footer.description.map((item) => (
									<li key={item}>
										<Link href="#" variant="subtitle1" color="textSecondary">
											{item}
										</Link>
									</li>
								))}
							</ul>
						</Grid>
					))}
				</Grid>
				<Box mt={5}>
					<Copyright />
				</Box>
			</Container>
		</div>
	)
}

export default Index
