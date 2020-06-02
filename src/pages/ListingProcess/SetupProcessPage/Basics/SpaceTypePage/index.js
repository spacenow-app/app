import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import { withFormik } from 'formik'
import { Wrapper, Box, Title, StepButtons, Radio } from 'components'

const SpaceTypePage = ({ listing, values, handleChange, handleBlur, ...props }) => {
  useEffect(() => {
    props.setFatherValues({ ...values })
  }, [props, values])

  return (
    <form>
      <Wrapper>
        <Helmet title="Listing Intro - Spacenow - Steps - Basics - Space Type" />
        <Box display="grid" gridGap="30px">
          <Title type="h3" title="Property type" subtitle="Which best describes your space?" subTitleMargin={10} />
          <Box display="grid" gridTemplateColumns={{ _: 'auto 1fr' }} gridGap="10px">
            <Radio
              name={'listingData.listingType'}
              value="Established space or business"
              checked={values.listingData.listingType === 'Established space or business'}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <Title
              type="h6"
              title="Established space or business"
              subtitle="The space has managed bookings and systems in place for hire and extras like catering."
              subTitleMargin={12}
              mediumBold
              noMargin
            />
          </Box>
          <Box display="grid" gridTemplateColumns={{ _: 'auto 1fr' }} gridGap="10px">
            <Radio
              name={'listingData.listingType'}
              value="Private property"
              checked={values.listingData.listingType === 'Private property'}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <Title
              type="h6"
              title="Private property"
              subtitle="The space is privately owned but is perfect for people to hire and use for events or creative uses like location shoots or production companies to hire."
              subTitleMargin={12}
              mediumBold
              noMargin
            />
          </Box>
          <Box display="grid" gridTemplateColumns={{ _: 'auto 1fr' }} gridGap="10px">
            <Radio
              name={'listingData.listingType'}
              value="Shared or sublet"
              checked={values.listingData.listingType === 'Shared or sublet'}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <Title
              type="h6"
              title="Shared or sublet"
              subtitle="You have a lease on the space and wish to share or sublease."
              subTitleMargin={12}
              mediumBold
              noMargin
            />
          </Box>
        </Box>
        <StepButtons
          prev={{
            disabled: false,
            onClick: () => props.history.push(`/listing-process/setup-process/${listing.id}/location`)
          }}
          next={{
            onClick: () => props.history.push('category')
          }}
        />
      </Wrapper>
    </form>
  )
}

const formik = {
  displayName: 'SetupProcess_SpaceTypeForm',
  mapPropsToValues: ({ listing }) => {
    return {
      ...listing,
      listingData: {
        ...listing.listingData,
        listingType: listing.listingData.listingType || 'Established space or business'
      }
    }
  },
  enableReinitialize: true,
  isInitialValid: true
}

SpaceTypePage.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(SpaceTypePage)
