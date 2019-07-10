import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Grid as GridImported } from 'styled-css-grid'

const GridStyled = styled(GridImported)`
  width: ${props => props.width};
`

const Grid = props => {
  return <GridStyled {...props}>{props.children}</GridStyled>
}

Grid.defaultProps = {
  children: null
}

Grid.propTypes = {
  children: PropTypes.element
}

export default Grid
