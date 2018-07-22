import React, { Component } from 'react'
import FeedItemPage from '../../components/FeedItemPage'
import type { Match } from 'react-router'
import type { FeedItemType } from '../../types/FeedItemType'
import paths from '../../routes/paths'
import firestore from '../../utils/firebase/firestore'

type Props = {|
  match: Match
|}

type State = {
  feedItem: ?FeedItemType
}

class FeedItemPageContainer extends Component<Props, State> {
  state = {
    feedItem: null
  }

  componentDidMount () {
    const { feedId } = this.props.match.params

    if (feedId) {
      firestore
        .collection('posts')
        .doc(feedId)
        .get()
        .then(snapshot => {
          this.setState({
            feedItem: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
    }
  }

  render () {
    const { feedItem } = this.state
    const { match: { url } } = this.props
    const backLink = url.includes(paths.feed) ? paths.feed : paths.profile

    return feedItem && <FeedItemPage {...feedItem} backLink={backLink} />
  }
}

export default FeedItemPageContainer
