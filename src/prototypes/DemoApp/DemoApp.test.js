import React from 'react'
import ReactDOM from 'react-dom'
import DemoApp from './DemoApp'
import { BrowserRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

describe('components > DemoApp', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DemoApp />)
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
