import React, { useState } from 'react'
import { Title, Select, Input, Caption, Radio, Grid, Cell } from 'components'

const BookingTab = () => {
  const [select, setSelect] = useState('daily')

  const handleSelectChange = (e, { value }) => {
    setSelect(value)
  }

  return (
    <Grid columns={1} rowGap="80px">
      <>
        <Title
          type="h3"
          title="Payment Period"
          subtitle="Spacenow have four payment options: hourly, daily, weekly and monthly. These payment options determine more than just the displayed price for your guests. As a host, selecting the right option is important because it will manage your availability, payouts, and payment options for your guests."
        />
        <Grid columns={4} columnGap="20px">
          <>
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
              text="From a guest perspective, daily spaces are a similar experience to a hotel; guests pay upfront for one-off stays. Spacenow transfers the money to you after 48 hours upon completion."
            />
            <Radio
              box
              value="weekly"
              checked={select === 'weekly'}
              handleChange={handleSelectChange}
              label="Weekly"
              text="A big advantage with weekly bookings is less admin for you, and recurring payments through direct deposit. Spacenow transfers the money to you 48 hours after completion of each week."
            />
            <Radio
              box
              value="monthly"
              checked={select === 'monthly'}
              handleChange={handleSelectChange}
              label="Monthly"
              text="Monthly spaces are the least effort to manage, but be sure you’re willing to commit to the longer length of time. Spacenow transfers the money to you 48 hours after completion of each month."
            />
          </>
        </Grid>
        <Cell>
          <>
            <Title type="h3" title="Price*" />
            <Grid columns={12} columnGap="20px">
              <>
                <Cell width={4}>
                  <Select label="Currecy" />
                </Cell>
                <Cell width={2}>
                  <Input label="Price*" placeholder="AU$ 100.00" />
                </Cell>
              </>
            </Grid>
          </>
        </Cell>
        <Cell>
          <>
            <Title type="h3" title="Minimum Term" subtitle="How much notice do you need before a guest arrives?" />
            <Caption>Period</Caption>
            <Grid columns={8} columnGap="20px">
              <>
                <Cell width={1}>
                  <Radio
                    value="monthly"
                    checked={select === 'monthly'}
                    handleChange={handleSelectChange}
                    label="1 day"
                  />
                </Cell>
                <Cell width={1}>
                  <Radio
                    value="monthly"
                    checked={select === 'monthly'}
                    handleChange={handleSelectChange}
                    label="2 days"
                  />
                </Cell>
                <Cell width={1}>
                  <Radio
                    value="monthly"
                    checked={select === 'monthly'}
                    handleChange={handleSelectChange}
                    label="5 days"
                  />
                </Cell>
                <Cell width={1}>
                  <Radio
                    value="monthly"
                    checked={select === 'monthly'}
                    handleChange={handleSelectChange}
                    label="7 days"
                  />
                </Cell>
              </>
            </Grid>
          </>
        </Cell>
        <Cell>
          <>
            <Title
              type="h3"
              title="Booking type"
              subtitle="Would you prefer to take an instant booking? Or confirm each booking manually?"
            />
            <Grid columns={2}>
              <Cell width={1}>
                <Radio
                  box
                  value="monthly"
                  checked={select === 'monthly'}
                  handleChange={handleSelectChange}
                  label="Instant Booking"
                  text="If you want to let a guest book any free date instantly, select this
                option."
                />
              </Cell>
              <Cell width={1}>
                <Radio
                  box
                  value="monthly"
                  checked={select === 'monthly'}
                  handleChange={handleSelectChange}
                  label=" Request Booking"
                  text="If you want to be notified of a request before it’s booked, select
                this option."
                />
              </Cell>
            </Grid>
          </>
        </Cell>
        <Cell>
          <>
            <Title
              type="h3"
              title="Booking Fee"
              subtitle="Incorporate Spacenow’s 10% commision into the price or push it onto the guest. Tip: Been competitive means more bookings."
            />
            <Grid columns={2}>
              <Cell width={1}>
                <Radio
                  box
                  value="monthly"
                  checked={select === 'monthly'}
                  handleChange={handleSelectChange}
                  label="Host Fee"
                  text=" Incur the 10% service fee and the guest will not be passed an extra
                10% on top of your rate. Ie. List your space for $100 and you will
                receive $90. The guest will pay $100."
                />
              </Cell>
              <Cell width={1}>
                <Radio
                  box
                  value="monthly"
                  checked={select === 'monthly'}
                  handleChange={handleSelectChange}
                  label="Guest Fee"
                  text="The guest pays the 10% service fee and you, the host, will receive
                the full rate. Ie. List your space for $100 and you will receive
                $100. The guest will pay $110."
                />
              </Cell>
            </Grid>
          </>
        </Cell>
      </>
    </Grid>
  )
}

export default BookingTab
