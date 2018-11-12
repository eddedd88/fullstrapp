import React, { Component } from 'react'
import AppBar from '../../components/AppBar'
import Wrapper from '../../components/Wrapper'
import BottomNavBar from './BottomNavBar'

class App extends Component {
  render() {
    return (
      <>
        <AppBar title='fullstrapp' />
        <Wrapper>Welcome to the your new app!</Wrapper>
        <BottomNavBar />
      </>
    )
  }
}

export default App
