import React from 'react'
import styled, { css } from 'styled-components'
import { Wrapper, Box, NavBar, Title, Text, Select, Button } from 'components'

import heroImage from './images/hero_img.png'
import gregImage from './images/greg_image.png'
import jamesImage from './images/james_image.png'
import stewartImage from './images/stewart_image.png'
import canvaLogo from './images/canva_logo.png'
import weWorkLogo from './images/wework_logo.png'
import uberEatsLogo from './images/ubereats_logo.png'
import tfeHotelsLogo from './images/tfe_hotels_logo.png'
import womanDriving from './images/woman_driving.png'
import { ReactComponent as GuyMine } from './images/guy_mine.svg'
import { ReactComponent as UsersIcon } from './images/users_icon.svg'
import { ReactComponent as ManageIcon } from './images/manage_icon.svg'
import { ReactComponent as EasyIcon } from './images/super_easy.svg'
import { ReactComponent as YouAreTheBossIcon } from './images/youretheboss_icon.svg'
import { ReactComponent as IconForm } from './images/Icon_Form.svg'
import { ReactComponent as IconKey } from './images/Icon_Key.svg'
import { ReactComponent as IconMagnifier } from './images/Icon_Magnifier.svg'

const ImageHero = styled.div`
  background: url(${heroImage});
  background-size: cover;
  height: 480px;
`

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-content: center;
`

const ImageHeroLeft = styled.div`
  width: 410px;
`

const ImageHeroRight = styled.div`
  display: grid;
  width: 450px;
  background-color: #fff;
  margin-top: 30px;
  padding: 30px 70px;
  grid-row-gap: 15px;
  box-shadow: 0px 1px 6px #000000;
  border-radius: 5px;
`

const TrustedLogo = styled.img`
  width: 70px;
`

/* Testimonial */
const TestimonialContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`
const TestimonialItem = styled.div`
  padding: 0 20px;

  ${props =>
    !props.last &&
    css`
      border-right: 1px solid #cbcbcb;
    `}
`
const TestimonialAuthor = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 15px;
  align-items: center;
`

const TestimonialAuthorImage = styled.img`
  width: 52px;
  height: 52px;
`

const TestimonialText = styled.span`
  display: block;
  margin-top: 15px;
  font-size: 14px;
`
/* End Testimonial */

/* GoldMine Banner */
const GoldMineContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`
const GoldMineContentContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 50px;
  grid-row-gap: 50px;
  padding: 60px;
