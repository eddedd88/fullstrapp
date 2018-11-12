import React, { Component, ReactElement } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import GridIcon from '@material-ui/icons/GridOn'
import PersonIcon from '@material-ui/icons/Person'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import paths from '../../routes'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: 0,
      width: '100%',
      boxShadow: theme.shadows[8],
      backfaceVisibility: 'hidden'
    }
  })

type Props = WithStyles<typeof styles> & RouteComponentProps

export class BottomNavBar extends Component<Props> {
  renderLink = (path: string) => (props: any) => <Link {...props} to={path} />

  render() {
    const {
      classes,
      location: { pathname }
    } = this.props

    const secondPathIndex = pathname.indexOf('/', 1)
    const tabValue =
      secondPathIndex < 0 ? pathname : pathname.substring(0, secondPathIndex)

    return (
      <BottomNavigation value={tabValue} classes={classes} showLabels>
        <BottomNavigationAction
          icon={<LocationCityIcon />}
          label='Feed'
          value={paths.feed}
          component={this.renderLink(paths.feed)}
        />
        <BottomNavigationAction
          icon={<GridIcon />}
          label='Grid'
          value={paths.grid}
          component={this.renderLink(paths.grid)}
        />
        <BottomNavigationAction
          icon={<PersonIcon />}
          label='Profile'
          value={paths.profile}
          component={this.renderLink(paths.profile)}
        />
      </BottomNavigation>
    )
  }
}

export default withRouter(withStyles(styles)(BottomNavBar))
