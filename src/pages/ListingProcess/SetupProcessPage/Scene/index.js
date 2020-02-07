/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'

import { onUploadPhoto, onSetCoverPhoto, onDeletePhoto } from 'redux/ducks/photo'

import { Box, Wrapper, Title, StepButtons, Loader, Photo, Video } from 'components'

import { cropPicture } from 'utils/images'

const PhotosGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-column-gap: 30px;
`

const ScenePage = ({
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
  // const { array: arrayPhotos, isLoading: isLoadingPhotos } = useSelector(state => state.listing.photos)
  // const { object: video, isLoading: isLoadingVideo } = useSelector(state => state.listing.video)

  // useEffect(() => {
  //   dispatch(onGetPhotosByListingId(listing.id))
  //   dispatch(onGetVideoByListingId(listing.id))
  // }, [dispatch, listing.id, listing.listingData, listing.settingsParent.id, listing.settingsParent.subcategory.id])

  useEffect(() => {
    // setFatherValues({ ...values, isValid })
  }, [setFatherValues, values, isValid])

  const _handleOnDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.map(async file => {
        await dispatch(onUploadPhoto(file, listing.id))
        // await dispatch(onGetPhotosByListingId(listing.id))
      })
    },
    [dispatch, listing.id]
  )

  const _handleSetCoverPhoto = photoId => async () => {
    await dispatch(onSetCoverPhoto(listing.id, photoId))
    // await dispatch(onGetPhotosByListingId(listing.id))
  }

  const _handleDeletePhoto = photoId => async () => {
    await dispatch(onDeletePhoto(listing.id, photoId))
    // await dispatch(onGetPhotosByListingId(listing.id))
  }

  const _handleOnDropVideo = useCallback(
    acceptedFiles => {
      acceptedFiles.map(async file => {
        await dispatch(onUploadPhoto(file, listing.id))
        // await dispatch(onGetVideoByListingId(listing.id))
      })
    },
    [dispatch, listing.id]
  )

  const _handleDeleteVideo = photoId => async () => {
    await dispatch(onDeletePhoto(listing.id, photoId))
    // await dispatch(onGetVideoByListingId(listing.id))
  }

  return (
    <Wrapper>
      <Helmet title="Listing Space Specification - Spacenow" />

      <Box>
        <Title
          type="h3"
          title="Photos*"
          subtitle="Photos help guests imagine using your space. You can start with one and add more after you publish."
        />
        <Box display="grid" gridTemplateColumns={{ _: 'repeat(auto-fit, minmax(160px, 1fr))' }} gridGap="20px">
          {[...Array(6 - listing.photos.length).concat(listing.photos)].map((photo, index) => (
            <Photo
              key={`photo-${index}`}
              onDrop={_handleOnDrop}
              url={photo ? cropPicture(photo.name) : null}
              isCover={photo ? photo.isCover : false}
              onCover={_handleSetCoverPhoto(photo ? photo.id : '')}
              onDelete={_handleDeletePhoto(photo ? photo.id : '')}
            />
          ))}
        </Box>
        <p>
          TIP: Take photos in landscape mode to capture as much of your space as possible. Shoot from corners to add
          perspective. Spaces look best in natural light. Include all areas your guest can access.
        </p>
      </Box>
      <Box>
        <Title type="h3" title="Floor plan*" subtitle="Floor plans help guest imagine the full size of your space." />
        <Box width={160}>
          <Photo
            key="1"
            onDrop={_handleOnDrop}
            url={null}
            onCover={_handleSetCoverPhoto(listing.floorPlan ? listing.floorPlan.id : '')}
            onDelete={_handleDeletePhoto(listing.floorPlan ? listing.floorPlan.id : '')}
          />
        </Box>
      </Box>
      <Box>
        <Title
          type="h3"
          title="Video*"
          subtitle="Videos help guests see more of the space and make it easier for them to get a better understanding of it."
        />
        <Box width={160}>
          <Video
            onDrop={_handleOnDropVideo}
            url={listing.video ? listing.video.name : null}
            onDelete={_handleDeleteVideo(listing.video ? listing.video.id : '')}
          />
        </Box>
      </Box>
      <StepButtons
        prev={{
          disabled: false,
          onClick: () => props.history.push(`/listing-process/setup-process/${listing.id}/details`)
        }}
        next={{
          // disabled: !(latLng && (latLng.lat || latLng.lng)) || isLoading,
          onClick: () => props.history.push(`/listing-process/setup-process/${listing.id}/pricing`)
          // isLoading
        }}
      />
    </Wrapper>
  )
}

// const formik = {
//   displayName: 'ListingProcess_SpecificationForm',
//   mapPropsToValues: props => {
//     const { listing } = props
//     if (listing && listing.id) {
//       return {
//         title: listing.title || '',
//         capacity: listing.listingData.capacity || 0,
//         size: listing.listingData.size || 0,
//         meetingRooms: listing.listingData.meetingRooms || 0,
//         isFurnished: listing.listingData.isFurnished || 'false',
//         carSpace: listing.listingData.carSpace || 0,
//         sizeOfVehicle: listing.listingData.sizeOfVehicle || 'Small',
//         maxEntranceHeight: listing.listingData.maxEntranceHeight || 'Not Sure',
//         spaceType: listing.listingData.spaceType || 'Covered',
//         description: listing.listingData.description || '',
//         accessType: listing.listingData.accessType || '',
//         amenities: listing.amenities || [],
//         photos: listing.photos || [],
//         rules: listing.rules || []
//       }
//     }
//     return {}
//   },
//   mapValuesToPayload: x => x,
//   validationSchema: Yup.object().shape({
//     title: Yup.string()
//       .typeError('Title need to be String')
//       .max(100, 'Maximum characters for Title field must be 100'),
//     capacity: Yup.number().typeError('Capacity need to be number'),
//     size: Yup.number().typeError('Size need to be number'),
//     meetingRooms: Yup.number().typeError('Meeting Rooms need to be number'),
//     isFurnished: Yup.string().typeError('Furnished field is required'),
//     carSpace: Yup.number().typeError('Car Space need to be number'),
//     sizeOfVehicle: Yup.string().typeError('Size Of Vehicle field is required'),
//     maxEntranceHeight: Yup.string().typeError('Max Entrance Height field is required'),
//     spaceType: Yup.string().typeError('Space Type field is required'),
//     description: Yup.string().typeError('Description need to be string'),
//     accessType: Yup.string()
//   }),
//   enableReinitialize: true,
//   isInitialValid: true
// }

// ScenePage.propTypes = {
//   ...withFormik.propTypes
// }

export default ScenePage //withFormik(formik)(ScenePage)
