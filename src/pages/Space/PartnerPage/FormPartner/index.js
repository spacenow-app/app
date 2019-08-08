/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'
import * as Yup from 'yup'

import { Title, Input, Select, TextArea, Button } from 'components'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 40px;
`

const SectionStyled = styled.div``

const FormPartner = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
  listing,
  validateForm,
  dispatch,
  isValid,
  ...props
}) => {

  useEffect(() => {
    // dispatch(onSendLead(listing.settingsParent.id, listing.listingData))
  }, [dispatch, listing.id, listing.listingData, listing.settingsParent.id, listing.settingsParent.subcategory.id])


  const _handleSelectChange = e => {
    const { name, value } = e.target
    setFieldValue(name, value)
  }

  return (
    <form>
      <WrapperStyled>
        <SectionStyled>
          <Input
            label="Full Name*"
            placeholder="Your full name"
            name="name"
            error={errors.name}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SectionStyled>

        <SectionStyled>
          <Input
            label="Email"
            placeholder="Email Address"
            name="email"
            error={errors.email}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SectionStyled>

        <SectionStyled>
          <Input
            label="Phone"
            placeholder="Phone"
            name="phone"
            error={errors.phone}
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SectionStyled>
        
        <SectionStyled>
          <Title title="Tell us more about your introduction" type="h6" subTitleMargin={0} noMargin />
        </SectionStyled>

        <SectionStyled>
          <Input
            label="Company"
            placeholder="Company Name"
            name="company"
            error={errors.company}
            value={values.company}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SectionStyled>

        <SectionStyled>
          <Select value={values.accessType} name="desks" onChange={_handleSelectChange} label="Number of Desks needed">
            <option>Select a range</option>
            {/* {arrayAccessTypes.map(item => (
              <option key={item.id} value={item.itemName}>
                {item.itemName}
              </option>
            ))} */}
          </Select>
        </SectionStyled>

        <SectionStyled>
          {/* <DatePicker name="date" label="Number of Desks needed" /> */}
          <Input label="Requested Move In Date" name="date" />
        </SectionStyled>

        <SectionStyled>
          <TextArea
            label="Additional notes"
            name="notes"
            error={errors.description}
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SectionStyled>

        <Button width="100%">SUBMIT INTRODUCTION</Button>

      </WrapperStyled>
    </form>
  )
}

const formik = {
  displayName: 'Partner_WeWorkForm',
  mapPropsToValues: props => {
    const { listing } = props
    if (listing && listing.id) {
      return {
        title: listing.title || '',
        capacity: listing.listingData.capacity || 0,
        size: listing.listingData.size || 0,
        meetingRooms: listing.listingData.meetingRooms || 0,
        isFurnished: listing.listingData.isFurnished || 'false',
        carSpace: listing.listingData.carSpace || 0,
        sizeOfVehicle: listing.listingData.sizeOfVehicle || 'Small',
        maxEntranceHeight: listing.listingData.maxEntranceHeight || 'Not Sure',
        spaceType: listing.listingData.spaceType || 'Covered',
        description: listing.listingData.description || '',
        accessType: listing.listingData.accessType || '',
        amenities: listing.amenities || [],
        photos: listing.photos || [],
        rules: listing.rules || []
      }
    }
    return {}
  },
  mapValuesToPayload: x => x,
  validationSchema: Yup.object().shape({
    title: Yup.string()
      .typeError('Title need to be String')
      .max(25, 'Maximum characters for Title field must be 25'),
    capacity: Yup.number().typeError('Capacity need to be number'),
    size: Yup.number().typeError('Size need to be number'),
    meetingRooms: Yup.number().typeError('Meeting Rooms need to be number'),
    isFurnished: Yup.string().typeError('Furnished field is required'),
    carSpace: Yup.number().typeError('Car Space need to be number'),
    sizeOfVehicle: Yup.string().typeError('Size Of Vehicle field is required'),
    maxEntranceHeight: Yup.string().typeError('Max Entrance Height field is required'),
    spaceType: Yup.string().typeError('Space Type field is required'),
    description: Yup.string().typeError('Description need to be string'),
    accessType: Yup.string()
  }),
  enableReinitialize: true,
  isInitialValid: true
}

FormPartner.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(FormPartner)
