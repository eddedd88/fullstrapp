import React, { Component, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import BottomNavBar from '../BottomNavBar'
import { Switch, Route, Redirect } from 'react-router'

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

        <Switch>
          <Route path='/recents' render={() => 'recents page'} />
          <Route path='/favourites' render={() => 'favourites page'} />
          <Route path='/nearby' render={() => 'nearby page'} />
          <Redirect to='/recents' />
        </Switch>

        <BottomNavBar />
      </Fragment>
    )
  }
}

export default App
