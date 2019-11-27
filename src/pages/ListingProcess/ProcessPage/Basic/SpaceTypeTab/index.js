import React from 'react'
import styled from 'styled-components'
import { Title, StepButtons, Grid, Cell, Radio, Box } from 'components'

const CellStyled = styled(Cell)`
  display: grid;
`

const SpaceTypeTab = props => {
  return (
    <>
      <Title type="h3" title="Property type" subtitle="Which best describes your space?" subTitleMargin="10px" />
      <Grid column={12} rowGap="40px">
        <CellStyled width={1}>
          <Radio />
        </CellStyled>
        <CellStyled width={11}>
          <Box ml="-40px" width="75%">
            <Title
              type="h6"
              title="Established space or business"
              subtitle="The space has managed bookings and systems in place for hire and extras like catering."
              subTitleMargin={12}
              mediumBold
              noMargin
            />
          </Box>
        </CellStyled>
        <CellStyled width={1}>
          <Radio />
        </CellStyled>
        <CellStyled width={11}>
          <Box ml="-40px" width="75%">
            <Title
              type="h6"
              title="Private property"
              subtitle="The space is privately owned but is perfect for people to hire and use for events or creative uses like location shoots or production companies to hire."
              subTitleMargin={12}
              mediumBold
              noMargin
            />
          </Box>
        </CellStyled>
        <CellStyled width={1}>
          <Radio checked />
        </CellStyled>
        <CellStyled width={11}>
          <Box ml="-40px" width="75%">
            <Title
              type="h6"
              title="Shared or sublet"
              subtitle="You have a lease on the space and wish to share or sublease."
              subTitleMargin={12}
              mediumBold
              noMargin
            />
          </Box>
        </CellStyled>
      </Grid>
      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.replace('/listing-process/space/357/step') }} // modal can't change location or create new
        next={{
          // disabled: !location,
          onClick: () => props.history.replace('/listing-process/space/357/category')
          // isLoading: isLoadingCreating
        }}
      />
    </>
  )
}

export default SpaceTypeTab
