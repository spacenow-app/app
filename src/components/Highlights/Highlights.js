import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Icon } from 'components'

const TitleStyled = styled.span`
  font-size: ${props => (props.isTitle ? '12px' : '18px')};
  color: ${props => (props.error ? '#E05252' : '#172439')};
  font-family: 'Montserrat-Regular';
`

const Highlights = ({ title, name, icon, last, error, ...props }) => {
  return (
    <Box
      {...props}
      borderRight={!last ? '1px solid' : null}
      borderColor="greyLight"
      ml="-20px"
      pl="40px"
      display="grid"
      gridTemplateRows="auto auto auto"
      gridRowGap="20px"
    >
      <TitleStyled isTitle>{title}</TitleStyled>
      <Icon width="40px" fill={error ? '#E05252' : '#6ADD92'} name={icon} />
      <TitleStyled error={error}>{name}</TitleStyled>
    </Box>
  )
}

Highlights.defaultProps = {}

Highlights.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  last: PropTypes.bool,
  error: PropTypes.bool
}

export default Highlights
