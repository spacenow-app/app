import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';

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
  Button,
  Loader,
  Checkbox,
  Carousel,
  Footer,
  Price
} from 'components'

import { capitalize, toPlural } from 'utils/strings'
import { cropPicture } from 'utils/images'

import {
  onGetPhotosByListingId,
  onGetVideoByListingId,
  onGetFloorplanByListingId,
  onGetMenuByListingId,
  onGetListingById,
  onPublish
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

import { openModal, TypesModal } from 'redux/ducks/modal'

const CellStyled = styled(Cell)`
  @media (max-width: 680px) {
    grid-column-end: span 12;
  }
`

const CellDesktop = styled(Cell)`
  @media (max-width: 680px) {
    display: none;
  }
`

const PreviewPage = ({ match, location, ...props }) => {
  const dispatch = useDispatch()

  const { object: listing, isLoading: isListingLoading, isNotOwner } = useSelector(state => state.listing.get)
  const { object: rules, isLoading: isLoadingRules } = useSelector(state => state.category.rules)
  const { object: features, isLoading: isLoadingFeatures } = useSelector(state => state.category.features)
  const { array: arrayPhotos } = useSelector(state => state.listing.photos)
  const { object: floorplan, isLoading: isLoadingFloorPlan } = useSelector(state => state.listing.floorplan)
  const { object: menu, isLoading: isLoadingMenu } = useSelector(state => state.listing.menu)
  const { object: specifications } = useSelector(state => state.category.specifications)
  const { isLoading: isPublishLoading, isPublished } = useSelector(state => state.listing.publishing)
  const {
    user,
    user: {
      verification: { isEmailConfirmed }
    }
  } = useSelector(state => state.account.get)

  const [imageHeight, setImageHeight] = useState(500)

  useEffect(() => {
    dispatch(onGetListingById(match.params.id, user.id))
  }, [dispatch, match.params.id, user])

  useEffect(() => {
    if (listing) {
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

      // dispatch(onGetAllSpecifications(listing.settingsParent.id, listing.listingData))
      // dispatch(onGetAllAmenities(listing.settingsParent.subcategory.id))
      // dispatch(onGetAllRules())
      // dispatch(onGetPhotosByListingId(listing.id))
    }
  }, [dispatch, listing])

  useEffect(() => {
    if (window.innerWidth <= 991) {
      setImageHeight(325)
    }
  }, [])

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
            window.location.href = `/account/profile`
          }
        })
      )
    }
  }

  const _handlerSaveContinue = () => {
    window.location.href = `/account/listing`
  }

  const _convertedArrayPhotos = array => {
    return array.filter(el => el !== undefined).length > 0
      ? array.filter(el => el !== undefined).map(el => ({ source: cropPicture(el.name) }))
      : []
  }

  if (isListingLoading || isPublishLoading) {
    return <Loader text="Loading listing preview" />
  }

  if (isPublished) {
    window.location.href = `/account/listing`
    return null
  }

  if (isNotOwner && user.role !== "admin") {
    dispatch(
      openModal(TypesModal.MODAL_TYPE_WARN, {
        options: {
          title: 'Access denied',
          text: `This space does not belong to the logged in user.`,
          handlerCallback: true,
          handlerTitle: 'OK'
        },
        onConfirm: () => {
          window.location.href = `/account/listing`
        }
      })
    )
  }

  const _formatDescription = (description) => {
    try {
      return stateToHTML(convertFromRaw(JSON.parse(description)))
    } catch {
      return description
    }
  }

  const _handlerFloorplan = () => { }

  return (
    <>
      <Wrapper>
        <Helmet title="Listing Preview - Spacenow" />
        <Title type="h2" title="Just one more thing, review your space!" />
        <Carousel photos={_convertedArrayPhotos(arrayPhotos)} height={imageHeight} />
        <Box my="15px" display="grid" gridTemplateColumns={{ _: '1fr', medium: '2fr 1fr' }} gridGap="20px">
          <Box display="grid" gridGap={{ _: '30px' }}>
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
              {listing.settingsParent.subcategory !== null &&
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
              }
            </Box>
          </Box>
          {listing.listingData.bookingType !== 'poa' && (
            <Box display="grid" justifySelf={{ _: 'start', medium: 'end' }}>
              <Tag>
                {listing.listingData.bookingType ? `${capitalize(listing.listingData.bookingType)} Booking` : 'No data'}
              </Tag>
            </Box>
          )}
        </Box>
        <Box my="30px" display="grid" gridTemplateColumns={{ _: '1fr', medium: '2fr 1fr' }} gridGap="20px">
          <Title
            type="h3"
            title={listing.title ? listing.title : 'Input Title'}
            color={!listing.title ? '#E05252' : null}
            subtitle={_getAddress(listing.location)}
            subTitleSize={18}
            noMargin
          />
          <Price
            currency={listing.listingData.currency}
            price={listing.listingData.basePrice}
            currencySymbol="$"
            bookingPeriod={listing.bookingPeriod}
            bookingType={listing.listingData.bookingType}
            size="28px"
            right
            color={
              (listing.listingData.basePrice === 0 || listing.listingData.basePrice === null) &&
                listing.listingData.bookingType !== 'poa'
                ? '#E05252'
                : null
            }
          />
        </Box>

        <Box my="30px" display="grid" gridTemplateColumns={{ _: '1fr', medium: '1fr' }}>
          <Title type="h4" title="Highlights" />
          <Box display="grid" gridGap="20px" gridTemplateColumns="repeat(auto-fit, minmax(120px, max-content))">
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
            {specifications && _renderHighLights(specifications)}
          </Box>
        </Box>

        <Box my="50px">
          <Title
            type="h4"
            title="Check-In"
            subtitle="How you’ll gain access to this space. Your host will provide the following upon successful bookings:"
          />
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
            borderColor={listing.listingData.accessType ? '#c4c4c4' : 'error'}
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

        <Box my="50px">
          <Title type="h4" title="Description" color={!listing.listingData.description ? '#E05252' : null} />
          <div dangerouslySetInnerHTML={{ __html: _formatDescription(listing.listingData.description) }} />
        </Box>


        {(Object.keys(floorplan).length || Object.keys(menu).length) && (
          <Box display="grid" gridAutoFlow="column" gridAutoColumns="max-content" my="50px" gridGap="30px">
            {Object.keys(floorplan).length && floorplan.id && <Button outline onClick={() => _handlerFloorplan()} width="200px" icon={<Icon
              width="18px"
              height="18px"
              name="feature-wood-floors"
              style={{ marginRight: "10px" }}
            />}>
              Floorplan
            </Button>}
            {Object.keys(menu).length && menu.id && <Button outline onClick={() => _handlerFloorplan()} width="200px" icon={<Icon
              width="18px"
              height="18px"
              name="floor-plan"
              style={{ marginRight: "10px" }}
            />}>
              Menu
            </Button>}
          </Box>
        )}

        {listing.activities.length > 0 && (
          <Box my="50px">
            <Title type="h4" title="Activities" />
            <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: '1fr 1fr 1fr' }} gridRowGap="20px">
              {listing.activities.map((item, index) => {
                return (
                  <Box key={index} display="grid" gridTemplateColumns="auto 1fr" gridColumnGap="20px">
                    <Box display="grid" width="54px" height="54px" borderRadius="100%" bg="primary" alignContent="center">
                      <Icon
                        name={`${listing.settingsParent.category.otherItemName}-activity-${item.settingsData.otherItemName}`}
                        width="30px"
                        height="30px"
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

        {listing.amenities.length > 0 && (
          <Box my="50px">
            <Title type="h4" title="Amenities" />
            <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: '1fr 1fr 1fr' }} gridRowGap="20px">
              {listing.amenities.map((item, index) => {
                return (
                  <Box key={index} display="grid" gridTemplateColumns="auto 1fr" gridColumnGap="20px">
                    <Box display="grid" width="54px" height="54px" borderRadius="100%" bg="primary" alignContent="center">
                      <Icon
                        name={`amenitie-${item.settingsData.otherItemName}`}
                        width="30px"
                        height="30px"
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
          <Box my="50px">
            <Title type="h4" title="Space Rules" />
            <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: '1fr 1fr 1fr' }} gridRowGap="20px">
              {listing.rules.map((item, index) => {
                return (
                  <Box key={index} display="grid" gridTemplateColumns="auto 1fr" gridColumnGap="20px">
                    <Box display="grid" width="54px" height="54px" borderRadius="100%" bg="primary" alignContent="center">
                      <Icon
                        name={`rule-${item.settingsData.otherItemName}`}
                        width="30px"
                        height="30px"
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

        {listing.features.length > 0 && (
          <Box my="50px">
            <Title type="h4" title="Space Features" />
            <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: '1fr 1fr 1fr' }} gridRowGap="20px">
              {listing.features.map((item, index) => {
                return (
                  <Box key={index} display="grid" gridTemplateColumns="auto 1fr" gridColumnGap="20px">
                    <Box display="grid" width="54px" height="54px" borderRadius="100%" bg="primary" alignContent="center">
                      <Icon
                        name={`feature-${item.settingsData.otherItemName}`}
                        width="30px"
                        height="30px"
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

        <Box my="50px">
          <Title
            type="h4"
            title="Availability"
            color={_getWeekName(listing.accessDays) === 'Closed' ? '#E05252' : null}
          />
          <TimeTable
            data={listing.accessDays.listingAccessHours}
            error={_getWeekName(listing.accessDays) === 'Closed'}
          />
        </Box>

        <Box mt="50px">
          <Title type="h4" title="Location" />
          <Map position={{ lat: Number(listing.location.lat), lng: Number(listing.location.lng) }} />
        </Box>

        <Grid columns={12}>
          <CellStyled width={2}>
            <Button fluid outline onClick={() => props.history.push(`/listing/space/${match.params.id}/availability`)}>
              {`Previous Step`}
            </Button>
          </CellStyled>
          <CellDesktop width={6} />
          <CellStyled width={2}>
            <Button fluid outline onClick={() => _handlerSaveContinue()} disabled={!listing.isReady}>
              {`Save & Continue`}
            </Button>
          </CellStyled>
          <CellStyled width={2}>
            <Button fluid onClick={() => _handlerPublish()} disabled={!listing.isReady}>
              {`Publish`}
            </Button>
          </CellStyled>
        </Grid>

        <Footer />
      </Wrapper>
    </>
  )
}

PreviewPage.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired
}

export default PreviewPage
