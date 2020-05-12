import React, { useState} from 'react'
import { firebaseStorage, firebaseAuth, firestore } from '../Firebase/firebase'
import {dataInterval, dataTextInterval} from '../../constants/dataInterval'
import{ WrapperContainter, Wrapper, MainContainer, Form,CommantInput,Button,ButtonsContainer,Img,Modal} from '../styles/styledCreatePost'
import FileUploader from 'react-firebase-file-uploader'
function NewCreatePost() {
	const user = firebaseAuth().currentUser
	const [post, setPost] = useState('')
	const [postImage, setPostImage] = useState('')

	const handleSubmit = event => {
		event.preventDefault()
		firestore().collection('posts').doc(`${dataInterval}-${user.uid}`).set({
			content: post,
			data: dataInterval,
			userAvatar: user.photoURL,
			UserName: user.displayName,
			UserUid:	user.uid,
			dataText: dataTextInterval,
			postImage: postImage,
			userLink: user.uid,
			likes:0,
			commentsInPost:0,
			})
		setPost('')
		setPostImage('')
	}
	const handleUploadSuccess = filename => {
		firebaseStorage().ref('postsImages').child(filename).getDownloadURL()
			.then(url => { setPostImage(url)} )
			.then(() => { console.log(postImage) })
	}

	return (
		<WrapperContainter>
					<MainContainer>
						<Form onSubmit={handleSubmit}>
							<h1>Crate Post</h1>
							<CommantInput
								onChange={e => setPost(e.target.value)}
								placeholder="Write something.."
								name="comment"
								type="text"
								value={post} />
							<ButtonsContainer>
								<FileUploader
									accept='image/*'
									name='image'
									randomizeFilename
									storageRef={firebaseStorage().ref('postsImages')}
									onUploadSuccess={handleUploadSuccess}
									metadata={{ cacheControl: 'max-size=1000' }}
								/>
								<Button createPost type="submit">Create Post</Button>
							</ButtonsContainer>
							<Img src={postImage} alt=''/>
						</Form>
					</MainContainer>
		</WrapperContainter>
	)
}

export default NewCreatePost
