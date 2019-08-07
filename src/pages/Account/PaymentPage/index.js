import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Title, Radio, Icon, Box } from 'components'

const ListGroup = styled.div`
  margin: 50px;
  display: grid;
  grid-row-gap: 15px;
`

const ListItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr 1fr auto;
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
  grid-template-columns: auto auto;
  grid-column-gap: 15px;
`

const PaymentPage = ({ ...props }) => {
  return (
    <Box>
      <Title type="h3" title="Payment Methods" subtitle="lorem ipsom" />
      <ListGroup>
        <ListItem>
          <Radio />
          <AccountName>Bruno da Silva Valenga</AccountName>
          <BSB>000-123</BSB>
          <AccountNumber>1233123</AccountNumber>
          <Options>
            <Icon width="25px" />
            <Icon width="25px" />
          </Options>
        </ListItem>
        <ListItem>
          <Radio />
          <AccountName>Bruno da Silva Valenga</AccountName>
          <BSB>000-123</BSB>
          <AccountNumber>1233123</AccountNumber>
          <Options>
            <Icon width="25px" />
            <Icon width="25px" />
          </Options>
        </ListItem>
        <ListItem>
          <Radio />
          <AccountName>Bruno da Silva Valenga</AccountName>
          <BSB>000-123</BSB>
          <AccountNumber>1233123</AccountNumber>
          <Options>
            <Icon width="25px" />
            <Icon width="25px" />
          </Options>
        </ListItem>
      </ListGroup>
    </Box>
  )
}

PaymentPage.propTypes = {}

export default PaymentPage
