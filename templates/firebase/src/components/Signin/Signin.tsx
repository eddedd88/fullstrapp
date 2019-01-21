import React, { Component } from 'react'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import firebase from '../../firebase'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import AppBar from '../AppBar'
import AppBarTitle from '../AppBarTitle'

const ui = new firebaseui.auth.AuthUI(firebase.auth())

const styles = (theme: Theme) =>
  createStyles({
    wrapper: {
      margin: 'auto',
      marginTop: theme.spacing.unit * 6,
      maxWidth: theme.breakpoints.values.md,
      padding: theme.spacing.unit * 2
    },
    signinButtons: {
      marginTop: theme.spacing.unit * 4
    }
  })

type Props = WithStyles<typeof styles>

class Signin extends Component<Props> {
  componentDidMount() {
    ui.start('#firebaseui-auth-container', {
      // Firebase UI config options
      signInSuccessUrl: '/',
      autoUpgradeAnonymousUsers: true,
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        // gets called when an anonymous user logs in with an existing user
        // any data that the anonymous user has created will need to be dealt with
        signInFailure: error => {
          if (error.code !== 'firebaseui/anonymous-upgrade-merge-conflict') {
            return Promise.resolve()
          }

          const anonymousUser = firebase.auth().currentUser

          return firebase
            .auth()
            .signInWithCredential(error.credential)
            .then(() => {
              if (anonymousUser) {
                return anonymousUser.delete()
              }
            })
            .then(() => window.location.assign('/'))
        }
      }
    })
  }

  render() {
    const { classes } = this.props

    return (
      <>
        <AppBar>
          <IconButton color='inherit'>
            <CloseIcon />
          </IconButton>
          <AppBarTitle>Signin</AppBarTitle>
        </AppBar>
        <div className={classes.wrapper}>
          <Typography variant='h5' align='center' gutterBottom>
            fullstrapp
          </Typography>
          <Typography align='center'>Test the Sign In!</Typography>

          <div
            id='firebaseui-auth-container'
            className={classes.signinButtons}
          />
        </div>
      </>
    )
  }
}

export default withStyles(styles)(Signin)
