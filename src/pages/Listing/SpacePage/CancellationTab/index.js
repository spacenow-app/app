import React from 'react'
import styled from 'styled-components'
import { Title, Grid, Cell } from 'components'

import GraphCancelattionImage from './graph_cancellation.png'

const ImageStyled = styled.img`
  width: 100%;
`

const CancellationTab = () => {
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
    </Grid>
  )
}

export default CancellationTab
