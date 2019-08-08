import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
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
  Loader,
  Carousel,
  UserDetails,
  BookingCard
} from 'components'
import FormPartner from './FormPartner'

import {
  onGetListingById,
  onGetAllRules,
  onGetAllAmenities,
  onGetAllSpecifications,
  onGetPhotosByListingId,
} from 'redux/ducks/listing'

import { config } from 'contants'


const PartnerPage = ({ match, location, ...props }) => {
  const dispatch = useDispatch()

  const { object: listing, isLoading: isListingLoading } = useSelector(state => state.listing.get)
  // const { array: arrayRules, isLoading: isLoadingRules } = useSelector(state => state.listing.rules)
  const { array: arrayPhotos } = useSelector(state => state.listing.photos)
  // const { object: objectSpecifications } = useSelector(state => state.listing.specifications)
  const { isLoading: isPublishLoading, isPublished } = useSelector(state => state.listing.publishing)
  // const { isEmailConfirmed } = useSelector(state => state.auth.user.verification)
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

  const _getWeekName = days => {
    const { mon, tue, wed, thu, fri, sat, sun } = days
    if (mon && tue && wed && thu && fri & !sat && !sun) return 'Weekdays'
    if (!mon && !tue && !wed && !thu && !fri & sat && sun) return 'Weekends'
    if (mon && tue && wed && thu && fri & sat && sun) return 'Everyday'
    if (!mon && !tue && !wed && !thu && !fri & !sat && !sun) return 'Closed'
    return 'Custom'
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

  return (
    <Wrapper>
      <Helmet title="View Listing - Spacenow" />
      <Box display="grid" gridTemplateColumns="1fr 380px" gridColumnGap="15px" my="80px">
        <Box display="grid" gridRowGap="50px">

          <Carousel photos={_convertedArrayPhotos(arrayPhotos)} />

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
              <UserDetails hostname="WeWork AU" />
            </Cell>
          </Grid>

          <Grid columns={5}>
            <Cell width={3}>
              <Title
                type="h4"
                title={listing.title ? listing.title : 'Input Title'}
                color={!listing.title ? '#E05252' : null}
                subtitle={_getAddress(listing.location)}
                subTitleSize={18}
                subTitleMargin={20}
                noMargin
              />
            </Cell>
            <Cell width={2} center>
              <Title
                type="h4"
                title={`$ ${Math.round((listing.listingData.basePrice || 0) * 100) / 100} ${
                  listing.bookingPeriod
                }`}
                color={listing.listingData.basePrice === 0 || listing.listingData.basePrice === null ? '#E05252' : null}
                noMargin
                right
                style={{ marginTop: '5px' }}
              />
            </Cell>
          </Grid>

          <Box mt="25px">
            <Title type="h5" title="Highlights" noMargin />
            <Grid columns={5}>
              <Highlights
                title="Opening Days"
                name={_getWeekName(listing.accessDays)}
                icon="specification-opening-days"
                error={_getWeekName(listing.accessDays) === 'Closed'}
              />
            </Grid>
          </Box>
              
          <Box mt="25px">
            <Title type="h5" title="Access Type" noMargin/>
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

          {
            listing.listingData.description ? 
              <Box mt="25px">
                <Title type="h5" title="Description" noMargin />
                <p>{listing.listingData.description}</p>
              </Box> : null
          }
          {
            listing.amenities.length > 0 && (
              <Box mt="25px">
                <Title type="h5" title="Amenities" noMargin />
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
          <Box mt="25px">
            <Title
              type="h5"
              title="Availability"
              color={_getWeekName(listing.accessDays) === 'Closed' ? '#E05252' : null}
              noMargin
            />
            <TimeTable data={listing.accessDays.listingAccessHours} error={_getWeekName(listing.accessDays) === 'Closed'} />
          </Box>
        </Box>
        <Box>
          <BookingCard
            titleComponent={<Title type="h5" title={listing.title} subtitle={_getAddress(listing.location)} subTitleMargin={10} noMargin/>}
            contentComponent={
              <FormPartner
                {...props}
                listing={listing}
                dispatch={dispatch}
              />
            }
            footerComponent={
              <UserDetails hostname={listing.user.profile.displayName} imageProfile={listing.user.profile.picture} joined="2019" text="We do what we love and are connected to something greater than ourselves."/>
            }
          />
        </Box>
      </Box>
      <Box my="100px">
        <Title type="h5" title="Location" />
        <Map position={{ lat: Number(listing.location.lat), lng: Number(listing.location.lng) }} />
      </Box>
    </Wrapper>
  )
}

PartnerPage.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired
}

export default PartnerPage
