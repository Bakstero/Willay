import React, { useState, useEffect } from 'react';
import firebase, { firebaseAuth, firebaseStorage, firestore} from '../Firebase/firebase';
import { Link } from 'react-router-dom'
import FileUploader from 'react-firebase-file-uploader'
import { Styledcontent
	,Wrapper
	,StyledPostInfo
	,StyledUserIcon
	,StyledUserName
	,StyledData
	,StyledInfoContainer
	,StyledStatContainer
	,StyledLink
	,PostImage
	,StyledCommentContainer
	,AvatarContainer
	,AvatarImg
	,CommentContainer
	,Button
	,StyledContentContainer
	,CommantInput
	,ButtonsCommentContainer } from '../styles/styledAllPosts.js';

function GetAllPosts() {
	const [posts, setPosts] = useState([])
	useEffect(() => {
		firebase
			.firestore()
			.collection("posts").orderBy("data", "desc")
			.onSnapshot(snapshot => {
				const posts = snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
				}))
				setPosts(posts)
			})
	}, [])
	return posts
}

const AllPosts = () => {
	const posts = GetAllPosts();
	const user = firebaseAuth().currentUser;
	const firebasePosts = firestore().collection("posts");
	const dataInterval = Date.now().toString();
	const dataTextInterval = new Date().toLocaleString("en-us");
	const [ comment, setComment ] = useState('')

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
			}, { merge: true })
			.then(() => { getCommentsNumber(id)})
	}


	const AddLikeNumber = id => {
		firebasePosts.doc(id)
		.get().then((doc) => {
			const { likes } = doc.data();
			if (doc.exists) {
				firebasePosts.doc(id)
				.set({ likes: likes + 1 }, { merge: true })
			}
			})
	}

	const giveLike = id => {
		firebasePosts.doc(id)
		.collection('likes').doc(user.uid)
			.set({ userUid: user.uid }, { merge: true })
			.then(() => { AddLikeNumber(id) })
	}

	return (
		<div>
			{posts.map(post =>
				<Wrapper key={post.key}>
					<StyledLink to={`/home/post/${post.data}-${post.UserUid}`}>
						<StyledPostInfo>
							<Link to={`/user/${post.userLink}`}><StyledUserIcon src={post.userAvatar} /></Link>
							<StyledInfoContainer>
								<StyledUserName>{post.UserName}</StyledUserName>
								<StyledData relative date={post.dataText} />
							</StyledInfoContainer>
							<StyledInfoContainer button></StyledInfoContainer>
						</ StyledPostInfo>
						<div>
							<Styledcontent>{post.content}</Styledcontent>
						</div>
						<StyledContentContainer>
							<PostImage src={post.postImage} alt="" />
						</StyledContentContainer>
						<StyledStatContainer>
							<Styledcontent>{`likes ${post.likes}`}</Styledcontent>
							<Styledcontent comment>{`Comments ${post.commentsInPost}`}</Styledcontent>
						</StyledStatContainer>
					</StyledLink>
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
							<ButtonsCommentContainer>
								<Button onClick={() => {CreateComment(post.id)}}>Post</Button>
								<Button onClick={() => { giveLike(post.id) }}>Add like</Button>
							</ButtonsCommentContainer>
						</CommentContainer>
					</StyledCommentContainer>
				</Wrapper>
			)}
		</div>
	)
}
export default AllPosts
