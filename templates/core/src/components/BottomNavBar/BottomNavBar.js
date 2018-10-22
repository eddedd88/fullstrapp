import React, { Component, type Element } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { Link, withRouter, type Location } from 'react-router-dom'
import withStyles, {
  type StyleRulesCallback,
  type Theme
} from '@material-ui/core/styles/withStyles'
import SvgIcon from '@material-ui/core/SvgIcon'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    boxShadow: theme.shadows[8],
    backfaceVisibility: 'hidden'
  }
})

type Props = {
  items: Array<{
    label: string,
    path: string,
    icon: string | Element<typeof SvgIcon>
  }>,
  location: Location,
  classes: {}
}

export class BottomNavBar extends Component<Props> {
  render() {
    const {
      items,
      classes,
      location: { pathname }
    } = this.props

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
