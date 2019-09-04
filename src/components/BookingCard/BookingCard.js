import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const WrapperStyled = styled.div`
  display: grid;
  min-height: 200px;
  background-color: #F7F7F7;
  padding: 42px;
  grid-row-gap: 32px;
  border-radius: 15px;
  width: 350px;
`;
const TitleStyled = styled.div`
  justify-self: stretch;
`;
const ContentStyled = styled.div`
  justify-self: stretch;
`;
const FooterStyled = styled.div`
  justify-self: stretch;
`;

const Divider = styled.hr`
  color: #CBCBCB;
  margin-bottom: 40px;
`;

const BookingCard = props => (
  <WrapperStyled>
    {props.titleComponent && (
      <TitleStyled>
        {cloneElement(props.titleComponent, {
          ...props.titleComponent.props,
        })}
      </TitleStyled>
    )}
    {props.contentComponent && (
      <ContentStyled>
        {cloneElement(props.contentComponent, {
          ...props.contentComponent.props,
        })}
      </ContentStyled>
    )}
    {props.contentComponent && (
      <div>
      <Divider />
      <FooterStyled>
        {cloneElement(props.footerComponent, {
          ...props.footerComponent.props,
        })}
      </FooterStyled>
      </div>
    )}
  </WrapperStyled>
);

BookingCard.defaultProps = {
  titleComponent: null,
  footerComponent: null,
};

BookingCard.propTypes = {
  titleComponent: PropTypes.element,
  contentComponent: PropTypes.element.isRequired,
  footerComponent: PropTypes.element,
};

export default BookingCard
