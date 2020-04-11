import { firebaseAuth } from '../Firebase/firebase'

export function logout() {
	return firebaseAuth().signOut()
}