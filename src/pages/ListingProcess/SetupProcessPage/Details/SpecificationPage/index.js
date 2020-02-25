import React, { useEffect, useState } from 'react'
import { withFormik } from 'formik'
import { Wrapper, Box, Title, StepButtons, Select, Checkbox, Input } from 'components'

const SpecificationPage = ({ listing, values, handleChange, handleBlur, ...props }) => {
  const [checkCocktail, setCheckCocktail] = useState(values.listingData.capacityCocktail !== 0)
  const [checkBanquet, setCheckBanquet] = useState(values.listingData.capacityBanquet !== 0)
  const [checkTheatre, setCheckTheatre] = useState(values.listingData.capacityTheatre !== 0)
  const [checkClassroom, setCheckClassroom] = useState(values.listingData.capacityClassroom !== 0)
  const [checkBoardroom, setCheckBoardroom] = useState(values.listingData.capacityBoardroom !== 0)

  useEffect(() => {
    props.setFatherValues({ ...values })
  }, [props, values])

  return (
    <form>
      <Wrapper>
        <Helmet title="Listing Intro - Spacenow - Steps - Details - Specifications" />
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
                mediumLabel
                label={`Cocktail`}
                value={checkCocktail}
                checked={checkCocktail}
                handleCheckboxChange={() => setCheckCocktail(!checkCocktail)}
              />
              {checkCocktail && <Box ml="25px">
                <Box bg="#F7F7F7" width="100%" height="93px" my="10px" borderRadius="10px" />
                <Input
                  type="number"
                  placeholder="Ie. 200"
                  name="listingData.capacityCocktail"
                  disabled={!checkCocktail}
                  value={values.listingData.capacityCocktail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Box>
              }
            </Box>
            <Box>
              <Checkbox
                mediumLabel
                label={`Banquet`}
                value={checkBanquet}
                checked={checkBanquet}
                handleCheckboxChange={() => setCheckBanquet(!checkBanquet)}
              />
              {checkBanquet && <Box ml="25px">
                <Box bg="#F7F7F7" width="100%" height="93px" my="10px" borderRadius="10px" />
                  <Input
                    type="number"
                    placeholder="Ie. 200"
                    name="listingData.capacityBanquet"
                    disabled={!checkBanquet}
                    value={values.listingData.capacityBanquet}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
              }
            </Box>
            <Box>
              <Checkbox
                mediumLabel
                label={`Theatre`}
                value={checkTheatre}
                checked={checkTheatre}
                handleCheckboxChange={() => setCheckTheatre(!checkTheatre)}
              />
              {checkTheatre && <Box ml="25px">
                <Box bg="#F7F7F7" width="100%" height="93px" my="10px" borderRadius="10px" />
                  <Input
                    type="number"
                    placeholder="Ie. 200"
                    name="listingData.capacityTheatre"
                    disabled={!checkTheatre}
                    value={values.listingData.capacityTheatre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
              }
            </Box>
            <Box>
              <Checkbox
                mediumLabel
                label={`Classroom`}
                value={checkClassroom}
                checked={checkClassroom}
                handleCheckboxChange={() => setCheckClassroom(!checkClassroom)}
              />
              {checkClassroom &&
                <Box ml="25px">
                  <Box bg="#F7F7F7" width="100%" height="93px" my="10px" borderRadius="10px" />
                  <Input
                    type="number"
                    placeholder="Ie. 200"
                    name="listingData.capacityClassroom"
                    disabled={!checkClassroom}
                    value={values.listingData.capacityClassroom}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
              }
            </Box>
            <Box>
              <Checkbox
                mediumLabel
                label={`Boardroom`}
                value={checkBoardroom}
                checked={checkBoardroom}
                handleCheckboxChange={() => setCheckBoardroom(!checkBoardroom)}
              />
              {checkBoardroom &&
                <Box ml="25px">
                  <Box bg="#F7F7F7" width="100%" height="93px" my="10px" borderRadius="10px" />
                  <Input
                    type="number"
                    placeholder="Ie. 200"
                    name="listingData.capacityBoardroom"
                    disabled={!checkBoardroom}
                    value={values.listingData.capacityBoardroom}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
              }
            </Box>
          </Box>
          <Box>
            <Title type="h3" title="Alcohol licence" />
            <Select
              value={values.listingData.alcoholLicence}
              onChange={handleChange}
              onBlur={handleBlur}
              name="listingData.alcoholLicence"
            >
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
        capacityCocktail: listing.listingData.capacityCocktail || 0,
        capacityBanquet: listing.listingData.capacityBanquet || 0,
        capacityTheatre: listing.listingData.capacityTheatre || 0,
        capacityClassroom: listing.listingData.capacityClassroom || 0,
        capacityBoardroom: listing.listingData.capacityBoardroom || 0,
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
