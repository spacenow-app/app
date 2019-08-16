import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { Wrapper, Box, NavBar, Title, Text, Button, Icon } from 'components'
import ModalVideo from 'react-modal-video'

import heroImage from './images/hero_img.png'
import gregImage from './images/greg_image.png'
import jamesImage from './images/james_image.png'
import stewartImage from './images/stewart_image.png'
import canvaLogo from './images/canva_logo.png'
import weWorkLogo from './images/wework_logo.png'
import uberEatsLogo from './images/ubereats_logo.png'
import tfeHotelsLogo from './images/tfe_hotels_logo.png'
import kafnu from './images/kafnu.png'
import videoThumb from './images/video_thumb.png'
import { ReactComponent as PeopleImage } from './images/banner_peoples.svg'
import { ReactComponent as IconForm } from './images/Icon_Form.svg'
import { ReactComponent as IconKey } from './images/Icon_Key.svg'
import { ReactComponent as IconMagnifier } from './images/Icon_Magnifier.svg'

import './modal_video_style.css'

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
  margin-top: 200px;
  padding: 30px 70px;
  grid-row-gap: 15px;
  border-radius: 5px;
  border: 1px solid #ebebeb;
`

const TrustedLogo = styled.img`
  width: ${props => props.width || '70px'};
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

