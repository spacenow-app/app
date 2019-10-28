import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from 'components'

const WrapperStyled = styled.div`
  display: grid;
  min-height: 200px;
  background-color: #ededed;
  grid-row-gap: 32px;
  border-radius: 15px;
  width: 350px;
  padding: ${props => (props.noPadding && '0px') || '42px'};

  @media only screen and (max-width: 991px) {
    width: 100%;
  }
`
const TitleStyled = styled.div`
  justify-self: stretch;
`
const ContentStyled = styled.div`
  justify-self: stretch;
`
const FooterStyled = styled.div`
  justify-self: stretch;
`

const BottomStyled = styled.div`
  margin-top: 10px;
`

const BookingCard = props => (
  <Box {...props}>
    <WrapperStyled>
      {props.titleComponent && (
        <TitleStyled>
          {cloneElement(props.titleComponent, {
            ...props.titleComponent.props
          })}
        </TitleStyled>
      )}
      {props.contentComponent && (
        <ContentStyled>
          {cloneElement(props.contentComponent, {
            ...props.contentComponent.props
          })}
        </ContentStyled>
      )}
      {props.footerComponent && (
        <div>
          <FooterStyled>
            {cloneElement(props.footerComponent, {
              ...props.footerComponent.props
            })}
          </FooterStyled>
        </div>
      )}
    </WrapperStyled>
    {props.bottomComponent && (
      <div>
        <BottomStyled>
          {cloneElement(props.bottomComponent, {
            ...props.bottomComponent.props
          })}
        </BottomStyled>
      </div>
    )}
  </Box>
)

BookingCard.defaultProps = {
  titleComponent: null,
  contentComponent: null,
  footerComponent: null,
  bottomComponent: null,
  noPadding: false
}

BookingCard.propTypes = {
  titleComponent: PropTypes.element,
  contentComponent: PropTypes.element,
  footerComponent: PropTypes.element,
  bottomComponent: PropTypes.element,
  noPadding: PropTypes.bool
}

export default BookingCard
