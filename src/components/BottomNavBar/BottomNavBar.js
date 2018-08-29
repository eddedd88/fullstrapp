import React, { Component } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { Link, withRouter, type Location } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import type { WithStyles, Theme } from '@material-ui/core/styles'

const styles = (theme: Theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    boxShadow: theme.shadows[8],
    '-webkit-backface-visibility': 'hidden'
  }
})

type Props = {
  items: Array<{
    label: string,
    path: string,
    icon: React$Element<any>
  }>,
  location: Location,
  ...$Exact<WithStyles>
}

export class BottomNavBar extends Component<Props> {
  render () {
    const { items, classes, location: { pathname } } = this.props

    const secondPathIndex = pathname.indexOf('/', 1)
    const tabValue =
      secondPathIndex < 0 ? pathname : pathname.substring(0, secondPathIndex)

    return (
      <BottomNavigation value={tabValue} classes={classes} showLabels>
        {items.map(({ path, label, icon }) => (
          <BottomNavigationAction
            key={path}
            to={path}
            value={path}
            label={label}
            icon={icon}
            component={Link}
          />
        ))}
      </BottomNavigation>
    )
  }
}

export default withRouter(withStyles(styles)(BottomNavBar))
