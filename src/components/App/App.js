import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

class App extends Component<void> {
  render () {
    return (
      <AppBar>
        <Toolbar>
          <Typography variant='title' color='inherit'>
            App Bar within branch
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default App
