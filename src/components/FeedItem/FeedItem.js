import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const CustomCard = withStyles(theme => ({
  root: {
    margin: theme.spacing.unit
  }
}))(Card)

const CustomCardMedia = withStyles({
  root: {
    paddingTop: '45%'
  }
})(CardMedia)

type Props = {
  title: string,
  content: string,
  media?: string,
  mediaTitle?: string
}

class FeedItem extends Component<Props> {
  render () {
    const { title, content, media, mediaTitle } = this.props

    return (
      <CustomCard>
        {media && <CustomCardMedia image={media} title={mediaTitle} />}

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
