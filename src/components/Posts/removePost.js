import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { firestore, firebaseAuth } from '../Firebase/firebase'
function RemovePost() {
	const user = firebaseAuth().currentUser
	const { id } = useParams()
	const [deletePost, setDeletePost] = useState(false)

	useEffect(()=> {
		firestore().collection('posts').doc(id)
			.get().then((doc) => {
				const { UserUid } = doc.data();
				if (doc.exists) {
					if (UserUid === user.uid) {
						setDeletePost(true)
					}
				}
			});
	})


	const RemovePostAction = () => {
		firestore().collection('posts').doc(id).delete()
		}

	return (
		<div>
			{deletePost === true
				?
				<button onClick={() => { RemovePostAction() }}>delete</button>
				:
				null
			}
		</div>
	)
}

export default RemovePost
