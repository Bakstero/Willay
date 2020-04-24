import React, { useState } from 'react'
import { useForm  } from 'react-hook-form'
import {firebaseAuth} from '../Firebase/firebase'

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
				<input name="email" type="email" ref={register({ required: true, })} />
				{errors.email && 'Form is empty'}
				<input name="password" type="password" ref={register({ required: true, })} />
				{errors.password && 'Form is empty'}
				<input type="submit" />
				{error && 'Email or password is incorrect'}
			</form>
		)
}
/*
			<form onSubmit={handleSubmit(onSubmit)}>
				<input name="Username" ref={register({ required: true, maxLength: 20 })} />
				{errors.Username && 'Username is required'}
				<input name="email" type="email" ref={register({ required: true, })} />
				{errors.email && 'Email is required'}
				<input name="age" type="number" ref={register({ min: 13, max: 99 })} />
				<input name="password" type="password" ref={register} />
				{errors.password && 'Email is required'}
				<input type="submit" />
			</form>
*/