import styled from 'styled-components'
import { space, color, layout, grid, background, border, position, shadow } from 'styled-system'
import propTypes from '@styled-system/prop-types'

const Box = styled.div`${space} ${color} ${layout} ${grid} ${background} ${border} ${position} ${shadow}`

Box.propTypes = {
  ...propTypes.space,
  ...propTypes.color,
  ...propTypes.layout,
  ...propTypes.grid,
  ...propTypes.background,
  ...propTypes.border,
  ...propTypes.position,
  ...propTypes.shadow
}

export default Box
