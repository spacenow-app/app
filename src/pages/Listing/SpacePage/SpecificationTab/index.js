/* eslint-disable no-console */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import {
  onGetAllRules,
  onGetAllAccessTypes,
  onGetAllAmenities,
  onGetAllSpecifications,
  onUpdate
} from 'redux/ducks/listing'

import { Title, Input, Checkbox, Select, TextArea, StepButtons, Loader, Box } from 'components'

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
  const { object: objectSpecifications, isLoading: isLoadingSpecifications } = useSelector(state => state.listing.specifications)

  useEffect(() => {
    dispatch(onGetAllSpecifications(listing.settingsParent.id, listing.listingData))
    dispatch(onGetAllAmenities(listing.settingsParent.subcategory.id))
    dispatch(onGetAllRules())
    dispatch(onGetAllAccessTypes())
  }, [dispatch, listing.listingData, listing.settingsParent.id, listing.settingsParent.subcategory.id])

  const _handleSelectChange = e => {
    const { name, value } = e.target
    setFieldValue(name, value)
  }

  const _handleCheckboxChange = (e, { name }) => {
    const { value } = e.target
    const find = _.find(values[name], item => item.listSettingsId === Number(value))
    if (find) {
      const newArray = _.filter(values[name], item => item.listSettingsId !== Number(value))
      setFieldValue(name, newArray)
      return
    }
    setFieldValue(name, [...values[name], { listSettingsId: Number(value) }])
  }

  const _renderSpecifications = o => {
    let component
    if (o.type) {
      switch (o.type) {
        case 'Integer': {
          component = (
            <Input
              type="number"
              name={o.field}
              label={o.label}
              value={values[o.field]}
              min={o.min}
              max={o.max}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )
          break
        }
        case 'Boolean': {
          component = (
            <Select
              name={o.field}
              label={o.label}
              value={values[o.field].toString()}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option defaultValue={values[o.field]} value="true">
                Yes
              </option>
              <option defaultValue={!values[o.field]} value="false">
                No
              </option>
            </Select>
          )
          break
        }
        case 'String': {
          if (o.select) {
            component = (
              <Select
                name={o.field}
                label={o.label}
                value={values[o.field]}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {o.values.map(e => (
                  <option key={`elem-${e}`} value={e}>
                    {e}
                  </option>
                ))}
              </Select>
            )
          } else {
            component = (
              <Input
                type="text"
                name={o.field}
                label={o.label}
                value={values[o.field]}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            )
          }
          break
        }
        default: {
          component = (
            <input
              type="text"
              label={o.label}
              placeholder={o.label}
              name={o.field}
              value={values[o.field]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )
        }
      }
    } else {
      component = (
        <Input
          type="text"
          name={o.field}
          label={o.label}
          value={values[o.field]}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      )
    }
    return component
  }

  const _handleSave = async () => {
    await dispatch(onUpdate(listing, values))
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
          {isLoadingSpecifications ? (
            <Loader />
          ) : (
            <InputGroup>
              {Object.keys(objectSpecifications).map(k => {
                const o = objectSpecifications[k]
                return <span key={o.field}>{_renderSpecifications(o)}</span>
              })}
            </InputGroup>
          )}
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
          <Box width="350px">
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
          </Box>
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
        meetingRooms: listing.listingData.meetingRooms || 0,
        isFurnished: listing.listingData.isFurnished || 'false',
        carSpace: listing.listingData.carSpace || 0,
        sizeOfVehicle: listing.listingData.sizeOfVehicle || 'Small',
        maxEntranceHeight: listing.listingData.maxEntranceHeight || 'Not Sure',
        spaceType: listing.listingData.spaceType || 'Covered',
        description: listing.listingData.description || '',
        accessType: listing.listingData.accessType || '',
        amenities: listing.amenities || [],
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
    description: Yup.string().typeError('Description need to be string')
  }),
  enableReinitialize: true
}

SpecificationTab.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(SpecificationTab)
