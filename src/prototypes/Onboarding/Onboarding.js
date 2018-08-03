import React, { Component } from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import type { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import MobileOnboarding from '../MobileOnboarding'
import WebOnboarding from '../WebOnboarding'

type Props = {
  onDone: () => void,
  width: Breakpoint
}

class Onboarding extends Component<Props> {
  render () {
    const { onDone, width } = this.props

    return isWidthUp('sm', width) ? (
      <WebOnboarding onDone={onDone} />
    ) : (
      <MobileOnboarding onDone={onDone} />
    )
  }
}

export default withWidth()(Onboarding)
