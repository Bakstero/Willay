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
		@media screen and (max-width: 1500px){
		height: 10vh;
	}
		@media screen and (max-width: 1100px){
		height: 8vh;
	}
	@media screen and (max-width: 800px){
		height: 15vh;
		border-radius: 0px;
	}
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
		align-items: flex-end;

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
		@media screen and (max-width: 800px){
			border-radius: 0px;
	}
	`
const UserName = styled.h2`
	color: white;
	@media screen and (max-width: 1500px){
			font-size: 15px;
	}
	`
const PostData = styled.h5`
	color: white;
@media screen and (max-width: 1500px){
			font-size: 5px;
	}
	`
const ContentContainer = styled.div`
	background-color:#353535;
	border-radius: 10px;
	width:95%;
	height:60%;
	display:flex;
	justify-content: space-between;
`
const InputContainer = styled.h5`
	color: white;
	width:95%;
	font-size: 14px;
	margin-left:15px;
	@media screen and (max-width: 1500px){
			font-size: 8px;
	}
		@media screen and (max-width: 850px){
			font-size: 7px;
	}

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
