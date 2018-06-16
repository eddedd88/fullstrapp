import React, { Component } from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import MaxWidthDiv from '../MaxWidthDiv'
import type { GridItemType } from '../../types/GridItemType'
import type { Breakpoint } from '@material-ui/core/styles/createBreakpoints'

type Props = {
  gridItems: GridItemType[],
  width: Breakpoint
}

class GridPage extends Component<Props> {
  render () {
    const { gridItems, width } = this.props

    return (
      <MaxWidthDiv>
        <ListSubheader component='div'>The Grid Page</ListSubheader>
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
    )
  }
}

export default withWidth()(GridPage)
