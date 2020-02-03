/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'

import { onGetPhotosByListingId, onGetVideoByListingId } from 'redux/ducks/listing'

import { onUploadPhoto, onSetCoverPhoto, onDeletePhoto } from 'redux/ducks/photo'

import { Title, StepButtons, Loader, Photo, Box, Video } from 'components'

import { cropPicture } from 'utils/images'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 20px;

  @media (max-width: 680px) {
    grid-row-gap: 15px;
  }
`

const SectionStyled = styled.div``

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
  const { array: arrayPhotos, isLoading: isLoadingPhotos } = useSelector(state => state.listing.photos)
  const { object: video, isLoading: isLoadingVideo } = useSelector(state => state.listing.video)

  useEffect(() => {
    dispatch(onGetPhotosByListingId(listing.id))
    dispatch(onGetVideoByListingId(listing.id))
  }, [dispatch, listing.id, listing.listingData, listing.settingsParent.id, listing.settingsParent.subcategory.id])

  useEffect(() => {
    // setFatherValues({ ...values, isValid })
  }, [setFatherValues, values, isValid])

  const _handleOnDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.map(async file => {
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

  return (
    <form>
      <WrapperStyled>
        <Helmet title="Listing Space Specification - Spacenow" />

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
                    key={`photo-${index}`}
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
          <Title type="h3" title="Floor plan*" subtitle="Floor plans help guest imagine the full size of your space." />
          <Box width="196px">
            {isLoadingPhotos ? (
              <Loader />
            ) : (
              <>
                <Photo
                  key="1"
                  onDrop={_handleOnDrop}
                  url={null}
                  // onCover={_handleSetCoverPhoto(item ? item.id : '')}
                  // onDelete={_handleDeletePhoto(item ? item.id : '')}
                />
              </>
            )}
          </Box>
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
        </SectionStyled>
        <StepButtons
          prev={{ disabled: false, onClick: () => props.history.replace('/listing-process/space/357/amenities') }}
          next={{
            // disabled: !(latLng && (latLng.lat || latLng.lng)) || isLoading,
            onClick: () => props.history.push('/listing-process/space/357/price')
            // isLoading
          }}
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
