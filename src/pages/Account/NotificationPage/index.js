import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Helmet from 'react-helmet'
import { Wrapper, Box, Cell, Title, Loader } from 'components'

import { onGetAllNotifications } from 'redux/ducks/notification'
import { onGetUserNotifications } from 'redux/ducks/account'

import FormNotification from './FormNotification'

const NotificationPage = ({ ...props }) => {
  const dispatch = useDispatch()

  const {
    isLoading,
    get: {
      notifications: userNotifications,
      user
    }
  } = useSelector(state => state.account)

  const {
    isLoading: isLoadingNotification,
    get: {
      notifications
    }
  } = useSelector(state => state.notifications)

  useEffect(() => {
    dispatch(onGetAllNotifications())
    dispatch(onGetUserNotifications(user.id))
  }, [dispatch, user.id])

  return (
    <Wrapper>
      <Helmet title="User Notification - Spacenow" />
      <Box
        my={{ _: '20px', medium: '0' }}
        display="grid"
        gridTemplateColumns={{ _: '1fr' }}
        gridGap="20px"
      >
        <Cell width={1}>
          <Title type="h4" title="Your Notifications" subtitle="Select the notifications alerts you would like to receive." noMargin subTitleMargin={10} />
        </Cell>
      {isLoading || isLoadingNotification && <Loader text="Loading Notifications..." />}
      {user && <FormNotification dispatch={dispatch} user={user} userNotifications={userNotifications} notifications={notifications} />}
      </Box>
    </Wrapper>
  )
}

export default NotificationPage
