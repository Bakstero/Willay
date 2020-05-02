import React, { Component} from 'react'
import {  firestore }  from '../components/firebase/firebase'
import { Styledcontent, Wrapper, StyledPostInfo, StyledUserIcon, StyledUserName, StyledData, StyledInfoContainer, StyledStatContainer, StyledLink, StyledContentContainer, PostImage } from '../components/styles/styledAllPosts'
import Navbar from '../components/layout/Navbar/Navbar'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const Avatar = styled.img`
	width: 300px;
	height: 300px;
	border-radius: 50%;
`

class UserPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			posts: [],
		};
	}

	getPostsData = () => {
		const posts = [];
		firestore().collection('posts').where("UserUid", "==", this.props.match.params.id)
		.get()
			.then(snapshot => {
				snapshot.forEach(doc => {
					const { userAvatar, content, UserName, data, dataText, UserUid, likes, commentsInPost, userLink } = doc.data();
					posts.push({
						key: doc.id,
						doc, // DocumentSnapshot
						userAvatar,
						content,
						UserName,
						data,
						UserUid,
						likes,
						commentsInPost,
						dataText,
						userLink,
					});
				});
				this.setState({
					posts
				});
			})
	}

	getUserData = () => {
		firestore().collection('users').doc(this.props.match.params.id)
		.get().then((doc) => {
			if (doc.exists) {
				this.setState({
					user: doc.data(),
					key: doc.id,
				});
			}
		});
	}

	componentDidMount () {
		this.getUserData()
		this.getPostsData()
	}

	componentDidUpdate() {
		if (this.props.match.params.id !== this.state.user.userUid ) {
			this.getUserData()
			this.getPostsData()
		}
	}

	componentWillUnmount() {
		this.getUserData()
		this.getPostsData()
	}

	render() {
		const { avatar, userEmail, userName, userBirth, level, rageLevel, description, country, region} = this.state.user
		return (
			<div >
				<Navbar />
				<div>
					<Avatar src={avatar} alt='User Avatar' />
					<h1>{userEmail}</h1>
					<h1>{userName}</h1>
					<h1>{`Birth ${userBirth}`}</h1>
					<h1>{`Lvl ${level}`}</h1>
					<h1>{`Rage ${rageLevel}`}</h1>
					<h1>{country}-{region}</h1>
					<h1>{description}</h1>
				</div>
				<div>
					{this.state.posts.map(post =>
						<Wrapper key={post.key}>
							<StyledLink to={`/user/${this.props.match.params.id}/post/${post.data}-${post.UserUid}`}>
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
									<PostImage src={post.postImage} />
								</StyledContentContainer>
								<StyledStatContainer>
									<Styledcontent>{`likes ${post.likes}`}</Styledcontent>
									<Styledcontent comment>{`Comments ${post.commentsInPost}`}</Styledcontent>
								</StyledStatContainer>
							</StyledLink>
						</Wrapper>
					)}
				</div>
			</div>
		)
	}
}
export default UserPage
