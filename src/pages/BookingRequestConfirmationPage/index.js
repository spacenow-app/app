import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Wrapper, Box, Title, Icon, Text, Tag, CardCheckout, Loader, Link } from 'components'
import { format } from 'date-fns'
import { onGetBooking } from 'redux/ducks/booking'
import periodLabel from 'utils/periodLabel'

const BookingRequestConfirmation = ({ match, ...props }) => {
  
  const dispatch = useDispatch()
  const { object: reservation, isLoading: isLoadingGetBooking } = useSelector(state => state.booking.get)
  
  useEffect(() => {
    dispatch(onGetBooking(match.params.id))
  }, [dispatch, match.params.id])
  
  return <Wrapper>
    {isLoadingGetBooking && <Loader />}
    {!isLoadingGetBooking && 
    <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: '3fr 1fr' }} style={{marginTop: "30px"}} gridGap="30px">
      <Box display="grid" gridGap="30px">
        <Box display="grid">
          <Title type="h3" title="Thank you for your booking" noMargin/>
          <Title type="h3" title="Request has been received" noMargin/>
        </Box>
        <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: '3fr 1fr' }}>
          <Box display="grid" gridGap="30px">
            <Title type="h6" title="Request Details" noMargin/>
            <Box display="grid">
              <Tag icon={ <Icon width="20px" height="20px" name={`price`} fill={`#51C482`}/> } noBorder={true}><Text>Reservation Cost: AUD ${reservation.priceDetails.total.toFixed(2)}</Text></Tag>
              <Tag icon={ <Icon width="20px" height="20px" name={`calendar-thin`} fill={`#51C482`}/> } noBorder={true}><Text>Date: {format(new Date(reservation.checkIn), 'd LLL yyyy')}</Text></Tag>
              {reservation.priceType === "hourly" && <Tag icon={ <Icon width="20px" height="20px" name={`clock`} fill={`#51C482`}/> } noBorder={true}><Text>Time: </Text></Tag> }
              <Tag icon={ <Icon width="20px" height="20px" name={`hourglass`} fill={`#51C482`}/> } noBorder={true}><Text>Duration: {`${reservation.period} ${periodLabel(reservation.priceType, reservation.period)}`}</Text></Tag>
            </Box>
            <Title type="h6" title="What happen next?" noMargin/>
            <Box display="grid">
              <Tag icon={ <Icon width="42px" height="42px" name={`clock-booking`} fill={`#51C482`}/> } noBorder={true}><Text>Your request has been sent to the host to review and approve. If there are any changes or modifications needed to get you booking confirmed, you will be notified straight away!</Text></Tag>
              <Tag icon={ <Icon width="42px" height="42px" name={`payment`} fill={`#51C482`}/> } noBorder={true}><Text>Once you're approved, you will receive a confirmation email with a link to pay and lock-in your booking for the requested date.</Text></Tag>
              <Tag icon={ <Icon width="42px" height="42px" name={`confirm-with-host`} fill={`#51C482`}/> } noBorder={true}><Text>As soon as the payment has been received you're good to go! We will share the details about how to check-in + any other helpful hints, tips and notifications to do with your bookings.</Text></Tag>
            </Box>
            <Title type="h6" title="Need help?" noMargin/>
            <Box display="grid" gridGap="30px" gridAutoFlow="column" gridAutoColumns="max-content" >
              <Tag><Link to={`https://spacenow.com/help/`} style={{padding: "10px 30px"}}>FAQ</Link></Tag>
              <Tag><Link to={`https://spacenow.com/contact-us/`} style={{padding: "10px 30px"}}>Contact our helpful support team</Link></Tag>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display="grid">
        <Box display="grid" style={{justifyItems: "end", height: "max-content"}}>
          <Tag><Link to={`/search`}>Back to search</Link></Tag>
        </Box>
        <CardCheckout reservation={reservation} />
      </Box>
    </Box>
    }
  </Wrapper>
}

export default BookingRequestConfirmation