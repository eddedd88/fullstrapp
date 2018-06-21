import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    maxWidth: theme.breakpoints.values.md,
    margin: 'auto',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px`
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
