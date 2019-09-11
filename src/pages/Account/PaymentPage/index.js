/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { toast } from 'react-toastify'

import { onGetPaymentAccount, onDeletePaymentAccount, onCreatePaymentAccount } from 'redux/ducks/payment'

import { Wrapper, Title, Icon, Loader, BackgroundImage, Button, Grid, Cell, Caption } from 'components'
import { TypesModal, openModal } from 'redux/ducks/modal'

const ListGroup = styled.div`
  margin: 50px;
  display: grid;
  grid-row-gap: 15px;
`

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  padding: 15px;
`

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  padding: 15px;
  border: 1px solid #ececec;
  border-radius: 15px;
`

const Options = styled.div`
  width: 70px;
`

const AccountName = styled.span``

const BSB = styled.span``

const AccountNumber = styled.span``

const PaymentPage = () => {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.account.get)
  const { isLoading } = useSelector(state => state.payment)
  const { object: details } = useSelector(state => state.payment.get)

  useEffect(() => {
    dispatch(onGetPaymentAccount())
  }, [dispatch])

  const _handleRemoveAccount = () => {
    dispatch(onDeletePaymentAccount())
  }

  const _addAccount = () => {
    if (details && details.id) {
      toast.warn('You already have a account create.')
      return
    }
    dispatch(
      openModal(TypesModal.MODAL_ADD_BANK_DETAILS, {
        onConfirm: values => {
          dispatch(onCreatePaymentAccount(values, user))
        }
      })
    )
  }

  if (isLoading) return <Loader text="Loading payment process" />

  return (
    <Wrapper>
      <Helmet title="Payment Preferences - Spacenow" />
      <Grid column="12">
        <Cell width={8}>
          <Title type="h3" title="Payment Preferences" />
        </Cell>
        <Cell width={4} middle justifySelf="end">
          <Button size="sm" onClick={() => _addAccount()}>
            Add Account
          </Button>
        </Cell>
      </Grid>

      {!details || !details.id ? (
        <BackgroundImage text="We didn't find any accounts :(" />
      ) : (
          <ListGroup>
            <ListHeader>
              <Caption>First Name</Caption>
              <Caption>BSB</Caption>
              <Caption>Account</Caption>
              <Options>
                <Caption>Options</Caption>
              </Options>
            </ListHeader>
            <ListItem>
              <AccountName>{details.legal_entity.first_name}</AccountName>
              <BSB>{details.external_accounts.data[0].routing_number}</BSB>
              <AccountNumber>{details.external_accounts.data[0].last4}</AccountNumber>
              <Options>
                <a href="#" onClick={_handleRemoveAccount}>
                  <Icon name="bin" width="25px" />
                </a>
              </Options>
            </ListItem>
          </ListGroup>
        )}
    </Wrapper>
  )
}

PaymentPage.propTypes = {}

export default PaymentPage
