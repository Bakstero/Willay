import React, { useState, useEffect } from 'react'
import { firestore } from '../Firebase/firebase'
import { Link, useParams } from 'react-router-dom'
import {
	AvatarImg,
	StyledInfoContainer,
	StyledUserName,
	StyledData,
	Styledcontent,
	StyledCommentsInfo,
	PostImage,
} from '../styles/styledPostPage'
function GetAllComments() {
	const [comments, setcomments] = useState([])
	const {id} = useParams()
	useEffect(() => {
			firestore()
			.collection("posts").doc(id).collection('comments')
			.onSnapshot(snapshot => {
				console.log(snapshot)
				const comments = snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
				}))
				setcomments(comments)
			})
	}, [])
	return comments
}

const PostComments = () => {
	const comments = GetAllComments()
	return (
		<div>
			{comments.map(comment =>
				<div>
					<StyledCommentsInfo>
						<div>
							<Link to={`/user/${comment.userLink}`}><AvatarImg Usercomment src={comment.userAvatar} /></Link>
						</div>
						<StyledInfoContainer>
							<StyledUserName comment >{comment.userName}</StyledUserName>
							<StyledData relative date={comment.dataText} />
						</StyledInfoContainer>
					</ StyledCommentsInfo>
					<div>
						<Styledcontent>{comment.content}</Styledcontent>
						<PostImage comment src={comment.commentImage} />
					</div>
				</div>
			)}
		</div>
	)
}
export default PostComments

