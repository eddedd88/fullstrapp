import React, { Component, FormEvent, ReactNode } from 'react'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import FullScreenDialogAppBar from '../FullScreenDialogAppBar'
import Button from '@material-ui/core/Button'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'

const styles = (theme: Theme) =>
  createStyles({
    dialogContent: {
      [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing.unit * 10
      }
    },
    form: {
      display: 'flex',
      flexDirection: 'column'
    }
  })

type Props = {
  title: string
  submitLabel?: string
  cancelLabel?: string
  children: ReactNode
  appBarButton?: ReactNode
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onClose: () => void
} & DialogProps &
  WithStyles<typeof styles>

class FormDialog extends Component<Props> {
  static defaultProps = {
    submitLabel: 'Submit',
    cancelLabel: 'Cancel'
  }

  render() {
    const {
      title,
      submitLabel,
      cancelLabel,
      onSubmit,
      onClose,
      children,
      appBarButton,
      fullScreen,
      classes,
      ...rest
    } = this.props

    return (
      <Dialog {...rest} onClose={onClose} fullScreen={fullScreen}>
        <form
          onSubmit={onSubmit}
          noValidate
          autoComplete='off'
          className={classes.form}
        >
          {fullScreen && (
            <FullScreenDialogAppBar
              onClose={onClose}
              title={title}
              submitButton={appBarButton}
              submitLabel={submitLabel}
            />
          )}

          {!fullScreen && <DialogTitle>{title}</DialogTitle>}

          <DialogContent className={classes.dialogContent}>
            {children}
          </DialogContent>

          {!fullScreen && (
            <DialogActions>
              <Button onClick={onClose}>{cancelLabel}</Button>
              <Button color='primary' variant='contained' type='submit'>
                {submitLabel}
              </Button>
            </DialogActions>
          )}
        </form>
      </Dialog>
    )
  }
}

export default withStyles(styles)(withMobileDialog<Props>()(FormDialog))
