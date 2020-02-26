/* eslint-disable  */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import {
  Text,
  Cell,
  Grid,
  Box,
  StarRatingComponent,
  DatePicker,
  TextArea,
  Select,
  Icon,
  Button,
  Title
} from 'components'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { capitalize, toPlural } from 'utils/strings'
import { format } from 'date-fns'

import { onCreateMessage } from 'redux/ducks/message'
import { onCreateInspection } from 'redux/ducks/inspection'

const StepOne = styled(Box)``

const StepTwo = styled(Box)``

const CellMobile = styled(Cell)`
  @media screen and (max-width: 374px) {
    grid-column-end: span 12;
  }
`

const CellStarsMobile = styled(Cell)`
  @media screen and (max-width: 375px) {
    grid-column-end: span 4;
  }
`

const _changeToPlural = (string, number) => {
  if (!string) {
    return 'No Data'
  }
  if (string === 'daily') {
    return toPlural(capitalize('day'), number)
  }
  return toPlural(capitalize(string.slice(0, -2)), number)
}

const InspectionForm = ({
  onDateChange,
  onDayPickerHide,
  closingDays,
  onStartTimeChange,
  publicReviews,
  bookingPeriod,
  minTerm,
  date,
  startTime,
  hourlySuggestion,
  onCalcHourlyPeriod,
  location,
  listing,
  user,
  values,
  handleChange,
  dispatch,
  history
}) => {
  const [dayPicker, setDayPicker] = useState('')
  const [stepOne, setStepOne] = useState(true)
  const { object: message } = useSelector(state => state.message.create)
  const { isAuthenticated } = useSelector(state => state.auth)

  useEffect(() => {
    onCalcHourlyPeriod()
  }, [date, startTime]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (message && message.id && date && startTime) {
      setStepOne(false)
      const valuesInspection = {
        listingId: listing.id,
        messageId: message.id,
        guestId: user.id,
        date,
        time: startTime
      }
      dispatch(onCreateInspection(valuesInspection))
    }
  }, [message])

  if (!isAuthenticated) {
    history.push(`/auth/signin`, { from: '/space/' + listing.id })
    return null
  }

  const _getRatingAvg = field => {
    if (publicReviews && publicReviews.length > 0) {
      const countReviews = publicReviews.length
      const totalRatings = publicReviews.map(o => o[`rating${field}`]).reduce((a, b) => a + b)
      return totalRatings / countReviews
    }
    return 0
  }

  const _getOptions = range => {
    if (!range) return []
    const options = []
    for (let i = 0; i < range.length; i += 1) {
      options.push({ key: i, value: range[i], name: range[i] })
    }
    return options
  }

  const _handleSendRequest = async () => {
    if (date) {
      const valuesCreate = {
        reservations: [date],
        checkInTime: startTime,
        content: values.message,
        reason: 'inspection',
        hasFlexibleTime: false,
        period: 0,
        listingId: listing.id,
        guestId: user.id,
        hostId: listing.userId,
        bookingPeriod: 'hourly' // send hourly to store the start time.
      }
      await dispatch(onCreateMessage(valuesCreate))
    } else {
      dayPicker.input.focus()
    }
  }

  return (
    <>
      {stepOne && (
        <StepOne>
          <Title type="h7" weight="Montserrat-Medium" title="Request a site visit" noMargin subtitle="" />
          <Box mt="10px"></Box>
          <Grid columns={12}>
            {publicReviews && publicReviews.length > 0 && (
              <CellStarsMobile width={3} style={{ fontSize: '12px', display: 'grid', alignItems: 'end' }}>
                <StarRatingComponent name="ratingOverall" value={_getRatingAvg('Overall')} editing={false} />
              </CellStarsMobile>
            )}
            {publicReviews && publicReviews.length > 0 && (
              <Cell width={3}>
                <Text fontSize="9px">
                  ({publicReviews.length} Review{(publicReviews.length > 1 && 's') || ''})
                </Text>
              </Cell>
            )}{' '}
            {minTerm && (
              <CellMobile width={6}>
                <Text fontSize="9px">
                  <Icon name="specification-minimum-term" width="20px" fill="#2DA577" style={{ marginRight: '5px' }} />
                  Minimum {_changeToPlural(bookingPeriod, minTerm ? minTerm : 1)}
                </Text>
              </CellMobile>
            )}
          </Grid>

          <Box mt="20px"></Box>
          <Grid columns={1} rowGap={'10px'}>
            <DatePicker
              ref={el => setDayPicker(el)}
              value={date}
              handleDateChange={o => onDateChange(o)}
              handleDayPickerHide={onDayPickerHide}
              placeholder="Choose a date"
              dayPickerProps={{
                selectedDays: [date],
                modifiers: {
                  disabled: [
                    // ...listingExceptionDates.map(o => new Date(o)),
                    {
                      daysOfWeek: closingDays
                    },
                    {
                      before: new Date()
                    }
                  ]
                }
              }}
            />

            <Cell>
              <Select
                options={_getOptions(hourlySuggestion && hourlySuggestion.openRange)}
                handleChange={e => onStartTimeChange(String(e.target.value))}
                value={startTime || ''}
                disabled={!hourlySuggestion}
              >
                {!hourlySuggestion && <option style={{ color: '#777777' }}>select a time</option>}
              </Select>
            </Cell>
            <TextArea
              placeholder="Additional questions or requests..."
              name="message"
              value={values.message}
              onChange={handleChange}
            />
            <Button fluid onClick={() => _handleSendRequest()}>
              Request site visit
            </Button>
            <Box textAlign="center" lineHeight="1.3">
              <Text fontSize="11px" color="#172439">
                The Spacenow team will contact you as soon as the visit has been confirmed with the host.
              </Text>
            </Box>
          </Grid>
        </StepOne>
      )}
      {!stepOne && (
        <StepTwo>
          <Title type="h4" weight="Montserrat-SemiBold" noMargin title="Thank you, your request has been received." />
          <Title type="h7" weight="Montserrat-Medium" title="Request details" />
          <Grid columns={1} rowGap="12px" style={{ fontSize: '12px' }}>
            <Cell width={1}>
              <Icon name="calendar" width="20px" background="white" /> Date{' '}
              <Text fontFamily="Montserrat-Bold">{format(date, 'EEEE d/MM/yyyy')}</Text>
            </Cell>
            <Cell width={1}>
              <Icon name="clock-bgwhite" width="20px" fill="#6adc91" /> Time{' '}
              <Text fontFamily="Montserrat-Bold">{startTime}</Text>
            </Cell>
            <Cell width={1}>
              <Icon name="pin-bgwhite" fill="#6adc91" width="20px" /> Address line 1, {location}
            </Cell>
          </Grid>
          <Box mt="40px" lineHeight="1.3">
            <Text fontSize="12px">Please keep an eye out for the confirmation email from the Spacenow team.</Text>
          </Box>
        </StepTwo>
      )}
    </>
  )
}

const formik = {
  displayName: 'Inspection_Form',
  mapPropsToValues: props => ({
    message: ''
  }),
  mapValuesToPayload: x => x,
  validationSchema: Yup.object().shape({
    message: Yup.string()
  }),
  enableReinitialize: true,
  isInitialValid: false
}

InspectionForm.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(InspectionForm)
