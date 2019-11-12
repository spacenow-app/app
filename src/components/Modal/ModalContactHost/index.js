import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import _ from 'lodash'
import { isSameDay } from 'date-fns'
import styled from 'styled-components'
import { Button, Box, Grid, Cell, Input, UserDetails, Text, Radio, TextArea, Icon } from 'components'

import { useDispatch } from 'react-redux'
import { closeModal } from 'redux/ducks/modal'
import { onGetHourlyAvailability } from 'redux/ducks/booking'

import DailyBooking from '../../../pages/Space/SpacePage/DailyBooking'
import MonthlyBooking from '../../../pages/Space/SpacePage/MonthlyBooking'
import HourlyBooking from '../../../pages/Space/SpacePage/HourlyBooking'
import WeeklyBooking from '../../../pages/Space/SpacePage/WeeklyBooking'

const ModalSyled = styled(Modal)`
  &&& {
    .modal-body {
      padding: 50px !important;
    }
    @media (max-width: 768px) {
      .modal-dialog {
        min-width: 100%;
        margin: 0;
      }
      .modal-content {
        border: none !important;
        border-radius: 0 !important;
        overflow: hidden;
      }
    }
  }
`

const GridStyled = styled(props => <Grid {...props} />)`
  @media only screen and (max-width: 768px) {
    grid-column-gap: 0 !important;
  }
`

const CellStyled = styled(props => <Cell {...props} />)`
  @media only screen and (max-width: 768px) {
    grid-column-gap: 0 !important;
    grid-column-end: span 12 !important;
  }
`

const ButtonCellDesktop = styled(props => <Cell {...props} />)`
  display: none !important;
  @media only screen and (max-width: 768px) {
    display: block !important;
  }
`

const CellDesktop = styled(props => <Cell {...props} />)`
  @media only screen and (min-width: 769px) {
    grid-column-end: span 12 !important;
  }
`

