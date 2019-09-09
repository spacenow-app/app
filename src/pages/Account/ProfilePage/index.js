import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Helmet from 'react-helmet'
import { Loader } from 'components'
import FormProfile from './FormProfile'

import { onGetProfile } from 'redux/ducks/account'

const ProfilePage = ({ ...props }) => {

  const dispatch = useDispatch()

  const { user: { id } } = useSelector(state => state.auth)
  const { isLoading, get: { user } } = useSelector(state => state.account)

  useEffect(() => {
    dispatch(onGetProfile(id))
  }, [dispatch, id])

  return (
    <Fragment>
      <Helmet title="Account Profile - Spacenow" />
      {isLoading && <Loader text="Loading Profile..." />}
      {user && <FormProfile user={user} dispatch={dispatch}></FormProfile>}

    </Fragment>
  )
}

export default ProfilePage
