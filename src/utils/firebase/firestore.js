import firebase from './firebase'

const firestore = firebase.firestore()

firestore.settings({
  timestampsInSnapshots: true
})

firestore.enablePersistence()

export default firestore
