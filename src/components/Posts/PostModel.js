	import React, { Component } from 'react'
	import styled from 'styled-components';
	import firebase from '../Firebase/firebase'
	const Wrapper = styled.div`
		width:100%;
		height: 20vh;
		border-radius: 10px;
		display:flex;
		background-color: #202020;
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

	export class PostModel extends Component {
		constructor(props) {
			super(props);
			this.state = {
				post: {},
				isEdit: false,
			};
		}

		GetPost = () => {
			const ref = firebase.firestore().collection('posts').doc();
			ref.get().then((doc) => {
				if (doc.exists) {
					this.setState({
						post: doc.data(),
						key: doc.id,
					});
				}
			});
		}

		componentDidMount() {
			this.GetPost()
		}

		render() {
			return (
				<Wrapper>
					<UserAvatarConstainer>
						<UserAvatar src={this.state.post.useravatar} alt='avatar'/>
					</UserAvatarConstainer>
					<TextConstainer>
						<UserDataConstainer>
							<UserName>{this.state.post.username}</UserName>
							<PostData>{this.state.post.dataText}</PostData>
						</UserDataConstainer>
						<ContentContainer>
							<InputContainer>{this.state.post.content}</InputContainer>
						</ContentContainer>
					</TextConstainer>
				</Wrapper>
			)
		}
	}

	export default PostModel
