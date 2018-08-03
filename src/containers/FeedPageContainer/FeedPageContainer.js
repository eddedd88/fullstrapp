import React, { Component } from 'react'
import FeedPage from '../../prototypes/FeedPage'
import type { FeedItemType } from '../../types/FeedItemType'
import analytics from '../../utils/analytics'
import firestore from '../../utils/firebase/firestore'

type State = {
  feedItems: FeedItemType[]
}

class FeedPageContainer extends Component<{||}, State> {
  state = {
    feedItems: []
  }

  unsubscribeObserver: ?() => void

  componentDidMount () {
    analytics.pageViewed({
      pageTitle: 'Feed',
      pagePath: '/feed'
    })

    this.unsubscribeObserver = firestore
      .collection('posts')
      .onSnapshot(snapshot => {
        this.setState({
          feedItems: snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
        })
      })
  }

  componentWillUnmount () {
    if (this.unsubscribeObserver) {
      this.unsubscribeObserver()
    }
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
