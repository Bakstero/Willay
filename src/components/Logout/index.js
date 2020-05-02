
import { firebaseAuth } from '../firebase/firebase'

export function logout() {
	return firebaseAuth().signOut()
}


