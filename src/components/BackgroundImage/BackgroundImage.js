import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SVGImageDataEmpty from './data_empty.svg';

const WrapperStyled = styled.div`
  text-align: center;
`;

const ImageStyled = styled.img`
  width: 100%;
`;

const TextStyled = styled.span`
  font-size: 24px;
  font-family: 'Montserrat-Bold';
  margin: 25px 0;
  display: block;
  color: #dddddd;
`;

const BackgroundImage = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <WrapperStyled>
      {props.text && <TextStyled>{props.text}</TextStyled>}
      <ImageStyled src={SVGImageDataEmpty} />
    </WrapperStyled>
  );
};

BackgroundImage.defaultProps = {
  show: true,
  text: null,
};

BackgroundImage.propTypes = {
  show: PropTypes.bool,
  text: PropTypes.string,
};

export default BackgroundImage;