`

const GoldMineContentItem = styled.div``

/* End GoldMine Banner */

const testimonials = [
  {
    id: 1,
    author: 'Greg Caleo',
    city: 'Paddington',
    text: '“Our car space was free all day while we were at work - now it goes to work too!”',
    photo: gregImage
  },
  {
    id: 2,
    author: 'James Harvey',
    city: 'Bondi Beach',
    text: '“My car spot makes me an extra $200 per week now it’s listed on Spacenow.”',
    photo: jamesImage
  },
  {
    id: 3,
    author: 'Stewart Webb',
    city: 'Kensington',
    text: '“Spacenow makes it easy for me to make money from a space I wasn’t using.”',
    photo: stewartImage
  }
]

const RentMyOfficeSpace = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  ...props
}) => {
  return (
    <>
      <NavBar />
      <ImageHero>
        <Wrapper>
          <HeaderContainer>
            <ImageHeroLeft />
            <ImageHeroRight>
              <Title
                noMargin
                type="h2"
                title="Turn your car spot into money"
                subtitle="Anytime your car space is empty you’re missing out on profit."
              />
              <Select label="State" placeholder="New South Wales" />
              <Select label="Suburb" placeholder="e.g. Bondi Junction" />
              <Box mt="20px" textAlign="center" display="grid" gridRowGap="10px">
                <Text fontSize="12px">You could earn up to</Text>
                <Text color="quartenary" fontSize="30px" fontFamily="bold">
                  $3,330 per month
                </Text>
                <Button fluid>Sign up and start earning.</Button>
                <Text fontSize="12px">T&C’s apply</Text>
              </Box>
            </ImageHeroRight>
          </HeaderContainer>
        </Wrapper>
      </ImageHero>

      <Box bg="#F7FDF8" height="130px" display="grid" gridTemplateRows="auto 1fr" padding="20px">
        <Text display="block" ml="10%" fontSize="12px" mb="10px">
          Trusted by:
        </Text>
        <Box
          ml="10%"
          display="grid"
          gridTemplateColumns="auto auto auto auto"
          width="500px"
          alignContent="center"
          alignItems="center"
        >
          <TrustedLogo src={canvaLogo} />
          <TrustedLogo src={weWorkLogo} />
          <TrustedLogo src={uberEatsLogo} />
          <TrustedLogo src={tfeHotelsLogo} />
        </Box>
      </Box>

      <Wrapper width="1169px">
        <Box mt="150px">
          <Text color="greyscale.2" my="20px" display="block">
            Australian&rsquo;s love Spacenow:
          </Text>
          <TestimonialContainer>
            {testimonials.map((item, index) => (
              <TestimonialItem key={item.id} last={index + 1 === testimonials.length}>
                <TestimonialAuthor>
                  <TestimonialAuthorImage src={item.photo} />
                  <Box>
                    <Text display="block" color="quartenary" fontFamily="bold">
                      {item.author}
                    </Text>
                    <Text display="block" color="quartenary">
                      {item.city}
                    </Text>
                  </Box>
                </TestimonialAuthor>
                <TestimonialText>{item.text}</TestimonialText>
              </TestimonialItem>
            ))}
          </TestimonialContainer>
        </Box>

        <Box my="100px" bg="quartenary" height="870px">
          <Box width="450px" m="0 auto" display="grid" gridRowGap="20px" pt="40px" justifyItems="center">
            <Title center noMargin color="white" title="Are you parked on a goldmine?" />
            <Text display="block" color="white" textAlign="center">
              People are out there looking for car spaces to rent by the day, week or month. List yours simply with
              Spacenow and start earning money from your parking spot.
            </Text>
            <Button width="270px">Get started now</Button>
          </Box>
          <GoldMineContainer>
            <Box>
              <GuyMine />
            </Box>
            <GoldMineContentContainer>
              <GoldMineContentItem>
                <UsersIcon />
                <Text display="block" color="white" mt="15px" mb="5px" fontFamily="bold">
                  We have the guests
                </Text>
                <Text display="block" color="white">
                  Thousands of people are looking for car spaces right now.
                </Text>
              </GoldMineContentItem>
              <GoldMineContentItem>
                <ManageIcon />
                <Text display="block" color="white" mt="15px" mb="5px" fontFamily="bold">
                  We manage everything
                </Text>
                <Text display="block" color="white">
                  Bookings, payments, insurance, the works.
                </Text>
              </GoldMineContentItem>
              <GoldMineContentItem>
                <EasyIcon />
                <Text display="block" color="white" mt="15px" mb="5px" fontFamily="bold">
                  It’s super easy
                </Text>
                <Text display="block" color="white">
                  Listing is quick and user-friendly.
                </Text>
              </GoldMineContentItem>
              <GoldMineContentItem>
                <YouAreTheBossIcon />
                <Text display="block" color="white" mt="15px" mb="5px" fontFamily="bold">
                  You’re the boss
                </Text>
                <Text display="block" color="white">
                  You decide the price, availability and terms.
                </Text>
              </GoldMineContentItem>
            </GoldMineContentContainer>
          </GoldMineContainer>
        </Box>

        <Box>
          <Title type="h2" title="A new revenue stream could be right under your tyres." />
          <Text display="block" fontSize="20px" lineHeight="2">
            People are out there looking for car spaces to rent by the day, week or month - listing yours on Spacenow is
            the quickest and easiest way to find guests - and start earning extra cash.
          </Text>
          <Text display="block" fontSize="20px" lineHeight="2">
            You could be missing out on hundreds of dollars a week while your car space at work or home sits empty. Why
            not put it to work? Spacenow handles the booking, payment and even gives you simple insurance options so
            you’re covered.
          </Text>
        </Box>

        <Box m="100px 50px" display="grid" gridTemplateColumns="auto auto auto" gridColumnGap="120px">
          <Box>
            <IconKey />
            <Text display="block" color="quartenary" mt="30px" mb="15px" fontFamily="medium">
              You’re the boss
            </Text>
            <Text display="block" color="quartenary" fontSize="12px">
              Create a listing and provide access to space for the professional without an office, the artist without a
              studio, a brand looking for a pop up or a chef without a kitchen.
            </Text>
          </Box>
          <Box>
            <IconForm />
            <Text display="block" color="quartenary" mt="30px" mb="15px" fontFamily="medium">
              What’s in a listing?
            </Text>
            <Text display="block" color="quartenary" fontSize="12px">
              Tell guests where your space is located, about the space, along with some photos and price. Provide guests
              with a snapshot of what your spaces could be utilised for.
            </Text>
          </Box>
          <Box>
            <IconMagnifier />
            <Text display="block" color="quartenary" mt="30px" mb="15px" fontFamily="medium">
              Managing space
            </Text>
            <Text display="block" color="quartenary" fontSize="12px">
              If your space is available one day, but not the next, that is not a problem. Listing’s can be altered and
              updated as you please and in real time.
            </Text>
          </Box>
        </Box>

        <Box
          bg="quartenary"
          height="630px"
          display="grid"
          gridTemplateColumns="1fr auto"
          justifyItems="center"
          mb="100px"
        >
          <Box alignSelf="center" textAlign="center" padding="70px">
            <Title center color="white" title="Hosting is easy." />
            <Text display="block" textAlign="center" color="white" my="40px">
              Spacenow handles the booking, payment and even offers simple insurance options so you’re covered. Open up
              a whole new revenue stream for your business.
            </Text>
            <Button width="270px">Get started now</Button>
          </Box>
          <Box
            backgroundImage={`url(${womanDriving})`}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            width="500px"
          />
        </Box>
      </Wrapper>
    </>
  )
}

export default RentMyOfficeSpace
