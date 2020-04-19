import React, { Component } from 'react'
import styled from 'styled-components';
import { firestore} from '../Firebase/firebase'
import {Link} from 'react-router-dom'

const Wrapper = styled.div`
		width:100%;
		height: 20vh;
		border-radius: 10px;
		display:flex;
		background-color: #202020;
		margin-top: 50px;
	`
const UserAvatarConstainer = styled.div`
		width:22%;
		height:100%;
		border-radius: 10px 0px 0px 10px;
	`
const TextConstainer = styled.div`
		width:78%;
		height:100%;
		border-radius: 0px 10px 10px 0px;
		display: flex;
		flex-direction: column;
	`
const UserDataConstainer = styled.div`
		width:100%;
		min-height:40%;
		display: flex;
		flex-direction:row;
		justify-content: space-around;
		align-items:center;
	`
const UserAvatar = styled.img`
		width:100%;
		height:100%;
		display: flex;
		border-radius: 10px 0px 0px 10px;
	`
const UserName = styled.h2`
	color: white;
	`
const PostData = styled.h5`
	color: white;

	`
const ContentContainer = styled.div`
	width:100%;
	height:60%;
`
const InputContainer = styled.h5`
color: white;
`
export class PostContainer extends Component {
	constructor(props) {
		super(props);
		this.ref = firestore().collection('posts').orderBy("data", "desc");
		this.unsubscribe = null;
		this.state = {
			posts: []
		};
	}

	onCollectionUpdate = (querySnapshot) => {
		const posts = [];
		querySnapshot.forEach((doc) => {
			const { content, data, userAvatar, UserName, dataText, userLink } = doc.data();
			posts.push({
				key: doc.id,
				content, // DocumentSnapshot
				data,
				userAvatar,
				UserName,
				dataText,
				userLink,
			});
		});
		this.setState({
			posts
		});
	}

	componentDidMount() {
		this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
	}

	render() {
		return (
			<div>
				<h1>All posts</h1>
				{this.state.posts.map(post =>
					<Wrapper>
						<UserAvatarConstainer>
							<Link to={`user/${post.userLink}`}><UserAvatar src={post.userAvatar} alt='avatar' /></Link>
						</UserAvatarConstainer>
						<TextConstainer>
							<UserDataConstainer>
								<UserName>{post.UserName}</UserName>
								<PostData>{post.dataText}</PostData>
							</UserDataConstainer>
							<ContentContainer>
								<InputContainer>{post.content}</InputContainer>
							</ContentContainer>
						</TextConstainer>
					</Wrapper>
				)}
			</div>
		);
	}
}

export default PostContainer