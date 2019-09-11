import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Avatar, Title, Link } from 'components'
import { onUpdateProfilePicture } from 'redux/ducks/account'

const InnerMenu = ({ ...props }) => {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.account.get)

  const _handleOnDrop = useCallback(
    acceptedFiles => acceptedFiles.map(async file => await dispatch(onUpdateProfilePicture(file, user.id))),
    [dispatch, user.id]
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
      <Avatar image={user.profile.picture || null} onDrop={_handleOnDrop} />
      <Title type={'h5'} title={`${user.profile.firstName} ${user.profile.lastName}`} />
      <Link to={`/account/profile`}>Profile</Link>
      <Link to={`/account/document-verification`}>Document Verification</Link>
      <Link to={`/account/payment`}>Payment Preferences</Link>
      <Link to={`/account/listing`}>Your Listings</Link>
      <Link to={`/account/booking`}>Your Bookings</Link>
    </Box>
  )
}

export default InnerMenu
