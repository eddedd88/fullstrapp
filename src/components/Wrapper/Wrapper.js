import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  root: {
    maxWidth: theme.breakpoints.values.md,
    margin: 'auto'
  }
})

type Props = {
  classes: {
    root: string
  }
}

class Wrapper extends Component<Props> {
  render () {
    const { classes, ...rest } = this.props

    return <div className={classes.root} {...rest} />
  }
}

export default withStyles(styles)(Wrapper)
