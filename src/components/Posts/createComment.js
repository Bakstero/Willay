import React, { useState, useEffect,  } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom'
import { dataInterval, dataTextInterval} from '../../constants/dataInterval'
import FileUploader from 'react-firebase-file-uploader'
import { firestore, firebaseAuth, firebaseStorage } from '../Firebase/firebase'
import {
	Wrapper,
	BackDiv,
	Postdiv,
	AvatarImg,
	StyledPostInfo,
	StyledInfoContainer,
	StyledUserName,
	StyledData,
	Styledcontent,
	StyledStatContainer,
	StyledCommentContainer,
	AvatarContainer,
	ButtonsCommentContainer,
	CommentContainer,
	CommantInput,
	CommentsContainter,
	StyledSpan,
	StyledCommentsInfo,
	PostImage,
	Button
} from '../styles/styledPostPage'



function CreateComment() {
	const user = firebaseAuth().currentUser
	const { id } = useParams()
	const firebasePosts = firestore().collection("posts");
	const [comment, setComment] = useState('')
	const [imageComment, setImagecomment] = useState('')

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
		firebasePosts.doc(id)
			.collection('comments').doc(dataInterval)
			.set({
				content: comment,
				data: dataInterval,
				dataText: dataTextInterval,
				userName: user.displayName,
				userUid: user.uid,
				userAvatar: user.photoURL,
				commentImage: imageComment,
			}, { merge: true })
			.then(() => { getCommentsNumber(id) })
	}
	const handleUploadSuccess = filename => {
		firebaseStorage().ref('postsImages').child(filename).getDownloadURL()
			.then(url => { setImagecomment(url) })
			.then(() => { console.log(imageComment) })
	}

	return (
		<div>
			<StyledCommentContainer>
				<AvatarContainer>
					<Link><AvatarImg comment src={firebaseAuth().currentUser.photoURL} /></Link>
				</AvatarContainer>
				<CommentContainer>
					<CommantInput maxLength="700"
						onChange={e => setComment(e.target.value)}
						name="comment"
						type="text"
						placeholder="Write a comment..."
						maxRows={9}
					/>
					<FileUploader
						accept='image/*'
						name='image'
						randomizeFilename
						storageRef={firebaseStorage().ref('postsImages')}
						onUploadSuccess={handleUploadSuccess}
						metadata={{ cacheControl: 'max-size=1000' }}
					/>
					<ButtonsCommentContainer>
						<Button onClick={() => { CreateComment(id) }}>Post</Button>
					</ButtonsCommentContainer>
				</CommentContainer>
			</StyledCommentContainer>
		</div>
	)
}

export default CreateComment
