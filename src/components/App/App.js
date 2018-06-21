import React, { Component, Fragment } from 'react'
import BottomNavBar from '../BottomNavBar'
import { Switch, Route, Redirect } from 'react-router'
import FeedPageContainer from '../../containers/FeedPageContainer'
import GridPageContainer from '../../containers/GridPageContainer'
import ProfilePageContainer from '../../containers/ProfilePageContainer'
import paths from '../../routes/paths'

class App extends Component<{||}> {
  render () {
    return (
      <Fragment>
        <div style={{ marginBottom: 64 }}>
          <Switch>
            <Route path={paths.feed} component={FeedPageContainer} />
            <Route path={paths.grid} component={GridPageContainer} />
            <Route path={paths.profile} component={ProfilePageContainer} />
            <Redirect to={paths.feed} />
          </Switch>
        </div>
        <BottomNavBar />
      </Fragment>
    )
  }
}

export default App
