import React, { useState, useEffect} from 'react'
import { firestore,firebaseAuth } from '../components/Firebase/firebase'
import { Link, useParams } from 'react-router-dom'
import {BackHistory} from '../constants/backHistory'
import PostComments from '../components/Posts/postComments'
import CreateComment from '../components/Posts/createComment'
import PostLikes from '../components/Posts/postLikes'
import RemovePost from '../components/Posts/removePost'
import {
	Wrapper,
	Postdiv,
	AvatarImg,
	StyledPostInfo,
	StyledInfoContainer,
	StyledUserName,
	StyledData,
	Styledcontent,
	StyledStatContainer,
	PostImage,
	Button
} from '../components/styles/styledPostPage'

function PostPage (){
	const { id } = useParams()
	const [post, setPost] = useState([])

	useEffect(() => {
			const fetchPost = async () => {
				const result = await firestore().collection('posts').doc(id).get()
				setPost(result.data())
			}
			fetchPost()
	}, [id])


	return (
		< Wrapper >
			<BackHistory />
			<Postdiv>
				< StyledPostInfo>
					<div>
						<Link to={`/user/${post.userLink}`}><AvatarImg src={post.userAvatar} /></Link>
					</div>
					<StyledInfoContainer>
						<StyledUserName>{post.UserName}</StyledUserName>
						<StyledData relative date={post.dataText} />
						<RemovePost/>
					</StyledInfoContainer>
				</ StyledPostInfo>
				<div>
					<Styledcontent>{post.content}</Styledcontent>
					<PostImage src={post.postImage} />
				</div>
				<StyledStatContainer>
					<Styledcontent>{`likes ${post.likes}`}</Styledcontent>
					<Styledcontent comment>{`Comments ${post.commentsInPost}`}</Styledcontent>
				</StyledStatContainer>
				<div>
					<CreateComment />
					<PostLikes />
				</div>
				<StyledStatContainer>
					<PostComments />
				</StyledStatContainer>
			</Postdiv>
		</ Wrapper>
	)
}
export default PostPage
