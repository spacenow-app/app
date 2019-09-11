import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import {
  Wrapper,
  Title,
  Grid,
  Cell,
  TimeTable,
  Map,
  Tag,
  Box,
  Icon,
  Highlights,
  StepButtons,
  Loader,
  Checkbox,
  Carousel
} from 'components'

import { capitalize, toPlural } from 'utils/strings'

import {
  onGetListingById,
  onGetAllRules,
  onGetAllAmenities,
  onGetAllSpecifications,
  onGetPhotosByListingId,
  onPublish
} from 'redux/ducks/listing'

import { openModal, TypesModal } from 'redux/ducks/modal'

import { config } from 'variables'

import GraphCancelattionImage from 'pages/Listing/SpaceDetailsPage/CancellationTab/graph_cancellation.png'

const ImageStyled = styled.img`
  width: 100%;
`

const PreviewPage = ({ match, location, ...props }) => {
  const dispatch = useDispatch()

  const { object: listing, isLoading: isListingLoading, isNotOwner } = useSelector(state => state.listing.get)
  const { array: arrayRules, isLoading: isLoadingRules } = useSelector(state => state.listing.rules)
  const { array: arrayPhotos } = useSelector(state => state.listing.photos)
  const { object: objectSpecifications } = useSelector(state => state.listing.specifications)
  const { isLoading: isPublishLoading, isPublished } = useSelector(state => state.listing.publishing)
  const { isEmailConfirmed } = useSelector(state => state.auth.user.verification)
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(onGetListingById(match.params.id, user.id))
  }, [dispatch, match.params.id, user])

  useEffect(() => {
    if (listing) {
      dispatch(onGetAllSpecifications(listing.settingsParent.id, listing.listingData))
      dispatch(onGetAllAmenities(listing.settingsParent.subcategory.id))
      dispatch(onGetAllRules())
      dispatch(onGetPhotosByListingId(listing.id))
    }
  }, [dispatch, listing])

  const _getAddress = address => {
    const { address1 = '', city = '', zipcode = '', state = '', country = '' } = address
    const convertedAddress = `${address1 ? `${address1}, ` : ''} ${city ? `${city}, ` : ''} ${
      zipcode ? `${zipcode}, ` : ''
      } ${state ? `${state}, ` : ''} ${country ? `${country}` : ''}`
    return convertedAddress.replace(/\0.*$/g, '')
  }

  const _parseCategoryIconName = (name, isSub) => {
    let prefix = 'category-'
    if (isSub) prefix = 'sub-category-'
    return prefix + name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
  }

  const _changeToPlural = (string, number) => {
    if (!string) {
      return 'No Data'
    }
    if (string === 'daily') {
      return toPlural(capitalize('day'), number)
    }
    return toPlural(capitalize(string.slice(0, -2)), number)
  }

  const _getWeekName = days => {
    const { mon, tue, wed, thu, fri, sat, sun } = days
    if (mon && tue && wed && thu && fri & !sat && !sun) return 'Weekdays'
    if (!mon && !tue && !wed && !thu && !fri & sat && sun) return 'Weekends'
    if (mon && tue && wed && thu && fri & sat && sun) return 'Everyday'
    if (!mon && !tue && !wed && !thu && !fri & !sat && !sun) return 'Closed'
    return 'Custom'
  }

  const _renderHighLights = obj => {
    const array = Object.keys(obj).map(i => obj[i])

    return array.slice(0, 3).map((el, index) => {
      if (el.field === 'capacity') {
        const value = el.value === 0 ? 'Not mentioned' : `${toPlural('Person', el.value)}`
        return (
          <Highlights key={el.field} title={el.label} name={value} icon="specification-capacity" last={index === 2} />
        )
      }
      if (el.field === 'size') {
        const value = el.value === 0 ? 'Not mentioned' : `${el.value} sqm`
        return <Highlights key={el.field} title={el.label} name={value} icon="specification-size" last={index === 2} />
      }
      if (el.field === 'meetingRooms') {
        const value = el.value === 0 ? 'None available' : `${el.value} available`
        return (
          <Highlights
            key={el.field}
            title={el.label}
            name={value}
            icon="specification-meetingroom-quantity"
            last={index === 2}
          />
        )
      }
      if (el.field === 'isFurnished') {
        const value = el.value === 0 ? 'No’' : 'Yes'
        const icon = el.value === 0 ? 'specification-furnished-no' : 'specification-furnished-yes'
        return <Highlights key={el.field} title={el.label} name={value} icon={icon} last={index === 2} />
      }
      if (el.field === 'carSpace') {
        // const value = el.value === 0 ? 'None available’' : `${el.value} available`
        // return <Highlights title={el.label} name={value} icon="category-desk" last={index === 2} />
      }
      if (el.field === 'isFurnished') {
        // const value = el.value === 0 ? 'None available’' : `${el.value} available`
        // return <Highlights title={el.label} name={value} icon="category-desk" last={index === 2} />
      }
      return <Highlights key={el.field} title={el.label} name={el.value} icon="category-desk" last={index === 2} />
    })
  }

  const _handlerPublish = () => {
    if (isEmailConfirmed) {
      dispatch(onPublish(listing.id))
    } else {
      dispatch(
        openModal(TypesModal.MODAL_TYPE_WARN, {
          options: {
            title: '',
            text: 'Before continuing, verify your email address.',
            handlerCallback: true,
            handlerTitle: 'Profile'
          },
          onConfirm: () => {
            window.location.href = `${config.legacy}/dashboard/profile`
          }
        })
      )
    }
  }

  const _convertedArrayPhotos = array => {
    return array.filter(el => el !== undefined).length > 0
      ? array.filter(el => el !== undefined).map(el => ({ source: el.name }))
      : []
  }

  if (isListingLoading || isPublishLoading) {
    return <Loader text="Loading listing preview" />
  }

  if (isPublished) {
    window.location.href = `${config.legacy}/dashboard`
    return null
  }

  if (isNotOwner) {
    dispatch(
      openModal(TypesModal.MODAL_TYPE_WARN, {
        options: {
          title: 'Access denied',
          text: `This space does not belong to the logged in user.`,
          handlerCallback: true,
          handlerTitle: 'OK'
        },
        onConfirm: () => {
          window.location.href = `${config.legacy}/dashboard`
        }
      })
    )
  }

  return (
    <Wrapper>
      <Helmet title="Listing Preview - Spacenow" />
      <Title type="h2" title="Just one more thing, review your space!" />
      <Carousel photos={_convertedArrayPhotos(arrayPhotos)} />
      <Box my="40px">
        <Grid justifyContent="space-between" columnGap="10px" columns={2}>
          <Box display="flex" justifyContent="start">
            <Box>
              <Tag
                icon={
                  <Icon
                    width="24px"
                    name={_parseCategoryIconName(listing.settingsParent.category.otherItemName, false)}
                  />
                }
              >
                {listing.settingsParent.category.itemName}
              </Tag>
            </Box>
            <Box margin="0 10px">
              <Tag
                icon={
                  <Icon
                    width="24px"
                    name={_parseCategoryIconName(listing.settingsParent.subcategory.otherItemName, true)}
                  />
                }
              >
                {listing.settingsParent.subcategory.itemName}
              </Tag>
            </Box>
          </Box>
          <Cell style={{ justifySelf: 'end' }}>
            <Tag>
              {listing.listingData.bookingType ? `${capitalize(listing.listingData.bookingType)} Booking` : 'No data'}
            </Tag>
          </Cell>
        </Grid>
      </Box>
      <Grid columns={5}>
        <Cell width={3}>
          <Title
            type="h3"
            title={listing.title ? listing.title : 'Input Title'}
            color={!listing.title ? '#E05252' : null}
            subtitle={_getAddress(listing.location)}
            subTitleSize={18}
            noMargin
          />
        </Cell>
        <Cell width={2} center>
          <Title
            type="h4"
            title={`${listing.listingData.currency}$ ${Math.round((listing.listingData.basePrice || 0) * 100) / 100} ${
              listing.bookingPeriod
              }`}
            color={listing.listingData.basePrice === 0 || listing.listingData.basePrice === null ? '#E05252' : null}
            noMargin
            right
            style={{ marginTop: '5px' }}
          />
        </Cell>
      </Grid>
      <Box my="100px">
        <Title type="h4" title="Highlights" />
        <Grid columns={5}>
          <Highlights
            title="Minimum term"
            name={_changeToPlural(listing.bookingPeriod, listing.listingData.minTerm)}
            icon="specification-minimum-term"
          />
          <Highlights
            title="Opening Days"
            name={_getWeekName(listing.accessDays)}
            icon="specification-opening-days"
            error={_getWeekName(listing.accessDays) === 'Closed'}
          />
          {objectSpecifications && _renderHighLights(objectSpecifications)}
        </Grid>
      </Box>

      <Box my="100px">
        <Title type="h4" title="Access Information" />
        <Box
          display="grid"
          border="1px solid"
          borderRadius="10px"
          width="110px"
          height="130px"
          justifyContent="center"
          textAlign="center"
          fontFamily="MontSerrat-SemiBold"
          fontSize="14px"
          color={listing.listingData.accessType ? 'quartenary' : 'error'}
          borderColor={listing.listingData.accessType ? 'greyscale.4' : 'error'}
        >
          <Icon
            style={{ alignSelf: 'center', justifySelf: 'center' }}
            width="50px"
            fill={listing.listingData.accessType ? '#6ADC91' : '#E05252'}
            name={
              listing.listingData.accessType &&
              `access-type-${listing.listingData.accessType
                .toLowerCase()
                .split(' ')
                .join('-')}`
            }
          />
          {listing.listingData.accessType ? <>{listing.listingData.accessType}</> : 'No Data'}
        </Box>
      </Box>

      <Box my="100px">
        <Title type="h4" title="Description" color={!listing.listingData.description ? '#E05252' : null} />
        <p>{listing.listingData.description}</p>
      </Box>

      {listing.amenities.length > 0 && (
        <Box my="100px">
          <Title type="h4" title="Amenities" />
          <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridRowGap="40px">
            {listing.amenities.map(item => {
              return (
                <Box key={item.id} display="grid" gridTemplateColumns="auto 1fr" gridColumnGap="20px">
                  <Box width="54px" height="54px" borderRadius="100%" bg="primary">
                    <Icon
                      name={`amenitie-${item.settingsData.otherItemName}`}
                      width="70%"
                      height="100%"
                      style={{ display: 'block', margin: 'auto' }}
                    />
                  </Box>
                  <span style={{ alignSelf: 'center' }}>{item.settingsData.itemName}</span>
                </Box>
              )
            })}
          </Box>
        </Box>
      )}

      {listing.rules.length > 0 && (
        <Box my="100px">
          <Title type="h4" title="Space Rules" />
          <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridRowGap="20px">
            {isLoadingRules ? (
              <Loader />
            ) : (
                arrayRules.map(item => (
                  <Checkbox
                    disabled
                    key={item.id}
                    label={item.itemName}
                    name="rules"
                    value={item.id}
                    checked={listing.rules.some(rule => rule.listSettingsId === item.id)}
                  />
                ))
              )}
          </Box>
        </Box>
      )}

      <Box my="100px">
        <Title
          type="h4"
          title="Availability"
          color={_getWeekName(listing.accessDays) === 'Closed' ? '#E05252' : null}
        />
        <TimeTable data={listing.accessDays.listingAccessHours} error={_getWeekName(listing.accessDays) === 'Closed'} />
      </Box>

      <Box my="100px">
        <Title type="h4" title="Location" />
        <Map position={{ lat: Number(listing.location.lat), lng: Number(listing.location.lng) }} />
      </Box>

      <Grid columns={1}>
        <Cell>
          <Title type="h4" title="Cancellation Policy" />
        </Cell>
        <Cell>
          <Grid columns={12}>
            <Cell width={4}>
              <Title
                noMargin
                type="h4"
                title="No Cancellation"
                subTitleSize={16}
                subtitle="Guest cannot cancel their booking. Note: This may affect the number of bookings received."
              />
            </Cell>
            <Cell width={8}>
              <ImageStyled alt="Cancellation Policy" src={GraphCancelattionImage} />
            </Cell>
          </Grid>
        </Cell>
      </Grid>

      <StepButtons
        prev={{ onClick: () => props.history.push(`/listing/space/${match.params.id}`) }}
        next={{ onClick: () => _handlerPublish(), title: 'Publish' }}
      />
    </Wrapper>
  )
}

PreviewPage.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired
}

export default PreviewPage
