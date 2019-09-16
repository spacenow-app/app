import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Title, Grid, Cell, StepButtons, Box } from 'components'

import GraphCancelattionImage from './graph_cancellation.png'

const ImageStyled = styled.img`
  width: 100%;
`

const CancellationTab = props => {
  return (
    <>
      <Helmet title="Listing Space Cancellation - Spacenow" />
      <Grid columns={1}>
        <Cell>
          <Title type="h3" title="Cancellation Policy" />
        </Cell>
        <Cell>
          <Box display="grid" gridTemplateColumns={{ _: "1fr", medium: "1fr 2fr" }} gridGap="20px">
            <Cell width={1}>
              <Title
                noMargin
                type="h4"
                title="No Cancellation"
                subTitleSize={16}
                subtitle="Guest cannot cancel their booking. Note: This may affect the number of bookings received."
              />
            </Cell>
            <Cell width={1}>
              <ImageStyled alt="Cancellation Policy" src={GraphCancelattionImage} />
            </Cell>
          </Box>
        </Cell>
        <StepButtons
          prev={{ onClick: () => props.history.push('availability') }}
          next={{ onClick: () => props.history.push(`/listing/preview/${props.match.params.id}`) }}
        />
      </Grid>
    </>
  )
}

CancellationTab.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired
}

export default CancellationTab
