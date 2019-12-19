import React from 'react'
import { NavBar, Wrapper, Box, Title, Card } from 'components'

const checklist = ['Update your account details', 'Add a profile photo', 'Tell us a little bit about yourself']

const IntroHostPage = props => {
  return (
    <>
      <NavBar />
      <Wrapper>
        <Box margin="0 auto" width={{ _: '100%', medium: '500px' }} p="20px" textAlign="center">
          <Title
            center
            type="h2"
            title="Let's get started"
            weight="Montserrat-Medium"
            subtitle="How it's spacenow for guests."
            subTitleMargin={10}
            subTitleSize={14}
          />
        </Box>
        <Card
          border
          rounded
          type="intro"
          icon="amenitie-storeRoom"
          title="Complete your profile"
          text="We want to know a little bit more about you, and so does our community."
          secondText="The more complete your profile it is, the faster hosts will respond to your messages and accept your bookings (we’re talking from experience here!)"
          buttonText="Go to your profile"
          checklist={checklist}
          buttonHandleClick={() => props.history.push('/account/profile')}
        />
        <br />
        <Card
          border
          rounded
          type="intro"
          icon="amenitie-storeRoom"
          title="Complete your profile"
          text="We want to know a little bit more about you, and so does our community."
          secondText="The more complete your profile it is, the faster hosts will respond to your messages and accept your bookings (we’re talking from experience here!)"
          buttonText="Go to your profile"
          checklist={checklist}
          buttonHandleClick={() => props.history.push('/account/profile')}
        />
        <br />
        <br />
      </Wrapper>
    </>
  )
}

export default IntroHostPage
