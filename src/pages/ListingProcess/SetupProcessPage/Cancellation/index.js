import React from 'react'
import { Wrapper, Box, Title, StepButtons, Radio } from 'components'

const CancellationPage = ({ listing, ...props }) => {
  return (
    <Wrapper>
      <Box display="grid" gridGap="30px">
        <Box>
          <Title
            type="h3"
            title="Cancellation policies"
            subtitle="Select the best policy for your space."
            subTitleMargin="10px"
          />
        </Box>
        <Box display="grid" gridTemplateColumns={{ _: 'auto 1fr' }} gridGap="10px">
          <Radio />
          <Box>
            <Title
              type="h6"
              title="Very flexible"
              subtitle="Guests may cancel their booking up until 24 hours before the event start time and will receive a full refund (including all Fees) of their booking price. Bookings cancelled less than 24 hours before the start time are not refundable."
              subTitleMargin={12}
              mediumBold
              noMargin
            />
          </Box>
        </Box>
        <Box display="grid" gridTemplateColumns={{ _: 'auto 1fr' }} gridGap="10px">
          <Radio />
          <Box>
            <Title
              type="h6"
              title="Flexible"
              subtitle="Guests may cancel their booking up until 7 days before the start time and will receive a full refund (including all Fees) of their booking price. Guests may cancel their booking between 7 days and 24 hours before the start time and receive a 50% refund (excluding Fees) of their booking price. Bookings cancelled less than 24 hours before the start time are not refundable."
              subTitleMargin={12}
              mediumBold
              noMargin
            />
          </Box>
        </Box>
        <Box display="grid" gridTemplateColumns={{ _: 'auto 1fr' }} gridGap="10px">
          <Radio />
          <Box>
            <Title
              type="h6"
              title="Standard 30"
              subtitle="Guests may cancel their Booking between 7 days and 24 hours before the event start time and receive a 50% refund (excluding Fees) of their Booking Price. Booking cancellations submitted less than 24 hours before the Event start time are not refundable."
              subTitleMargin={12}
              mediumBold
              noMargin
            />
          </Box>
        </Box>
        <Box display="grid" gridTemplateColumns={{ _: 'auto 1fr' }} gridGap="10px">
          <Radio />
          <Box>
            <Title
              type="h6"
              title="No cancellations"
              subtitle="Guest cannot cancel their booking. Note: This may affect the number of bookings received."
              subTitleMargin={12}
              mediumBold
              noMargin
            />
          </Box>
        </Box>
      </Box>
      <StepButtons
        prev={{
          disabled: false,
          onClick: () => props.history.push(`/listing-process/setup-process/${listing.id}/opening-hours`)
        }}
        next={{
          // disabled: !location,
          onClick: () => props.history.push('/listing-process/view/357')
          // isLoading: isLoadingCreating
        }}
      />
    </Wrapper>
  )
}

export default CancellationPage
