import React, { useState, } from 'react';
import { Link, useParams } from 'react-router-dom'
import { dataInterval, dataTextInterval} from '../../constants/dataInterval'
import { firestore, firebaseAuth} from '../Firebase/firebase'
import PostLikes from './postLikes'

import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Snackbar from '@material-ui/core/Snackbar';
import Avatar from '@material-ui/core/Avatar';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
	Modalroot: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
	root: {
		width: '100%',
		backgroundColor: "#202020",
		borderTopStyle: 'solid',
		borderTopColor: '#fb8c00',
		border: '1px',
		marginTop: '12px',
		borderRadius: '0',
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '12px',
		borderBottomStyle: 'solid',
		borderBottomColor: '#fb8c00',
		border: '1px',
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
	media: {
		height: 0,
		paddingTop: '56.25', // 16:9
		marginBottom: '2%',
	},
	textArea: {
		background: 'none',
		border: 'none',
		width: '100%',
		resize: 'none',
		outline: 'none',
		color: '#fff',
		fontSize: '14px',
		padding: '18px',
	},
	actions: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
}));

function CreateComment() {
	const user = firebaseAuth().currentUser
	const { id } = useParams()
	const firebasePosts = firestore().collection("posts");
	const [comment, setComment] = useState('')
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const errorValid = () => {
		setError(false)
		if (!comment.length) {
			setError(true)
			return false
		} else {
			return true
		}
	}

	const getCommentsNumber = id => {
		firebasePosts.doc(id)
			.get().then((doc) => {
				const { commentsInPost } = doc.data();
				if (doc.exists) {
					firebasePosts.doc(id)
						.set({ commentsInPost: commentsInPost + 1 }, { merge: true })
				}
			})
	}
	const CreateComment = id => {
		if(errorValid()){
			firebasePosts.doc(id)
				.collection('comments').doc(dataInterval)
				.set({
					content: comment,
					data: dataInterval,
					dataText: dataTextInterval,
					userName: user.displayName,
					userUid: user.uid,
					userAvatar: user.photoURL,
				}, { merge: true })
				.then(() => { getCommentsNumber(id) })
				.then(() => { setSuccess(true);})
		}
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSuccess(false);
	}

	const classes = useStyles();
	return (
		<div>
			<Card className={classes.root}>
				<CardContent>
					<Grid container spacing={1}>
						<Grid item >
							<Avatar component={Link} aria-label="recipe" className={classes.avatar} src={firebaseAuth().currentUser.photoURL}></Avatar>
						</Grid>
						<Grid item xs={1}>
							<Typography variant="span" component="span">{user.displayName}</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextareaAutosize  className={classes.textArea}
								required
								rowsMax={10}
								name="comment"
								type="text"
								placeholder={`whats up ${user.displayName} ?`}
								onChange={e => setComment(e.target.value)}
								error={error}
							/>
						</Grid>
					</Grid>
					<Grid container className={classes.actions} >
						<Grid item xs={2} >
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="transparent"
								className={classes.submit}
								onClick={() => { CreateComment(id) }}
							>
							Comment
						</Button>
						</Grid>
						<Grid item xs={2}>
							<PostLikes />
						</Grid>
					</Grid>
				</CardContent>
			</Card>
			<div>
				<Snackbar open={error} autoHideDuration={6000}>
					<Alert variant="filled" severity="error">
						Comment must have a text!
       		</Alert>
				</Snackbar>
				<Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
					<Alert variant="filled" onClose={handleClose} severity="success">
						Successful create post!
					</Alert>
				</Snackbar>
			</div>
		</div>
	)
}

export default CreateComment
/*
		<div>
			<div>
				<div>
					<Link><img comment src={firebaseAuth().currentUser.photoURL} /></Link>
				</div>
				<div>
					<input maxLength="700"
						onChange={e => setComment(e.target.value)}
						name="comment"
						type="text"
						placeholder="Write a comment..."
						maxRows={9}
					/>
				
					<div>
						<button onClick={() => { CreateComment(id) }}>Post</button>
					</div>
				</div>
			</div>
		</div>
*/