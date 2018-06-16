import React, { Component } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import { Link, withRouter } from 'react-router-dom'
import type { Location } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import GridIcon from '@material-ui/icons/GridOn'
import PersonIcon from '@material-ui/icons/Person'
import paths from '../../routes/paths'

const styles = theme => ({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    boxShadow: theme.shadows[8],
    '-webkit-backface-visibility': 'hidden'
  }
})

type Props = {
  classes: {},
  location: Location
}

export class BottomNavBar extends Component<Props> {
  render () {
    const { classes, location: { pathname } } = this.props

    const secondPathIndex = pathname.indexOf('/', 1)
    const tabValue =
      secondPathIndex < 0 ? pathname : pathname.substring(0, secondPathIndex)

    return (
      <BottomNavigation value={tabValue} classes={classes} showLabels>
        <BottomNavigationAction
          label='Feed'
          icon={<LocationCityIcon />}
          component={Link}
          to={paths.feed}
          value={paths.feed}
        />
        <BottomNavigationAction
          label='Grid'
          icon={<GridIcon />}
          component={Link}
          to={paths.grid}
          value={paths.grid}
        />
        <BottomNavigationAction
          label='Profile'
          icon={<PersonIcon />}
          component={Link}
          to={paths.profile}
          value={paths.profile}
        />
      </BottomNavigation>
    )
  }
}

export default withRouter(withStyles(styles)(BottomNavBar))
