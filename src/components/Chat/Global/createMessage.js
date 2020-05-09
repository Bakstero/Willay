import React from 'react'
import { firebaseAuth, firestore} from '../../Firebase/firebase'
import { useForm } from 'react-hook-form'

export default function CreateMessage() {
	const { register, errors, handleSubmit } = useForm()

	const onSubmit = data => {
		const DataInterval = Date.now().toString()
		const dataTextInterval = new Date().toLocaleString("en-us")
		const user = firebaseAuth().currentUser
		firestore().collection('globalMessage').doc(DataInterval).set({
			content: data.message,
			data: DataInterval,
			dataText: dataTextInterval,
			UserName: user.displayName,
			UserUid: user.uid,
			UserAvatar: user.photoURL,
		})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input name="message" type="message" placeholder="Create Message" ref={register({ required: true, })} />
			{errors.message && 'message is empty'}
			<button type='submit'>Send</button>
		</form>
	)
}
