import React from 'react'
import styled from 'styled-components'
import { Title, Grid, Cell, StepButtons } from 'components'

import GraphCancelattionImage from './graph_cancellation.png'

const ImageStyled = styled.img`
  width: 100%;
`

const CancellationTab = props => {
  return (
    <Grid columns={1}>
      <Cell>
        <Title type="h3" title="Cancellation Policy" />
      </Cell>
      <Cell>
        <Grid columns={12}>
          <Cell width={4}>
            <Title
              noMargin
              type="h4"
              title="No Cancellation"
              subTitleSize={16}
              subtitle="Guest cannot cancel their booking. Note: This may affect the number of bookings received."
            />
          </Cell>
          <Cell width={8}>
            <ImageStyled alt="Cancellation Policy" src={GraphCancelattionImage} />
          </Cell>
        </Grid>
      </Cell>
      <StepButtons
        prev={{ onClick: () => props.history.push('booking') }}
        next={{ onClick: () => props.history.push(`/listing/preview/${props.match.params.id}`) }}
      />
    </Grid>
  )
}

export default CancellationTab
