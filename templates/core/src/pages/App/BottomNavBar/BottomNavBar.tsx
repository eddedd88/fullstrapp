import React, { FunctionComponent } from 'react'
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

export const BottomNavBar: FunctionComponent<Props> = props => {
  const renderLink = (path: string) => (props: any) => (
    <Link {...props} to={path} />
  )

  const secondPathIndex = props.location.pathname.indexOf('/', 1)
  const tabValue =
    secondPathIndex < 0
      ? props.location.pathname
      : props.location.pathname.substring(0, secondPathIndex)

  return (
    <BottomNavigation value={tabValue} classes={props.classes} showLabels>
      <BottomNavigationAction
        icon={<LocationCityIcon />}
        label='Feed'
        value={paths.feed}
        component={renderLink(paths.feed)}
      />
      <BottomNavigationAction
        icon={<GridIcon />}
        label='Grid'
        value={paths.grid}
        component={renderLink(paths.grid)}
      />
      <BottomNavigationAction
        icon={<PersonIcon />}
        label='Profile'
        value={paths.profile}
        component={renderLink(paths.profile)}
      />
    </BottomNavigation>
  )
}

export default withRouter(withStyles(styles)(BottomNavBar))
