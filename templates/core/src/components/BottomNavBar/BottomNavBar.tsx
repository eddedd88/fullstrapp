import React, { Component, ReactElement } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import withStyles, {
  StyleRulesCallback
} from '@material-ui/core/styles/withStyles'
import SvgIcon from '@material-ui/core/SvgIcon'
import { Theme } from '@material-ui/core/styles/createMuiTheme'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    boxShadow: theme.shadows[8],
    backfaceVisibility: 'hidden'
  }
})

type Props = RouteComponentProps & {
  items: Array<{
    label: string
    path: string
    icon: string | ReactElement<typeof SvgIcon>
  }>
  classes: {}
}

export class BottomNavBar extends Component<Props> {
  renderLink = (path: string) => (props: any) => <Link {...props} to={path} />

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
            value={path}
            label={label}
            icon={icon}
            component={this.renderLink(path)}
          />
        ))}
      </BottomNavigation>
    )
  }
}

export default withRouter(withStyles(styles)(BottomNavBar))
