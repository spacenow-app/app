import React from 'react'
import { NavBar, Wrapper, Box, Title, Card } from 'components'

const itemsCardOne = ['Update your account details', 'Add a profile photo', 'Tell us a little bit about yourself']
const itemsCardTwo = [
  'Keep pricing competitive',
  'Including all the details will minimize pre-booking Q&A',
  "Join Australia's fastest growing marketplace"
]

const itemsCardThree = [
  'Secure payments captured as soon as booking is confirmed.',
  "We're here to help with any support requests or in the unlikely event of a dispute.",
  'All bookings are covered by our comprehensive, insurance policy.'
]

const itemsCardFour = [
  'Text, push and email notifications',
  'Hassle-free check-in/check-out',
  'Support whenever you need it'
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
          icon="resume"
          title="Complete your profile"
          text="We want to know a little bit more about you, and so does our community."
          secondText="The more complete your profile it is, the faster hosts will respond to your messages and accept your bookings (we’re talking from experience here!)"
          // buttonText="Go to your profile"
          checklist={itemsCardOne}
          // buttonHandleClick={() => props.history.push('/account/profile')}
        />
        <br />
        <Card
          border
          rounded
          type="intro"
          icon="pin"
          title="List your space"
          text="Sell the dream! Uploading polished images, a video walk through of the space and as much information as possible will help attract the right guests for your space."
          secondText="Don’t forget, if you need help with creating multiple listings, our expert onboarding team can get you set up without any hassles."
          // buttonText="Create your first listing"
          checklist={itemsCardTwo}
          // buttonHandleClick={() => props.history.push('/listing/intro')}
        />
        <br />
        <Card
          border
          rounded
          type="intro"
          icon="confirm-schedule"
          title="Manage all your requests and bookings in one place"
          text="Everything is handled through the app, from  communication with the host about your booking, to secure payments - it’s never been easier."
          secondText="Spacenow is here to help at every step of the way!"
          // buttonText="Contact us for more information"
          checklist={itemsCardThree}
          // buttonHandleClick={() => (window.location = 'https://spacenow.com/contact-us/')}
        />
        <br />
        <Card
          border
          rounded
          type="intro"
          icon="rating"
          title="Share your experience"
          text="Once you've accepted your first booking, we'll remind you about booking times and dates, help you coordinate with the guest and handle the check-in/out process - making sure the whole thing runs as smoothly as possible"
          secondText="Once your booking is complete, leave a review for your host and share your experience with the spacenow community!"
          buttonText="Get started"
          checklist={itemsCardFour}
          buttonHandleClick={() => props.history.push('/listing/intro')}
        />
        <br />
        <br />
      </Wrapper>
    </>
  )
}

export default IntroHostPage
