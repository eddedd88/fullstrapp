import React, { Component } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { Link, withRouter } from 'react-router-dom'
import type { Location } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%'
  }
}

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
          label='Recents'
          icon={<RestoreIcon />}
          component={Link}
          to='/recents'
          value='/recents'
        />
        <BottomNavigationAction
          label='Favourites'
          icon={<FavoriteIcon />}
          component={Link}
          to='/favourites'
          value='/favourites'
        />
        <BottomNavigationAction
          label='Nearby'
          icon={<LocationOnIcon />}
          component={Link}
          to='/nearby'
          value='/nearby'
        />
      </BottomNavigation>
    )
  }
}

export default withRouter(withStyles(styles)(BottomNavBar))
