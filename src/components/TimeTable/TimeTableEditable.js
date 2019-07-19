import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Grid, Cell, Switch, TimePicker } from 'components'

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

const TimeTableEditable = ({ data, handleClickDay, handleClickOpen, handleClickClose, handleClick24hours }) => {
  const onHandleClickDay = (e, item) => {
    handleClickDay(e, { item })
  }
  const onHandleClickOpen = (e, item) => {
    handleClickOpen(e, { item })
  }
  // const onHandleClickClose = (e, item) => {
  //   handleClickClose(e, { item })
  // }
  const onHandleClick24hours = (e, item) => {
    handleClick24hours(e, { item })
  }
  const onHandleClick247hours = (e, item) => {
    handleClick24hours(e, { item })
  }

  return (
    <WrapperStyled>
      <Grid columns={12} columnGap="40px" style={{ margin: '30px 0' }}>
        <Cell width={4}>
          <ItemSwitchStyled>
            <span>Open 24 / 7</span>
            <SwitchStyled>
              <Switch name="fulltime" disabled={false} handleCheckboxChange={onHandleClick247hours} checked={false} />
            </SwitchStyled>
          </ItemSwitchStyled>
        </Cell>
      </Grid>
      <Grid columns={12} columnGap="40px" left>
        <Cell width={4} middle>
          <TitleStyled>Days</TitleStyled>
        </Cell>
        <Cell width={2} middle>
          <TitleStyled>Open</TitleStyled>
        </Cell>
        <Cell width={2} middle>
          <TitleStyled>Close</TitleStyled>
        </Cell>
        <Cell width={4} middle>
          <TitleStyled>Working hours</TitleStyled>
        </Cell>
      </Grid>
      <Grid columns={12} rows={7} rowGap="20px" columnGap="40px">
        {data.map(item => (
          <Fragment key={item.day}>
            <Cell width={4}>
              <ItemSwitchStyled checked={item.active}>
                <span>{item.description}</span>
                <SwitchStyled>
                  <Switch name={item.day} handleCheckboxChange={onHandleClickDay} checked={item.active} />
                </SwitchStyled>
              </ItemSwitchStyled>
            </Cell>
            <Cell width={2}>
              <ItemStyled disabled={item.active}>
                <TimePicker
                  disabled={item.fulltime || !item.active}
                  // defaultValue={new Date()}
                  // value={new Date()}
                  onChange={time => onHandleClickOpen(time, item)}
                  format={24}
                />
              </ItemStyled>
            </Cell>
            <Cell width={2}>
              <ItemStyled>
                {/* <TimePicker
                  disabled={item.fulltime || !item.active}
                  defaultValue={item.open}
                  value={item.open}
                  onChange={time => onHandleClickOpen(time, item)}
                  format={24}
                /> */}
              </ItemStyled>
            </Cell>
            <Cell width={4}>
              <ItemSwitchStyled>
                <span>Open 24 hours</span>
                <SwitchStyled>
                  <Switch
                    name={item.day}
                    disabled={item.active}
                    handleCheckboxChange={onHandleClick24hours}
                    checked={item.fulltime}
                  />
                </SwitchStyled>
              </ItemSwitchStyled>
            </Cell>
          </Fragment>
        ))}
      </Grid>
    </WrapperStyled>
  )
}

TimeTableEditable.defaultProps = {}

TimeTableEditable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.number,
      description: PropTypes.string,
      active: PropTypes.bool,
      fulltime: PropTypes.bool,
      open: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      close: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  handleClickDay: PropTypes.func,
  handleClickOpen: PropTypes.func,
  handleClickClose: PropTypes.func,
  handleClick24hours: PropTypes.func
}

export default TimeTableEditable
