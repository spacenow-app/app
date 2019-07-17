import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { format } from 'date-fns'
import { Subtitle, Caption } from 'components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 200px 250px;
  @media (max-width: 680px) {
    grid-template-columns: 140px 210px;
  }
`

const Column = styled.div``

const TimeTableView = ({ timeTable }) => {
  if (!timeTable) {
    return 'No Data'
  }

  const renderOpeningData = weekDayIndex => {
    const dayOf = timeTable.find(o => o.weekday === weekDayIndex)
    if (dayOf && dayOf.allday) return '24 Hours'
    if (dayOf) {
      const hourOpen = format(dayOf.openHour, 'hh:mm a')
      const hourClose = format(dayOf.closeHour, 'hh:mm a')
      return `${hourOpen} to ${hourClose}`
    }
    return 'Closed'
  }

  return (
    <Grid>
      <Column>
        <Caption type="large">Weekday</Caption>
        <br />
        <Subtitle type="xSmall" color="#172439">
          Monday
        </Subtitle>
        <Subtitle type="xSmall" color="#172439">
          Tuesday
        </Subtitle>
        <Subtitle type="xSmall" color="#172439">
          Wednesday
        </Subtitle>
        <Subtitle type="xSmall" color="#172439">
          Thursday
        </Subtitle>
        <Subtitle type="xSmall" color="#172439">
          Friday
        </Subtitle>
        <Subtitle type="xSmall" color="#172439">
          Saturday
        </Subtitle>
        <Subtitle type="xSmall" color="#172439">
          Sunday
        </Subtitle>
      </Column>
      <Column>
        <Caption type="large">Opening hours</Caption>
        <br />
        <Subtitle type="xSmall" color="#172439">
          {renderOpeningData(1)}
        </Subtitle>
        <Subtitle type="xSmall" color="#172439">
          {renderOpeningData(2)}
        </Subtitle>
        <Subtitle type="xSmall" color="#172439">
          {renderOpeningData(3)}
        </Subtitle>
        <Subtitle type="xSmall" color="#172439">
          {renderOpeningData(4)}
        </Subtitle>
        <Subtitle type="xSmall" color="#172439">
          {renderOpeningData(5)}
        </Subtitle>
        <Subtitle type="xSmall" color="#172439">
          {renderOpeningData(6)}
        </Subtitle>
        <Subtitle type="xSmall" color="#172439">
          {renderOpeningData(0)}
        </Subtitle>
      </Column>
    </Grid>
  )
}

TimeTableView.defaultProps = {
  timeTable: [
    {
      weekday: 1,
      allday: true,
      openHour: new Date(),
      closeHour: new Date()
    },
    {
      weekday: 2,
      allday: false,
      openHour: new Date(),
      closeHour: new Date()
    },
    {
      weekday: 3,
      allday: false,
      openHour: new Date(),
      closeHour: new Date()
    },

    {
      weekday: 5,
      allday: false,
      openHour: new Date(),
      closeHour: new Date()
    },

    {
      weekday: 7,
      allday: false,
      openHour: new Date(),
      closeHour: new Date()
    }
  ]
}

TimeTableView.propTypes = {
  timeTable: PropTypes.arrayOf(
    PropTypes.shape({
      weekday: PropTypes.number.isRequired,
      allday: PropTypes.bool.isRequired,
      openHour: PropTypes.string.isRequired,
      closeHour: PropTypes.string.isRequired
    })
  )
}

export default TimeTableView
