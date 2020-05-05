import React, { Component } from 'react'
import { firestore } from '../../Firebase/firebase'
import Timestamp from 'react-timestamp'
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
	width:80%;
`
const Img = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
}
`
const StyledTimestamp = styled(Timestamp)`
	color:red;

	${Img}:hover & {
    color: blue;
  }
`;


export class globalMessages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
		};
	}

	getAllMessages = () => {
		const messages = [];
		firestore().collection('globalMessage').orderBy("data")
		.get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				const { content, dataText, UserName, messageImage, userAvatar, UserUid } = doc.data();
				messages.push({
					key: doc.id,
					doc, // DocumentSnapshot
					content,
					dataText,
					UserName,
					messageImage,
					userAvatar,
					UserUid,
				});
				this.setState({
				messages
				});
			})
		})
	}

	componentDidMount() {
		this.getAllMessages()
	}

	render() {
		return (
			<div>
				<Wrapper>
					{this.state.messages.map(messages =>
						<div>
							<div>
								<Link to={`user/${messages.UserUid}`}><Img src={messages.userAvatar} /></Link>
								<h1>{messages.UserName}</h1>
							</div>
							<StyledTimestamp relative date={messages.dataText} />
							<span>{messages.content}</span>
						</div>
					)}
				</Wrapper>
			</div>
		)
	}
}

export default globalMessages

/*

*/