/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Helmet from 'react-helmet'

import { onGetPaymentAccount, onDeletePaymentAccount } from 'redux/ducks/payment'

import { Wrapper, Title, Icon, Loader } from 'components'

const ListGroup = styled.div`
  margin: 50px;
  display: grid;
  grid-row-gap: 15px;
`

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  padding: 15px;
  border: 1px solid #ececec;
  border-radius: 15px;
`

const AccountName = styled.span``

const BSB = styled.span``

const AccountNumber = styled.span``

const PaymentPage = () => {
  const dispatch = useDispatch()

  const { isLoading } = useSelector(state => state.payment)
  const { object: details } = useSelector(state => state.payment.get)

  useEffect(() => {
    dispatch(onGetPaymentAccount())
  }, [dispatch])

  const _handleRemoveAccount = () => {
    dispatch(onDeletePaymentAccount())
  }

  if (isLoading) return <Loader text="Loading listing process" />

  if (!details) return <Loader text="Loading listing process" /> // TODO Render form...

  return (
    <Wrapper>
      <Helmet title="Payment Preferences - Spacenow" />
      <Title type="h3" title="Payment Preferences" />
      <ListGroup>
        <ListItem>
          <AccountName>{details.legal_entity.first_name}</AccountName>
          <BSB>{details.external_accounts.data[0].routing_number}</BSB>
          <AccountNumber>{details.external_accounts.data[0].last4}</AccountNumber>
          <a href="#" onClick={_handleRemoveAccount}>
            <Icon name="bin" width="25px" />
          </a>
        </ListItem>
      </ListGroup>
    </Wrapper>
  )
}

PaymentPage.propTypes = {}

export default PaymentPage
