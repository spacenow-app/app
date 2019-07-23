/* eslint-disable no-console */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { onGetAllRules, onGetAllAccessTypes, onGetAllAmenities, onUpdate } from 'redux/ducks/listing'

import { Title, Input, Checkbox, Select, TextArea, StepButtons, Loader } from 'components'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 80px;
`

const SectionStyled = styled.div``

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 30px;
`

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 40px;
`

const SpecificationTab = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  listing,
  ...props
}) => {
  const dispatch = useDispatch()

  const { array: arrayRules, isLoading: isLoadingRules } = useSelector(state => state.listing.rules)
  const { array: arrayAccessTypes, isLoading: isLoadingAccessTypes } = useSelector(state => state.listing.accessTypes)
  const { array: arrayAmenities, isLoading: isLoadingAmenities } = useSelector(state => state.listing.amenities)

  useEffect(() => {
    dispatch(onGetAllRules())
    dispatch(onGetAllAccessTypes())
    dispatch(onGetAllAmenities(listing.settingsParent.subcategory.id))
  }, [dispatch, listing.settingsParent.subcategory.id])

  const _handleSelectChange = e => {
    const { name, value } = e.target
    setFieldValue(name, value)
  }

  const _handleCheckboxChange = (e, { name, checked }) => {
    const { value } = e.target
    const find = _.find(values[name], item => item.listSettingsId === Number(value))
    if (find) {
      const newArray = _.filter(values[name], item => item.listSettingsId !== Number(value))
      setFieldValue(name, newArray)
      return
    }
    setFieldValue(name, [...values[name], { listSettingsId: Number(value) }])
  }

  const _handleSave = async () => {
    await dispatch(onUpdate(values))
    props.history.push('booking')
  }

  return (
    <form>
      <WrapperStyled>
        <SectionStyled>
          <Title
            type="h3"
            title="Title*"
            subtitle="Your title sets the scene. Make it short, powerful and identify someone’s need for it."
          />
          <Input
            label="Description"
            placeholder="e.g. Car park 100m walk to Central Station"
            name="title"
            error={errors.title}
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SectionStyled>
        <SectionStyled>
          <Title
            type="h3"
            title="Specifications*"
            subtitle="Give users the quick highlights of the space. These are also important search criteria for guests to find their perfect space."
          />
          <InputGroup>
            <Input
              label="Capacity"
              placeholder="Capacity"
              name="capacity"
              error={errors.capacity}
              value={values.capacity}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              label="Size"
              placeholder="Size"
              name="size"
              error={errors.size}
              value={values.size}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              label="Car Space"
              placeholder="Car Space"
              name="carSpace"
              error={errors.carSpace}
              value={values.carSpace}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Select label="Type" value={0} onChange={_handleSelectChange} />
          </InputGroup>
        </SectionStyled>
        <SectionStyled>
          <Title
            type="h3"
            title="About"
            subtitle="Sell ‘em the dream. Start broad, then get specific. Include features and details that make your space special. Don’t forget to mention the light, he ambience, the vibe plus any good transport options. Local food options or other local gems. Be honest, but be persuasive."
          />
          <TextArea
            placeholder="Describe your space"
            name="description"
            error={errors.description}
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SectionStyled>
        <SectionStyled>
          <Title type="h3" title="Amenities" subtitle="What features does your space offer guests?" />
          <CheckboxGroup>
            {isLoadingAmenities ? (
              <Loader />
            ) : (
              arrayAmenities.map(item => {
                return (
                  <Checkbox
                    key={item.id}
                    label={item.itemName}
                    name="amenities"
                    value={item.id}
                    checked={values.amenities.some(amenitie => amenitie.listSettingsId === item.id)}
                    handleCheckboxChange={_handleCheckboxChange}
                  />
                )
              })
            )}
          </CheckboxGroup>
        </SectionStyled>
        <SectionStyled>
          <Title type="h3" title="Space Rules" subtitle="Let guests know about the rules of the space." />
          {}
          <CheckboxGroup>
            {isLoadingRules ? (
              <Loader />
            ) : (
              arrayRules.map(item => {
                return (
                  <Checkbox
                    key={item.id}
                    label={item.itemName}
                    name="rules"
                    value={item.id}
                    checked={values.rules.some(rule => rule.listSettingsId === item.id)}
                    handleCheckboxChange={_handleCheckboxChange}
                  />
                )
              })
            )}
          </CheckboxGroup>
        </SectionStyled>
        <SectionStyled>
          <Title type="h3" title="Access Information*" subtitle="Let your guests know how they’ll get in." />
          <div style={{ width: '350px' }}>
            {isLoadingAccessTypes ? (
              <Loader />
            ) : (
              <Select value={values.accessType} name="accessType" onChange={_handleSelectChange}>
                {arrayAccessTypes.map(item => (
                  <option key={item.id} value={item.itemName}>
                    {item.itemName}
                  </option>
                ))}
              </Select>
            )}
          </div>
        </SectionStyled>
        <SectionStyled>
          <Title
            type="h3"
            title="Photos*"
            subtitle="Photos help guests imagine using your space. You can start with one and add more after you publish."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto auto auto' }}>
            <div style={{ width: '150px', height: '150px', border: '1px solid black' }} />
            <div style={{ width: '150px', height: '150px', border: '1px solid black' }} />
            <div style={{ width: '150px', height: '150px', border: '1px solid black' }} />
            <div style={{ width: '150px', height: '150px', border: '1px solid black' }} />
            <div style={{ width: '150px', height: '150px', border: '1px solid black' }} />
            <div style={{ width: '150px', height: '150px', border: '1px solid black' }} />
          </div>
          <p>
            TIP: Take photos in landscape mode to capture as much of your space as possible. Shoot from corners to add
            perspective. Spaces look best in natural light. Include all areas your guest can access.
          </p>
        </SectionStyled>
        <StepButtons
          prev={{ disabled: false, onClick: () => props.history.goBack() }}
          next={{ onClick: _handleSave }}
        />
      </WrapperStyled>
    </form>
  )
}

const formik = {
  displayName: 'ListingProcess_SpecificationForm',
  mapPropsToValues: props => {
    const { listing } = props
    if (listing && listing.id) {
      return {
        title: listing.title || '',
        capacity: listing.listingData.capacity || 0,
        size: listing.listingData.size || 0,
        carSpace: listing.listingData.carSpace || 0,
        description: listing.listingData.description || '',
        accessType: listing.listingData.accessType || '',
        rules: listing.rules || [],
        amenities: listing.amenities || []
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
    carSpace: Yup.number().typeError('Car Space need to be number'),
    description: Yup.string().typeError('Description need to be string')
  }),
  enableReinitialize: true
}

SpecificationTab.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(SpecificationTab)
