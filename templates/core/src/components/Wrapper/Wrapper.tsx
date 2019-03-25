import React, { FunctionComponent } from 'react'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: theme.breakpoints.values.md,
      margin: 'auto',
      padding: theme.spacing.unit * 2
    }
  })

type Props = WithStyles<typeof styles>

const Wrapper: FunctionComponent<Props> = props => {
  const { classes, ...rest } = props

  return <div {...rest} className={classes.root} />
}

export default withStyles(styles)(Wrapper)
