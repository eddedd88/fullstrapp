import React, { FunctionComponent } from 'react'
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

const AppBar: FunctionComponent = props => {
  return (
    <MaterialAppBar position='static'>
      <CustomToolbar>{props.children}</CustomToolbar>
    </MaterialAppBar>
  )
}

export default AppBar
