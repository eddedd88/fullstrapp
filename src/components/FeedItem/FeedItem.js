import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import type { FeedItemType } from '../../types/FeedItemType'

const CustomCard = withStyles(theme => ({
  root: {
    marginTop: theme.spacing.unit
  }
}))(Card)

const CustomCardMedia = withStyles({
  root: {
    paddingTop: '45%'
  }
})(CardMedia)

class FeedItem extends Component<FeedItemType> {
  render () {
    const { title, content, media } = this.props

    return (
      <CustomCard>
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
          <Button size='small' color='primary'>
            See More
          </Button>
          <Button size='small' color='primary'>
            Share
          </Button>
        </CardActions>
      </CustomCard>
    )
  }
}

export default FeedItem
