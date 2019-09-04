import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'
import { format } from 'date-fns'
import { monthNames } from 'variables'
import Badge from '../Badge'

const WrapperStyled = styled.div`
  margin: 25px 0;
`

const ContainerStyled = styled.div`
  margin: 15px 0;
`

const MonthNameStyled = styled.span`
  margin-left: 15px;
  font-size: 14px;
`

const ContainerDatesStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(45px, 45px));
  margin-top: 5px;
`

const ListDates = props => {
  if (!props.dates || props.dates.lenght < 0) {
    return null
  }
  const datesGrouped = _.groupBy(props.dates, item => format(item, 'MMMM'))

  return (
    <WrapperStyled>
      {monthNames.map(month => {
        if (datesGrouped[month]) {
          return (
            <ContainerStyled key={month}>
              <MonthNameStyled>{month}</MonthNameStyled>
              <ContainerDatesStyled>
                {datesGrouped[month].map(date => (
                  <Badge key={date} handleClick={props.onClickDate && (e => props.onClickDate(e, date))}>
                    {format(date, 'D')}
                  </Badge>
                ))}
              </ContainerDatesStyled>
            </ContainerStyled>
          )
        }
        return null
      })}
    </WrapperStyled>
  )
}

ListDates.defaultProps = {
  onClickDate: null
}

ListDates.propTypes = {
  theme: PropTypes.instanceOf(Object),
  onClickDate: PropTypes.func,
  dates: PropTypes.instanceOf(Array).isRequired
}

export default ListDates
