import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import BottomNavBarWithRouter, { BottomNavBar } from './BottomNavBar'

describe('BottomNavBar', () => {
  it('renders correctly', () => {
    const renderer = ShallowRenderer.createRenderer()
    const tree = renderer.render(
      <BottomNavBar
        items={[
          {
            label: 'Feed',
            icon: 'div',
            path: '/feed'
          },
          {
            label: 'Grid',
            icon: 'div',
            path: '/grid'
          },
          {
            label: 'Profile',
            icon: 'div',
            path: '/profile'
          }
        ]}
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
    const renderer = ShallowRenderer.createRenderer()
    const tree = renderer.render(<BottomNavBarWithRouter items={[]} />)
    expect(tree).toMatchSnapshot()
  })
})
