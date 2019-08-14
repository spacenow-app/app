import React from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { Wrapper, Box, NavBar, Title, Text, Select, Input, Button, Icon } from 'components'

import heroImage from './images/hero_img.png'

const ImageHero = styled.div`
  background: linear-gradient(rgba(23, 36, 57, 0.61), rgba(23, 36, 57, 0.61)), url(${heroImage});
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
  width: 500px;
  background-color: #fff;
  margin-top: 30px;
  padding: 30px 70px;
  grid-row-gap: 15px;
  box-shadow: 0px 1px 6px #000000;
  border-radius: 5px;
`

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
                <Text color="quartenary" fontSize="36px" fontFamily="bold">
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
        <Text ml="10%">Trusted by:</Text>
        <Box
          ml="10%"
          display="grid"
          gridTemplateColumns="auto auto auto auto"
          width="500px"
          alignContent="center"
          alignItems="center"
        >
          <Box width="50px" height="50px" border="1px solid" />
          <Box width="50px" height="50px" border="1px solid" />
          <Box width="50px" height="50px" border="1px solid" />
          <Box width="50px" height="50px" border="1px solid" />
        </Box>
      </Box>

      <Box width="1169px">
        <Text>Australian's love Spacenow:</Text>
        <Box>
          <Box>a</Box>
          <Box>b</Box>
          <Box>c</Box>
        </Box>
      </Box>

      <Wrapper width="1169px">
        <Box bg="quartenary">
          <Title
            title="Are you parked on a goldmine?"
            subtitle="People are out there looking for car spaces to rent by the day, week or month. List yours simply with Spacenow and start earning money from your parking spot."
          />
          <Button>Get started now</Button>
          <Box>
            <Box>img</Box>
            <Box>
              <Box>a</Box>
              <Box>b</Box>
              <Box>c</Box>
            </Box>
          </Box>
        </Box>

        <Box>
          <Title title="A new revenue stream could be right under your tyres." />
          <Text>
            People are out there looking for car spaces to rent by the day, week or month - listing yours on Spacenow is
            the quickest and easiest way to find guests - and start earning extra cash. You could be missing out on
            hundreds of dollars a week while your car space at work or home sits empty. Why not put it to work? Spacenow
            handles the booking, payment and even gives you simple insurance options so you’re covered.
          </Text>
        </Box>

        <Box>
          <Box>a</Box>
          <Box>b</Box>
          <Box>c</Box>
        </Box>

        <Box bg="quartenary">
          <Box>
            <Title title="Hosting is easy." />
            <Text>
              Spacenow handles the booking, payment and even offers simple insurance options so you’re covered. Open up
              a whole new revenue stream for your business.
            </Text>
            <Button>Get started now</Button>
          </Box>
          <Box>img</Box>
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
