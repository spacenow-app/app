import React, { useState } from 'react'
import { Title, Select, Input, Caption, Radio, Grid, Cell } from 'components'

const BookingTab = () => {
  const [select, setSelect] = useState('daily')

  const handleSelectChange = (e, { value }) => {
    setSelect(value)
  }

  return (
    <Grid columns={1} rowGap={'80px'}>
      <Cell>
        <Title
          type="h3"
          title="Payment Period"
          subtitle="Spacenow have four payment options: hourly, daily, weekly and monthly. These payment options determine more than just the displayed price for your guests. As a host, selecting the right option is important because it will manage your availability, payouts, and payment options for your guests."
        />
        <Grid columns="repeat(auto-fit,minmax(120px,1fr))" columnGap={20}>
          <Radio
            box
            value="hourly"
            checked={select === 'hourly'}
            handleChange={handleSelectChange}
            label="Hourly"
            text="Before you list by the hour, make sure both you and your space are ready for high turnover and regularly
        handling guest access. Hourly guests pay Spacenow upfront, and we transfer the money to you after 48 hours
        upon completion."
          />
          <Radio
            box
            value="daily"
            checked={select === 'daily'}
            handleChange={handleSelectChange}
            label="Daily"
            text="Before you list by the hour, make sure both you and your space are ready for high turnover and regularly
            handling guest access. Hourly guests pay Spacenow upfront, and we transfer the money to you after 48 hours
            upon completion."
          />
          <Radio
            box
            value="weekly"
            checked={select === 'weekly'}
            handleChange={handleSelectChange}
            label="Weekly"
            text="Before you list by the hour, make sure both you and your space are ready for high turnover and regularly
              handling guest access. Hourly guests pay Spacenow upfront, and we transfer the money to you after 48 hours
              upon completion."
          />
          <Radio
            box
            value="monthly"
            checked={select === 'monthly'}
            handleChange={handleSelectChange}
            label="Monthly"
            text="Before you list by the hour, make sure both you and your space are ready for high turnover and regularly
            handling guest access. Hourly guests pay Spacenow upfront, and we transfer the money to you after 48 hours
            upon completion."
          />
        </Grid>
      </Cell>
      <Cell>
        <Title type="h3" title="Price*" />
        <Grid columns={3} columnGap="20px" width="550px">
          <Cell width={2}>
            <Select label="Currecy" />
          </Cell>
          <Cell width={1}>
            <Input label="Price*" placeholder="AU$ 100.00" />
          </Cell>
        </Grid>
      </Cell>
      <Cell>
        <Title type="h3" title="Minimum Term" subtitle="How much notice do you need before a guest arrives?" />
        <Caption>Period</Caption>
        <div>
          <div>
            1 day
            <input type="radio" />
          </div>
          <div>
            2 days
            <input type="radio" />
          </div>
          <div>
            5 days
            <input type="radio" />
          </div>
          <div>
            7 days
            <input type="radio" />
          </div>
        </div>
      </Cell>
      <Cell>
        <Title
          type="h3"
          title="Booking type"
          subtitle="Would you prefer to take an instant booking? Or confirm each booking manually?"
        />
        <div>
          Instant Booking
          <input type="radio" />
          If you want to let a guest book any free date instantly, select this option.
        </div>
        <div>
          Request Booking
          <input type="radio" />
          If you want to be notified of a request before it’s booked, select this option.
        </div>
      </Cell>
      <Cell>
        <Title
          type="h3"
          title="Booking Fee"
          subtitle="Incorporate Spacenow’s 10% commision into the price or push it onto the guest. Tip: Been competitive means more bookings."
        />
        <div>
          Host Fee
          <input type="radio" />
          Incur the 10% service fee and the guest will not be passed an extra 10% on top of your rate. Ie. List your
          space for $100 and you will receive $90. The guest will pay $100.
        </div>
        <div>
          Guest Fee
          <input type="radio" />
          The guest pays the 10% service fee and you, the host, will receive the full rate. Ie. List your space for $100
          and you will receive $100. The guest will pay $110.
        </div>
      </Cell>
    </Grid>
  )
}

export default BookingTab
