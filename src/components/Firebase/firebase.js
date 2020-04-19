import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';


var firebaseConfig = {
	apiKey: "AIzaSyCLWrMnRs8Zn2YWmqTBJ2QZtrMMGa6Q7r0",
	authDomain: "appwillay.firebaseapp.com",
	databaseURL: "https://appwillay.firebaseio.com",
	projectId: "appwillay",
	storageBucket: "appwillay.appspot.com",
	messagingSenderId: "891752428623",
	appId: "1:891752428623:web:102ad6bc0e7fde7e7e663a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebase.auth
export const firestore = firebase.firestore
export const firebaseStorage = firebase.storage
export default firebase