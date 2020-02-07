import React, { useEffect } from 'react'
import { withFormik } from 'formik'
import { Wrapper, Box, Title, StepButtons, Input, TextArea, Checkbox, Select } from 'components'

const DetailPage = ({ listing, values, handleChange, handleBlur, ...props }) => {
  useEffect(() => {
    props.setFatherValues({ ...values })
  }, [props, listing, values])

  return (
    <form>
      <Wrapper>
        <Box>
          <Title
            type="h3"
            title="Title"
            subtitle="Your title sets the scene. Make it short, powerful and identify someone’s need for it."
            subTitleMargin="10px"
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
          <Title type="h3" title="Description" subtitle="Sell 'em the dream." subTitleMargin="10px" />
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
            subTitleMargin="10px"
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
          <Title type="h3" title="Transport" subtitle="Tick options within a 10 minute walk." subTitleMargin="10px" />
          <Box display="grid" gridTemplateColumns={{ _: 'auto auto ', medium: 'auto auto auto auto' }} gridGap="30px">
            <Checkbox
              key={1}
              label="Bus"
              name="transport"
              value=""
              checked
              mediumLabel
              // handleCheckboxChange={_handleCheckboxChange}
            />
            <Checkbox
              key={1}
              label="Train"
              name="transport"
              value=""
              checked
              mediumLabel
              // handleCheckboxChange={_handleCheckboxChange}
            />
            <Checkbox
              key={1}
              label="Tram/light rail"
              name="transport"
              value=""
              checked
              mediumLabel
              // handleCheckboxChange={_handleCheckboxChange}
            />
            <Checkbox
              key={1}
              label="Ferry"
              name="transport"
              value=""
              checked
              mediumLabel
              // handleCheckboxChange={_handleCheckboxChange}
            />
          </Box>
        </Box>
        <Box>
          <Title
            type="h3"
            title="Wifi"
            subtitle="Wifi username and password only sent to guest after the booking is successful"
            subTitleMargin="10px"
          />
          <Box display="grid" gridTemplateColumns={{ _: 'auto', medium: 'auto auto auto' }} gridGap="30px">
            <Select>
              <option>Select wifi speed</option>
              <option>hola</option>
            </Select>
            <Input placeholder="Wifi user name" />
            <Input placeholder="Wifi password" />
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
        direction: listing.listingData.direction || ''
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
