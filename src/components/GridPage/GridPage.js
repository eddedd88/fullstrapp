import React, { Component, Fragment } from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import MaxWidthDiv from '../MaxWidthDiv'
import type { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import AppBar from '../AppBar'

type Props = {
  gridItems: Array<{|
    id: number,
    title: string,
    subtitle: string,
    imgSrc: string
  |}>,
  width: Breakpoint
}

class GridPage extends Component<Props> {
  render () {
    const { gridItems, width } = this.props

    return (
      <Fragment>
        <AppBar title='Image Grid' />
        <MaxWidthDiv style={{ marginTop: 8 }}>
          <GridList cellHeight={isWidthUp('sm', width) ? 300 : 180}>
            {gridItems &&
              gridItems.map(({ id, title, imgSrc, subtitle }, index) => (
                <GridListTile key={id}>
                  <img src={imgSrc} alt={title} />
                  <GridListTileBar
                    title={title}
                    subtitle={subtitle}
                    actionIcon={
                      <IconButton>
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
          </GridList>
        </MaxWidthDiv>
      </Fragment>
    )
  }
}

export default withWidth()(GridPage)
