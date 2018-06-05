import React, { Component } from 'react'
import FeedPage from '../../components/FeedPage'
import Image1 from '../../media/cassie-boca-293379-unsplash.jpg'
import Image2 from '../../media/dan-freeman-404566-unsplash.jpg'
import Image3 from '../../media/fabio-mangione-236846-unsplash.jpg'
import Image4 from '../../media/tommy-lisbin-276996-unsplash.jpg'
import type { FeedItemType } from '../../types/FeedItemType'

const initialFeedItems: FeedItemType[] = [
  {
    id: 1,
    title: 'Mountains',
    content: `
      “Climb the mountains and get their good tidings.
      Nature's peace will flow into you as sunshine flows
      into trees. The winds will blow their own freshness into you,
      and the storms their energy, while cares will drop away from
      you like the leaves of Autumn.” ― John Muir, The Mountains of California
    `,
    media: Image1
  },
  {
    id: 2,
    title: 'Lights',
    content: `
      “There's something about the thousands of glittering lights,
      the veil of nighttime that almost makes this place beautiful,
      especially in the reflection of the water. It makes everything
      askew, disoriented. There's more truth in a ripple of water
      than in a clear day.” ― Ellie Lieberman, Society's Foundlings
    `,
    media: Image2
  },
  {
    id: 3,
    title: 'River',
    content: `
      “The river is everywhere.” ― Hermann Hesse, Siddhartha
    `,
    media: Image3
  },
  {
    id: 4,
    title: 'Sea',
    content: `
      “I must be a mermaid, Rango. I have no fear of depths
      and a great fear of shallow living.” ― Anaïs Nin
    `,
    media: Image4
  }
]

type State = {
  feedItems: FeedItemType[]
}

class FeedPageContainer extends Component<{||}, State> {
  state = {
    feedItems: initialFeedItems
  }

  handleAddFeedItem = (newFeedItem: FeedItemType) => {
    this.setState({
      feedItems: [
        ...this.state.feedItems,
        {
          id: this.state.feedItems.length + 1,
          ...newFeedItem
        }
      ]
    })
  }

  render () {
    const { feedItems } = this.state

    return (
      <FeedPage feedItems={feedItems} onAddFeedItem={this.handleAddFeedItem} />
    )
  }
}

export default FeedPageContainer
