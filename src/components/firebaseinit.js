import firebase from 'firebase'
import 'firebase/firestore'
import firebaseconfige from './firebaseconfige.js'

const firebaseApp = firebase.initializeApp(firebaseconfige)
export default firebaseApp.firestore()