import React, { useState } from 'react'
import { useForm  } from 'react-hook-form'
import {firebaseAuth} from '../firebase/firebase'

export default function SignInForm() {
	const { register, errors, handleSubmit} = useForm()
	const [error, setError] = useState()

	const onSubmit = data => {
		firebaseAuth()
			.signInWithEmailAndPassword(data.email, data.password)
			.catch(err => {
				setError(error + err);
			})
	}

		return (
			<form onSubmit={handleSubmit(onSubmit)}>
				<input name="email" type="email" placeholder="Email" ref={register({ required: true, })} />
				{errors.email && 'Form is empty'}
				<input name="password" type="password" placeholder="Password" ref={register({ required: true, })} />
				{errors.password && 'Form is empty'}
				<input type="submit" />
				{error && 'Email or password is incorrect'}
			</form>
		)
}