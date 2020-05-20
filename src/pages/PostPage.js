import React, { useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import Timestamp from 'react-timestamp'

import { firestore } from '../components/Firebase/firebase'
import {BackHistory} from '../constants/backHistory'
import PostComments from '../components/Posts/postComments'
import CreateComment from '../components/Posts/createComment'
import RemovePost from '../components/Posts/removePost'


import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		backgroundColor:' rgba(0,0,0,.8)',
		overflowY: 'auto',
		display:' flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 9999,
		position: 'absolute',
		},
	card: {
		zIndex: 2,
		width: '35%',
		minHeight: '100vh',
		background: '#202020',
	},
	commentCard: {
		background: '#303030',
		boxShadow: 'none',
		border: '1px',
		borderRadius: '0',
		borderBottomColor: '#fb8c00',
		borderBottomStyle: 'solid',
	},
	header: {
		border: '1px',
		borderBottomColor: '#fb8c00',
		borderBottomStyle: 'solid',
	},
	media: {
		height: '100%',
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
	createPost: {
		display: 'fled',
		alignItems: 'center',
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



function PostPage (){
	const { id } = useParams()
	const classes = useStyles();
	const [post, setPost] = useState([])

	useEffect(() => {
			const fetchPost = async () => {
				const result = await firestore().collection('posts').doc(id).get()
				setPost(result.data())
			}
			fetchPost()
	}, [id])

	return (
		<div className={classes.root}>
			<BackHistory />
			<Card className={classes.card}  >
				<CardHeader className={classes.header}
					avatar={
						<Avatar aria-label="recipe" src={post.userAvatar} component={Link} to={`/user/${post.userLink}`} />
					}
					action={
						<RemovePost />
					}
					title={post.UserName}
					subheader={
						<Timestamp relative date={post.dataText} />
					}
				/>
				<CardContent >
					<TextareaAutosize className={classes.comment}
						value={post.content}
					/>
				</CardContent>
				<img src={post.postImage} className={classes.media} alt={post.postImage} />
				<CreateComment />
				<PostComments/>
			</Card>
		</div>
	)
}
export default PostPage