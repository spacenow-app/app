import React from 'react'
import styled, { css } from 'styled-components'
import {
  Wrapper,
  Box,
  NavBar,
  Title,
  Text,
  Caption,
  List,
  Select,
  Radio,
  Input,
  TextArea,
  Button,
  Avatar
} from 'components'

import heroImage from './images/hero_img.png'

const data = [
  {
    id: 1,
    itemName: 'Work Space',
    otherItemName: 'office'
  },
  {
    id: 1,
    itemName: 'Meeting Rooms',
    otherItemName: 'meetings'
  },
  {
    id: 1,
    itemName: 'Event Space',
    otherItemName: 'events'
  },
  {
    id: 1,
    itemName: 'Hospitality & Retail',
    otherItemName: 'hospitality-retail'
  }
]

const ImageHero = styled.div`
  background: linear-gradient(rgba(23, 36, 57, 0.61), rgba(23, 36, 57, 0.61)), url(${heroImage});
  background-size: cover;
  height: 600px;
`

const ItemSelected = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 54px;
  border: 1px solid #e2e2e2;
  border-radius: 37px;
  font-size: 14px;

  ${props =>
    props.selected &&
    css`
      border: none;
      background-color: #6adc91;
      color: #fff;
    `}

  :hover {
    border: none;
    background-color: #6adc91;
    color: #fff;
    cursor: pointer;
  }
`

const LeadFormRequirement = ({ ...props }) => {
  return (
    <div>
      <NavBar />
      <ImageHero />
      <Wrapper width="700px">
        <Title
          title={
            <Box>
              Need a space but don’t know where to start<Text color="primary">?</Text>
            </Box>
          }
          subtitle="We’ll do the work for you. Answer these questions to help us find your perfect space."
        />

        <Box my="60px">
          <Caption margin="10px 0">Type of space</Caption>
          <Box>
            <List data={data} bgItem="#fff" shadow spaceBetween />
          </Box>
        </Box>

        <Box my="60px">
          <Caption margin="10px 0">Location</Caption>
          <Box display="grid" gridTemplateColumns="auto auto auto auto" gridColumnGap="20px" gridRowGap="40px">
            <ItemSelected selected>Sydney</ItemSelected>
            <ItemSelected>Melbourne</ItemSelected>
            <ItemSelected>Brisbane</ItemSelected>
            <ItemSelected>Adelaide</ItemSelected>
            <ItemSelected>Adelaide</ItemSelected>
            <ItemSelected>Canberra</ItemSelected>
            <ItemSelected>Newcastle</ItemSelected>
            <ItemSelected>Wollongong</ItemSelected>
          </Box>
        </Box>

        <Box my="60px" display="grid" gridTemplateColumns="auto auto" gridColumnGap="20px">
          <Select />
          <Select />
        </Box>

        <Box my="60px">
          <Caption margin="10px 0">Size Requirement</Caption>
          <Box display="grid" gridTemplateColumns="auto auto auto auto" gridColumnGap="20px" gridRowGap="40px">
            <ItemSelected>1 - 10 People</ItemSelected>
            <ItemSelected selected>11- 100 People</ItemSelected>
            <ItemSelected>101 - 500 People</ItemSelected>
            <ItemSelected>500+ People</ItemSelected>
          </Box>
        </Box>

        <Box my="60px">
          <Caption margin="10px 0">Budget</Caption>
          <Box display="grid" gridTemplateColumns="auto auto auto" gridColumnGap="20px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Radio label="I don’t know" fontSize="14px" />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Radio label="I have an allocated budget" fontSize="14px" />
            </Box>
            <Box mt="-31px">
              <Input label="What is your budget?" placeholder="Ie. $5,000" />
            </Box>
          </Box>
        </Box>

        <Box my="60px">
          <Caption margin="10px 0">Message</Caption>
          <TextArea placeholder="Anything else required?" />
        </Box>
        <Button block>Submit</Button>
        <Box my="60px" display="grid" gridTemplateColumns="auto auto auto" gridColumnGap="40px" alignItems="center">
          <Avatar width="100px" height="100px" />
          <Text>
            Prefer to speak to a team member? Call one of our friendly staff on:
            <br />
            <Text display="block" fontFamily="bold" mt="10px">
              02 9310 9214
            </Text>
          </Text>
        </Box>
      </Wrapper>
    </div>
  )
}

export default LeadFormRequirement
