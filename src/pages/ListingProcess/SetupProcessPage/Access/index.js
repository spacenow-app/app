import React, { useEffect } from 'react'
import { withFormik } from 'formik'
import { Wrapper, Box, Title, StepButtons, Select, Text } from 'components'

const AccessPage = ({ listing, values, handleChange, handleBlur, ...props }) => {
  useEffect(() => {
    props.setFatherValues({ ...values })
  }, [props, values])
  return (
    <form>
    <Wrapper>
      <Box display="grid" gridGap="30px">
        <Box>
          <Box>
            <Title
              type="h3"
              title="Let your guests book right away"
              subtitle="Allow your guests to book instantly or ask them to send a request first."
              subTitleMargin={10}
            />
          </Box>
          <Box display="grid" gridGap="10px">
            <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: '1fr 1fr 1fr' }} gridGap="30px">
              <Select 
              name='bookingType'
              label='Select guest booking'
              value={values.bookingType}
              onChange={handleChange}
              onBlur={handleBlur}>
                <option>Select guest booking</option>
                <option value={`instant`}>Instantly</option>
                <option value={`request`}>Request</option>
              </Select>
            </Box>
            <Box display="grid">
              <Text>TIP: If you want to let a guest book any free date instantly, select the instant option.</Text>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box>
            <Title type="h3" title="What time can guests check-in between?" />
          </Box>
          <Box display="grid">
            <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: '1fr 1fr 1fr' }} gridGap="30px">
              <Select label="From">
                <option>Start:</option>
              </Select>
              <Select label="To">
                <option>To:</option>
              </Select>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box>
            <Title type="h3" title="What time do guests need to check-out?" />
          </Box>
          <Box display="grid">
            <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: '1fr 1fr 1fr' }} gridGap="30px">
              <Select label="Check-out:">
                <option>Check-out:</option>
              </Select>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box>
            <Title
              type="h3"
              title="Access information"
              subtitle="Select the way guests will gain access to your space."
              subTitleMargin={10}
            />
          </Box>
          <Box display="grid">
            <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: '1fr 1fr 1fr' }} gridGap="30px">
              <Select>
                <option>Select category type</option>
              </Select>
            </Box>
          </Box>
        </Box>
      </Box>
      <StepButtons
        prev={{
          disabled: false,
          onClick: () => props.history.push(`/listing-process/setup-process/${listing.id}/scene`)
        }}
        next={{
          onClick: () => props.history.push(`/listing-process/setup-process/${listing.id}/opening-hours`)
        }}
      />
    </Wrapper>
    </form>
  )
}

const formik = {
  displayName: 'SetupProcess_AccessForm',
  mapPropsToValues: ({ listing }) => {
    return {
      ...listing,
      bookingType: listing.bookingType,
      listingData: {
        ...listing.listingData,
        checkInStart: listing.listingData.checkInStart,
        checkInEnd: listing.listingData.checkInEnd
      }
    }
  },
  enableReinitialize: true,
  isInitialValid: true
}

AccessPage.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(AccessPage)
