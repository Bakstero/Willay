import React, { Component } from 'react'
import { firestore } from '../../firebase/firebase'
import Timestamp from 'react-timestamp'
import styled from 'styled-components';

const Wrapper = styled.div`
	width:80%;
`

export class globalMessages extends Component {
	constructor(props) {
		super(props);
		this.ref = firestore().collection('globalMessage').orderBy("data");
		this.unsubscribe = null;
		this.commentUnsubscribe = null;
		this.state = {
			messages: [],
		};
	}
	onCollectionUpdate = (querySnapshot) => {
		const messages = [];
		querySnapshot.forEach((doc) => {
			const { content, dataText, UserName, messageImage, userAvatar } = doc.data();
			messages.push({
				key: doc.id,
				doc, // DocumentSnapshot
				content,
				dataText,
				UserName,
				messageImage,
				userAvatar,
			});

		});
		this.setState({
			messages
		});
	}

	componentDidMount() {
		this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
	}

	render() {
		return (
			<div>
				<Wrapper>
					{this.state.messages.map(messages =>
						<div>
							<h1>{messages.UserName}</h1>
							<Timestamp relative date={messages.dataText} />
							<h5>{messages.content}</h5>
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