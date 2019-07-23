import React from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import numeral from 'numeral'
import { Title, Select, Input, Caption, Radio, Grid, Cell, StepButtons } from 'components'

const BookingTab = ({ values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue, ...props }) => {
  const handleSelectChange = e => {
    const { name, value } = e.target
    setFieldValue(name, value)
  }

  const handleRadioChange = (e, { value, name }) => {
    setFieldValue(name, value)
  }

  return (
    <Grid columns={1} rowGap="80px">
      <Cell>
        <Title
          type="h3"
          title="Payment Period"
          subtitle="Spacenow have four payment options: hourly, daily, weekly and monthly. These payment options determine more than just the displayed price for your guests. As a host, selecting the right option is important because it will manage your availability, payouts, and payment options for your guests."
        />
        <Grid columns={4} columnGap="20px">
          <Radio
            box
            value="hourly"
            name="bookingPeriod"
            checked={values.bookingPeriod === 'hourly'}
            handleChange={handleRadioChange}
            label="Hourly"
            text="Before you list by the hour, make sure both you and your space are ready for high turnover and regularly
        handling guest access. Hourly guests pay Spacenow upfront, and we transfer the money to you after 48 hours
        upon completion."
          />
          <Radio
            box
            value="daily"
            name="bookingPeriod"
            checked={values.bookingPeriod === 'daily'}
            handleChange={handleRadioChange}
            label="Daily"
            text="From a guest perspective, daily spaces are a similar experience to a hotel; guests pay upfront for one-off stays. Spacenow transfers the money to you after 48 hours upon completion."
          />
          <Radio
            box
            value="weekly"
            name="bookingPeriod"
            checked={values.bookingPeriod === 'weekly'}
            handleChange={handleRadioChange}
            label="Weekly"
            text="A big advantage with weekly bookings is less admin for you, and recurring payments through direct deposit. Spacenow transfers the money to you 48 hours after completion of each week."
          />
          <Radio
            box
            value="monthly"
            name="bookingPeriod"
            checked={values.bookingPeriod === 'monthly'}
            handleChange={handleRadioChange}
            label="Monthly"
            text="Monthly spaces are the least effort to manage, but be sure you’re willing to commit to the longer length of time. Spacenow transfers the money to you 48 hours after completion of each month."
          />
        </Grid>
      </Cell>
      <Cell>
        <Title type="h3" title="Price*" />
        <Grid columns={12} columnGap="20px">
          <Cell width={4}>
            <Select label="Currecy" name="currency" value={values.currency} onChange={handleSelectChange}>
              <option value="AUD">AUD</option>
            </Select>
          </Cell>
          <Cell width={2}>
            <Input
              label="Price*"
              placeholder="100.00"
              name="basePrice"
              error={errors.basePrice}
              value={numeral(values.basePrice).format('0[.]00')} // prettier-ignore
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Cell>
        </Grid>
      </Cell>
      <Cell>
        <Title type="h3" title="Minimum Term" subtitle="How much notice do you need before a guest arrives?" />
        <Caption>Period</Caption>
        <Grid columns={8} columnGap="20px">
          <Cell width={1}>
            <Radio
              name="minTerm"
              value={1}
              checked={values.minTerm === 1}
              handleChange={handleRadioChange}
              label="1 day"
            />
          </Cell>
          <Cell width={1}>
            <Radio
              name="minTerm"
              value={2}
              checked={values.minTerm === 2}
              handleChange={handleRadioChange}
              label="2 days"
            />
          </Cell>
          <Cell width={1}>
            <Radio
              name="minTerm"
              value={5}
              checked={values.minTerm === 5}
              handleChange={handleRadioChange}
              label="5 days"
            />
          </Cell>
          <Cell width={1}>
            <Radio
              name="minTerm"
              value={7}
              checked={values.minTerm === 7}
              handleChange={handleRadioChange}
              label="7 days"
            />
          </Cell>
        </Grid>
      </Cell>
      <Cell>
        <Title
          type="h3"
          title="Booking type"
          subtitle="Would you prefer to take an instant booking? Or confirm each booking manually?"
        />
        <Grid columns={2}>
          <Cell width={1}>
            <Radio
              box
              value="instant"
              name="bookingType"
              checked={values.bookingType === 'instant'}
              handleChange={handleRadioChange}
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
              handleChange={handleRadioChange}
              label=" Request Booking"
              text="If you want to be notified of a request before it’s booked, select
                this option."
            />
          </Cell>
        </Grid>
      </Cell>
      <Cell>
        <Title
          type="h3"
          title="Booking Fee"
          subtitle="Incorporate Spacenow’s 10% commision into the price or push it onto the guest. Tip: Been competitive means more bookings."
        />
        <Grid columns={2}>
          <Cell width={1}>
            <Radio
              box
              value
              name="isAbsorvedFee"
              checked={values.isAbsorvedFee}
              handleChange={handleRadioChange}
              label="Host Fee"
              text=" Incur the 10% service fee and the guest will not be passed an extra
                10% on top of your rate. Ie. List your space for $100 and you will
                receive $90. The guest will pay $100."
              image="https://www.sccpre.cat/mypng/full/65-650780_stock-vector-woman-user-smartphone-design-flat-computer.png"
            />
          </Cell>
          <Cell width={1}>
            <Radio
              box
              value={false}
              name="isAbsorvedFee"
              checked={!values.isAbsorvedFee}
              handleChange={handleRadioChange}
              label="Guest Fee"
              text="The guest pays the 10% service fee and you, the host, will receive
                the full rate. Ie. List your space for $100 and you will receive
                $100. The guest will pay $110."
              image="https://cdn.dribbble.com/users/1338391/screenshots/6044614/building_dribbble.jpg"
            />
          </Cell>
        </Grid>
      </Cell>
      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.push('specification') }}
        next={{
          onClick: () => props.history.push('availability')
        }}
      />
    </Grid>
  )
}

const formik = {
  displayName: 'ListingProcess_BookingForm',
  mapPropsToValues: props => {
    const { listing } = props
    if (listing.listingData) {
      return {
        bookingPeriod: listing.bookingPeriod || 'daily',
        currency: listing.currency || 'AUD',
        basePrice: listing.listingData.basePrice || 0,
        minTerm: listing.listingData.minTerm || 0,
        bookingType: listing.listingData.bookingType || 'instant',
        isAbsorvedFee: listing.listingData.isAbsorvedFee || false
      }
    }
    return {}
  },
  mapValuesToPayload: x => x,
  validationSchema: Yup.object().shape({
    bookingPeriod: Yup.string().typeError('Title need to be String'),
    capacity: Yup.number().typeError('Capacity need to be number'),
    size: Yup.number().typeError('Size need to be number'),
    carSpace: Yup.number().typeError('Car Space need to be number'),
    description: Yup.string().typeError('Description need to be string')
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    }, 1000)
  },
  enableReinitialize: true
}

BookingTab.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(BookingTab)
