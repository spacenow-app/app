import React from 'react'
import styled from 'styled-components'
import { Button, Icon } from '../../../components'

const Wrapper = styled.div`
  display: grid;
  max-width: 575px;
  max-height: 700px;
  padding: 50px;
  border: 1px solid #e2e2e2;
  border-radius: 15px;
  grid-row-gap: 35px;
`
const Title = styled.div`
  text-align: center;
  color: #172439;
  font-size: 24px;
  font-family: 'Montserrat-Bold';
`
const Description = styled.div`
  color: #172439;
  font-size: 14px;
  text-align: center;
  max-height: 85px;
  height: 80px;
`

const IconStyled = styled(Icon)`
  max-height: 250px;
`

const ButtonStyled = styled(Button)`
  justify-self: center;
`

const CardIcon = ({ icon, title, description, buttonText, buttonHandleClick }) => {
  return (
    <Wrapper>
      <IconStyled name={icon} />
      <Title>{title}</Title>
      <Description>{description}</Description>
      <ButtonStyled onClick={buttonHandleClick}>{buttonText}</ButtonStyled>
    </Wrapper>
  )
}

export default CardIcon
