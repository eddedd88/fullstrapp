import React, { Component, Fragment } from 'react'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import firebase from '../../utils/firebase'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import Typography from '@material-ui/core/Typography'
import AppBar from '../AppBar'

const ui = new firebaseui.auth.AuthUI(firebase.auth())

const styles = (theme: Theme) =>
  createStyles({
    wrapper: {
      marginTop: theme.spacing.unit * 6
    },
    signinButtons: {
      marginTop: theme.spacing.unit * 4
    }
  })

type Props = WithStyles<typeof styles>

class Signin extends Component<Props> {
  componentDidMount() {
    if (ui) {
      ui.start('#firebaseui-auth-container', {
        // Firebase UI config options
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID
        ]
      })
    }
  }

  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <AppBar title="Sign In" />
        <div className={classes.wrapper}>
          <Typography variant="h5" align="center" gutterBottom>
            Material PWA
          </Typography>
          <Typography align="center">Test the Sign In!</Typography>

          <div
            id="firebaseui-auth-container"
            className={classes.signinButtons}
          />
        </div>
      </Fragment>
    )
  }
}

export default withStyles(styles)(Signin)
