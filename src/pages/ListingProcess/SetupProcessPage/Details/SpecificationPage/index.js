import React, { useEffect } from 'react'
import { withFormik } from 'formik'
import { Wrapper, Box, Title, StepButtons, Select, Checkbox, Input } from 'components'

const SpecificationPage = ({ listing, values, handleChange, handleBlur, ...props }) => {
  useEffect(() => {
    props.setFatherValues({ ...values })
  }, [props, values])

  return (
    <form>
      <Wrapper>
        <Box display="grid" gridGap="30px">
          <Box>
            <Title type="h3" title="Capacity and seating" />
            <Box>
              <Input
                type="number"
                label="Maximum number of guests."
                placeholder="Ie. 200"
                name="listingData.capacity"
                value={values.listingData.capacity}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Box>
          </Box>
          <Box display="grid" gridTemplateColumns={{ _: 'auto', medium: 'auto auto auto' }} gridGap="30px">
            <Box>
              <Checkbox
                key={1}
                label="Cocktail"
                name="amenities"
                value=""
                checked
                mediumLabel
                // handleCheckboxChange={_handleCheckboxChange}
              />
              {/* <Image src=""/> */}
              <Box ml="25px">
                <Box bg="#F7F7F7" width="100%" height="93px" my="10px" borderRadius="10px" />
                <Input placeholder="Ie. 200" />
              </Box>
            </Box>
            <Box>
              <Checkbox
                key={1}
                label="Banquet"
                name="amenities"
                value=""
                checked
                mediumLabel
                // handleCheckboxChange={_handleCheckboxChange}
              />
              {/* <Image src=""/> */}
              <Box ml="25px">
                <Box bg="#F7F7F7" width="100%" height="93px" my="10px" borderRadius="10px" />
                <Input placeholder="Ie. 180" />
              </Box>
            </Box>
            <Box>
              <Checkbox
                key={1}
                label="Theatre"
                name="amenities"
                value=""
                checked
                mediumLabel
                // handleCheckboxChange={_handleCheckboxChange}
              />
              {/* <Image src=""/> */}
              <Box ml="25px">
                <Box bg="#F7F7F7" width="100%" height="93px" my="10px" borderRadius="10px" />
                <Input placeholder="Ie. 180" />
              </Box>
            </Box>
            <Box>
              <Checkbox
                key={1}
                label="Classroom"
                name="amenities"
                value=""
                checked
                mediumLabel
                // handleCheckboxChange={_handleCheckboxChange}
              />
              {/* <Image src=""/> */}
              <Box ml="25px">
                <Box bg="#F7F7F7" width="100%" height="93px" my="10px" borderRadius="10px" />
                <Input placeholder="Ie. 180" />
              </Box>
            </Box>
            <Box>
              <Checkbox
                key={1}
                label="Boardroom"
                name="amenities"
                value=""
                checked
                mediumLabel
                // handleCheckboxChange={_handleCheckboxChange}
              />
              <Box ml="25px">
                <Box bg="#F7F7F7" width="100%" height="93px" my="10px" borderRadius="10px" />
                <Input placeholder="Ie. 180" />
              </Box>
            </Box>
          </Box>
          <Box>
            <Title type="h3" title="Alcohol licence" />
            <Select value={values.listingData.alcoholLicence} onChange={handleChange} onBlur={handleBlur} name="listingData.alcoholLicence" >
              <option value="">Please select</option>
              <option value="Licenced">Licenced</option>
              <option value="No Licenced">No licenced</option>
              <option value="BYO">BYO</option>
            </Select>
          </Box>
          <StepButtons
            prev={{
              disabled: false,
              onClick: () => props.history.push(`/listing-process/setup-process/${listing.id}/basics`)
            }}
            next={{
              // disabled: !location,
              onClick: () => props.history.push('feature')
              // isLoading: isLoadingCreating
            }}
          />
        </Box>
      </Wrapper>
    </form>
  )
}

const formik = {
  displayName: 'SetupProcess_SpecificationForm',
  mapPropsToValues: ({ listing }) => {
    return {
      listingData: {
        ...listing.listingData,
        capacity: listing.listingData.capacity || 0,
        alcoholLicence: listing.listingData.alcoholLicence || ''
      }
    }
  },
  enableReinitialize: true,
  isInitialValid: true
}

SpecificationPage.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(SpecificationPage)
