/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Helmet from 'react-helmet'

import { onGetPaymentAccount, onDeletePaymentAccount } from 'redux/ducks/payment'

import { Wrapper, Title, Icon, Loader, Box, Input, Select, Button, Grid, Cell } from 'components'

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

  if (isLoading || !details) return <Loader text="Loading listing process" />

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
      <Box width="800px" border="1px solid" borderColor="greyscale.3" borderRadius="37px" padding="60px">
        <Grid columns="12">
          <Cell width="12">
            <Select label="Account type" />
          </Cell>
          <Cell width="6">
            <Input label="BSB" />
          </Cell>
          <Cell width="6">
            <Input label="Account" />
          </Cell>
          <Cell width="12">
            <span>Beneficiary details</span> {/* replace for Text components  */}
          </Cell>

          <Cell width="6">
            <Input label="First Name" />
          </Cell>
          <Cell width="6">
            <Input label="Last Name" />
          </Cell>
          <Cell width="12">
            <Input label="Date of Birthday " /> {/* replace for DatePicker components  */}
          </Cell>
          <Cell width="12">
            <Input label="Address" />
          </Cell>
          <Cell width="4">
            <Input label="City" />
          </Cell>
          <Cell width="4">
            <Input label="State" />
          </Cell>
          <Cell width="4">
            <Input label="Zip" />
          </Cell>
          <Cell width="12">
            <Button small>Save</Button>
          </Cell>
        </Grid>
      </Box>
    </Wrapper>
  )
}

PaymentPage.propTypes = {}

export default PaymentPage
