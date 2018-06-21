import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import AppBar from '@material-ui/core/AppBar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import FeedItem from '../FeedItem'
import Image1 from '../../media/cassie-boca-293379-unsplash.jpg'
import Image2 from '../../media/dan-freeman-404566-unsplash.jpg'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import Grid from '@material-ui/core/Grid'
import Wrapper from '../Wrapper'

type Props = {
  name: string,
  avatarSrc?: string,
  classes: {
    name: string,
    icon: string,
    userInfo: string,
    subheader: string
  }
}

const CustomAvatar = withStyles(theme => ({
  root: {
    height: theme.spacing.unit * 12,
    width: theme.spacing.unit * 12,
    margin: 'auto',
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 2,
    color: '#fff',
    backgroundColor: theme.palette.primary.light
  }
}))(Avatar)

const styles = theme => ({
  name: {
    marginBottom: theme.spacing.unit * 2
  },
  icon: {
    verticalAlign: 'bottom',
    marginRight: theme.spacing.unit * 2
  },
  userInfo: {
    textDecoration: 'none',
    padding: theme.spacing.unit
  },
  subheader: {
    paddingLeft: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2
  }
})

class ProfilePage extends Component<Props> {
  render () {
    const { name, avatarSrc, classes } = this.props

    return (
      <Fragment>
        <AppBar position='static'>
          <CustomAvatar src={avatarSrc} alt={name}>
            FN
          </CustomAvatar>
          <Typography
            variant='title'
            color='inherit'
            align='center'
            className={classes.name}
          >
            {name}
          </Typography>
        </AppBar>

        <Wrapper>
          <Card>
            <CardContent>
              <Typography
                component='a'
                href='mailto:test@test.com'
                className={classes.userInfo}
                gutterBottom
              >
                <EmailIcon className={classes.icon} />
                test@test.com
              </Typography>

              <Typography
                component='a'
                href='tel:123-123-1234'
                className={classes.userInfo}
              >
                <PhoneIcon className={classes.icon} />
                123-123-1234
              </Typography>
            </CardContent>
          </Card>

          <Typography
            variant='subheading'
            color='textSecondary'
            className={classes.subheader}
          >
            Posts
          </Typography>
          <Grid container spacing={8}>
            <Grid item sm={6} xs={12}>
              <FeedItem
                media={Image1}
                title='Mountains'
                content='Mountains are high.'
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <FeedItem
                media={Image2}
                title='Lights'
                content='Lights are bright.'
              />
            </Grid>
          </Grid>
        </Wrapper>
      </Fragment>
    )
  }
}

export default withStyles(styles)(ProfilePage)