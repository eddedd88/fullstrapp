import React, { FunctionComponent } from 'react'
import MaterialAppBar, { AppBarProps } from '@material-ui/core/AppBar'
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

const AppBar: FunctionComponent<AppBarProps> = props => {
  const { children, ...rest } = props

  return (
    <MaterialAppBar position='sticky' {...rest}>
      <CustomToolbar>{children}</CustomToolbar>
    </MaterialAppBar>
  )
}

export default AppBar
