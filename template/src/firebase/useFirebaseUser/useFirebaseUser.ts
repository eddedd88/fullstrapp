import { useEffect, useState } from 'react'
import firebase from '..'

const useFirebaseUser = () => {
  const [user, setUser] = useState<firebase.User | null>()

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged(resultUser => {
        setUser(resultUser)
      }),
    []
  )

  return user
}

export default useFirebaseUser
