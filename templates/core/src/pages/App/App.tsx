import React, { FunctionComponent } from 'react'
import AppBar from '../../components/AppBar'
import AppBarTitle from '../../components/AppBarTitle'
import Wrapper from '../../components/Wrapper'
import BottomNavBar from './BottomNavBar'

const App: FunctionComponent = () => {
  return (
    <>
      <AppBar>
        <AppBarTitle>fullstrapp</AppBarTitle>
      </AppBar>
      <Wrapper>Welcome to the your new app!</Wrapper>
      <BottomNavBar />
    </>
  )
}

export default App
