import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Avatar, Title } from 'components'
import { onUpdateProfilePicture } from 'redux/ducks/account'

const InnerMenu = ({ ...props }) => {
  const dispatch = useDispatch()

  const authUser = useSelector(state => state.auth.user)

  const _handleOnDrop = useCallback(
    acceptedFiles => acceptedFiles.map(async file => await dispatch(onUpdateProfilePicture(file, authUser.id))),
    [dispatch, authUser.id]
  )

  return (
    <Box
      display="grid"
      gridRowGap="15px"
      background="#f7f7f7"
      justifyItems="center"
      alignContent="start"
      p="30px"
      borderRadius="15px"
      height="fit-content"
    >
      <Avatar image={authUser.profile.picture || null} onDrop={_handleOnDrop} />
      <Title type={'h4'} title={`${authUser.profile.firstName} ${authUser.profile.lastName}`} />
      <Link to={`/account/profile`}>Profile</Link>
      <Link to={`/account/document-verification`}>Document Verification</Link>
      <Link to={`/account/payment`}>Payment Details</Link>
      <Link to={`/account/listing`}>Your Listings</Link>
      <Link to={`/account/booking`}>Your Bookings</Link>
    </Box>
  )
}

export default InnerMenu
