import React, { useEffect } from 'react'
import { withFormik } from 'formik'
import { Wrapper, Box, Title, StepButtons, Input, TextArea } from 'components'

const DetailPage = ({ listing, values, handleChange, handleBlur, ...props }) => {
  useEffect(() => {
    props.setFatherValues({ ...values })
  }, [props, values])

  return (
    <form>
      <Wrapper>
        <Box>
          <Title
            type="h3"
            title="Title"
            subtitle="Your title sets the scene. Make it short, powerful and identify someone’s need for it."
            subTitleMargin={10}
          />
          <Box display="grid" gridTemplateColumns={{ _: 'auto', medium: 'auto auto' }} gridGap="30px">
            <Input
              placeholder="Ie. Car park 100m walk to Central Station"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Box>
        </Box>
        <Box>
          <Title type="h3" title="Description" subtitle="Sell 'em the dream." subTitleMargin={10} />
          <TextArea
            placeholder="Description"
            name="listingData.description"
            value={values.listingData.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Box>
        <Box>
          <Title
            type="h3"
            title="Directions"
            subtitle="Give guest any instructions for arriving, access or parking."
            subTitleMargin={10}
          />
          <TextArea
            placeholder="This helps guest find spaces that aren’t easy to find"
            name="listingData.direction"
            value={values.listingData.direction}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Box>
        <Box>
          <Title
            type="h3"
            title="Wifi"
            subtitle="Wifi username and password only sent to guest after the booking is successful"
            subTitleMargin={10}
          />
          <Box display="grid" gridTemplateColumns={{ _: 'auto', medium: 'auto auto auto' }} gridGap="30px">
            <Input
              name="listingData.wifiNetwork"
              placeholder="Wifi network"
              value={values.listingData.wifiNetwork}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              name="listingData.wifiUsername"
              placeholder="Wifi username"
              value={values.listingData.wifiUsername}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              name="listingData.wifiPassword"
              placeholder="Wifi password"
              value={values.listingData.wifiPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Box>
        </Box>
        <StepButtons
          prev={{ disabled: false, onClick: () => props.history.push('feature') }}
          next={{
            // disabled: !location,
            onClick: () => props.history.push('amenities')
            // isLoading: isLoadingCreating
          }}
        />
      </Wrapper>
    </form>
  )
}

const formik = {
  displayName: 'SetupProcess_DetailForm',
  mapPropsToValues: ({ listing }) => {
    return {
      ...listing,
      title: listing.title || '',
      listingData: {
        ...listing.listingData,
        description: listing.listingData.description || '',
        direction: listing.listingData.direction || '',
        wifiNetwork: listing.listingData.wifiNetwork || '',
        wifiUsername: listing.listingData.wifiUsername || '',
        wifiPassword: listing.listingData.wifiPassword || ''
      }
    }
  },
  enableReinitialize: true,
  isInitialValid: true
}

DetailPage.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(DetailPage)
