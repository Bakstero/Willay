import React, { Component } from 'react';
import { firestore} from '../firebase/firebase';
import { Link } from 'react-router-dom'
import { Styledcontent,
	Wrapper,
	StyledPostInfo,
	StyledUserIcon,
	StyledUserName,
	StyledData,
	StyledInfoContainer,
	StyledStatContainer,
	StyledLink,
	PostImage,
	StyledContentContainer,
} from '../styles/styledAllPosts.js'
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


	render() {
		return (
			<div>
				{this.state.posts.map(post =>
					<Wrapper key={post.key}>
						<StyledLink to={`/home/post/${post.data}-${post.UserUid}`}>
					<StyledPostInfo>
						<Link to={`/user/${post.userLink}`}><StyledUserIcon src={post.userAvatar}/></Link>
					<StyledInfoContainer>
						<StyledUserName>{post.UserName}</StyledUserName>
						<StyledData relative date={post.dataText}/>
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
		);
	}
}

export default AllPosts;
