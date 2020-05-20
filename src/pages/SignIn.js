import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as ROUTE from '../constants/routes'
import { firebaseAuth } from '../components/Firebase/firebase'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function SignIn() {
	const classes = useStyles();
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errorEmail, setErrorEmail] = useState(false)
	const [displayError, setDisplayError] = useState(false)
	const [errorPassword, setErrorPassword] = useState(false)
	const [displayErrorText, setDisplayErrorText] = useState('')

	const errorValid = () => {
		setErrorPassword(false)
		setErrorEmail(false)
		if (!email.length) {
			setErrorEmail(true)
		}
		if (!password.length) {
			setErrorPassword(true)
		}
	}

	const handleSubmit = event => {
		errorValid()
		event.preventDefault()
		firebaseAuth()
			.signInWithEmailAndPassword(email, password)
			.catch(err => {
				setDisplayErrorText(err.message)
				setDisplayError(true)
			})
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign In
        </Typography>
				<form onSubmit={handleSubmit} className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								error={errorEmail}
								id="email"
								label="Email Address"
								name="email" type="email" placeholder="Email"
								autoComplete="email"
								onChange={e => setEmail(e.target.value)}
								value={email}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								error={errorPassword}
								label="Password"
								id="password"
								autoComplete="current-password"
								name="password" type="password" placeholder="password"
								onChange={p => setPassword(p.target.value)}
								value={password}
							/>
						</Grid>
						<Grid item xs={12}>
							{displayError === true
								?
								<Alert variant="filled" severity="error">{displayErrorText}</Alert>
								:
								null
							}
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
          </Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link to={ROUTE.SIGN_UP} variant="body2">
								Don't have an account? Sign Up
              </Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	)
}

export default SignIn
