import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Grid, Cell, Switch, TimePicker } from 'components'

const array = [1, 2, 3, 4, 5, 6, 7]

const WrapperStyled = styled.div``

const TitleStyled = styled.span`
  color: #1f252a;
  font-size: 14px;
  font-family: 'Montserrat-SemiBold';
  padding: 0 0 0 20px;
  margin-bottom: 15px;
`

const ItemStyled = styled.div`
  height: 65px;
  border-radius: 75px;
  border: 1px solid ${({ checked }) => (checked ? '#6adc91' : '#E2E2E2')};
  padding: 20px;
  text-align: center;
`

const ItemSwitchStyled = styled.div`
  height: 65px;
  border-radius: 75px;
  border: 1px solid ${({ checked }) => (checked ? '#6adc91' : '#E2E2E2')};
  padding: 20px;
  display: grid;
  grid-template-columns: auto auto;
`

const SwitchStyled = styled.div`
  justify-self: end;
`

const TimeTable = props => {
  const [select, setSelect] = useState(true)

  const handleSelectChange = (e, { checked }) => {
    setSelect(checked)
  }
  return (
    <WrapperStyled>
      <Grid columns={12} columnGap="40px" style={{ margin: '30px 0' }}>
        <Cell width={4}>
          <ItemSwitchStyled>
            <span>Open 24 / 7</span>
            <SwitchStyled>
              <Switch name={123 + 1} />
            </SwitchStyled>
          </ItemSwitchStyled>
        </Cell>
      </Grid>
      <Grid columns={12} columnGap="40px" left>
        <Cell width={4} middle>
          <TitleStyled>Days</TitleStyled>
        </Cell>
        <Cell width={2} middle>
          <TitleStyled>Opening</TitleStyled>
        </Cell>
        <Cell width={2} middle>
          <TitleStyled>Close</TitleStyled>
        </Cell>
        <Cell width={4} middle>
          <TitleStyled>Working hours</TitleStyled>
        </Cell>
      </Grid>
      <Grid columns={12} rows={7} rowGap="20px" columnGap="40px">
        {array.map(item => (
          <>
            <Cell width={4}>
              <ItemSwitchStyled checked={select}>
                <span>Monday</span>
                <SwitchStyled>
                  <Switch name={item + 1} handleCheckboxChange={handleSelectChange} checked={select} />
                </SwitchStyled>
              </ItemSwitchStyled>
            </Cell>
            <Cell width={2}>
              <ItemStyled>
                <TimePicker />
              </ItemStyled>
            </Cell>
            <Cell width={2}>
              <ItemStyled>5:00 pm</ItemStyled>
            </Cell>
            <Cell width={4}>
              <ItemSwitchStyled>
                <span>Open 24 hours</span>
                <SwitchStyled>
                  <Switch name={item + 2123} />
                </SwitchStyled>
              </ItemSwitchStyled>
            </Cell>
          </>
        ))}
      </Grid>
    </WrapperStyled>
  )
}

TimeTable.defaultProps = {
  input: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.number,
      description: PropTypes.string,
      active: PropTypes.bool,
      fulltime: PropTypes.bool,
      open: PropTypes.number,
      close: PropTypes.number
    })
  ).isRequired
}

TimeTable.propTypes = {}

export default TimeTable
