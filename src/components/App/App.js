import React, { Component, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AddToHomeScreen from '../AddToHomeScreen'

class App extends Component<{||}> {
  render () {
    return (
      <Fragment>
        <AppBar>
          <Toolbar>
            <Typography variant='title' color='inherit'>
              Material PWA
            </Typography>
          </Toolbar>
        </AppBar>
        <AddToHomeScreen />
      </Fragment>
    )
  }
}

export default App