const ImageVideo = styled.div`
  height: 640px;
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(rgba(23, 36, 57, 0.61), rgba(23, 36, 57, 0.61)), url(${props => props.src});
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const testimonials = [
  {
    id: 1,
    author: 'Paul Walker',
    city: ' CEO - Walker Development',
    text: '“Sharing our office has turned on an unexpected revenue stream for our business.”',
    photo: gregImage
  },
  {
    id: 2,
    author: 'James Harvey',
    city: 'Director - Orchard St.',
    text: '“My workspace works twice as hard now it’s listed on Spacenow.”',
    photo: jamesImage
  },
  {
    id: 3,
    author: 'Stewart Webb ',
    city: 'Partner - Search Rescue',
    text: '“Renting our boardroom each week makes us an extra $250.”',
    photo: stewartImage
  }
]

const ourServices = [
  {
    title: 'Quick setup Listing',
    description: 'Track overall business and forecast earnings.'
  },
  {
    title: 'Charge what you want',
    description: 'You always get to pick your price. Need help? Contact our customer support.'
  },
  {
    title: 'Insurance for your space',
    description: 'We provide liability cover, so you’re supported as a host.'
  },
  {
    title: 'Management tools',
    description: 'Manage every aspect of your space. From availability to welcoming guests.'
  },

  {
    title: 'Pay low fees',
    description: 'There’s no cost to sign up. We charge a flat 10% per booking.'
  },

  {
    title: 'Manage single or multiple spaces',
    description: 'Create and manage any number of spaces.'
  },

  {
    title: 'Increase bookings',
    description: 'Increase the utilisation of your space.'
  },

  {
    title: 'Leads your way',
    description: 'Select from instant or request to manage your bookings.'
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
  const [showVideo, setShowVideo] = useState(false)
  return (
    <>
      <NavBar />
      <Wrapper width="1169px">
        <ImageHero>
          <Wrapper>
            <HeaderContainer>
              <ImageHeroLeft />
              <ImageHeroRight>
                <Title noMargin type="h2" title="Why host with Spacenow." />
                <Text color="#172439">
                  No matter what type of space you have to share, Spacenow makes it simple and secure to rent your
                  space. You’re in full control of your availability, prices and more.
                </Text>
                <Box mt="20px" textAlign="center" display="grid" gridRowGap="10px">
                  <Text fontSize="12px">You could be earning up to</Text>
                  <Text color="quartenary" fontSize="30px" fontFamily="bold">
                    $450 per week*
                  </Text>
                  <Button fluid>Sign up and start earning.</Button>
                  <Text fontSize="12px">T&C’s apply - $450 is a weekly average across all categories</Text>
                </Box>
              </ImageHeroRight>
            </HeaderContainer>
          </Wrapper>
        </ImageHero>

        <Box bg="#F7FDF8" height="130px" display="grid" gridTemplateRows="auto 1fr" padding="20px">
          <Text display="block" ml="40px" fontSize="12px" mb="10px">
            Trusted by:
          </Text>
          <Box
            ml="40px"
            display="grid"
            gridTemplateColumns="auto auto auto auto"
            width="500px"
            alignContent="center"
            alignItems="center"
          >
            <TrustedLogo src={canvaLogo} />
            <TrustedLogo width="100px" src={weWorkLogo} />
            <TrustedLogo src={uberEatsLogo} />
            <TrustedLogo src={tfeHotelsLogo} />
          </Box>
        </Box>

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

        <Box my="180px" width="940px" ml="auto" mr="auto">
          <Title
            center
            title={
              <Text>
                The idea behind Spacenow<Text color="primary">.</Text>
              </Text>
            }
          />
          <Text display="block" lineHeight="2" fontSize="20px">
            Spacenow is an online peer-to-peer marketplace where you can rent any space on demand, in a flexible way.
            The platform connects people who need space with people who have it.
          </Text>
          <Text display="block" lineHeight="2" fontSize="20px" mt="10px">
            Spacenow provides access to under-utilised assets which provides economic, environmental social and
            practical benefits to users and hosts.
          </Text>
          <Text fontSize="20px" display="block" mt="40px">
            Need help call us on 02 9310 9214
          </Text>
        </Box>

        <Box my="180px">
          <Title type="h2" center title="Learn why they host." />
          <ModalVideo channel="youtube" isOpen={showVideo} videoId="L61p2uyiMSo" onClose={() => setShowVideo(false)} />
          <ImageVideo src={videoThumb} onClick={() => setShowVideo(true)}>
            <Box textAlign="center">
              <Icon name="play" />
              <Text display="block" color="white" fontFamily="semiBold" fontSize="18px">
                Watch the video
              </Text>
            </Box>
          </ImageVideo>
        </Box>

        <Box>
          <Title type="h2" title="Do you have a space that’s not generating profit?" />
          <Text display="block" fontSize="20px" lineHeight="2">
            List office space by the hour, day, week or month for thousands of guests to search for and hire. The
            process is quick and easy and all guests are verified.
          </Text>
          <Text display="block" fontSize="20px" lineHeight="2" mt="40px">
            Spacenow handles the booking, payment and even offers simple insurance options so you’re covered. Open up a
            whole new revenue stream for your business.
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
            backgroundImage={`url(${kafnu})`}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            width="500px"
          />
        </Box>

        <Box my="180px">
          <Title center title="Our Hosting Services" />
          <Box display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr" gridColumnGap="20px" gridRowGap="60px">
            {ourServices.map(item => (
              <Box
                borderRadius="10px"
                border="1px solid"
                borderColor="greyscale.3"
                textAlign="center"
                padding="40px 20px"
                height="330px"
              >
                <Text display="block" fontSize="24px" fontFamily="semiBold" color="quartenary">
                  {item.title}
                </Text>
                <Text display="block" fontSize="16px" color="quartenary" mt="40px">
                  {item.description}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>

        <Title
          center
          type="h3"
          title={
            <Text>
              Ready to become a host<Text color="primary">?</Text>
            </Text>
          }
        />

        <Box
          display="flex"
          height="165px"
          bg="quartenary"
          borderRadius="15px"
          justifyContent="space-around"
          alignItems="center"
          my="80px"
        >
          <Box width="136px">
            <Title
              type="h3"
              title={
                <Text color="white">
                  Hosting is easy<Text color="primary">.</Text>
                </Text>
              }
            />
          </Box>
          <Box alignSelf="flex-end">
            <PeopleImage />
          </Box>
          <Box>
            <Button width="234px" color="quartenary" fontFamily="MontSerrat-Bold">
              Get started
            </Button>
          </Box>
        </Box>
      </Wrapper>
    </>
  )
}

export default RentMyOfficeSpace
