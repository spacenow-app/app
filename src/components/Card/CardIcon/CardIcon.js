import React from 'react'
import styled from 'styled-components'
import { Button, Icon } from 'components'

const Wrapper = styled.div`
  display: grid;
  max-width: 575px;
  max-height: 700px;
  padding: 50px;
  border: 1px solid #c4c4c4;
  border-radius: 15px;
  grid-row-gap: 45px;
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
  height: fit-content;
`

const IconStyled = styled(Icon)`
  max-height: 270px;
`

const ButtonStyled = styled(Button)`
  justify-self: center;
`

const addLineBreaks = description => {
  return description.split('<separate>').map((text, index) => {
    return (
      <React.Fragment key={`${text}-${index + 1}`}>
        {text}
        <br />
        <br />
      </React.Fragment>
    )
  })
}

const CardIcon = ({ icon, title, description, buttonText, buttonHandleClick }) => {
  return (
    <Wrapper>
      <IconStyled name={icon} />
      <Title>{title}</Title>
      <Description>{addLineBreaks(description)}</Description>
      <ButtonStyled onClick={buttonHandleClick}>{buttonText}</ButtonStyled>
    </Wrapper>
  )
}

export default CardIcon
