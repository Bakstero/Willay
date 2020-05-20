import React, { useState, useEffect } from 'react';
import firebase  from '../Firebase/firebase';
import { Link, useParams } from 'react-router-dom'
import Timestamp from 'react-timestamp'

import CreatePost from '../Posts/createPost'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		background: '#202020',
	},
	header: {
		border: '1px',
		borderBottomColor: '#fb8c00',
		borderBottomStyle:'solid',
		textDecoration: 'none',
		color: '#fff',
	},
	modal: {
		background: 'none',
		boxShadow: 'none',
	},
	createPostModal :{
		maxWidth: "100%",
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	media: {
		height: 'auto',
		width: '100%',
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
	},
	createPost: {
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		padding: 0,
	},
	 paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	comment: {
		width: '100%',
		height: 'auto',
		overflow: 'hidden',
		background: 'none',
		color: '#fff',
		border: 'none',
		fontSize: '14px',
		resize: 'none',
		display: 'block',
		outline: 'none',
		pointerEvents: 'none',
	},

}));

function GetAllPosts() {
	const { id } = useParams()
	const [posts, setPosts] = useState([])
	useEffect(() => {
		firebase
			.firestore()
			.collection("posts").where('UserUid', '==', id).orderBy("data", "desc")
			.onSnapshot(snapshot => {
				const posts = snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
				}))
				setPosts(posts)
			})
		}, [id])
	return posts
}

const AllPosts = () => {
	const classes = useStyles();
	const posts = GetAllPosts();
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Card className={classes.modal} >
				<CardActions className={classes.createPost}>
					<Typography variant="body1" color="textSecondary" component="h2">
						POSTS
					</Typography>
					<Button variant="outlined" color="primary" type="button" onClick={handleOpen}>
						Create Post
					</Button>
					<Modal
						className={classes.createPostModal}
						open={open}
						onClose={handleClose}
					>
						<CreatePost />
					</Modal>
				</CardActions>
			</Card>
			{posts.map(post =>
				<Card  className={classes.root} >
					<CardHeader className={classes.header}
						component={Link}
						to={`/home/post/${post.data}-${post.UserUid}`}
						avatar={
							<Avatar aria-label="recipe" src={post.userAvatar} component={Link} to={`/user/${post.userLink}`} />
						}
						title={post.UserName}
						subheader={
							<Timestamp relative date={post.dataText} />
						}
					/>
					<CardContent>
						<TextareaAutosize className={classes.comment}
							value={post.content}
						/>
					</CardContent>
					<Link to={`/home/post/${post.data}-${post.UserUid}`} ><img src={post.postImage} className={classes.media} alt={post.postImage} /></Link>
					<CardActions className={classes.postInformation} >
						<Typography variant="body2" color="textSecondary" component="p">
							{`likes ${post.likes}`}
						</Typography>
						<Typography variant="body2" color="textPrimary" component="p">
							{`${post.commentsInPost} Comments`}
						</Typography>
					</CardActions>
				</Card>
			)}
		</div>
	)
}
export default AllPosts