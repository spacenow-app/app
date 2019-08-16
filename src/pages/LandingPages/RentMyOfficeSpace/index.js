import React from 'react'
import styled, { css } from 'styled-components'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import numeral from 'numeral'
import { Wrapper, Box, NavBar, Title, Text, Select, Input, Button, Icon } from 'components'

import heroImage from './images/hero_img.png'

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
  grid-column-gap: 160px;
  grid-row-gap: 80px;
  margin-top: 80px;
`

const WhyItem = styled.div`
  display: grid;
  justify-items: center;
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
              <Input label="Estimated" value="$3,330 Monthly" />
              <Button block>Get started now</Button>
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
              <Icon name="category-office" width="50px" fill="#6ADC91" />
              <Text color="primary" fontSize="20px">
                We have the guests.
              </Text>
              <Text fontSize="20px">Thousands of people are looking for car spaces right now</Text>
            </WhyItem>
            <WhyItem>
              <Icon name="category-office" width="50px" fill="#6ADC91" />
              <Text color="primary" fontSize="20px">
                We have the guests.
              </Text>
              <Text fontSize="20px">Thousands of people are looking for car spaces right now</Text>
            </WhyItem>
            <WhyItem>
              <Icon name="category-office" width="50px" fill="#6ADC91" />
              <Text color="primary" fontSize="20px">
                We have the guests.
              </Text>
              <Text fontSize="20px">Thousands of people are looking for car spaces right now</Text>
            </WhyItem>
            <WhyItem>
              <Icon name="category-office" width="50px" fill="#6ADC91" />
              <Text color="primary" fontSize="20px">
                We have the guests.
              </Text>
              <Text fontSize="20px">Thousands of people are looking for car spaces right now</Text>
            </WhyItem>
            <WhyItem>
              <Icon name="category-office" width="50px" fill="#6ADC91" />
              <Text color="primary" fontSize="20px">
                We have the guests.
              </Text>
              <Text fontSize="20px">Thousands of people are looking for car spaces right now</Text>
            </WhyItem>
            <WhyItem>
              <Icon name="category-office" width="50px" fill="#6ADC91" />
              <Text color="primary" fontSize="20px">
                We have the guests.
              </Text>
              <Text fontSize="20px">Thousands of people are looking for car spaces right now</Text>
            </WhyItem>
          </WhyContainer>
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
