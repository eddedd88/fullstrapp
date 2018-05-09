import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'

class App extends Component<void> {
  render () {
    return (
      <AppBar>
        <Toolbar>
          <Typography variant='title' color='inherit'>
            <Link to='/page1'>Page 1</Link>
            <Link to='/page2'>Page 2</Link>
            <Route path='/page1' render={() => 'page 1'} />
            <Route path='/page2' render={() => 'page 2'} />
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default App
