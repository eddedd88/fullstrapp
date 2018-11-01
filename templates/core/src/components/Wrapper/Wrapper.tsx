import React, { Component } from 'react'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: theme.breakpoints.values.md,
      margin: 'auto'
    }
  })

type Props = WithStyles<typeof styles>

class Wrapper extends Component<Props> {
  render() {
    const { classes, ...rest } = this.props

    return <div {...rest} className={classes.root} />
  }
}

export default withStyles(styles)(Wrapper)
