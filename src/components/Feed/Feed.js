import React, { Component, Fragment } from 'react'
import FeedItem from '../FeedItem'
import Image1 from '../../media/cassie-boca-293379-unsplash.jpg'
import Image2 from '../../media/dan-freeman-404566-unsplash.jpg'
import Image3 from '../../media/fabio-mangione-236846-unsplash.jpg'
import Image4 from '../../media/tommy-lisbin-276996-unsplash.jpg'

type Props = {
  feedItems: Array<{
    title: string,
    content: string,
    media: string
  }>
}

class Feed extends Component<Props> {
  render () {
    return (
      <Fragment>
        <FeedItem
          title='Mountains'
          content={`
            “Climb the mountains and get their good tidings.
            Nature's peace will flow into you as sunshine flows
            into trees. The winds will blow their own freshness into you,
            and the storms their energy, while cares will drop away from
            you like the leaves of Autumn.” ― John Muir, The Mountains of California
          `}
          media={Image1}
          mediaTitle='Mountains'
        />

        <FeedItem
          title='Lights'
          content={`
            “There's something about the thousands of glittering lights,
            the veil of nighttime that almost makes this place beautiful,
            especially in the reflection of the water. It makes everything
            askew, disoriented. There's more truth in a ripple of water
            than in a clear day.” ― Ellie Lieberman, Society's Foundlings
          `}
          media={Image2}
          mediaTitle='Lights'
        />

        <FeedItem
          title='River'
          content={`
            “The river is everywhere.” ― Hermann Hesse, Siddhartha
          `}
          media={Image3}
          mediaTitle='River'
        />

        <FeedItem
          title='Sea'
          content={`
            “I must be a mermaid, Rango. I have no fear of depths
            and a great fear of shallow living.” ― Anaïs Nin
          `}
          media={Image4}
          mediaTitle='Sea'
        />
      </Fragment>
    )
  }
}

export default Feed
