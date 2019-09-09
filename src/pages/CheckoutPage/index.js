import 
    React, { useEffect,
  //  useState 
} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { 
  // useSelector, 
  useDispatch } from 'react-redux'

import {
  Wrapper,
  Title,
  Grid,
  Cell,
  UserDetails,
  BookingCard,
} from 'components'


const CheckoutPage = ({ match, location, ...props }) => {
  const dispatch = useDispatch()

  useEffect(() => {
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
