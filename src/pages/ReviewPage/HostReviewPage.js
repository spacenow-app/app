import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { onGetBooking } from 'redux/ducks/booking'
import { onPrepareReview, onCreateReviewFromHost } from 'redux/ducks/reviews'

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

const HostReviewPage = ({ match }) => {
  const dispatch = useDispatch()

  const [comment, setComment] = useState('')
  const [ratingOverall, setRatingOverall] = useState(0)

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
    dispatch(onCreateReviewFromHost(match.params.id, comment, ratingOverall))
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
                {`Now that your guest ${reservation.guest.profile.firstName} has checked-out, please take a minute to review their time with you. All
                feedback helps us to make the community stronger. We ask you to provide an overall rating for your
                guest, please consider tidiness, communication and respect of the space.`}
              </Text>
              <br />
              <Grid columns={1} rows={1} gap="2px">
                <Label>Overall</Label>
                <StarContainer>
                  <StarRatingComponent
                    name="ratingOverall"
                    value={ratingOverall}
                    onStarClick={o => setRatingOverall(o)}
                  />
                </StarContainer>
              </Grid>
              <br />
              <TextArea
                label="Comment"
                placeholder="Please tell us about your experience with your latest guest."
                type="text"
                name="publicComment"
                value={comment}
                onChange={e => setComment(e.target.value)}
                onBlur={e => setComment(e.target.value)}
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

HostReviewPage.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired
}

export default HostReviewPage
