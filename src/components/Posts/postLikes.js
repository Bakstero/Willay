import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { firestore, firebaseAuth } from '../Firebase/firebase'

import Button from '@material-ui/core/Button';
function PostLikes() {
	const user = firebaseAuth().currentUser
	const { id } = useParams()
	const [likeAuth, setLikeAuth] = useState(true)

	useEffect(()=> {
		firestore().collection('posts').doc(id).collection('likes').doc(user.uid)
			.get().then((doc) => {
				if (doc.exists) {
					setLikeAuth(false)
				} else {
					setLikeAuth(true)
				}
			})
	})

	const AddLikeNumber = () => {
		firestore().collection('posts').doc(id)
			.get().then((doc) => {
				const { likes } = doc.data();
				if (doc.exists) {
					firestore().collection('posts').doc(id).set({ likes: likes + 1 }, { merge: true })
				}
			})
	}

	const addLike = () => {
		firestore().collection('posts').doc(id).collection('likes').doc(user.uid)
			.set({ userUid: user.uid }, { merge: true })
			.then(() => { AddLikeNumber() })
			.then(() => { setLikeAuth(false) })
	}

	const disLike = () => {
		firestore().collection('posts').doc(id).collection('likes').doc(user.uid).delete()
			.then(() => { disLikeNumber() })
			.then(() => { setLikeAuth(true) })
	}

	const disLikeNumber = () => {
		firestore().collection('posts').doc(id)
			.get().then((doc) => {
				const { likes } = doc.data();
				if (doc.exists) {
					firestore().collection('posts').doc(id).set({ likes: likes - 1 }, { merge: true })
				}
			})
	}

	return (
		<div>
			{likeAuth === true
				?
				<Button
					fullWidth
					variant="contained"
					color="primary"
					onClick={() => { addLike() }}
				>
					Like
				</Button>
				:
				<Button
					fullWidth
					variant="contained"
					color="secondary"
					onClick={() => { disLike() }}
				>
					disLike
				</Button>
			}
		</div>
	)
}

export default PostLikes
