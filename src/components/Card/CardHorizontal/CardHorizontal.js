import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTheme } from '../../theme';

const WrapperStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  border-radius: ${props => (props.isRounded ? props.theme.card.borderRadius.large : 0)};
  box-shadow: ${props => `${props.theme.card.boxShadow.blur} ${props.theme.card.boxShadow.color}`};
  cursor: pointer;
  overflow: hidden;
`;
export const ImageStyled = styled.div`
`;
export const ContentStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  position: relative;
  padding: ${props => props.theme.card.padding.default};
  > .cardContentTitle {
    grid-column-start: 1;
    grid-column-end: span col6-start;
    grid-row-start: 1;
  }
  > .cardContentPrice {
    grid-row-start: 2;
    grid-column-start: 1;
    grid-column-end: span col7-start;
  }
  > .cardContentTags {
    grid-row-start: 3;
    grid-column-start: 1;
    grid-column-end: span col4-start;
  }
  > .cardContentToolTip {
    grid-row-start: 3;
    grid-column-start: 5;
    grid-column-end: span 1;
  }
  > .cardContentStatus {
    grid-row-start: 3;
    grid-column-start: 6;
    grid-column-end: span 2;
  }
`;

const CardHorizontal = props => (
  <WrapperStyled isRounded={props.isRounded} {...props}>
    {props.children}
  </WrapperStyled>
);

CardHorizontal.defaultProps = {
  isRounded: false,
  children: null,
};

CardHorizontal.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  theme: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
  isRounded: PropTypes.bool,
};

export default withTheme(CardHorizontal);
