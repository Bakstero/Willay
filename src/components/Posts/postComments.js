import React, { useState, useEffect } from 'react'
import { firestore } from '../Firebase/firebase'
import { Link, useParams } from 'react-router-dom'
import Timestamp from 'react-timestamp'


import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	commentCard: {
		background: '#202020',
		boxShadow: 'none',
		border: '1px',
		borderRadius: '0',
		borderTopColor: '#fb8c00',
		borderTopStyle: 'solid',
	},
	comment: {
		width: '100%',
		height: 'auto',
		overflow: 'hidden',
		background: 'none',
		color: '#fff',
		border: 'none',
		fontSize:'14px',
		resize: 'none',
		display: 'block',
		outline: 'none',
		pointerEvents: 'none',
	},
}));

function GetAllComments() {
	const [comments, setcomments] = useState([])
	const {id} = useParams()

	useEffect(() => {
			firestore()
			.collection("posts").doc(id).collection('comments')
			.onSnapshot(snapshot => {
				const comments = snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
				}))
				setcomments(comments)
			})
	}, [id])
	return comments
}


const PostComments = () => {
	const classes = useStyles()
	const comments = GetAllComments()

	return (
		<div>
			{comments.map(comment =>
				<Card className={classes.commentCard} >
					<CardHeader
						avatar={
							<Avatar aria-label="recipe" src={comment.userAvatar} component={Link} to={`/user/${comment.userUid}`} />
						}
						title={comment.userName}
						subheader={
							<Timestamp relative date={comment.dataText} />
						}
					/>
					<CardContent>
						<TextareaAutosize className={classes.comment}
							value={comment.content}
						/>
					</CardContent>
				</Card>
			)}
		</div>
	)
}
export default PostComments

