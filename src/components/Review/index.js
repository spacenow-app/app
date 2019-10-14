import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { format } from 'date-fns'

import { Box, Text, Avatar } from 'components'

const Container = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0 0 5px 1px #eee;
  border-radius: 6px;
  opacity: 1;
  man-width: 400px;
`

const AvatarContainer = styled.div`
  display: block;
  font-family: 'MontSerrat-Bold';
  font-size: 22px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;

  @media (max-width: 945px) {
    margin-bottom: 5px;
    line-height: 1;
    white-space: pre-wrap;
  }
`

const CommentContainer = styled.div`
  padding: 25px;
  line-height: 2;
`

const Review = ({ id, userName, userPicture, date, comment, rating }) => {
  return (
    <Container key={id}>
      <CommentContainer>
        <Box display="flex" justifyContent="start" mb="15px">
          <AvatarContainer>
            <Avatar width="36px" height="36px" image={userPicture} />
          </AvatarContainer>
          <Text fontSize="12px" ml="10px" fontFamily="medium">
            {`${userName}`}
          </Text>
          <Text fontSize="12px" ml="10px" fontFamily="medium" color="greyscale.1">
            {`${format(date, 'dd/MM/yyyy')}`}
          </Text>
        </Box>
        <Box display="flex" justifyContent="start" mb="15px">
          {comment}
        </Box>
      </CommentContainer>
    </Container>
  )
}

Review.propTypes = {
  id: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  userPicture: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  comment: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
}

export default Review
