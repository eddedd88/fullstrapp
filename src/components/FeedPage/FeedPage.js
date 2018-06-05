import React, { Component } from 'react'
import FeedItem from '../FeedItem'
import Button from '@material-ui/core/Button'
import CreateIcon from '@material-ui/icons/Create'
import { withStyles } from '@material-ui/core/styles'
import MaxWidthDiv from '../MaxWidthDiv'
import FormDialog from '../FormDialog'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import FileInput from '../FileInput'
import DialogActions from '@material-ui/core/DialogActions'
import type { FeedItemType } from '../../models/FeedItemType'

const FabButton = withStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing.unit * 9,
    right: theme.spacing.unit * 2
  }
}))(Button)

type Props = {
  feedItems: FeedItemType[],
  onAddFeedItem: Function
}

type State = {
  open: boolean,
  form: Object
}

class FeedPage extends Component<Props, State> {
  state = {
    open: false,
    form: {}
  }

  toggleDialog = () => {
    this.setState({
      open: !this.state.open
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    this.setState({
      open: false,
      form: {}
    })

    this.props.onAddFeedItem(this.state.form)
  }

  handleInputChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }

  render () {
    const { open } = this.state
    const { classes, feedItems } = this.props

    return (
      <MaxWidthDiv>
        {feedItems &&
          feedItems.map(({ id, ...rest }) => <FeedItem key={id} {...rest} />)}
        <FabButton variant='fab' color='secondary' onClick={this.toggleDialog}>
          <CreateIcon />
        </FabButton>

        <FormDialog
          open={open}
          onClose={this.toggleDialog}
          title='New Feed Item'
          submitLabel='Post'
          onSubmit={this.handleSubmit}
        >
          <TextField
            name='title'
            label='Title'
            onChange={this.handleInputChange}
            fullWidth
            autoFocus
            required
          />

          <TextField
            name='content'
            label={`What's on your mind?`}
            onChange={this.handleInputChange}
            fullWidth
            multiline
            margin='normal'
            required
          />

          <FileInput capture='camera'>
            <Button component='span' className={classes.cameraButton}>
              <PhotoCameraIcon className={classes.buttonLeftIcon} />
              Add a Picture
            </Button>
          </FileInput>
        </FormDialog>
      </MaxWidthDiv>
    )
  }
}

export default withStyles(theme => ({
  cameraButton: {
    paddingLeft: 0,
    marginTop: theme.spacing.unit * 2
  },
  buttonLeftIcon: {
    marginRight: theme.spacing.unit,
    paddingLeft: 0
  }
}))(FeedPage)
