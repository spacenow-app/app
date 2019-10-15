import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import StarRatingComponent from 'react-star-rating-component'
import format from 'date-fns/format'

import { onGetBooking } from 'redux/ducks/booking'
import { onPrepareReview, onCreateReview } from 'redux/ducks/reviews'

import { Wrapper, Title, Input, Button, Box, Text, Loader, Link } from 'components'

import { convertedDate } from 'utils/date'

const StarContainer = styled.div`
  font-size: 32px;
`

const ReviewPage = ({ match }) => {
  const dispatch = useDispatch()

  const [rating, setRating] = useState(0)
  const [publicComment, setPublicComment] = useState('')
  const [privateComment, setPrivateComment] = useState('')

  const { status: createWithSuccess } = useSelector(state => state.reviews.create)
  const { object: reservation, isLoading: isLoadingGetBooking } = useSelector(state => state.booking.get)

  useEffect(() => {
    dispatch(onPrepareReview())
  }, [dispatch])

  useEffect(() => {
    dispatch(onGetBooking(match.params.id))
  }, [dispatch, match.params.id])

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(onCreateReview(match.params.id, publicComment, privateComment, rating))
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
        <Box margin="0 auto" width={{ _: '100%', medium: '500px' }} p="10px" textAlign="center">
          <Title center type="h4" title={`${reservation.listing.title}`} />
          <Text fontSize="12px" ml="10px" fontFamily="medium" color="greyscale.1">
            {reservation.listing.location.address1}, {reservation.listing.location.city}
          </Text>
          <br />
          <Text fontSize="12px" ml="10px" fontFamily="medium" color="greyscale.1">
            {`from ${format(convertedDate(reservation.checkIn), 'dd/MM/yyyy')} to ${format(
              convertedDate(reservation.checkOut),
              'dd/MM/yyyy'
            )}`}
          </Text>
          <form onSubmit={handleSubmit}>
            <Box display="grid" gridRowGap="10px">
              <Text fontSize="14px" fontFamily="medium" my="15px">
                How was your experience with that space?
              </Text>
              <StarContainer>
                <StarRatingComponent name="ratingValue" starCount={5} value={rating} onStarClick={o => setRating(o)} />
              </StarContainer>
              <Input
                label="Tell us how was it"
                placeholder="Public comment"
                type="text"
                name="publicComment"
                value={publicComment}
                onChange={e => setPublicComment(e.target.value)}
                onBlur={e => setPublicComment(e.target.value)}
              />
              <br />
              <Input
                label="Send a private comment to the host?"
                placeholder="Private comment"
                type="text"
                name="privateComment"
                value={privateComment}
                onChange={e => setPrivateComment(e.target.value)}
                onBlur={e => setPrivateComment(e.target.value)}
              />
              <Button fluid type="submit">
                Send
              </Button>
            </Box>
          </form>
        </Box>
      </Wrapper>
    </>
  )
}

ReviewPage.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired
}

export default ReviewPage
