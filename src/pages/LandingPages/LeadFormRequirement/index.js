import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import numeral from 'numeral'
import {
  Wrapper,
  Box,
  NavBar,
  Title,
  Text,
  Caption,
  List,
  Radio,
  Input,
  TextArea,
  Button,
  Avatar,
  DatePicker
} from 'components'

import heroImage from './images/hero_img.png'

const data = [
  {
    id: 1,
    itemName: 'Work Space',
    otherItemName: 'office'
  },
  {
    id: 2,
    itemName: 'Meeting Rooms',
    otherItemName: 'meetings'
  },
  {
    id: 3,
    itemName: 'Event Space',
    otherItemName: 'events'
  },
  {
    id: 4,
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
      border-color: #6adc91;
      background-color: #6adc91;
      color: #fff;
    `}

  :hover {
    border-color: #6adc91;
    background-color: #6adc91;
    color: #fff;
    cursor: pointer;
  }
`

const LeadFormRequirement = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  ...props
}) => {
  const inputTo = useRef()

  const _handleRadioChange = (e, { value, name }) => {
    setFieldValue(name, value && '')
  }

  const _handleTypeOfSpaceClick = (e, value) => {
    setFieldValue('typeOfSpace', value)
  }

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
            <List
              data={data}
              bgItem="#fff"
              shadow
              spaceBetween
              handleItemClick={_handleTypeOfSpaceClick}
              itemSelected={values.typeOfSpace}
            />
          </Box>
        </Box>

        <Box my="60px">
          <Caption margin="10px 0">Location</Caption>
          <Box display="grid" gridTemplateColumns="auto auto auto auto" gridColumnGap="20px" gridRowGap="40px">
            <ItemSelected selected={values.location === 'Sydney'} onClick={e => setFieldValue('location', 'Sydney')}>
              Sydney
            </ItemSelected>
            <ItemSelected
              selected={values.location === 'Melbourne'}
              onClick={() => setFieldValue('location', 'Melbourne')}
            >
              Melbourne
            </ItemSelected>
            <ItemSelected
              selected={values.location === 'Brisbane'}
              onClick={() => setFieldValue('location', 'Brisbane')}
            >
              Brisbane
            </ItemSelected>
            <ItemSelected
              selected={values.location === 'Adelaide'}
              onClick={() => setFieldValue('location', 'Adelaide')}
            >
              Adelaide
            </ItemSelected>
            <ItemSelected selected={values.location === 'Perth'} onClick={() => setFieldValue('location', 'Perth')}>
              Perth
            </ItemSelected>
            <ItemSelected
              selected={values.location === 'Canberra'}
              onClick={() => setFieldValue('location', 'Canberra')}
            >
              Canberra
            </ItemSelected>
            <ItemSelected
              selected={values.location === 'Newcastle'}
              onClick={() => setFieldValue('location', 'Newcastle')}
            >
              Newcastle
            </ItemSelected>
            <ItemSelected
              selected={values.location === 'Wollongong'}
              onClick={() => setFieldValue('location', 'Wollongong')}
            >
              Wollongong
            </ItemSelected>
          </Box>
        </Box>

        <Box my="60px" display="grid" gridTemplateColumns="auto auto" gridColumnGap="20px">
          <DatePicker
            label="Start date"
            placeholder="Select a date"
            value={values.startDate}
            handleDateChange={date => setFieldValue('startDate', date)}
            dayPickerProps={{
              selectedDays: [values.startDate, { from: values.startDate, to: values.endDate }],
              disabledDays: [{ before: new Date(), after: values.endDate }],
              toMonth: values.endDate || new Date(),
              modifiers: { start: values.startDate, end: values.endDate },
              onDayClick: () => inputTo.current.handleInputFocus()
            }}
          />
          <DatePicker
            ref={inputTo}
            label="End date"
            placeholder="Select a date"
            value={values.endDate}
            handleDateChange={date => setFieldValue('endDate', date)}
            dayPickerProps={{
              selectedDays: [values.startDate, { from: values.startDate, to: values.endDate }],
              disabledDays: { before: values.startDate },
              month: values.endDate,
              modifiers: { start: values.startDate, end: values.endDate }
            }}
          />
        </Box>

        <Box my="60px">
          <Caption margin="10px 0">Size Requirement</Caption>
          <Box display="grid" gridTemplateColumns="auto auto auto auto" gridColumnGap="20px" gridRowGap="40px">
            <ItemSelected selected={values.size === 1} onClick={e => setFieldValue('size', 1)}>
              1 - 10 People
            </ItemSelected>
            <ItemSelected selected={values.size === 2} onClick={e => setFieldValue('size', 2)}>
              11 - 100 People
            </ItemSelected>
            <ItemSelected selected={values.size === 3} onClick={e => setFieldValue('size', 3)}>
              101 - 500 People
            </ItemSelected>
            <ItemSelected selected={values.size === 4} onClick={e => setFieldValue('size', 4)}>
              500+ People
            </ItemSelected>
          </Box>
        </Box>

        <Box my="60px">
          <Caption margin="10px 0">Budget</Caption>
          <Box display="grid" gridTemplateColumns="auto auto 1fr" gridColumnGap="20px">
            <Box display="flex" justifyContent="center" alignItems="center" height="50px">
              <Radio
                label="I don’t know"
                fontSize="14px"
                value={false}
                name="budget"
                checked={values.budget === false}
                handleChange={_handleRadioChange}
              />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" height="50px">
              <Radio
                label="I have an allocated budget"
                fontSize="14px"
                value
                name="budget"
                checked={values.budget !== false}
                handleChange={_handleRadioChange}
              />
            </Box>
            <Box mt="-31px">
              {values.budget !== false && (
                <Input
                  label="What is your budget?"
                  placeholder="Ie. $5,000"
                  name="budget"
                  value={numeral(values.budget).format('$ 0,0[.]00')}
                  onChange={handleChange}
                />
              )}
            </Box>
          </Box>
        </Box>

        <Box my="60px">
          <Caption margin="10px 0">Message</Caption>
          <TextArea
            placeholder="Anything else required?"
            name="message"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
          />
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

const formik = {
  displayName: 'LandingPage_LeadFormRequirement',
  mapPropsToValues: props => ({
    typeOfSpace: '',
    location: '',
    startDate: '',
    endDate: '',
    size: '',
    budget: false,
    message: ''
  }),
  mapValuesToPayload: x => x,
  validationSchema: Yup.object().shape({
    title: Yup.string()
      .typeError('Title need to be String')
      .max(25, 'Maximum characters for Title field must be 25')
  }),
  enableReinitialize: true,
  isInitialValid: true
}

export default withFormik(formik)(LeadFormRequirement)
