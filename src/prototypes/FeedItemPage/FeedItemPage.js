import React, { Component, Fragment } from 'react'
import AppBar from '../../components/AppBar'
import type { FeedItemType } from '../../types/FeedItemType'
import FeedItem from '../FeedItem'
import Wrapper from '../../components/Wrapper'
import withStyles from '@material-ui/core/styles/withStyles'

const CustomWrapper = withStyles(theme => ({
  root: {
    marginTop: theme.spacing.unit
  }
}))(Wrapper)

type Props = {|
  ...FeedItemType,
  backLink: string
|}

class FeedItemPage extends Component<Props> {
  render () {
    const { title, backLink, ...rest } = this.props

    return (
      <Fragment>
        <AppBar title={title} backLink={backLink} />
        <CustomWrapper>
          <FeedItem title={title} {...rest} />
        </CustomWrapper>
      </Fragment>
    )
  }
}

export default FeedItemPage
