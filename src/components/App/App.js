import React, { Component, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import BottomNavBar from '../BottomNavBar'
import { Switch, Route, Redirect } from 'react-router'
import FeedPageContainer from '../../containers/FeedPageContainer'

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
            <Route path='/feed' component={FeedPageContainer} />
            <Route path='/favourites' render={() => 'favourites page'} />
            <Route path='/nearby' render={() => 'nearby page'} />
            <Redirect to='/feed' />
          </Switch>
        </div>
        <BottomNavBar />
      </Fragment>
    )
  }
}

export default App
