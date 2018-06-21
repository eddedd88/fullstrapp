import React, { Component } from 'react'
import MaterialAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

type Props = {|
  title: string
|}

class AppBar extends Component<Props> {
  render () {
    const { title } = this.props

    return (
      <MaterialAppBar position='static'>
        <Toolbar>
          <Typography variant='title' color='inherit'>
            {title}
          </Typography>
        </Toolbar>
      </MaterialAppBar>
    )
  }
}

export default AppBar