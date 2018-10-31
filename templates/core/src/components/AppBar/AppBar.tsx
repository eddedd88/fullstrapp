import React, { Component } from 'react'
import MaterialAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ExpandableSearch from '../ExpandableSearch'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import withStyles from '@material-ui/core/styles/withStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { Link } from 'react-router-dom'
import { LocationDescriptor } from 'history'
import GithubIcon from '../../assets/github.png'

type Props = {
  title: string
  backLink?: LocationDescriptor
}

const AppTitle = withStyles((theme: Theme) => ({
  root: {
    marginLeft: theme.spacing.unit * 2,
    flex: 'auto'
  }
}))(Typography)

class AppBar extends Component<Props> {
  renderLink = (props: any) => {
    const { backLink } = this.props
    return backLink ? <Link {...props} to={backLink} /> : null
  }

  render() {
    const { title, backLink } = this.props

    return (
      <MaterialAppBar position="static">
        <Toolbar disableGutters>
          {backLink && (
            <IconButton color="inherit" component={this.renderLink}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <AppTitle variant="h6" color="inherit">
            {title}
          </AppTitle>
          <ExpandableSearch onChangeValue={console.log} placeholder="Search" />
          <IconButton
            component="a"
            href="https://github.com/eddedd88/fullstrapp-demo"
          >
            <img src={GithubIcon} alt="github" />
          </IconButton>
        </Toolbar>
      </MaterialAppBar>
    )
  }
}

export default AppBar
