import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { onGetBooking } from 'redux/ducks/booking'
import { onPrepareReview, onCreateReviewFromGuest } from 'redux/ducks/reviews'

import {
  Grid,
  Wrapper,
  Title,
  Button,
  Box,
  Text,
  Loader,
  Link,
  TextArea,
  Footer,
  StarRatingComponent
} from 'components'

const Label = styled.label`
  font-size: 14px;
  font-family: 'Montserrat-Medium';
  margin-left: 10px;
`

const StarContainer = styled.div`
  margin-left: 10px;
  font-size: 24px;
`

const GuestReviewPage = ({ match }) => {
  const dispatch = useDispatch()

  const [publicComment, setPublicComment] = useState('')
  const [ratingOverall, setRatingOverall] = useState(0)
  const [ratingCheckIn, setRatingCheckIn] = useState(0)
  const [ratingHost, setRatingHost] = useState(0)
  const [ratingValue, setRatingValue] = useState(0)
  const [ratingCleanliness, setRatingCleanliness] = useState(0)
  const [ratingLocation, setRatingLocation] = useState(0)

  const { status: createWithSuccess } = useSelector(state => state.reviews.create)
  const { object: reservation, isLoading: isLoadingGetBooking } = useSelector(state => state.booking.get)
  const { user: guest } = useSelector(state => state.account.get)

  useEffect(() => {
    dispatch(onPrepareReview())
  }, [dispatch])

  useEffect(() => {
    dispatch(onGetBooking(match.params.id))
  }, [dispatch, match.params.id])

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(
      onCreateReviewFromGuest(
        match.params.id,
        publicComment,
        ratingOverall,
        ratingCheckIn,
        ratingHost,
        ratingValue,
        ratingCleanliness,
        ratingLocation
      )
    )
  }

  if (isLoadingGetBooking) {
    return <Loader text="Loading data..." />
  }

  if (createWithSuccess && createWithSuccess === 'OK') {
    return (
      <>
        <Wrapper>
          <Box margin="0 auto" width={{ _: '100%', medium: '500px' }} p="10px" textAlign="center">
            <Title center type="h4" title="Thank you for your feedback!" />
            <Text fontSize="14px" ml="10px" fontFamily="medium" color="greyscale.1">
              <Link to="/account/booking">Go to dashboard</Link>
            </Text>
          </Box>
        </Wrapper>
      </>
    )
  }

  return (
    <>
      <Wrapper>
        <Box margin="0 auto" width={{ _: '100%', medium: '500px' }} p="10px">
          <form onSubmit={handleSubmit}>
            <Box display="grid" gridRowGap="10px">
              <Text fontSize="14px" ml="10px" fontFamily="medium">{`Hi ${guest.profile.firstName}`}</Text>
              <Text fontSize="14px" ml="10px" fontFamily="medium" color="greyscale.1">
                {`Now that you’ve checked-out of ${reservation.listing.title}, please take a minute to review your time there. All feedback
                helps us to make the community stronger. We ask you to provide an overall rating for the space, your
                host and some aspects of the space in particular.`}
              </Text>

              <Grid columns={2} rows={1} gap="2px">
                <Label>Overall</Label>
                <Label>Check-in</Label>
                <StarContainer>
                  <StarRatingComponent
                    name="ratingOverall"
                    value={ratingOverall}
                    onStarClick={o => setRatingOverall(o)}
                  />
                </StarContainer>
                <StarContainer>
                  <StarRatingComponent
                    name="ratingCheckIn"
                    value={ratingCheckIn}
                    onStarClick={o => setRatingCheckIn(o)}
                  />
                </StarContainer>

                <Label>Host</Label>
                <Label>Value</Label>
                <StarContainer>
                  <StarRatingComponent name="ratingHost" value={ratingHost} onStarClick={o => setRatingHost(o)} />
                </StarContainer>
                <StarContainer>
                  <StarRatingComponent name="ratingValue" value={ratingValue} onStarClick={o => setRatingValue(o)} />
                </StarContainer>

                <Label>Cleanliness</Label>
                <Label>Location</Label>
                <StarContainer>
                  <StarRatingComponent
                    name="ratingCleanliness"
                    value={ratingCleanliness}
                    onStarClick={o => setRatingCleanliness(o)}
                  />
                </StarContainer>
                <StarContainer>
                  <StarRatingComponent
                    name="ratingLocation"
                    value={ratingLocation}
                    onStarClick={o => setRatingLocation(o)}
                  />
                </StarContainer>
              </Grid>

              <TextArea
                label="Comment"
                placeholder="Please tell us about your experience."
                type="text"
                name="publicComment"
                value={publicComment}
                onChange={e => setPublicComment(e.target.value)}
                onBlur={e => setPublicComment(e.target.value)}
              />
              <Button fluid type="submit">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
        <Footer />
      </Wrapper>
    </>
  )
}

GuestReviewPage.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired
}

export default GuestReviewPage
