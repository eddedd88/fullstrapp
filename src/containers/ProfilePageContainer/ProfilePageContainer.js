import React, { Component } from 'react'
import ProfilePage from '../../prototypes/ProfilePage'
import analytics from '../../utils/analytics'
import firebase from '../../utils/firebase'

type State = {
  statusIsKnown: boolean
}

class ProfilePageContainer extends Component<{||}, State> {
  componentDidMount () {
    analytics.pageViewed({
      pageTitle: 'Profile',
      pagePath: '/profile'
    })

    firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      this.setState({
        statusIsKnown: true
      })
    })
  }

  render () {
    return <ProfilePage {...this.state} />
  }
}

export default ProfilePageContainer
