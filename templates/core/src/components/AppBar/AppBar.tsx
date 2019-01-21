import React, { Component } from 'react'
import MaterialAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import withStyles from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'

const CustomToolbar = withStyles(
  createStyles({
    gutters: {
      paddingLeft: 4,
      paddingRight: 4
    }
  })
)(Toolbar)

class AppBar extends Component {
  render() {
    return (
      <MaterialAppBar position='static'>
        <CustomToolbar>{this.props.children}</CustomToolbar>
      </MaterialAppBar>
    )
  }
}

export default AppBar
