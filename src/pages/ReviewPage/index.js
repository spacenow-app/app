import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import StarRatingComponent from 'react-star-rating-component'

import { onCreateReview } from 'redux/ducks/reviews'

import {
  Wrapper,
  Title,
  Input,
  Grid,
  Cell,
  UserDetails,
  BookingCard,
  ListDates,
  TimeTable,
  Button,
  Table,
  Checkbox,
  Box,
  Text,
  Caption,
  Icon,
  Loader,
  PriceDetail,
  TextArea
} from 'components'

const StarContainer = styled.div`
  font-size: 32px;
`

const ReviewPage = ({ match, values, touched, errors, handleChange, handleBlur, isValid }) => {
  const dispatch = useDispatch()

  const [rating, setRating] = useState(0)

  const bookingKey = match.params.key

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(onCreateReview())
  }

  return (
    <>
      <Wrapper>
        <Box margin="0 auto" width={{ _: '100%', medium: '500px' }} p="10px" textAlign="center">
          <Title center type="h4" title="Office Desk in Sydney" />
          <Text fontSize="12px" ml="10px" fontFamily="medium" color="greyscale.1">
            from 01/02/2019 to 23/12/2019
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
                value={values.publicComment}
                error={touched.publicComment && errors.publicComment}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <br />
              <Input
                label="Send a private comment to the host?"
                placeholder="Private comment"
                type="text"
                name="privateComment"
                value={values.privateComment}
                error={touched.privateComment && errors.privateComment}
                onChange={handleChange}
                onBlur={handleBlur}
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

const formik = {
  displayName: 'Reviews_CreateNewOne',
  mapPropsToValues: () => {
    return {
      publicComment: '',
      privateComment: ''
    }
  },
  mapValuesToPayload: x => x,
  enableReinitialize: true
}

export default withFormik(formik)(ReviewPage)
