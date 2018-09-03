import React, { Component, Fragment } from 'react'
import FeedItem from '../FeedItem'
import Button from '@material-ui/core/Button'
import CreateIcon from '@material-ui/icons/Create'
import withStyles, { type Theme } from '@material-ui/core/styles/withStyles'
import Wrapper from '../../components/Wrapper'
import FormDialog from '../../components/FormDialog'
import TextField from '@material-ui/core/TextField'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import FileInput from '../../components/FileInput'
import AppBar from '../../components/AppBar'
import type { FeedItemType } from '../../types/FeedItemType'
import paths from '../../routes/paths'

const FabButton = withStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing.unit * 9,
    right: theme.spacing.unit * 2
  }
}))(Button)

type Props = {
  feedItems: FeedItemType[],
  onAddFeedItem: FeedItemType => void,
  classes: {
    cameraButton: string,
    buttonLeftIcon: string,
    feedItemWrapper: string
  }
}

type State = {
  open: boolean,
  form: FeedItemType
}

class FeedPage extends Component<Props, State> {
  state = {
    open: false,
    form: {
      id: 10,
      title: '',
      content: '',
      media: ''
    }
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
      form: {
        id: this.props.feedItems.length * 10,
        title: '',
        content: '',
        media: ''
      }
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
      <Fragment>
        <AppBar title='Feed' />
        <Wrapper>
          {feedItems &&
            feedItems.map(feedItem => (
              <div key={feedItem.id} className={classes.feedItemWrapper}>
                <FeedItem {...feedItem} feedItemPagePath={paths.feedItem} />
              </div>
            ))}
          <FabButton
            variant='fab'
            color='secondary'
            onClick={this.toggleDialog}
          >
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
        </Wrapper>
      </Fragment>
    )
  }
}

export default withStyles((theme: Theme) => ({
  cameraButton: {
    paddingLeft: 0,
    marginTop: theme.spacing.unit * 2
  },
  buttonLeftIcon: {
    marginRight: theme.spacing.unit,
    paddingLeft: 0
  },
  feedItemWrapper: {
    marginTop: theme.spacing.unit
  }
}))(FeedPage)
