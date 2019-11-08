import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Helmet from 'react-helmet'
import { Loader } from 'components'

import { onGetProfile } from 'redux/ducks/account'

import FormProfile from './FormProfile'

const ProfilePage = ({ ...props }) => {
  const dispatch = useDispatch()

  const queryParams = new URLSearchParams(props.location.search)

  const confirmationToken = queryParams.get('confirmation')

  const {
    user: { id }
  } = useSelector(state => state.account.get)

  const {
    isLoading,
    get: { user }
  } = useSelector(state => state.account)

  useEffect(() => {
    dispatch(onGetProfile(id, confirmationToken))
  }, [dispatch, id, confirmationToken])

  return (
    <Fragment>
      <Helmet title="Account Profile - Spacenow" />
      {isLoading && <Loader text="Loading Profile..." />}
      {user && <FormProfile user={user} dispatch={dispatch} />}
    </Fragment>
  )
}

export default ProfilePage
