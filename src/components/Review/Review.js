import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Box, Text, Avatar, Grid, Icon } from 'components'

import { monthNames } from 'variables'

import ReadMoreComponent from './ReadMoreComponent'

const AvatarContainer = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
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

const ReadMoreContainer = styled.div`
  .read-more-button {
    color: #6adc91;
    cursor: pointer;
  }
`

const Review = ({ userName, userPicture, date, comment, isGoogle }) => {
  return (
    <>
      <Box display="flex" justifyContent="start" mb="15px">
        <AvatarContainer>
          {isGoogle && <Icon width="24px" name="google-logo" style={{ marginRight: '5px', padding: '5px', border: '1px solid #eee' }} />}
          <Avatar width="42px" height="42px" image={userPicture} />
        </AvatarContainer>
        <Grid columns={1}>
          <Text fontSize="12px" ml="10px" fontFamily="medium">
            {`${userName}`}
          </Text>
          <Text fontSize="12px" ml="10px" fontFamily="medium" color="greyscale.1">
            {monthNames[date.getMonth()]} {date.getFullYear()}
          </Text>
        </Grid>
      </Box>
      <Box display="flex" justifyContent="start" mb="15px">
        <ReadMoreContainer>
          <ReadMoreComponent text={comment} min={80} ideal={100} max={280} readMoreText="Read more" />
        </ReadMoreContainer>
      </Box>
    </>
  )
}

Review.propTypes = {
  userName: PropTypes.string.isRequired,
  userPicture: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  comment: PropTypes.string.isRequired,
  isGoogle: PropTypes.bool
}

export default Review
