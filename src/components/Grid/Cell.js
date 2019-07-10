import React from 'react'
import PropTypes from 'prop-types'
import { Cell as CellStyled } from 'styled-css-grid'

const Cell = props => {
  return <CellStyled {...props}>{props.children}</CellStyled>
}

Cell.defaultProps = {
  children: null
}

Cell.propTypes = {
  children: PropTypes.element
}

export default Cell
