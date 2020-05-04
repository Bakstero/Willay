import React, { Component } from 'react'
import styled from 'styled-components'
import GlobalMessages from './globalMessages'
import CreateMessage from './createMessage'
import Link from 're'
const Wrapper = styled.div`
	padding:12px;
	width:800px;
	height:500px;
	position: fixed;
	right:20px;
	bottom:0;
	background-color: #202020;
	border-radius:10px 10px 0px 0px;
`
const AllMessagesContainer = styled.div`
	overflow-Y: scroll;
	height:70%;
`
export class ChatModal extends Component {
	render() {
		return (
			<Wrapper>
				<AllMessagesContainer>
					<GlobalMessages />
				</AllMessagesContainer>
					<CreateMessage />
			</Wrapper>
		)
	}
}

export default ChatModal
