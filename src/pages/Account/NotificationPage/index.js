import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Helmet from 'react-helmet'
import { Wrapper, Box, Switch, Title, Loader, Text } from 'components'

import { onGetAllNotificationsByType } from 'redux/ducks/notification'
import { onGetUserNotifications } from 'redux/ducks/account'

import FormNotification from './FormNotification'

const NotificationPage = ({ ...props }) => {
  const dispatch = useDispatch()
  const [notificationType, setNotificationType] = useState('guest')

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
    dispatch(onGetUserNotifications(user.id))
  }, [dispatch, user.id])

  useEffect(() => {
    dispatch(onGetAllNotificationsByType(notificationType))
  }, [dispatch, notificationType])

  return (
    <Wrapper>
      <Helmet title="User Notification - Spacenow" />
      <Box
        my={{ _: '20px', medium: '0' }}
        display="grid"
        gridTemplateColumns={{ _: '1fr' }}
        gridGap="20px"
      >
        <Box
          display="grid"
          gridTemplateColumns={{ _: '1fr auto' }}
          gridGap="20px"
        >
          <Title type="h4" title="Your Notifications" subtitle="Select the notifications alerts you would like to receive." noMargin subTitleMargin={10} />
          <Box
            display="grid"
            gridTemplateColumns={{ _: 'auto auto' }}
            gridGap="10px"
            alignSelf="end"
          >
            <Text>{notificationType.toUpperCase()}</Text>
            <Switch
              id="notificationType"
              name="notificationType"
              value={notificationType}
              handleCheckboxChange={() => setNotificationType(notificationType === 'guest' ? 'host' : 'guest')}
            />
          </Box>
        </Box>
      {(isLoading || isLoadingNotification) && <Loader text="Loading Notifications..." />}
      {user && <FormNotification dispatch={dispatch} user={user} userNotifications={userNotifications} notifications={notifications} />}
      </Box>
    </Wrapper>
  )
}

export default NotificationPage
