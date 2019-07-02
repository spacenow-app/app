import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { withTheme } from 'theme'

const WrapperStyled = styled.div`
  display: grid;
  width: 350px;
  min-height: 200px;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : props.theme.cardVertical.backgroundColor};
  border-radius: ${props => props.theme.cardVertical.borderRadius};
`

const ImageStyled = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-top-left-radius: ${props => props.theme.cardVertical.borderRadius};
  border-top-right-radius: ${props => props.theme.cardVertical.borderRadius};

  @media (max-width: 680px) {
    height: 230px;
  }
`

const ContentStyled = styled.div`
  padding: 30px;
`

const CardVertical = ({ imageSrc, contentComponent, theme, backgroundColor }) => (
  <WrapperStyled theme={theme} backgroundColor={backgroundColor}>
    <div>
      <ImageStyled src={imageSrc} />
    </div>
    <ContentStyled>
      {cloneElement(contentComponent, {
        ...contentComponent.props
      })}
    </ContentStyled>
  </WrapperStyled>
)

CardVertical.defaultProps = {
  contentComponent: null,
  backgroundColor: null
}

CardVertical.propTypes = {
  theme: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  contentComponent: PropTypes.element,
  backgroundColor: PropTypes.string
}

export default withTheme(CardVertical)
