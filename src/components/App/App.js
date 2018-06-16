import React, { Component, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import BottomNavBar from '../BottomNavBar'
import { Switch, Route, Redirect } from 'react-router'
import FeedPageContainer from '../../containers/FeedPageContainer'
import GridPageContainer from '../../containers/GridPageContainer'
import paths from '../../routes/paths'

class App extends Component<{||}> {
  render () {
    return (
      <Fragment>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='title' color='inherit'>
              Material PWA
            </Typography>
          </Toolbar>
        </AppBar>

        <div style={{ marginBottom: 65 }}>
          <Switch>
            <Route path={paths.feed} component={FeedPageContainer} />
            <Route path={paths.grid} component={GridPageContainer} />
            <Route path={paths.profile} render={() => 'profile page'} />
            <Redirect to={paths.feed} />
          </Switch>
        </div>
        <BottomNavBar />
      </Fragment>
    )
  }
}

export default App
