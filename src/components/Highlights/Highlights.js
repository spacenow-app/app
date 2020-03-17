import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Icon } from 'components'

const TitleStyled = styled.span`
  font-size: ${props => (props.isTitle ? '12px' : '16px')};
  color: ${props => (props.error ? '#E05252' : '#172439')};
  font-family: ${props => (props.isTitle ? 'Montserrat-Bold' : 'Montserrat-Regular')};
`

const Highlights = ({ title, name, icon, last, error, ...props }) => {
  return (
    <Box
      {...props}
      display="grid"
      gridGap="20px"
      gridAutoFlow="row"
      gridTemplateColumns="repeat(auto-fill, max-content)"
      justifyContent="center"
      justifyItems="center"
      padding="20px 5px"
      style={{
        border: "1px solid",
        borderRadius: "10px",
        borderColor: "#c4c4c4"
      }}
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
