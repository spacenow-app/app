import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import { TypesModal, openModal } from 'redux/ducks/modal'
import { getUserCards, createUserCard } from 'redux/ducks/payment'
import {
  Wrapper,
  Title,
  Grid,
  Cell,
  UserDetails,
  BookingCard,
  ListDates,
  TimeTable,
  Button,
  Table,
  Checkbox,
  Box,
  Text,
  Caption,
  Icon,
  Loader
} from 'components'

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

const CheckoutPage = ({ match, location, ...props }) => {
  const dispatch = useDispatch()
  const { isLoading: isLoadingGetCards, array: arrayCards, isCreating } = useSelector(state => state.payment.cards)

  // useEffect(() => {}, [dispatch, match.params.id])

  useEffect(() => {
    async function fetchData() {
      await dispatch(getUserCards())
    }
    fetchData()
  }, [])

  const _addNewCard = () => {
    dispatch(
      openModal(TypesModal.MODAL_TYPE_ADD_CREDIT_CARD, {
        onConfirm: async values => {
          await dispatch(createUserCard(values))
        }
      })
    )
  }

  const _handleRemoveCard = () => e => {
    e.preventDefault()
  }

  if (isLoadingGetCards) {
    return <Loader text="Loading data..." />
  }

  return (
    <Wrapper>
      <Helmet title="Checkout - Spacenow" />
      <Grid columns="1fr 350px" columnGap="35px">
        <Cell>
          <Title
            type="h3"
            title="About your booking"
            subtitle="This reservation will expire on 09/09/2019 at 17:12:27"
            subTitleMargin={0}
          />

          {/* If booking period is daily */}
          <Caption type="large">Selected dates</Caption>
          <ListDates dates={[]} />
          {/* Else */}
          {/* <BookingDates reservationData={[]} /> */}
          {/* End If */}

          <TimeTable timeTable={[]} />
          <Title type="h4" title="How would you like to pay?" />
          {arrayCards.length > 0 ? (
            <>
              <Text color="primary" fontSize="18px" fontFamily="semiBold">
                Card details
              </Text>
              <Table>
                <thead>
                  <tr>
                    <th />
                    <th>Name on Card</th>
                    <th>Brand</th>
                    <th>Card Number</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {arrayCards.map(card => (
                    <tr key={card.id}>
                      <td>
                        <Checkbox />
                      </td>
                      <td>{card.name}</td>
                      <td>{card.brand}</td>
                      <td>{`**** **** **** ${card.last4}`}</td>
                      <td>
                        <IconButton onClick={_handleRemoveCard(card)}>
                          <Icon name="bin" style={{ fill: '#51C482' }} />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <Text>You don't have any credit cards yet, please add one :)</Text>
          )}

          <Button size="sm" onClick={_addNewCard} isLoading={isCreating}>
            Add Card
          </Button>

          <Box mt="50px">
            <Button outline>Edit Dates</Button>
            <Button>Pay Now</Button>
          </Box>
        </Cell>
        <Cell>
          <BookingCard
            titleComponent={
              <>
                <Title type="h5" title="Hosted by" noMargin />
                <UserDetails hostname="host test" imageProfile="imageTest" joined="2019" />
              </>
            }
            contentComponent={<>{/* {_renderContentCard(listing.bookingPeriod)} */}</>}
            footerComponent={<>Footer</>}
          />
        </Cell>
      </Grid>
    </Wrapper>
  )
}

CheckoutPage.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired
}

export default CheckoutPage
