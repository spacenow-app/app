import React from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { Wrapper, Box, NavBar, Title, Text, Select, Button } from 'components'

import heroImage from './images/hero_img.png'
import JamesImage from './images/james_harvey.png'
import PaulImage from './images/paul_walker.png'

import { ReactComponent as PeopleImage } from './images/banner_peoples.svg'
import { ReactComponent as UsersIcon } from './images/users_icon.svg'
import { ReactComponent as ManageIcon } from './images/manage_icon.svg'
import { ReactComponent as EasyIcon } from './images/super_easy.svg'
import { ReactComponent as ConveredIcon } from './images/covered_icon.svg'
import { ReactComponent as ShareSpaceIcon } from './images/sharing_space_icon.svg'
import { ReactComponent as YouAreTheBossIcon } from './images/youretheboss_icon.svg'

const ImageHero = styled.div`
  background: linear-gradient(rgba(23, 36, 57, 0.61), rgba(23, 36, 57, 0.61)), url(${heroImage});
  background-size: cover;
  height: 750px;
`

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-content: center;
`

const ImageHeroLeft = styled.div`
  width: 410px;
  margin-top: 200px;
`

const ImageHeroRight = styled.div`
  display: grid;
  width: 500px;
  height: 600px;
  background-color: #fff;
  margin-top: 70px;
  padding: 50px 70px;
  grid-row-gap: 15px;
`

const WhyContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  align-content: space-between;
  grid-column-gap: 100px;
  grid-row-gap: 80px;
  margin-top: 80px;
`

const WhyItem = styled.div`
  display: grid;
  justify-items: center;
  font-size: 20px;

  svg {
    width: 55px;
  }
`

const WhyTitle = styled(Text)`
  color: #6adc91;
  margin-top: 20px;
`
const WhyText = styled(Text)`
  color: #1c3942;
  text-align: center;
`

const TestimonialContainer = styled(Box)`
  display: grid;
  grid-template-columns: ${props => (props.right ? 'max-content 470px' : '470px max-content')};
  grid-column-gap: ${props => (props.right ? '80px' : '5px')};
`

const TestimonialQuotes = styled.p`
  font-size: 90px;
  color: #6adc91;
  font-family: 'MontSerrat-Bold';
  margin: 0;
  height: 80px;
`

const TestimonialText = styled.p`
  font-size: 34px;
  font-family: 'MontSerrat-Light';
`

const TestimonialAuthor = styled.span`
  font-family: 'MontSerrat-Medium';
  color: #6adc91;
  font-size: 22px;
`

const TestimonialImage = styled.div`
  width: 278px;
  height: 278px;
  border-radius: 100%;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.src});
  align-self: center;
`

