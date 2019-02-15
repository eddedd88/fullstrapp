import React, { FunctionComponent, FormEvent, ReactNode } from 'react'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Button from '@material-ui/core/Button'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import IconButton from '@material-ui/core/IconButton'
import AppBar from '../AppBar'
import AppBarTitle from '../AppBarTitle'
import CloseIcon from '@material-ui/icons/Close'

const styles = (theme: Theme) =>
  createStyles({
    dialogContent: {
      [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing.unit * 3
      }
    },
    form: {
      display: 'flex',
      flexDirection: 'column'
    }
  })

type Props = {
  title: string
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onClose: () => void
  children: ReactNode
  submitLabel?: string
  cancelLabel?: string
  appBarButton?: ReactNode
} & DialogProps &
  WithStyles<typeof styles>

const FormDialog: FunctionComponent<Props> = props => {
  const {
    submitLabel = 'Submit',
    cancelLabel = 'Cancel',
    title,
    onSubmit,
    onClose,
    children,
    appBarButton,
    fullScreen,
    classes,
    ...rest
  } = props

  return (
    <Dialog {...rest} onClose={onClose} fullScreen={fullScreen}>
      <form
        onSubmit={onSubmit}
        noValidate
        autoComplete='off'
        className={classes.form}
      >
        {fullScreen && (
          <AppBar>
            <IconButton onClick={onClose} color='inherit'>
              <CloseIcon />
            </IconButton>

            <AppBarTitle>{title}</AppBarTitle>

            {appBarButton || (
              <Button color='inherit' type='submit' size='small'>
                {submitLabel}
              </Button>
            )}
          </AppBar>
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

export default withStyles(styles)(withMobileDialog<Props>()(FormDialog))
