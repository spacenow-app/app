/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { useEffect, useCallback, useState, Fragment } from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import _ from 'lodash'
import { useSelector } from 'react-redux'

import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js'

import {
  onGetAllRules,
  onGetAllAccessTypes,
  onGetAllAmenities,
  onGetAllSpecifications,
  onGetPhotosByListingId,
  onGetVideoByListingId
} from 'redux/ducks/listing'

import { onUploadPhoto, onSetCoverPhoto, onDeletePhoto } from 'redux/ducks/photo'

import { openModal, TypesModal } from 'redux/ducks/modal'

import { Title, Input, Checkbox, Select, WYSIWYGTextArea, StepButtons, Loader, Photo, Box, Video } from 'components'

import { cropPicture } from 'utils/images'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 80px;

  @media (max-width: 680px) {
    grid-row-gap: 20px;
  }
`

const SectionStyled = styled.div``

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 30px;
  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
  @media (max-width: 680px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
`

const CheckboxGroupRules = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
`

const PhotosGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-column-gap: 30px;
`

const SpecificationTab = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
  listing,
  validateForm,
  dispatch,
  setFatherValues,
  isValid,
  ...props
}) => {
  const { array: arrayRules, isLoading: isLoadingRules } = useSelector(state => state.listing.rules)
  const { array: arrayAccessTypes, isLoading: isLoadingAccessTypes } = useSelector(state => state.listing.accessTypes)
  const { array: arrayAmenities, isLoading: isLoadingAmenities } = useSelector(state => state.listing.amenities)
  const { array: arrayPhotos, isLoading: isLoadingPhotos } = useSelector(state => state.listing.photos)
  const { object: video, isLoading: isLoadingVideo } = useSelector(state => state.listing.video)
  const { object: objectSpecifications, isLoading: isLoadingSpecifications } = useSelector(
    state => state.listing.specifications
  )
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    dispatch(onGetAllSpecifications(listing.settingsParent.id, listing.listingData))
    dispatch(onGetAllAmenities(listing.settingsParent.subcategory.id))
    dispatch(onGetAllRules())
    dispatch(onGetAllAccessTypes())
    dispatch(onGetPhotosByListingId(listing.id))
    dispatch(onGetVideoByListingId(listing.id))
  }, [dispatch, listing])

  useEffect(() => {
    setFatherValues({ ...values, isValid })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, isValid])

  useEffect(() => {
    try {
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(values.description))))
    } catch (err) {
      setEditorState(EditorState.createWithContent(ContentState.createFromText(values.description)))
    }
  }, [values.description])

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
              placeholder={0}
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
                {o.values.map((e, index) => (
                  <option key={index} value={e}>
                    {e}
                  </option>
                ))}
              </Select>
            )
          } else {
            component = (
              <Input
                type="number"
                placeholder={0}
                min="0"
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
              type="number"
              min="0"
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
          type="number"
          min="0"
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

  const _handleChangeTitle = e => {
    const { name, value } = e.target
    setFieldValue(name, value.substring(0, 100))
  }

  const _handleWYSIWYGBlur = () => {
    const description = convertToRaw(editorState.getCurrentContent())
    setFieldValue('description', JSON.stringify(description))
  }

  const _handleOnDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.map(async file => {
        // await dispatch(onUploadPhoto(file, 'photo', listing.id))
        await dispatch(onUploadPhoto(file, listing.id))
        await dispatch(onGetPhotosByListingId(listing.id))
      })
    },
    [dispatch, listing.id]
  )

  const _handleSetCoverPhoto = photoId => async () => {
    await dispatch(onSetCoverPhoto(listing.id, photoId))
    await dispatch(onGetPhotosByListingId(listing.id))
  }

  const _handleDeletePhoto = photoId => async () => {
    await dispatch(onDeletePhoto(listing.id, photoId))
    await dispatch(onGetPhotosByListingId(listing.id))
  }

  const _handleOnDropVideo = useCallback(
    acceptedFiles => {
      acceptedFiles.map(async file => {
        // await dispatch(onUploadPhoto(file, 'video', listing.id))
        await dispatch(onUploadPhoto(file, listing.id))
        await dispatch(onGetVideoByListingId(listing.id))
      })
    },
    [dispatch, listing.id]
  )

  const _handleDeleteVideo = photoId => async () => {
    await dispatch(onDeletePhoto(listing.id, photoId))
    await dispatch(onGetVideoByListingId(listing.id))
  }

  const _goBack = () => {
    const options = {
      options: {
        title: 'Confirm',
        text: 'Are you sure you want to return to the category page? If yes, all space details will be lost.'
      },
      onConfirm: () => {
        props.history.replace('/listing/category')
        // TODO: call action to delete
      }
    }
    dispatch(openModal(TypesModal.MODAL_TYPE_CONFIRM, options))
  }

  return (
    <form>
      <WrapperStyled>
        <Helmet title="Listing Space Specification - Spacenow" />
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
            onChange={_handleChangeTitle}
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
              {Object.keys(objectSpecifications).map((k, index) => {
                const o = objectSpecifications[k]
                return <span key={index}>{_renderSpecifications(o)}</span>
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
          <WYSIWYGTextArea
            placeholder="Describe your space"
            editorState={editorState}
            onEditorStateChange={editor => {
              setEditorState(editor)
            }}
            onBlur={_handleWYSIWYGBlur}
          />
        </SectionStyled>
        <SectionStyled>
          <Title type="h3" title="Amenities" subtitle="What features does your space offer guests?" />
          <CheckboxGroup>
            {isLoadingAmenities && <Loader />}
            {!isLoadingAmenities &&
              arrayAmenities.map((item, index) =>
                listing.settingsParent.subcategory.otherItemName === 'popup' ? (
                  <Fragment key={index}>
                    {' '}
                    {item.otherItemName !== 'mailbox' && (
                      <Checkbox
                        label={item.itemName}
                        name="amenities"
                        value={item.id}
                        checked={values.amenities.some(amenitie => amenitie.listSettingsId === item.id)}
                        handleCheckboxChange={_handleCheckboxChange}
                      />
                    )}
                  </Fragment>
                ) : (
                  <Checkbox
                    key={index}
                    label={item.itemName}
                    name="amenities"
                    value={item.id}
                    checked={values.amenities.some(amenitie => amenitie.listSettingsId === item.id)}
                    handleCheckboxChange={_handleCheckboxChange}
                  />
                )
              )}
          </CheckboxGroup>
        </SectionStyled>
        <SectionStyled>
          <Title type="h3" title="Space Rules" subtitle="Let guests know about the rules of the space." />
          <CheckboxGroupRules>
            {isLoadingRules ? (
              <Loader />
            ) : (
              arrayRules.map((item, index) => (
                <Checkbox
                  key={index}
                  label={item.itemName}
                  name="rules"
                  value={item.id}
                  checked={values.rules.some(rule => rule.listSettingsId === item.id)}
                  handleCheckboxChange={_handleCheckboxChange}
                />
              ))
            )}
          </CheckboxGroupRules>
        </SectionStyled>
        <SectionStyled>
          <Title type="h3" title="Access Information*" subtitle="Let your guests know how they’ll get in." />
          <Box width="350px">
            {isLoadingAccessTypes ? (
              <Loader />
            ) : (
              <Select value={values.accessType} name="accessType" onChange={_handleSelectChange}>
                {!values.accessType && <option>Select type of access</option>}
                {arrayAccessTypes.map(
                  (item, index) =>
                    item.itemName !== 'Receptionist' && (
                      <option key={index} value={item.itemName}>
                        {item.itemName === 'Person' ? `${item.itemName} at reception` : item.itemName}
                      </option>
                    )
                )}
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
          <PhotosGroup>
            {isLoadingPhotos ? (
              <Loader />
            ) : (
              <>
                {arrayPhotos.map((item, index) => (
                  <Photo
                    key={index}
                    onDrop={_handleOnDrop}
                    url={item ? cropPicture(item.name) : null}
                    isCover={item ? item.isCover : false}
                    onCover={_handleSetCoverPhoto(item ? item.id : '')}
                    onDelete={_handleDeletePhoto(item ? item.id : '')}
                  />
                ))}
              </>
            )}
          </PhotosGroup>
          <p>
            TIP: Take photos in landscape mode to capture as much of your space as possible. Shoot from corners to add
            perspective. Spaces look best in natural light. Include all areas your guest can access.
          </p>
        </SectionStyled>
        <SectionStyled>
          <Title
            type="h3"
            title="Video*"
            subtitle="Videos help guests see more of the space and make it easier for them to get a better understanding of it."
          />
          <Box width="196px">
            {isLoadingVideo ? (
              <Loader />
            ) : (
              <>
                <Video
                  onDrop={_handleOnDropVideo}
                  url={video ? video.name : null}
                  onDelete={_handleDeleteVideo(video ? video.id : '')}
                />
              </>
            )}
          </Box>
          {/* <p>
            TIP: Take photos in landscape mode to capture as much of your space as possible. Shoot from corners to add
            perspective. Spaces look best in natural light. Include all areas your guest can access.
          </p> */}
        </SectionStyled>
        <StepButtons prev={{ onClick: _goBack }} next={{ onClick: () => props.history.push('booking') }} />
        {/* <StepButtons prev={{ onClick: _goBack }} next={{ onClick: () => console.log(convertToRaw(editorState.getCurrentContent())) }} /> */}
      </WrapperStyled>
    </form>
  )
}

const formik = {
  displayName: 'ListingProcess_SpecificationForm',
  mapPropsToValues: ({ listing }) => {
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
      .max(100, 'Maximum characters for Title field must be 100'),
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

SpecificationTab.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(SpecificationTab)
