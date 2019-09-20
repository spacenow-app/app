/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { toast } from 'react-toastify'

import { onGetPaymentAccount, onDeletePaymentAccount, onCreatePaymentAccount } from 'redux/ducks/payment'

import { Wrapper, Title, Icon, Loader, BackgroundImage, Button, Grid, Cell, Table, Text } from 'components'
import { TypesModal, openModal } from 'redux/ducks/modal'

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  display: inline;
  margin: 0;
  padding: 0;

  :hover,
  :focus {
    text-decoration: none;
    outline: none;
  }
`

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
    <>
      <Helmet title="Payment Preferences - Spacenow" />
      <Grid column="12">
        <Cell width={8}>
          <Title type="h3" title="Payment Preferences" />
        </Cell>
        <Cell width={4} middle justifySelf="end">
          <Button my="30px" size="sm" onClick={() => _addAccount()}>
            Add Account
          </Button>
        </Cell>
      </Grid>

      {!details || !details.id ? (
        <BackgroundImage text="We didn't find any accounts :(" />
      ) : (
        <Grid columns={1}>
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Text fontSize="14px" fontFamily="semiBold" style={{ whiteSpace: 'nowrap' }}>
                    First Name
                  </Text>
                </th>
                <th>
                  <Text fontSize="14px" fontFamily="semiBold" style={{ whiteSpace: 'nowrap' }}>
                    BSB
                  </Text>
                </th>
                <th>
                  <Text fontSize="14px" fontFamily="semiBold" style={{ whiteSpace: 'nowrap' }}>
                    Account
                  </Text>
                </th>
                <th>
                  <Text fontSize="14px" fontFamily="semiBold" style={{ whiteSpace: 'nowrap' }}>
                    Options
                  </Text>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Text fontSize="14px" style={{ whiteSpace: 'nowrap' }}>
                    {details.legal_entity.first_name}
                  </Text>
                </td>
                <td>
                  <Text fontSize="14px" style={{ whiteSpace: 'nowrap' }}>
                    {details.external_accounts.data[0].routing_number}
                  </Text>
                </td>
                <td>
                  <Text fontSize="14px" style={{ whiteSpace: 'nowrap' }}>
                    {details.external_accounts.data[0].last4}
                  </Text>
                </td>
                <td align="center">
                  <IconButton onClick={_handleRemoveAccount}>
                    <Icon name="bin" style={{ fill: '#51C482' }} />
                  </IconButton>
                </td>
              </tr>
            </tbody>
          </Table>
        </Grid>
      )}
    </>
  )
}

PaymentPage.propTypes = {}

export default PaymentPage
