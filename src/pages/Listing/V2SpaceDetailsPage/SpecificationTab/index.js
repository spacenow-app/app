/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { useEffect, useCallback, useState } from 'react'
import Helmet from 'react-helmet'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import _ from 'lodash'
import { useSelector } from 'react-redux'

import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js'

import {
  onGetPhotosByListingId,
  onGetVideoByListingId,
  onGetFloorplanByListingId,
  onGetMenuByListingId,
  onPostV2Media
} from 'redux/ducks/listing'

import {
  onGetCategoryRules,
  onGetCategoryCheckinTypes,
  onGetCategoryAccess,
  onGetCategoryAmenities,
  onGetCategoryFeatures,
  onGetCategorySpecifications,
  onGetCategoryStyles
} from 'redux/ducks/category'

import { onPutObject } from 'redux/ducks/aws'
import { onSetCoverPhoto, onDeletePhoto } from 'redux/ducks/photo'

import { openModal, TypesModal } from 'redux/ducks/modal'

import { Title, Input, Checkbox, Select, WYSIWYGTextArea, StepButtons, Loader, Photo, Box, Video } from 'components'

import { cropPicture } from 'utils/images'

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
  const { object: rules, isLoading: isLoadingRules } = useSelector(state => state.category.rules)
  const { object: amenities, isLoading: isLoadingAmenities } = useSelector(state => state.category.amenities)
  const { object: features, isLoading: isLoadingFeatures } = useSelector(state => state.category.features)
  const { object: access, isLoading: isLoadingAccess } = useSelector(state => state.category.access)
  const { object: checkinTypes, isLoading: isLoadingCheckinTypes } = useSelector(state => state.category.checkinTypes)
  const { object: specifications, isLoading: isLoadingSpecifications } = useSelector(
    state => state.category.specifications
  )
  const { object: styles, isLoading: isLoadingStyles } = useSelector(state => state.category.styles)
  const { object: video, isLoading: isLoadingVideo } = useSelector(state => state.listing.video)
  const { object: floorplan, isLoading: isLoadingFloorplan } = useSelector(state => state.listing.floorplan)
  const { object: menu, isLoading: isLoadingMenu } = useSelector(state => state.listing.menu)
  const { array: arrayPhotos, isLoading: isLoadingPhotos } = useSelector(state => state.listing.photos)
  const { get: awsObject } = useSelector(state => state.aws)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    dispatch(onGetCategorySpecifications(listing.settingsParent.id, listing.listingData))
    dispatch(onGetCategoryAmenities(listing.settingsParent.id))
    dispatch(onGetCategoryRules(listing.settingsParent.id))
    dispatch(onGetCategoryFeatures(listing.settingsParent.id))
    dispatch(onGetCategoryAccess(listing.settingsParent.id))
    dispatch(onGetCategoryCheckinTypes(listing.settingsParent.id))
    dispatch(onGetCategoryStyles(listing.settingsParent.id))
    dispatch(onGetPhotosByListingId(listing.id))
    dispatch(onGetVideoByListingId(listing.id))
    dispatch(onGetFloorplanByListingId(listing.id))
    dispatch(onGetMenuByListingId(listing.id))
  }, [dispatch, listing])

  useEffect(() => {
    setFatherValues({ ...values, isValid })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, isValid])

  useEffect(() => {
    if (awsObject) {
      dispatch(onPostV2Media(listing.id, { category: awsObject.type, name: awsObject.url }))
      dispatch(onGetPhotosByListingId(listing.id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [awsObject.url])

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
      const reader = new FileReader()
      acceptedFiles.map(async file => {
        reader.readAsDataURL(file)
        reader.onload = async (event) => {
          await dispatch(onPutObject(listing.id, { file: event.target.result }, 'photo'))
        }
        await dispatch(onGetPhotosByListingId(listing.id))
      })
    },
    [dispatch, listing.id]
  )

  const _handleOnDropVideo = useCallback(
    acceptedFiles => {
      const reader = new FileReader()
      acceptedFiles.map(async file => {
        reader.readAsDataURL(file)
        reader.onload = async (event) => {
          await dispatch(onPutObject(listing.id, { file: event.target.result }, 'video'))
        }
        await dispatch(onGetVideoByListingId(listing.id))
      })
    },
    [dispatch, listing.id]
  )

  const _handleOnDropFloorplan = useCallback(
    acceptedFiles => {
      const reader = new FileReader()
      acceptedFiles.map(async file => {
        reader.readAsDataURL(file)
        reader.onload = async (event) => {
          await dispatch(onPutObject(listing.id, { file: event.target.result }, 'floorplan'))
        }
        await dispatch(onGetFloorplanByListingId(listing.id))
      })
    },
    [dispatch, listing.id]
  )

  const _handleOnDropMenu = useCallback(
    acceptedFiles => {
      const reader = new FileReader()
      acceptedFiles.map(async file => {
        reader.readAsDataURL(file)
        reader.onload = async (event) => {
          await dispatch(onPutObject(listing.id, { file: event.target.result }, 'menu'))
        }
        await dispatch(onGetMenuByListingId(listing.id))
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

  const _handleDeleteVideo = photoId => async () => {
    await dispatch(onDeletePhoto(listing.id, photoId))
    await dispatch(onGetVideoByListingId(listing.id))
  }

  const _handleDeleteFloorplan = photoId => async () => {
    await dispatch(onDeletePhoto(listing.id, photoId))
    await dispatch(onGetFloorplanByListingId(listing.id))
  }

  const _handleDeleteMenu = photoId => async () => {
    await dispatch(onDeletePhoto(listing.id, photoId))
    await dispatch(onGetMenuByListingId(listing.id))
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
      <Box display="grid" gridGap={{ _: '30px' }}>
        <Helmet title="Listing Space Specification - Spacenow" />
        <Box>
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
        </Box>
        <Box>
          <Title
            type="h3"
            title="Specifications*"
            subtitle="Give users the quick highlights of the space. These are also important search criteria for guests to find their perfect space."
          />
          {isLoadingSpecifications && <Loader />}
          {!isLoadingSpecifications && (
            <Box display="grid" gridTemplateColumns={{ _: 'auto', medium: 'auto auto auto auto' }} gridGap="30px">
              {Object.keys(specifications).map((k, index) => {
                const o = specifications[k]
                return <span key={index}>{_renderSpecifications(o)}</span>
              })}
            </Box>
          )}
        </Box>
        <Box>
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
        </Box>
        <Box>
          <Title type="h3" title="Amenities" subtitle="What features does your space offer guests?" />
          <Box display="grid" gridTemplateColumns={{ _: 'auto auto', medium: 'auto auto auto' }} gridGap="30px">
            {isLoadingAmenities && <Loader />}
            {!isLoadingAmenities &&
              amenities.map((item, index) => (
                <Checkbox
                  key={index}
                  label={item.itemName}
                  name="amenities"
                  value={item.id}
                  checked={values.amenities.some(amenitie => amenitie.listSettingsId === item.id)}
                  handleCheckboxChange={_handleCheckboxChange}
                />
              ))}
          </Box>
        </Box>
        <Box>
          <Title type="h3" title="Space Rules" subtitle="Let guests know about the rules of the space." />
          <Box display="grid" gridTemplateColumns={{ _: 'auto', medium: 'auto auto auto' }} gridGap="30px">
            {isLoadingRules && <Loader />}
            {!isLoadingRules &&
              rules.map((item, index) => (
                <Checkbox
                  key={index}
                  label={item.itemName}
                  name="rules"
                  value={item.id}
                  checked={values.rules.some(rule => rule.listSettingsId === item.id)}
                  handleCheckboxChange={_handleCheckboxChange}
                />
              ))}
          </Box>
        </Box>
        <Box>
          <Title type="h3" title="Features" subtitle="What features does your space offer guests?" />
          <Box display="grid" gridTemplateColumns={{ _: 'auto auto', medium: 'auto auto auto' }} gridGap="30px">
            {isLoadingFeatures && <Loader />}
            {!isLoadingFeatures &&
              features.map((item, index) => (
                <Checkbox
                  key={index}
                  label={item.itemName}
                  name="features"
                  value={item.id}
                  checked={values.features.some(feature => feature.listSettingsId === item.id)}
                  handleCheckboxChange={_handleCheckboxChange}
                />
              ))}
          </Box>
        </Box>
        <Box>
          <Title type="h3" title="Check-In*" subtitle="Let your guests know how they’ll get in." />
          <Box width="350px">
            {isLoadingCheckinTypes && <Loader />}
            {!isLoadingCheckinTypes && (
              <Select value={values.accessType} name="accessType" onChange={_handleSelectChange}>
                {!values.accessType && <option>Select type of checkin</option>}
                {checkinTypes.map(
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
        </Box>
        <Box>
          <Title type="h3" title="Styles*" subtitle="Lorem Ipsum." />
          <Box width="350px">
            {isLoadingStyles && <Loader />}
            {!isLoadingStyles && (
              <Select value={values.listingStyle} name="listingStyle" onChange={_handleSelectChange}>
                {!values.styles && <option>Select type of access</option>}
                {styles.map((item, index) => (
                  <option key={index} value={item.itemName}>
                    {item.itemName}
                  </option>
                ))}
              </Select>
            )}
          </Box>
        </Box>
        <Box>
          <Title type="h3" title="Access" subtitle="What access does your space offer guests?" />
          <Box display="grid" gridTemplateColumns={{ _: 'auto auto', medium: 'auto auto auto' }} gridGap="30px">
            {isLoadingAccess && <Loader />}
            {!isLoadingAccess &&
              access.map((item, index) => (
                <Checkbox
                  key={index}
                  label={item.itemName}
                  name="access"
                  value={item.id}
                  checked={values.access.some(a => a.listSettingsId === item.id)}
                  handleCheckboxChange={_handleCheckboxChange}
                />
              ))}
          </Box>
        </Box>
        <Box>
          <Title
            type="h3"
            title="Photos*"
            subtitle="Photos help guests imagine using your space. You can start with one and add more after you publish."
          />
          <Box display="grid" gridTemplateColumns={{ _: 'repeat(auto-fit, minmax(160px, 1fr))' }} gridGap="20px">
            {isLoadingPhotos && <Loader />}
            {!isLoadingPhotos &&
              arrayPhotos.map((item, index) => (
                <Photo
                  key={index}
                  onDrop={_handleOnDrop}
                  url={item ? cropPicture(item.name) : null}
                  isCover={item ? item.isCover : false}
                  onCover={_handleSetCoverPhoto(item ? item.id : '')}
                  onDelete={_handleDeletePhoto(item ? item.id : '')}
                />
              ))}
          </Box>
          <p>
            TIP: Take photos in landscape mode to capture as much of your space as possible. Shoot from corners to add
            perspective. Spaces look best in natural light. Include all areas your guest can access.
          </p>
        </Box>
        <Box>
          <Title
            type="h3"
            title="Video"
            subtitle="Videos help guests see more of the space and make it easier for them to get a better understanding of it."
          />
          <Box width={160}>
            {isLoadingVideo && <Loader />}
            {!isLoadingVideo && (
              <Video
                onDrop={_handleOnDropVideo}
                url={video ? video.name : null}
                onDelete={_handleDeleteVideo(video ? video.id : '')}
              />
            )}
          </Box>
        </Box>
        <Box>
          <Title
            type="h3"
            title="Floorplan"
            subtitle="Floorplan help guests see more of the space and make it easier for them to get a better understanding of it."
          />
          <Box width={160}>
            {isLoadingFloorplan && <Loader />}
            {!isLoadingFloorplan && (
              <Photo
                showCover={false}
                onDrop={_handleOnDropFloorplan}
                url={floorplan ? floorplan.name : null}
                onDelete={_handleDeleteFloorplan(floorplan ? floorplan.id : '')}
              />
            )}
          </Box>
        </Box>
        <Box>
          <Title
            type="h3"
            title="Menu"
            subtitle="Menu help guests see more of the space and make it easier for them to get a better understanding of it."
          />
          <Box width={160}>
            {isLoadingMenu && <Loader />}
            {!isLoadingMenu && (
              <Photo
                showCover={false}
                onDrop={_handleOnDropMenu}
                url={menu ? menu.name : null}
                onDelete={_handleDeleteMenu(menu ? menu.id : '')}
              />
            )}
          </Box>
        </Box>
        <StepButtons prev={{ onClick: _goBack }} next={{ onClick: () => props.history.push('booking') }} />
      </Box>
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
        listingStyle: listing.listingData.listingStyle || '',
        amenities: listing.amenities || [],
        photos: listing.photos || [],
        rules: listing.rules || [],
        features: listing.features || [],
        access: listing.access || [],
        styles: listing.styles || [],
        checkinTypes: listing.checkinTypes || []
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
    accessType: Yup.string(),
    listingStyle: Yup.string()
  }),
  enableReinitialize: true,
  isInitialValid: true
}

SpecificationTab.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(SpecificationTab)
