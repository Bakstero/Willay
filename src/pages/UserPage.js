import React, { Component} from 'react'
import { firebaseAuth, firestore }  from '../components/Firebase/firebase'
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
		this.ref = firestore().collection('posts').where("UserUid", "==", this.props.match.params.id)
		this.unsubscribe = null;
		this.state = {
			user: {},
			posts: [],
			isEdit: false,
			key: '',
			data: this.DataInterval,
			reload: false,
		};
	}

	userPrivilege = () => {
		if (firebaseAuth().currentUser.uid === this.props.match.params.id) {
			this.setState({
				isEdit: true,
			})
		} else {
			this.setState({
				isEdit: false,
			})
		}
	}

	GetUserData = () => {
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

	onCollectionUpdate = (querySnapshot) => {
		const posts = [];
		querySnapshot.forEach((doc) => {
			const { userAvatar, content, UserName, data, UserUid, userBirthy } = doc.data();
			posts.push({
				key: doc.id,
				doc, // DocumentSnapshot
				userAvatar,
				content,
				UserName,
				data,
				UserUid,
				userBirth,
			});
		});
		this.setState({
			posts
		});
	}


	componentDidMount () {
		this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
		this.GetUserData()
		this.userPrivilege()
	}


	render() {
		const { avatar, userEmail, userName, userBirth, level, rageLevel, description, country, region} = this.state.user
		const { isEdit, key} = this.state

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
					{isEdit === true
						?
						<div>
							<Link to={`/edit/user/${key}`}><button>Edit</button></Link>
						</div>
						:
						null //In the future, there will be a "add friend" / "remove friend" button
					}
				</div>
				<div>
					{this.state.posts.map(post =>
						<Link to={`/post/${post.data}-${post.UserUid}`}>
							<div>
								<h1>{post.UserName}</h1>
								<h1>{post.content}</h1>
							</div>
						</Link>
					)}
				</div>
			</div>
		)
	}
}
export default UserPage