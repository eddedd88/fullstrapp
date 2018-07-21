import React, { Component } from 'react'
import ProfilePage from '../../components/ProfilePage'
import analytics from '../../utils/analytics'

class ProfilePageContainer extends Component<{||}> {
  componentDidMount () {
    analytics.screenViewed({
      screenName: 'Profile'
    })
  }

  render () {
    return <ProfilePage name='Full Name' />
  }
}

export default ProfilePageContainer
