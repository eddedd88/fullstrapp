import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import type { FeedItemType } from '../../types/FeedItemType'

const CustomCardMedia = withStyles({
  root: {
    paddingTop: '45%'
  }
})(CardMedia)

type Props = $Diff<
  FeedItemType & {
    onSeeMore?: string => void,
    onShare?: string => void
  },
  {
    id: number
  }
>

class FeedItem extends Component<Props> {
  render () {
    const { title, content, media, onSeeMore, onShare } = this.props

    return (
      <Card>
        {media && <CustomCardMedia image={media} title={title} />}

        <CardContent>
          {title && (
            <Typography gutterBottom variant='headline'>
              {title}
            </Typography>
          )}
          <Typography>{content}</Typography>
        </CardContent>

        <CardActions>
          <Button size='small' color='primary' onClick={onSeeMore}>
            See More
          </Button>
          <Button size='small' color='primary' onClick={onShare}>
            Share
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default FeedItem
