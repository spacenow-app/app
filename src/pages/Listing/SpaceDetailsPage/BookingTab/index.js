import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import numeral from 'numeral'
import { Title, Select, Input, Caption, Radio, Cell, StepButtons, Box, Footer } from 'components'
import { capitalize, toPlural } from 'utils/strings'

import GuestFeeIcon from './guest_fee_icon.svg'
import HostFeeIcon from './host_fee_icon.svg'

const BookingTab = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
  listing,
  dispatch,
  setFatherValues,
  isValid,
  ...props
}) => {
  useEffect(() => {
    setFatherValues({ ...values, isValid })
  }, [setFatherValues, values, isValid])

  const _handleSelectChange = e => {
    const { name, value } = e.target
    setFieldValue(name, value)
  }

  const _handleRadioChange = (e, { value, name, disabled }) => {
    if (disabled) return
    setFieldValue(name, value)
  }

  const _changeToPlural = (string, number) => {
    if (string === 'daily') {
      return toPlural(capitalize('day'), number)
    }
    return toPlural(capitalize(string.slice(0, -2)), number)
  }

  return (
    <Box display="grid" gridTemplateColumns={{ _: '1fr' }} gridGap={{ _: '20px', medium: '40px' }}>
      <Helmet title="Listing Space Booking - Spacenow" />
      <Cell>
        <Title
          type="h3"
          title="Booking Period"
          subtitle="Spacenow have four payment options: hourly, daily, weekly and monthly. These payment options determine more than just the displayed price for your guests. As a host, selecting the right option is important because it will manage your availability, payouts, and payment options for your guests."
        />
        <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: '1fr 1fr 1fr 1fr' }} gridGap="20px">
          {listing.settingsParent.bookingPeriod.hourly !== 0 && (
            <Radio
              box
              value="hourly"
              name="bookingPeriod"
              checked={values.bookingPeriod === 'hourly'}
              disabled={listing.settingsParent.bookingPeriod.hourly === 0}
              handleChange={_handleRadioChange}
              label="Hourly"
              text="Before you list by the hour, make sure both you and your space are ready for high turnover and regularly
        handling guest access. Hourly guests pay Spacenow upfront, and we transfer the money to you after 48 hours
        upon completion."
            />
          )}
          {listing.settingsParent.bookingPeriod.daily !== 0 && (
            <Radio
              box
              value="daily"
              name="bookingPeriod"
              checked={values.bookingPeriod === 'daily'}
              disabled={listing.settingsParent.bookingPeriod.daily === 0}
              handleChange={_handleRadioChange}
              label="Daily"
              text="From a guest perspective, daily spaces are a similar experience to a hotel; guests pay upfront for one-off stays. Spacenow transfers the money to you after 48 hours upon completion."
            />
          )}
          {listing.settingsParent.bookingPeriod.weekly !== 0 && (
            <Radio
              box
              value="weekly"
              name="bookingPeriod"
              checked={values.bookingPeriod === 'weekly'}
              disabled={listing.settingsParent.bookingPeriod.weekly === 0}
              handleChange={_handleRadioChange}
              label="Weekly"
              text="A big advantage with weekly bookings is less admin for you, and recurring payments through direct deposit. Spacenow transfers the money to you 48 hours after completion of each week."
            />
          )}
          {listing.settingsParent.bookingPeriod.monthly !== 0 && (
            <Radio
              box
              value="monthly"
              name="bookingPeriod"
              checked={values.bookingPeriod === 'monthly'}
              disabled={listing.settingsParent.bookingPeriod.monthly === 0}
              handleChange={_handleRadioChange}
              label="Monthly"
              text="Monthly spaces are the least effort to manage, but be sure you’re willing to commit to the longer length of time. Spacenow transfers the money to you 48 hours after completion of each month."
            />
          )}
        </Box>
      </Cell>
      <Cell>
        <Title type="h3" title="Price*" />
        <Box display="grid" gridTemplateColumns={{ _: '1fr 2fr', medium: '1fr 2fr 2fr' }} gridGap="20px">
          <Cell width={1}>
            <Select label="Currency" name="currency" value={values.currency} onChange={_handleSelectChange}>
              <option value="AUD">AUD</option>
            </Select>
          </Cell>
          <Cell width={1}>
            <Input
              min="0"
              type="number"
              label="Price*"
              placeholder="100.00"
              name="basePrice"
              error={errors.basePrice}
              value={numeral(values.bookingType === 'poa' ? 0 : values.basePrice).format('0[.]00')} // prettier-ignore
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={values.bookingType === 'poa'}
              backgroundColor={values.bookingType === 'poa' ? 'greyscale.4' : 'white'}
            />
          </Cell>
        </Box>
      </Cell>
      <Cell>
        <Title type="h3" title="Minimum Term" subtitle="The shortest time you required a guest to stay" />
        <Caption>Period</Caption>
        <Box display="grid" gridTemplateColumns={{ _: '1fr 1fr', medium: '1fr 1fr 1fr 1fr' }} gridGap="20px">
          <Cell width={1}>
            <Radio
              name="minTerm"
              value={1}
              checked={values.minTerm === 1}
              handleChange={_handleRadioChange}
              label={_changeToPlural(values.bookingPeriod, 1)}
            />
          </Cell>
          <Cell width={1}>
            <Radio
              name="minTerm"
              value={values.bookingPeriod !== 'monthly' ? 2 : 3}
              checked={values.minTerm === (values.bookingPeriod !== 'monthly' ? 2 : 3)}
              handleChange={_handleRadioChange}
              label={_changeToPlural(values.bookingPeriod, values.bookingPeriod !== 'monthly' ? 2 : 3)}
            />
          </Cell>
          <Cell width={1}>
            <Radio
              name="minTerm"
              value={values.bookingPeriod === 'hourly' || values.bookingPeriod === 'weekly' ? 4 : values.bookingPeriod === 'monthly' ? 6 : 5}
              checked={values.minTerm === (values.bookingPeriod === 'hourly' || values.bookingPeriod === 'weekly' ? 4 : values.bookingPeriod === 'monthly' ? 6 : 5)}
              handleChange={_handleRadioChange}
              label={_changeToPlural(values.bookingPeriod, values.bookingPeriod === 'hourly' || values.bookingPeriod === 'weekly' ? 4 : values.bookingPeriod === 'monthly' ? 6 : 5)}
            />
          </Cell>
          <Cell width={1}>
            <Radio
              name="minTerm"
              value={values.bookingPeriod === 'hourly' || values.bookingPeriod === 'weekly' ? 8 : values.bookingPeriod === 'monthly' ? 12 : 7}
              checked={values.minTerm === (values.bookingPeriod === 'hourly' || values.bookingPeriod === 'weekly' ? 8 : values.bookingPeriod === 'monthly' ? 12 : 7)}
              handleChange={_handleRadioChange}
              label={_changeToPlural(values.bookingPeriod, values.bookingPeriod === 'hourly' || values.bookingPeriod === 'weekly' ? 8 : values.bookingPeriod === 'monthly' ? 12 : 7)}
            />
          </Cell>
        </Box>
      </Cell>
      <Cell>
        <Title
          type="h3"
          title="Booking type"
          subtitle="Would you prefer to take an instant booking? Or confirm each booking manually?"
        />
        <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: '1fr 1fr 1fr' }} gridGap="20px">
          <Cell width={1}>
            <Radio
              box
              value="instant"
              name="bookingType"
              checked={values.bookingType === 'instant'}
              handleChange={_handleRadioChange}
              label="Instant Booking"
              text="If you want to let a guest book any free date instantly, select this
                option."
            />
          </Cell>
          <Cell width={1}>
            <Radio
              box
              value="request"
              name="bookingType"
              checked={values.bookingType === 'request'}
              handleChange={_handleRadioChange}
              label=" Request Booking"
              text="If you want to be notified of a request before it’s booked, select
                this option."
            />
          </Cell>
          {/* <Cell width={1}>
            <Radio
              box
              value="poa"
              name="bookingType"
              checked={values.bookingType === 'poa'}
              handleChange={_handleRadioChange}
              label=" POA"
              text="If you want to be contacted, select
                this option."
            />
          </Cell> */}
        </Box>
      </Cell>
      <Cell>
        <Title
          type="h3"
          title="Booking Fee"
          subtitle="Incorporate Spacenow’s 10% commision into the price or push it onto the guest. Tip: Being competitive means more bookings."
        />
        <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: '1fr 1fr' }} gridGap="20px">
          <Cell width={1}>
            <Radio
              box
              value
              name="isAbsorvedFee"
              checked={values.isAbsorvedFee}
              handleChange={_handleRadioChange}
              label="Host Fee"
              text=" Incur the 10% service fee and the guest will not be passed an extra
                10% on top of your rate. Ie. List your space for $100 and you will
                receive $90. The guest will pay $100."
              image={HostFeeIcon}
            />
          </Cell>
          <Cell width={1}>
            <Radio
              box
              value={false}
              name="isAbsorvedFee"
              checked={!values.isAbsorvedFee}
              handleChange={_handleRadioChange}
              label="Guest Fee"
              text="The guest pays the 10% service fee and you, the host, will receive
                the full rate. Ie. List your space for $100 and you will receive
                $100. The guest will pay $110."
              image={GuestFeeIcon}
            />
          </Cell>
        </Box>
      </Cell>
      <StepButtons
        prev={{ onClick: () => props.history.push('specification') }}
        next={{ onClick: () => props.history.push('availability') }}
      />
      <Footer />
    </Box>
  )
}

const formik = {
  displayName: 'ListingProcess_BookingForm',
  mapPropsToValues: props => {
    const { listing } = props
    const {
      settingsParent: { bookingPeriod }
    } = listing
    if (listing.listingData) {
      const bookingPeriodDefault = ['hourly', 'daily', 'weekly', 'monthly'].find(el => bookingPeriod[el] === 1)
      return {
        bookingPeriod: listing.bookingPeriod || bookingPeriodDefault,
        currency: listing.currency || 'AUD',
        basePrice: listing.listingData.basePrice || 0,
        minTerm: listing.listingData.minTerm || 1,
        bookingType: listing.listingData.bookingType || 'instant',
        isAbsorvedFee: listing.listingData.isAbsorvedFee || false
      }
    }
    return {}
  },
  validationSchema: props =>
    Yup.object().shape({
      basePrice: Yup.number()
        .typeError('Need to be number.')
        .positive('Must be above 0.')
    }),
  enableReinitialize: false,
  isInitialValid: true
}

BookingTab.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(BookingTab)
