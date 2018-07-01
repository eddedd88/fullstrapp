import React, { Component } from 'react'
import MaterialAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ExpandableSearch from '../ExpandableSearch'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

type Props = {|
  title: string,
  backLink?: string
|}

const BackLinkButton = withStyles(theme => ({
  root: {
    marginRight: theme.spacing.unit * 2
  }
}))(IconButton)

class AppBar extends Component<Props> {
  render () {
    const { title, backLink } = this.props

    return (
      <MaterialAppBar position='static'>
        <Toolbar disableGutters={!!backLink}>
          {backLink && (
            <BackLinkButton color='inherit' component={Link} to={backLink}>
              <ArrowBackIcon />
            </BackLinkButton>
          )}
          <Typography variant='title' color='inherit' style={{ flex: 'auto' }}>
            {title}
          </Typography>
          <ExpandableSearch onChangeValue={console.log} placeholder='Search' />
        </Toolbar>
      </MaterialAppBar>
    )
  }
}

export default AppBar
