import React from 'react'
import GlobalMessages from './globalMessages'
import CreateMessage from './createMessage'

function ChatModal(){
		return (
			<div>
				<div>
					<GlobalMessages />
				</div>
					<CreateMessage />
			</div>
		)
}

export default ChatModal
