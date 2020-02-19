import React, { useState, useEffect } from 'react'
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
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [focusInput, setFocusInput] = useState(false)
  const [hourlySuggestion, setHourlySuggestion] = useState(null)
  const [hourlyError, setHourlyError] = useState('')

  useEffect(() => {
    setFieldValue('reservations', datesSelected)
    setFieldValue('period', datesSelected.length)
  }, [datesSelected])

  const handleConfirm = isConfirmed => {
    if( (listing.bookingPeriod !== 'daily' && date) 
        ||  (listing.bookingPeriod === 'daily' && datesSelected.length > 0)) {
      dispatch(closeModal())
      if (isConfirmed) {
        onConfirm(values)
      }
    } else {
      setFocusInput(true)
    }
  }

  const _handleRadioChange = value => {
    setFieldValue('hasFlexibleTime', value)
  }

  const _handleChangePeriod = e => {
    setPeriod(Number(e.target.value))
    setFieldValue('period', parseInt(e.target.value, 10))
  }

  const _removeDate = value => {
    const newArray = _.filter(datesSelected, dateFromArray => !isSameDay(new Date(dateFromArray), value))
    setDatesSelected(newArray)
    setFieldValue('reservations', newArray)
  }

  const _onDateChangeArray = value => {
    const find = _.find(datesSelected, dateFromArray => isSameDay(new Date(dateFromArray), value))
    if (find) {
      _removeDate(value)
      return
    }
    const arraySorted = _.sortBy([...datesSelected, value], item => item)
    setDatesSelected(arraySorted)
    setFieldValue('reservations', arraySorted)
  }

  const _onDateChange = value => {
    setDate(value)
    setStartTime(null)
    setEndTime(null)
    setFieldValue('reservations', [value])
  }

  const _onDayPickerHide = () => {
    setFocusInput(false)
  }

  const _calcHourlyPeriod = () => {
    if (date) {
      let openTime = '08:00'
      let closeTime = '10:00'
      if (startTime && endTime) {
        openTime = startTime
        closeTime = endTime
      }
      onGetHourlyAvailability(listing.id, date, openTime, closeTime).then(o => {
        setPeriod(o.hours)
        setFieldValue('period', o.hours)
        setHourlySuggestion(o.suggestion)
        setHourlyError('')
        if (!startTime) {
          setStartTime(o.suggestion.openSuggestion)
          setFieldValue('checkInTime', o.suggestion.openSuggestion)
        }
        if (!endTime) {
          setEndTime(o.suggestion.closeSuggestion)
          setFieldValue('checkOutTime', o.suggestion.closeSuggestion)
        }
        if (!o.isAvailable) setHourlyError(`Not available for this period`)

        // setHourlyError('')
        // if (!o.isAvailable) {
        //   setHourlyError(`Not available in this period`)
        // }
      })
      // .catch(err => setHourlyError(err))
    }
  }

  const _onStartTimeChange = value => {
    setStartTime(value)
    setFieldValue('checkInTime', value)
  }
  const _onEndTimeChange = value => {
    setEndTime(value)
    setFieldValue('checkOutTime', value)
  }
  console.log('datesSelected', datesSelected)
  console.log('values.reservations', values.reservations)

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
            hourlySuggestion={hourlySuggestion}
            onDateChange={_onDateChange}
            onStartTimeChange={_onStartTimeChange}
            onEndTimeChange={_onEndTimeChange}
            onDayPickerHide={_onDayPickerHide}
            closingDays={_returnArrayAvailability(listing.accessDays)}
            onCalcHourlyPeriod={_calcHourlyPeriod}
            hidePrice
          />
          {hourlyError && (
            <Box color="error" ml="23px">
              {hourlyError}
            </Box>
          )}
        </>
      )
    }
    if (bookingPeriod === 'daily') {
      return (
        <div>
          <DailyBooking
            focus={!(datesSelected && datesSelected.length > 0)}
            inputFocus={focusInput}
            onDateChange={_onDateChangeArray} // not being used
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
                  name="hasFlexibleTime"
                  value={values.hasFlexibleTime}
                  label="I am flexible with dates and times"
                  checked={values.hasFlexibleTime}
                  handleChange={() => _handleRadioChange(!values.hasFlexibleTime)}
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
                  name="peopleQuantity"
                  type="number"
                  error={touched.peopleQuantity && errors.peopleQuantity}
                  value={values.peopleQuantity}
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
                  name="content"
                  error={touched.content && errors.content}
                  value={values.content}
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
    hasFlexibleTime: false,
    peopleQuantity: '',
    reason: '',
    content: '',
    period: 1,
    reservations: [],
    checkInTime: '08:00',
    checkOutTime: '09:00'
  }),
  mapValuesToPayload: x => x,
  validationSchema: Yup.object().shape({
    peopleQuantity: Yup.number()
      .positive()
      .required('Required')
      .typeError('Must to be a number'),
    reason: Yup.string().required('Required'),
    content: Yup.string().required('Required')
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
