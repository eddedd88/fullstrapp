import React, { Component } from 'react'
import MaterialAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ExpandableSearch from '../ExpandableSearch'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import withStyles from '@material-ui/core/styles/withStyles'
import type { Theme } from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'

type Props = {|
  title: string,
  backLink?: string
|}

const AppTitle = withStyles((theme: Theme) => ({
  root: {
    marginLeft: theme.spacing.unit * 2,
    flex: 'auto'
  }
}))(Typography)

class AppBar extends Component<Props> {
  render() {
    const { title, backLink } = this.props

    return (
      <MaterialAppBar position="static">
        <Toolbar disableGutters>
          {backLink && (
            <IconButton color="inherit" component={Link} to={backLink}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <AppTitle variant="title" color="inherit">
            {title}
          </AppTitle>
          <ExpandableSearch onChangeValue={console.log} placeholder="Search" />
        </Toolbar>
      </MaterialAppBar>
    )
  }
}

export default AppBar
