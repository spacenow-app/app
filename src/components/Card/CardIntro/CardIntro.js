import React from 'react'
import styled from 'styled-components'
import { Button, Icon, Box, Grid, Cell, Text } from 'components'

const Wrapper = styled.div`
  display: grid;
  max-width: 575px;
  max-height: 700px;
  padding: 50px 40px;
  border: 1px solid #c4c4c4;
  border-radius: 7px;
  grid-row-gap: 20px;
  margin: auto;
`
const Title = styled.div`
  color: #172439;
  font-size: 14px;
  font-family: 'Montserrat-SemiBold';
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
  width: 100px;
  padding: 10px;
`

const ButtonStyled = styled(Button)`
  width: auto !important;
  padding: 0 30px !important;
  @media only screen and (max-width: 425px) {
    width: 100% !important;
  }
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

const CardIntro = ({ icon, title, text, checklist, secondText, buttonText, buttonHandleClick }) => {
  const CellStyled = styled(Cell)`
    @media only screen and (max-width: 768px) {
      grid-column-end: span 12 !important;
    }
  `
  return (
    <Wrapper>
      <Grid columns={12}>
        <CellStyled width={3}>
          <IconStyled name={icon} />
        </CellStyled>
        <CellStyled width={9}>
          <Box my="10px">
            <Title>{title}</Title>
          </Box>
          <Description>{addLineBreaks(text)}</Description>
          <Box mb="24px">
            {checklist.map(item => {
              return (
                <Grid columns={12} style={{ display: 'grid', alignItems: 'baseline' }} key={item}>
                  <Cell width={1}>
                    <Icon name="check-mark" width="15px" height="32px" fill="#6adc91" />
                  </Cell>
                  <Cell width={11}>
                    <Text fontSize="14px">{item}</Text>
                  </Cell>
                </Grid>
              )
            })}
          </Box>
          <Description>{addLineBreaks(secondText)}</Description>
          {buttonText && (
            <ButtonStyled size="sm" onClick={buttonHandleClick}>
              {buttonText}
            </ButtonStyled>
          )}
        </CellStyled>
      </Grid>
    </Wrapper>
  )
}

export default CardIntro
