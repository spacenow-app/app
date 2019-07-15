import React from 'react'
import { Title, Grid, Cell, TimeTable } from 'components'

const AvailabilityTab = () => {
  return (
    <Grid columns={1} rowGap="80px">
      <Cell>
        <Title type="h3" title="Timetable*" subtitle="Let guests know the times your space is open." />
        <TimeTable />
      </Cell>
      <Cell>
        <Title
          type="h3"
          title="Blocked dates"
          subtitle="Block out times when the space is not available within business opening hours."
        />
      </Cell>
      <Cell>
        <Title
          type="h3"
          title="Holidays"
          subtitle="Are you closed on all Australian holidays? Or Just a few of them?"
        />
      </Cell>
    </Grid>
  )
}

export default AvailabilityTab
