import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Helmet from 'react-helmet'

import { onGetPaymentAccount, onCreatePaymentAccount, onDeletePaymentAccount } from 'redux/ducks/payment'

import { Wrapper, Title, Radio, Icon, Box, Loader } from 'components'

const ListGroup = styled.div`
  margin: 50px;
  display: grid;
  grid-row-gap: 15px;
`

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 15px;
  border: 1px solid #ececec;
  border-radius: 15px;
  align-items: center;
`

const AccountName = styled.span``

const BSB = styled.span``

const AccountNumber = styled.span``

const Options = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 15px;
`

const PaymentPage = () => {
  const dispatch = useDispatch()

  const { isLoading } = useSelector(state => state.payment)
  const { object: details } = useSelector(state => state.payment.get)

  useEffect(() => {
    dispatch(onGetPaymentAccount())
  }, [dispatch])

  if (isLoading) return <Loader text="Loading listing process" />

  return (
    <Wrapper>
      <Helmet title="Payment Preferences - Spacenow" />
      <Title type="h3" title="Payment Preferences" />
      <ListGroup>
        <ListItem>
          <AccountName>{details.legal_entity.first_name}</AccountName>
          <BSB>{details.external_accounts.data[0].routing_number}</BSB>
          <AccountNumber>{details.external_accounts.data[0].last4}</AccountNumber>
          <Options>
            <Icon width="25px" />
          </Options>
        </ListItem>
      </ListGroup>
    </Wrapper>
  )
}

PaymentPage.propTypes = {}

export default PaymentPage
