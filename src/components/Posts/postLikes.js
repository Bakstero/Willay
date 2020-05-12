import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import { firestore, firebaseAuth } from '../Firebase/firebase'

function PostLikes() {
	const user = firebaseAuth().currentUser
	const { id } = useParams()
	const [likeAuth, setLikeAuth] = useState(true)

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
				<button onClick={() => { addLike() }}>Like</button>
				:
				<button onClick={() => { disLike() }}>disLike</button>
			}
		</div>
	)
}

export default PostLikes
