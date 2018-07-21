import React, { Component } from 'react'
import FeedPage from '../../components/FeedPage'
import type { FeedItemType } from '../../types/FeedItemType'
import feedItemsData from '../../data/feedItems'
import analytics from '../../utils/analytics'

// $FlowFixMe
const initialFeedItems: FeedItemType[] = Object.values(feedItemsData)

type State = {
  feedItems: FeedItemType[]
}

class FeedPageContainer extends Component<{||}, State> {
  state = {
    feedItems: initialFeedItems
  }

  componentDidMount () {
    analytics.screenViewed({
      screenName: 'Feed'
    })
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
