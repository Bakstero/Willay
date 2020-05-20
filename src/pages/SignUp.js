import React, { useState } from 'react'
import { firestore, firebaseAuth } from '../components/Firebase/firebase'
import { Link } from 'react-router-dom'

import * as ROUTE from '../constants/routes'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

function SignUp() {
	const classes = useStyles();
	const [email, setEmail] = useState('')
	const [firstName, setFirstName] = useState('')
	const [password, setPassword] = useState('')
	const [errorFName, setErrorFName] = useState(false)
	const [errorEmail, setErrorEmail] = useState(false)
	const [errorPassword, setErrorPassword] = useState(false)
	const [displayError, setDisplayError] = useState(false)
	const [displayErrorText, setDisplayErrorText] = useState('')


	const errorValid = () => {
		setErrorPassword(false)
		setErrorFName(false)
		setErrorEmail(false)

		if (!password.length) {
			setErrorPassword(true)
		}
		if (!email.length) {
			setErrorEmail(true)
		}
		if (!firstName.length) {
			setErrorFName(true)
		}
	}

	const handleSubmit = event => {
		errorValid()

		event.preventDefault()
		const avatar = 'https://firebasestorage.googleapis.com/v0/b/appwillay.appspot.com/o/avatars%2FDefaultUserAvatar.jpg?alt=media&token=aa410a73-9c7f-4d93-926c-37dae73dc136'
		firebaseAuth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				firebaseAuth().currentUser.updateProfile({
					displayName: firstName,
					photoURL: avatar,
					email: email,
				})
			})
			.then(() => {
				const user = firebaseAuth().currentUser
				firestore().collection('users').doc(user.uid).set({
					userName: firstName,
					avatar: avatar,
					userUid: user.uid,
					userEmail: email,
					backgroundImage: '',
					level: 1,
					rageLevel: 0,
					description: '',
				})
			})
			.then(() => { firebaseAuth().currentUser.sendEmailVerification() })
			.catch(err => {
				setDisplayError(true)
				setDisplayErrorText(err.message)
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
					Sign up
        </Typography>
				<form onSubmit={handleSubmit} className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								autoComplete="fname"
								type="text"
								variant="outlined"
								required
								error={errorFName}
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								name="firstName"
								placeholder="Username"
								onChange={firstName => setFirstName(firstName.target.value)}
								value={firstName}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								error={errorEmail}
								fullWidth
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
								error={errorPassword}
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={p => setPassword(p.target.value)}
								value={password}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								required
								control={<Checkbox value="allowExtraEmails" color="primary" />}
								label="accept privacy policy"
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
						Sign Up
          </Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link to={ROUTE.SIGN_IN} variant="body2">
								Already have an account? Sign in
              </Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	)
}

export default SignUp
