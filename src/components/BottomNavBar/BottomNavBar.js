import React, { Component } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { Link, withRouter } from 'react-router-dom'
import type { Location } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    boxShadow: theme.shadows[8]
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
          to='/feed'
          value='/feed'
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
