import React, { Component } from 'react'
import FeedItemPage from '../../components/FeedItemPage'
import feedItems from '../../data/feedItems'
import type { Match } from 'react-router'
import type { FeedItemType } from '../../types/FeedItemType'
import paths from '../../routes/paths'

type Props = {|
  match: Match
|}

type State = {
  feedItem: FeedItemType
}

class FeedItemPageContainer extends Component<Props, State> {
  state = {
    feedItem: feedItems[this.props.match.params.feedId]
  }

  render () {
    const { match: { url } } = this.props
    const backLink = url.includes(paths.feed) ? paths.feed : paths.profile

    return <FeedItemPage {...this.state.feedItem} backLink={backLink} />
  }
}

export default FeedItemPageContainer
