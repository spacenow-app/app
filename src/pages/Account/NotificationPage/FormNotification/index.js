/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Checkbox, Box, Text } from 'components'

import { onUpdateUserNotification } from 'redux/ducks/account'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 10px;
  margin-top: 30px;

  @media (max-width: 576px) {
    margin-top: 30px;
  }
`

const FormProfile = ({
  ...props
}) => {

  const dispatch = useDispatch()

  const { user, userNotifications, notifications } = props

  const _handleChange = (e) => {
    const { name, value, checked } = e.target
    const input = {
      [value]: checked
    }
    dispatch(onUpdateUserNotification(user.id, name, input))
  }

  const _checkCheckBox = (id, type) => {
    return userNotifications.some(un => un.notificationId === id ? un[type] : false)
  }

  return (
    <WrapperStyled>
      {notifications.map((notification, index) => (
        <Box key={index} display="grid" gridTemplateColumns={{ _: '1fr auto auto auto', medium: '1fr auto auto auto' }} gridGap="30px" width="100%">
          <Text>{notification.name}</Text>
          <Checkbox label={`Push Notification`} name={`${notification.id}`} value={`isPushNotification`} handleCheckboxChange={_handleChange} checked={_checkCheckBox(notification.id, 'isPushNotification')} />
          <Checkbox label={`SMS`} name={`${notification.id}`} value={`isSMS`} handleCheckboxChange={_handleChange} checked={_checkCheckBox(notification.id, 'isSMS')} />
          <Checkbox label={`E-mail`} name={`${notification.id}`} value={`isEmail`} handleCheckboxChange={_handleChange} checked={_checkCheckBox(notification.id, 'isEmail')} />
        </Box>
      ))}
    </WrapperStyled>
  )
}

export default FormProfile
