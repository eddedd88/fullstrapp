import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import BottomNavBarWithRouter, { BottomNavBar } from './BottomNavBar'

describe('BottomNavBar', () => {
  it('renders correctly', () => {
    const renderer = new ShallowRenderer()
    const tree = renderer.render(
      <BottomNavBar
        classes={{ test: 'test' }}
        location={{
          pathname: '/reasons',
          hash: '',
          search: ''
        }}
      />
    )
    expect(tree).toMatchSnapshot()
  })

  it('renders with router correctly', () => {
    const renderer = new ShallowRenderer()
    const tree = renderer.render(<BottomNavBarWithRouter />)
    expect(tree).toMatchSnapshot()
  })
})
