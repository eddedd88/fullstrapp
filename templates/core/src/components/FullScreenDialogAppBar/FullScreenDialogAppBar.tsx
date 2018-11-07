import React, { Component, ReactNode } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'

const styles = createStyles({
  title: {
    flex: 1
  },
  submitButotn: {
    marginRight: -8
  },
  closeButton: {
    marginLeft: -12,
    marginRight: 20
  }
})

type Props = {
  title: string
  submitLabel: string
  onClose: () => void
  submitButton?: ReactNode
} & WithStyles<typeof styles>

class FullScreenDialogAppBar extends Component<Props> {
  static defaultProps = {
    submitLabel: 'save'
  }

  render() {
    const { title, submitLabel, submitButton, onClose, classes } = this.props

    return (
      <AppBar>
        <Toolbar>
          <IconButton
            color='inherit'
            onClick={onClose}
            aria-label='Close'
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' color='inherit' className={classes.title}>
            {title}
          </Typography>

          {submitButton || (
            <Button
              color='inherit'
              type='submit'
              size='small'
              className={classes.submitButotn}
            >
              {submitLabel}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(FullScreenDialogAppBar)
