import React from 'react'
import styled from 'styled-components'
import { Button, Icon, Box } from 'components'

const Wrapper = styled.div`
  display: grid;
  max-width: 575px;
  max-height: 700px;
  padding: 35px 40px;
  border: 1px solid #c4c4c4;
  border-radius: 15px;
  grid-row-gap: 20px;
`
const Title = styled.div`
  color: #172439;
  font-size: 24px;
  font-family: 'Montserrat-Bold';
`
const Description = styled.div`
  color: #172439;
  font-size: 14px;
  height: fit-content;
  width: 95%;
`

const IconStyled = styled(Icon)`
  max-height: 70px;
  text-align: right;
  fill: #6adc91;
  width: 60px;
`

const ButtonStyled = styled(Button)``

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

const CardIcon = ({ icon, title, description, buttonText, buttonHandleClick, icon2 }) => {
  return (
    <Wrapper>
      <Box>
        <IconStyled name={icon} />
        {icon2 && <IconStyled name={icon2} />}
      </Box>

      <Title>{title}</Title>
      <Description>{addLineBreaks(description)}</Description>
      <ButtonStyled onClick={buttonHandleClick}>{buttonText}</ButtonStyled>
    </Wrapper>
  )
}

export default CardIcon
