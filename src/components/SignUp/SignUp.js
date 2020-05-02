import React from 'react'
import { useForm } from 'react-hook-form'
import { firestore, firebaseAuth} from '../Firebase/firebase'

function SignUpForm() {
	const { register, errors, handleSubmit } = useForm()

	const onSubmit = data => {
		const avatar = 'https://firebasestorage.googleapis.com/v0/b/appwillay.appspot.com/o/avatars%2FDefaultUserAvatar.jpg?alt=media&token=aa410a73-9c7f-4d93-926c-37dae73dc136'
		firebaseAuth()
			.createUserWithEmailAndPassword(data.email, data.password)
			.then(() => {
				firebaseAuth().currentUser.updateProfile({
					displayName: data.firstName,
					photoURL: avatar,
					email: data.email,
				})
			})
			.then(() => {
				const user = firebaseAuth().currentUser
				firestore().collection('users').doc(user.uid).set({
					userName: data.firstName,
					avatar: avatar,
					userUid: user.uid	,
					userEmail: data.email,
					backgroundImage:'',
					level: 1,
					rageLevel: 0,
					description: '',
				})
			})
	}

		return (
			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input name="firstName" placeholder="Username" ref={register({ required: true, maxLength: 20 })} />
					{errors.firstName?.type === "required" && 'firstName is required'}
					{errors.firstName?.type === "maxLength" && 'Max lenght is 20'}

					<input name="email" type="email" placeholder="Email" ref={register({ required: true, })} />
					{errors.email && 'Email is required'}

					<input name="password" type="password" placeholder="Password" ref={register({ required: true, minLength: 6})} />
					{errors.password?.type === "required" && 'Password is required'}
					{errors.password?.type === "minLength" && 'Password is too short'}

					<input type="submit" />
				</form>
			</div>
		)
}
export default SignUpForm