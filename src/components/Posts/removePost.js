import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { firestore, firebaseAuth } from '../Firebase/firebase'

import Button from '@material-ui/core/Button';

function RemovePost() {
	let history = useHistory();
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
			.then(() => { history.goBack()})
		}

	return (
		<div>
			{deletePost === true
				?
				<Button
					fullWidth
					variant="contained"
					color="secondary"
					onClick={() => { RemovePostAction() }}
				>
					Delete
				</Button>
				:
				null
			}
		</div>
	)
}

export default RemovePost
