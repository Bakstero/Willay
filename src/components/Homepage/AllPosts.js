import React, { Component } from 'react';
import { firestore} from '../Firebase/firebase';
import { Link } from 'react-router-dom'
import { Styledcontent, Wrapper, StyledPostInfo, StyledUserIcon, StyledUserName, StyledData, StyledInfoContainer, StyledStatContainer, StyledLink } from '../styles/styledAllPosts.js'
class AllPosts extends Component {
	constructor(props) {
		super(props);
		this.ref = firestore().collection('posts').orderBy("data", "desc");
		this.Commentref = firestore().collection('posts');
		this.unsubscribe = null;
		this.commentUnsubscribe = null;
		this.state = {
			posts: [],
		};
	}

	onCollectionUpdate = (querySnapshot) => {
		const posts = [];
		querySnapshot.forEach((doc) => {
			const { userAvatar, content, UserName, data, dataText, UserUid, likes, commentsInPost, userLink, postImage } = doc.data();
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
				postImage,
			});

		});
		this.setState({
			posts
		});
	}

	componentDidMount() {
		this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
	}
	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	};

	render() {
		return (
			<div>
				{this.state.posts.map(post =>
					<Wrapper>
						<StyledLink to={`/home/post/${post.data}-${post.UserUid}`}>
					<StyledPostInfo>
							<div>
								<Link to={`/user/${post.userLink}`}><StyledUserIcon src={post.userAvatar} /></Link>
							</div>
							<StyledInfoContainer>
								<StyledUserName>{post.UserName}</StyledUserName>
								<StyledData relative date={post.dataText}/>
							</StyledInfoContainer>
							<StyledInfoContainer button>
							</StyledInfoContainer>
					</ StyledPostInfo>
					<div>
						<Styledcontent>{post.content}</Styledcontent>
						<img src={post.postImage} />
					</div>
					<StyledStatContainer>
						<Styledcontent>{`likes ${post.likes}`}</Styledcontent>
						<Styledcontent comment>{`Comments ${post.commentsInPost}`}</Styledcontent>
					</StyledStatContainer>
						</StyledLink>
						<div>
						</div>
					</Wrapper>
				)}
			</div>
		);
	}
}

export default AllPosts;
