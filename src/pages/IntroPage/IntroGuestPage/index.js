import React from 'react'
import { NavBar, Wrapper, Box, Title, Card } from 'components'

const itemsCardOne = ['Update your account details', 'Add a profile photo', 'Tell us a little bit about yourself']
const itemsCardTwp = [
  'Search by location and/or space type',
  'Filter by price and availability',
  'View all the key details about the space'
]

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
            subtitle="How to get the most out of spacenow."
            subTitleMargin={10}
            subTitleSize={14}
          />
        </Box>
        <Card
          border
          rounded
          type="intro"
          icon="confirm-schedule"
          title="Complete your profile"
          text="We want to know a little bit more about you, and so does our community."
          secondText="The more complete your profile it is, the faster hosts will respond to your messages and accept your bookings (we’re talking from experience here!)"
          buttonText="Go to your profile"
          checklist={itemsCardOne}
          buttonHandleClick={() => props.history.push('/account/profile')}
        />
        <br />
        <Card
          border
          rounded
          type="intro"
          icon="rating"
          title="Search for the perfect space"
          text="Whatever you need, from event space to coworking, unique destinations to creative spaces for your next photoshoot - we got you."
          secondText="Once you’ve found the right location, we’ll help you take care of the rest."
          buttonText="Search now"
          checklist={itemsCardTwp}
          buttonHandleClick={() => props.history.push('/search')}
        />
        <br />
        <br />
      </Wrapper>
    </>
  )
}

export default IntroHostPage
