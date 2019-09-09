import 
    React, { useEffect,
  //  useState 
} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { 
  // useSelector, 
  useDispatch } from 'react-redux'
// import styled from 'styled-components'
// import _ from 'lodash'
// import { isSameDay, format } from 'date-fns'

// import { capitalize, toPlural } from 'utils/strings'

import {
  Wrapper,
  Title,
  Grid,
  Cell,
  // TimeTable,
  // Box,
  // Icon,
  // Loader,
  UserDetails,
  BookingCard,
  // Checkbox,
  // Button
} from 'components'

// import {
//   checkBookingState
// } from 'redux/ducks/checkout'

// import { openModal, TypesModal } from 'redux/ducks/modal'

// import config from 'variables/config'

const CheckoutPage = ({ match, location, ...props }) => {
  const dispatch = useDispatch()

  // const { object: listing, isLoading: isListingLoading } = useSelector(state => state.listing.get)

  // const [datesSelected, setDatesSelected] = useState([])

  useEffect(() => {

    // dispatch(checkBookingState(match.params.id, ['approved', 'requested']))
    // .catch(() => history.replace('/dashboard'))
    // .then(isDone => {
    //   console.log('isDone', isDone)
      // if (isDone) {
      //   toastr.info('Information', 'Reservation is already paid.')
      //   history.replace(`/itinerary/${reservationCode}`)
      // } else {
      //   this.props
      //     .checkBookingState(reservationCode, ['timeout'])
      //     .catch(() => history.replace('/dashboard/bookings'))
      //     .then(isDone => {
      //       if (isDone) {
      //         toastr.info('Information', 'Reservation is cancelled.')
      //         history.replace('/dashboard/bookings')
      //       } else {
      //         this.props.loadReservation(reservationCode)
      //         this.props.getCard()
      //       }
      //     })
      // }
    // })
  }, [dispatch, match.params.id])

  return (
    <Wrapper>
      <Helmet title="Checkout - Spacenow" />
      <Grid columns="auto 350px" columnGap="15px" rowGap="100px">
        <Cell> 

        </Cell>
        <Cell> 
          <BookingCard
            titleComponent={
              <>
                <Title
                  type="h5"
                  title="Hosted by"
                  noMargin
                />
                <UserDetails
                  hostname="host test"
                  imageProfile="imageTest"
                  joined="2019"
                />
              </>
            }
            contentComponent={
              <>
                {/* {_renderContentCard(listing.bookingPeriod)} */}
              </>
            }
            footerComponent={
              <>
                Footer
              </>
            }
          />
        </Cell>
      </Grid>
    </Wrapper>
  )
}

CheckoutPage.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired
}

export default CheckoutPage
