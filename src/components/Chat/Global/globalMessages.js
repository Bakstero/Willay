import React, { useState, useEffect } from "react"
import firebase, {firebaseAuth} from '../../Firebase/firebase'

function GetGlobalMessage() {
	const [Messages, setMessages] = useState([])
	useEffect(() => {
		firebase
			.firestore()
			.collection("globalMessage")
			.onSnapshot(snapshot => {
				const Messages = snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
				}))
				setMessages(Messages)
			})
	}, [])
	return Messages
}

const DeleteMessage = () => {
	const Messages = GetGlobalMessage()
	const handleOnDelete = id => {
		firebase
			.firestore()
			.collection("globalMessage")
			.doc(id)
			.delete()
	}

	return (
		<div>
			{Messages.map(message => {
				return (
					<div>
						<h2>{message.content}</h2>
						{message.UserUid === firebaseAuth().currentUser.uid
						?
						<button onClick={() => handleOnDelete(message.id)}>X</button>
						:
						null
						}
					</div>
				)
			})}
		</div>
	)
}
export default DeleteMessage