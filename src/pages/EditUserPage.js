import React from 'react'
import EditUser from '../components/EdituserPage/EditUser'
import GetUserBirthData from '../components/UpdateUserData/getUserBirthData'
import GetUserCountry from '../components/UpdateUserData/getUserCountry'
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
