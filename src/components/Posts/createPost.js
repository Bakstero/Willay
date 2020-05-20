import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import { firebaseStorage, firebaseAuth, firestore } from '../Firebase/firebase'
import {dataInterval, dataTextInterval} from '../../constants/dataInterval'
import FileUploader from 'react-firebase-file-uploader'

import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Snackbar from '@material-ui/core/Snackbar';
import Avatar from '@material-ui/core/Avatar';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '550px',
		backgroundColor: "#202020",
		maxHeight: '98vh',
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
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
		marginBottom: '2%',
	},
	textArea: {
		background: 'none',
		border: 'none',
		width: '100%',
		resize: 'none',
		outline: 'none',
		color: '#fff',
		fontSize: '24px',
	},
}));


function NewCreatePost() {
	const classes = useStyles();
	const user = firebaseAuth().currentUser;
	const [post, setPost] = useState('');
	const [postImage, setPostImage] = useState('');
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSuccess(false);
	};

	const handleSubmit = event => {
		event.preventDefault()
		if(errorValid()){
			firestore().collection('posts').doc(`${dataInterval}-${user.uid}`).set({
				content: post,
				data: dataInterval,
				userAvatar: user.photoURL,
				UserName: user.displayName,
				UserUid: user.uid,
				dataText: dataTextInterval,
				postImage: postImage,
				userLink: user.uid,
				likes: 0,
				commentsInPost: 0,
			})
			setPost('')
			setPostImage('')
		}

	}
	const handleUploadSuccess = filename => {
		firebaseStorage().ref('postsImages').child(filename).getDownloadURL()
			.then(url => { setPostImage(url)} )
			.then(() => { setSuccess(true);})
	}

	const errorValid = () => {
		setError(false)
		if (!post.length) {
			setError(true)
			return false
		} else {
			return true
		}
	}

	return (
		<div>
			<Card className={classes.root}>
				<div className={classes.header}>
					<Typography variant="h5" component="h2">
						Create Post
					</Typography>
				</div>
				<CardHeader
					avatar={
						<Avatar component={Link} aria-label="recipe" className={classes.avatar} src={user.photoURL}></Avatar>
					}
					title={user.displayName}
				/>
				<CardContent>
					<form onSubmit={handleSubmit} className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextareaAutosize className={classes.textArea}
									required
									rowsMax={10}
									name="comment"
									type="text"
									placeholder={`whats up ${user.displayName} ?`}
									onChange={post => setPost(post.target.value)}
									value={post}
									error={error}
								/>
							</Grid>
							<Grid item xs={12}>
								<FileUploader
									accept='image/*'
									name='image'
									randomizeFilename
									storageRef={firebaseStorage().ref('postsImages')}
									onUploadSuccess={handleUploadSuccess}
									metadata={{ cacheControl: 'max-size=1000' }}
								/>
							</Grid>
							<Grid item xs={12}>
								<CardMedia
									className={classes.media}
									image={postImage}
									alt=""
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Create Post
          </Button>
					</form>
				</CardContent>
			</Card>
			<div>
				<Snackbar open={error} autoHideDuration={6000}>
					<Alert variant="filled"  severity="error">
						Post must have a text!
       		</Alert>
				</Snackbar>
				<Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
					<Alert variant="filled" onClose={handleClose} severity="success">
						Successful upload image!
					</Alert>
				</Snackbar>
			</div>
		</div>
	)
}

export default NewCreatePost
/*
	<div>
						<form onSubmit={handleSubmit}>
							<h1>Crate Post</h1>
							<input
								onChange={e => setPost(e.target.value)}
								placeholder="Write something.."
								name="comment"
								type="text"
								value={post} />
							<div>
							
								<button createPost type="submit">Create Post</button>
							</div>
							<img src={postImage} alt=''/>
						</form>
					</div>

*/