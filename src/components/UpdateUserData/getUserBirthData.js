import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import {firestore, firebaseAuth} from '../Firebase/firebase'

	export default function  GetUserBirthData()  {
		const [startDate, setStartDate] = useState(new Date());

		const sendBirthData = () => {
			const data = startDate.toLocaleDateString()
			const name = firebaseAuth().currentUser.uid
			firestore().collection('users').doc(name).set({ userBirth: data }, { merge: true })
				.then(() => { console.log('success')})
		}

		return (
			<form onSubmit={sendBirthData}>
				<DatePicker
					showPopperArrow={false}
					selected={startDate}
					onChange={date => setStartDate(date)}
				/>
				<button>Submit</button>
			</form>
		);
	};


