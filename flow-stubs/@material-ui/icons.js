import type { ComponentType, ElementConfig } from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'

/**
 * Material UI returns all icons as svg wrapped
 * by the component: '@material-ui/core/SvgIcon'
 */

declare export default ComponentType<ElementConfig<typeof SvgIcon>>
