import React, { Component } from 'react'
import GridPage from '../../components/GridPage'
import Image1 from '../../media/cassie-boca-293379-unsplash.jpg'
import Image2 from '../../media/dan-freeman-404566-unsplash.jpg'
import Image3 from '../../media/fabio-mangione-236846-unsplash.jpg'
import Image4 from '../../media/tommy-lisbin-276996-unsplash.jpg'
import analytics from '../../utils/analytics'

const gridItems = [
  {
    id: 1,
    title: 'One',
    subtitle: 'sub one',
    imgSrc: Image1
  },
  {
    id: 2,
    title: 'Two',
    subtitle: 'sub two',
    imgSrc: Image2
  },
  {
    id: 3,
    title: 'Three',
    subtitle: 'sub three',
    imgSrc: Image3
  },
  {
    id: 4,
    title: 'Four',
    subtitle: 'sub four',
    imgSrc: Image4
  }
]

class GridPageContainer extends Component<{||}> {
  componentDidMount () {
    analytics.pageViewed({
      pageTitle: 'Grid',
      pagePath: '/grid'
    })
  }

  render () {
    return <GridPage gridItems={gridItems} />
  }
}

export default GridPageContainer
