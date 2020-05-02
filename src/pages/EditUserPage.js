import React from 'react'
import EditUser from '../components/edituserPage/EditUser'
import GetUserBirthData from '../components/updateUserData/getUserBirthData'
import GetUserCountry from '../components/updateUserData/getUserCountry'
function EditUserPage() {
	return (
		<div>
			<EditUser />
			<GetUserBirthData />
			<GetUserCountry />
		</div>
	)
}

export default EditUserPage
