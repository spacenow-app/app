import React from 'react'
import styled from 'styled-components'
import { Title, StepButtons, Grid, Cell, Radio, Box } from 'components'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 20px;

  @media (max-width: 680px) {
    grid-row-gap: 15px;
  }
`

const SectionStyled = styled.div``

const CellStyled = styled(Cell)`
  display: grid;
`

const CancelTab = props => {
  return (
    <WrapperStyled>
      <SectionStyled>
        <Title
          type="h3"
          title="Cancellation policies"
          subtitle="Select the best policy for your space."
          subTitleMargin="10px"
        />
        <Grid column={12} rowGap="40px">
          <CellStyled width={1}>
            <Radio />
          </CellStyled>
          <CellStyled width={11}>
            <Box ml="-40px" width="75%">
              <Title
                type="h6"
                title="Very flexible"
                subtitle="Guests may cancel their booking up until 24 hours before the event start time and will receive a full refund (including all Fees) of their booking price. Bookings cancelled less than 24 hours before the start time are not refundable."
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
                title="Flexible"
                subtitle="Guests may cancel their booking up until 7 days before the start time and will receive a full refund (including all Fees) of their booking price. Guests may cancel their booking between 7 days and 24 hours before the start time and receive a 50% refund (excluding Fees) of their booking price. Bookings cancelled less than 24 hours before the start time are not refundable."
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
                title="Standard 30"
                subtitle="Guests may cancel their Booking between 7 days and 24 hours before the event start time and receive a 50% refund (excluding Fees) of their Booking Price. Booking cancellations submitted less than 24 hours before the Event start time are not refundable."
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
                title="No cancellations"
                subtitle="Guest cannot cancel their booking. Note: This may affect the number of bookings received."
                subTitleMargin={12}
                mediumBold
                noMargin
              />
            </Box>
          </CellStyled>
        </Grid>
      </SectionStyled>
      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.replace('/listing-process/space/357/timetable') }} // modal can't change location or create new
        next={{
          // disabled: !location,
          onClick: () => props.history.push('/listing-process/view/357')
          // isLoading: isLoadingCreating
        }}
      />
    </WrapperStyled>
  )
}

export default CancelTab
