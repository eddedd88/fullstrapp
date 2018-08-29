import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import type { FeedItemType } from '../../types/FeedItemType'
import { Link } from 'react-router-dom'

const CustomCardMedia = withStyles({
  root: {
    paddingTop: '45%'
  }
})(CardMedia)

type Props = {|
  ...FeedItemType,
  feedItemPagePath?: string
|}

class FeedItem extends Component<Props> {
  handleShareClick = () => {
    const { id, title, content } = this.props

    if (navigator.share) {
      navigator.share({
        title,
        text: content,
        url: `${process.env.PUBLIC_URL || ''}/feed/${id}`
      })
    }
  }

  render () {
    const { id, title, content, media, feedItemPagePath } = this.props

    return (
      <Card>
        {media && <CustomCardMedia image={media} />}

        <CardContent>
          {title && (
            <Typography gutterBottom variant='headline'>
              {title}
            </Typography>
          )}
          <Typography>{content}</Typography>
        </CardContent>

        <CardActions>
          {feedItemPagePath && (
            <Button
              size='small'
              color='primary'
              component={Link}
              to={feedItemPagePath.replace(':feedId', id.toString())}
            >
              See More
            </Button>
          )}

          <Button size='small' color='primary' onClick={this.handleShareClick}>
            Share
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default FeedItem
