import React from 'react'
import styled from 'styled-components'
import GlobalMessages from './globalMessages'
import CreateMessage from './createMessage'

const Wrapper = styled.div`
	padding:12px;
	width:25%;
	height:80%;
	position: fixed;
	right:10px;
	bottom:0;
	background-color: #202020;
	border-radius:10px 10px 0px 0px;
`

const AllMessagesContainer = styled.div`
	overflow-Y: scroll;
	height:90%;
`

function ChatModal(){
		return (
			<Wrapper>
				<AllMessagesContainer>
					<GlobalMessages />
				</AllMessagesContainer>
					<CreateMessage />
			</Wrapper>
		)
}

export default ChatModal