const RentMyOfficeSpace = ({ history, ...props }) => {
  const _goToListing = () => {
    history.push('/listing')
  }

  return (
    <>
      <NavBar />
      <ImageHero>
        <Wrapper>
          <HeaderContainer>
            <ImageHeroLeft>
              <Title
                title={
                  <Text color="white">
                    Are you sitting on a goldmine<Text color="primary">?</Text>
                  </Text>
                }
                subtitle={
                  <Text color="white" fontSize="24px" fontFamily="medium">
                    Turn unused workspace into money.
                  </Text>
                }
              />
            </ImageHeroLeft>
            <ImageHeroRight>
              <Title type="h4" title="What could you earn?" noMargin center />
              <Select label="State" placeholder="New South Wales" />
              <Select label="Suburb" placeholder="e.g. Bondi Junction" />
              <Select label="Capacity for your space?" placeholder="Select" />
              <Text fontSize="12px" textAlign="center">
                You could earn up to
              </Text>
              <Text color="quartenary" fontSize="30px" fontFamily="bold" textAlign="center">
                $3,330 per month
              </Text>
              <Button fluid onClick={_goToListing}>
                Get started now
              </Button>
            </ImageHeroRight>
          </HeaderContainer>
        </Wrapper>
      </ImageHero>
      <Wrapper width="970px">
        <Box my="60px">
          <Title
            type="h3"
            title={
              <Text>
                Do you have a work space that’s not generating profit<Text color="primary">?</Text> Put it to work.
              </Text>
            }
          />
          <Text fontSize="20px" lineHeight="2">
            List office space by the hour, day, week or month for thousands of guests to search for and hire. The
            process is quick and easy and all guests are verified.
          </Text>
          <Text display="block" fontSize="20px" mt="40px" lineHeight="2">
            Spacenow handles the booking, payment and even offers simple insurance options so you’re covered. Open up a
            whole new revenue stream for your business.
          </Text>
        </Box>

        <Box my="80px">
          <Title
            center
            type="h3"
            title={
              <Text>
                Why list your space on Spacenow<Text color="primary">?</Text>
              </Text>
            }
          />
          <WhyContainer>
            <WhyItem>
              <UsersIcon />
              <WhyTitle>We have the guests.</WhyTitle>
              <WhyText>Thousands of people are looking for car spaces right now</WhyText>
            </WhyItem>
            <WhyItem>
              <ManageIcon />
              <WhyTitle>We manage everything.</WhyTitle>
              <WhyText>Bookings, payments, insurance, the works</WhyText>
            </WhyItem>
            <WhyItem>
              <EasyIcon />
              <WhyTitle>It’s super easy.</WhyTitle>
              <WhyText>Listing is quick and user-friendly</WhyText>
            </WhyItem>
            <WhyItem>
              <ConveredIcon />
              <WhyTitle>You’re covered.</WhyTitle>
              <WhyText>Select insurance with a click</WhyText>
            </WhyItem>
            <WhyItem>
              <ShareSpaceIcon />
              <WhyTitle>Sharing space.</WhyTitle>
              <WhyText>is a win-win-win for you, the guest and the planet</WhyText>
            </WhyItem>
            <WhyItem>
              <YouAreTheBossIcon />
              <WhyTitle>You’re the boss..</WhyTitle>
              <WhyText>You decide the price, availability and terms</WhyText>
            </WhyItem>
          </WhyContainer>
        </Box>

        <Box my="150px">
          <Title center type="h2" title="Hear from people already monetising their Office Space" />
          <Box display="grid" justifyContent="center">
            <TestimonialContainer>
              <div>
                <TestimonialQuotes>“</TestimonialQuotes>
                <TestimonialText>
                  Sharing our office has turned on an unexpected revenue stream for our business.
                </TestimonialText>
                <TestimonialAuthor>Paul Walker</TestimonialAuthor>
              </div>
              <TestimonialImage src={PaulImage} />
            </TestimonialContainer>
            <TestimonialContainer right="true" mt="150px">
              <TestimonialImage src={JamesImage} />
              <div>
                <TestimonialQuotes>“</TestimonialQuotes>
                <TestimonialText>My workspace works twice as hard now it’s listed on Spacenow.</TestimonialText>
                <TestimonialAuthor>James Harvey</TestimonialAuthor>
              </div>
            </TestimonialContainer>
          </Box>
        </Box>

        <Title
          center
          type="h2"
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
            <Button width="234px" color="quartenary" fontFamily="MontSerrat-Bold" onClick={_goToListing}>
              List your office space
            </Button>
          </Box>
        </Box>
      </Wrapper>
    </>
  )
}

const formik = {
  displayName: 'LandingPage_RentMyOfficeSpace',
  mapPropsToValues: props => ({
    typeOfSpace: '',
    location: '',
    startDate: '',
    endDate: '',
    size: '',
    budget: false,
    message: ''
  }),
  mapValuesToPayload: x => x,
  validationSchema: Yup.object().shape({
    title: Yup.string()
      .typeError('Title need to be String')
      .max(25, 'Maximum characters for Title field must be 25')
  }),
  enableReinitialize: true,
  isInitialValid: true
}

export default withFormik(formik)(RentMyOfficeSpace)
