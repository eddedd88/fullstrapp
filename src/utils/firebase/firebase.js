import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
  projectId: 'material-pwa-c6ebb',
  databaseURL: 'https://material-pwa-c6ebb.firebaseio.com',
  storageBucket: 'gs://material-pwa-c6ebb.appspot.com'
  // authDomain: "<PROJECT_ID>.firebaseapp.com",
  // messagingSenderId: "<SENDER_ID>",
}

firebase.initializeApp(config)

export default firebase