const ModalContactHost = ({
  onConfirm,
  options,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
  listing,
  validateForm,
  setFatherValues,
  isValid,
  hostName,
  hostPhoto,
  capacity,
  availabilities,
  _returnArrayAvailability,
  ...props
}) => {
  const dispatch = useDispatch()

  const [datesSelected, setDatesSelected] = useState([])
  const [date, setDate] = useState('')
  const [period, setPeriod] = useState(1)
  const [startTime, setStartTime] = useState('08:00')
  const [endTime, setEndTime] = useState('09:00')
  const [focusInput, setFocusInput] = useState(false)

  const handleConfirm = isConfirmed => {
    dispatch(closeModal())
    if (isConfirmed) {
      onConfirm(values)
    }
  }

  const _handleRadioChange = value => {
    setFieldValue('flexible', value)
  }

  const _handleChangePeriod = e => {
    setPeriod(Number(e.target.value))
  }

  const _removeDate = value => {
    const newArray = _.filter(datesSelected, dateFromArray => !isSameDay(new Date(dateFromArray), value))
    setDatesSelected(newArray)
  }

  const _onDateChangeArray = value => {
    const find = _.find(datesSelected, dateFromArray => isSameDay(new Date(dateFromArray), value))
    if (find) {
      _removeDate(value)
      return
    }
    const arraySorted = _.sortBy([...datesSelected, value], item => item)
    setDatesSelected(arraySorted)
  }

  const _onDateChange = value => {
    setDate(value)
  }

  const _onDayPickerHide = () => {
    setFocusInput(false)
  }

  const _calcHourlyPeriod = () => {
    if (date) {
      onGetHourlyAvailability(listing.id, date, startTime, endTime).then(o => {
        setPeriod(o.hours)
        // setHourlyError('')
        // if (!o.isAvailable) {
        //   setHourlyError(`Not available in this period`)
        // }
      })
      // .catch(err => setHourlyError(err))
    }
  }

  const _onSetStartTime = value => setStartTime(value)
  const _onSetEndTime = value => setEndTime(value)

  const _renderDatesForm = (bookingPeriod, bookingType) => {
    if (bookingPeriod === 'hourly') {
      return (
        <>
          <HourlyBooking
            inputFocus={focusInput}
            date={date}
            startTime={startTime}
            endTime={endTime}
            hoursQuantity={period}
            listingExceptionDates={availabilities}
            listingData={listing.listingData}
            onDateChange={_onDateChange}
            onDayPickerHide={_onDayPickerHide}
            closingDays={_returnArrayAvailability(listing.accessDays)}
            onSetStartTime={_onSetStartTime}
            onSetEndTime={_onSetEndTime}
            onCalcHourlyPeriod={_calcHourlyPeriod}
            hidePrice
          />
        </>
      )
    }
    if (bookingPeriod === 'daily') {
      return (
        <div>
          <DailyBooking
            focus={!(datesSelected && datesSelected.length > 0)}
            inputFocus={focusInput}
            onDateChange={_onDateChangeArray}
            onDayPickerHide={_onDayPickerHide}
            setDatesSelected={setDatesSelected}
            datesSelected={datesSelected}
            removeDate={_removeDate}
            listingExceptionDates={availabilities}
            closingDays={_returnArrayAvailability(listing.accessDays)}
            listingData={listing.listingData}
            hidePrice
          />
        </div>
      )
    }
    if (bookingPeriod === 'weekly') {
      if (period < listing.listingData.minTerm) setPeriod(listing.listingData.minTerm)
      return (
        <WeeklyBooking
          inputFocus={focusInput}
          period={period}
          handleChangePeriod={_handleChangePeriod}
          date={date}
          onDateChange={_onDateChange}
          onDayPickerHide={_onDayPickerHide}
          listingExceptionDates={availabilities}
          closingDays={_returnArrayAvailability(listing.accessDays)}
          listingData={listing.listingData}
          hidePrice
        />
      )
    }
    if (bookingPeriod === 'monthly') {
      if (period < listing.listingData.minTerm) setPeriod(listing.listingData.minTerm)
      return (
        <MonthlyBooking
          inputFocus={focusInput}
          period={period}
          handleChangePeriod={_handleChangePeriod}
          date={date}
          onDateChange={_onDateChange}
          onDayPickerHide={_onDayPickerHide}
          listingExceptionDates={availabilities}
          closingDays={_returnArrayAvailability(listing.accessDays)}
          listingData={listing.listingData}
          hidePrice
        />
      )
    }
    return null
  }

  return (
    <ModalSyled show centered size="lg" onHide={() => dispatch(closeModal())}>
      <ModalSyled.Body>
        <GridStyled columns={12} columnGap="50px">
          <CellStyled width={4}>
            <Box mb="25px" textAlign={{ medium: 'left', _: 'center' }}>
              <Text fontSize="22px">Message host</Text>
            </Box>
            <UserDetails hostname={hostName} imageProfile={hostPhoto} vertical />
          </CellStyled>
          <CellStyled width={8}>
            <Box mt={{ medium: '0px', _: '25px' }} mb="25px">
              <Text fontSize="16px">When do you need the space</Text>
            </Box>
            <Box m="10px">
              <Text fontFamily="MontSerrat-Bold" fontSize="14px">
                Time and dates
              </Text>
            </Box>
            <Grid columns={1} rowGap="20px">
              {_renderDatesForm(listing.bookingPeriod)}

              <Box>
                <Radio
                  name="flexible"
                  value={values.flexible}
                  label="I am flexible with dates and times"
                  checked={values.flexible}
                  handleChange={() => _handleRadioChange(!values.flexible)}
                />
              </Box>
              <Box>
                <Box m="10px">
                  <Text fontFamily="MontSerrat-Bold" fontSize="14px">
                    How many people?
                  </Text>
                </Box>
                <Input
                  placeholder={capacity ? `Max pax is ${capacity}` : 'Type something'}
                  name="capacity"
                  error={touched.capacity && errors.capacity}
                  value={values.capacity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Box>
              <Box>
                <Box m="10px">
                  <Text fontFamily="MontSerrat-Bold" fontSize="14px">
                    What will you be using the space for?
                  </Text>
                </Box>
                <Input
                  placeholder="Ie. Main office, photo shoot, meeting space, etc."
                  name="reason"
                  error={touched.reason && errors.reason}
                  value={values.reason}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Box>
              <Box>
                <Box m="10px">
                  <Text fontFamily="MontSerrat-Bold" fontSize="14px">
                    Message
                  </Text>
                </Box>
                <TextArea
                  placeholder="Introduce yourself and in more detail describe what you will be using the space for."
                  name="message"
                  error={touched.message && errors.message}
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Box>
              <Grid columns={12}>
                <ButtonCellDesktop width={3}>
                  <Button fluid outline onClick={() => dispatch(closeModal())}>
                    <Icon name="full-left-arrow" width="40px" />
                  </Button>
                </ButtonCellDesktop>
                <CellDesktop width={9}>
                  <Button fluid disabled={!isValid} onClick={() => handleConfirm(true)}>
                    Send message
                  </Button>
                </CellDesktop>
              </Grid>
            </Grid>
          </CellStyled>
        </GridStyled>
      </ModalSyled.Body>
    </ModalSyled>
  )
}

const formik = {
  displayName: 'Modal_contact_host',
  mapPropsToValues: props => ({
    flexible: false,
    capacity: '',
    reason: '',
    message: ''
  }),
  mapValuesToPayload: x => x,
  validationSchema: Yup.object().shape({
    capacity: Yup.number()
      .positive()
      .required('Required')
      .typeError('Must to be a number'),
    reason: Yup.string().required('Required'),
    message: Yup.string().required('Required')
  }),
  enableReinitialize: true
}

ModalContactHost.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  hostName: PropTypes.string.isRequired,
  hostPhoto: PropTypes.string.isRequired,
  capacity: PropTypes.number,
  listing: PropTypes.shape({}).isRequired,
  availabilities: PropTypes.any.isRequired,
  _returnArrayAvailability: PropTypes.func.isRequired,
  ...withFormik.propTypes
}

export default withFormik(formik)(ModalContactHost)
