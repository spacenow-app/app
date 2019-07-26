import styled from 'styled-components'
import { space, color, layout, grid, flexbox, background, border, position, shadow, typography } from 'styled-system'
import propTypes from '@styled-system/prop-types'

const Box = styled.div`${space} ${color} ${layout} ${grid} ${background} ${border} ${position} ${shadow} ${flexbox} ${typography}`

Box.propTypes = {
  ...propTypes.space,
  ...propTypes.color,
  ...propTypes.layout,
  ...propTypes.grid,
  ...propTypes.background,
  ...propTypes.border,
  ...propTypes.position,
  ...propTypes.shadow,
  ...propTypes.flexbox,
  ...propTypes.typography
}

export default Box
