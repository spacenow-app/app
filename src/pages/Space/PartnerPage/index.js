import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

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
  UserDetails,
  BookingCard,
  Button,
  CarouselListing,
  Footer,
  CardSearch,
  Carousel,
  Price,
  Text
} from 'components'

import { onGetListingById, onGetAllSpecifications } from 'redux/ducks/listing'
import { capitalize, toPlural } from 'utils/strings'
import { cropPicture } from 'utils/images'
import { onSearch } from 'redux/ducks/search'

import FormPartner from './FormPartner'

const GridStyled = styled(Grid)`
  @media only screen and (max-width: 991px) {
    grid-template-columns: 100%;
  }
`

const CellStyled = styled(Cell)`
  @media only screen and (max-width: 991px) {
    grid-column-end: span 12;
    justify-self: start !important;
    margin-bottom: 20px !important;
  }
`

const BottomButtonMobile = styled.div`
  position: sticky;
  bottom: 0;
  background-color: white;
  width: 100%;
  padding: 15px 0;
  text-align: center;
  border-top: 1px solid #c4c4c4;

  @media only screen and (min-width: 992px) {
    display: none;
  }
`

const SimilarSpacesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-column-gap: 25px;
  grid-row-gap: 25px;

  @media (max-width: 945px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
`

const PartnerPage = ({ match, location, ...props }) => {
  const dispatch = useDispatch()

  const { object: listing, isLoading: isListingLoading } = useSelector(state => state.listing.get)
  const { similar: similarResults } = useSelector(state => state.search)
  const { object: objectSpecifications } = useSelector(state => state.listing.specifications)
  const [imageHeight, setImageHeight] = useState(500)

  useEffect(() => {
    dispatch(onGetListingById(match.params.id, null, true))
  }, [dispatch, match.params.id])

  useEffect(() => {
    listing && dispatch(onGetAllSpecifications(listing.settingsParent.id, listing.listingData))
  }, [dispatch, listing])

  useEffect(() => {
    if (window.innerWidth <= 991) {
      setImageHeight(325)
    }
  }, [])

  useEffect(() => {
    listing &&
      dispatch(
        onSearch(listing.location.lat, listing.location.lng, false, listing.settingsParent.category.id.toString(), 3)
      )
  }, [dispatch, listing])

  const _getAddress = address => {
    const { address1 = '', city = '', zipcode = '', state = '', country = '' } = address
    const convertedAddress = `${address1 ? `${address1}, ` : ''} ${city ? `${city}, ` : ''} ${
      zipcode ? `${zipcode}, ` : ''
    } ${state ? `${state}, ` : ''} ${country ? `${country}` : ''}`
    return convertedAddress.replace(/\0.*$/g, '')
  }

  const _getSuburb = address => {
    const { city = '' } = address
    const convertedAddress = `${city ? `${city}` : ''}`
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
      ? array.filter(el => el !== undefined).map(el => ({ source: cropPicture(el.name, 800, 500) }))
      : []
  }

  const _renderHighLights = obj => {
    let array = Object.keys(obj).map(i => obj[i])
    array = array.filter(el => el.value !== 0)
    const arrayLen = array.length
    let last = 2
    if (arrayLen < 3) {
      last = arrayLen - 1
    }
    return array.slice(0, 3).map((el, index) => {
      if (el.field === 'capacity') {
        const value = el.value === 0 ? 'Not mentioned' : `${toPlural('Person', el.value)}`
        return el.value === 0 ? null : (
          <Highlights
            key={el.field}
            title={el.label}
            name={value}
            icon="specification-capacity"
            last={index === last}
          />
        )
      }
      if (el.field === 'size') {
        const value = el.value === 0 ? 'Not mentioned' : `${el.value} sqm`
        return el.value === 0 ? null : (
          <Highlights key={el.field} title={el.label} name={value} icon="specification-size" last={index === last} />
        )
      }
      if (el.field === 'meetingRooms') {
        const value = el.value === 0 ? 'None available' : `${el.value} available`
        return (
          <Highlights
            key={el.field}
            title={el.label}
            name={value.toString()}
            icon="specification-meetingroom-quantity"
            last={index === last}
          />
        )
      }
      if (el.field === 'isFurnished') {
        const value = el.value === 0 ? 'No’' : 'Yes'
        const icon = el.value === 0 ? 'specification-furnished-no' : 'specification-furnished-yes'
        return <Highlights key={el.field} title={el.label} name={value} icon={icon} last={index === last} />
      }
      if (el.field === 'carSpace') {
        const value = el.value === 0 ? 'None available' : `${el.value} available`
        return el.value === 0 ? null : (
          <Highlights title={el.label} name={value} icon="specification-car-park" last={index === last} />
        )
      }
      if (el.field === 'spaceType') {
        const value = el.value === 0 ? 'None available' : `${el.value}`
        return (
          <Highlights
            title={el.label}
            name={value}
            icon={value === 'Covered' ? 'specification-covered' : 'specification-uncovered'}
            last={index === last}
          />
        )
      }
      return (
        <Highlights
          key={el.field}
          title={el.label}
          name={el.value.toString()}
          icon="category-desk"
          last={index === last}
        />
      )
    })
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

  const _renderTextAccessInfo = accessType => {
    if (accessType === 'Person') {
      return <Text fontFamily="MontSerrat-Regular">You will be greeted at reception. Please present your email*</Text>
    }
    if (accessType === 'Swipe Card') {
      return <Text fontFamily="MontSerrat-Regular">You will need to collect a swipe card. Deposit may apply*</Text>
    }
    if (accessType === 'Host') {
      return <Text fontFamily="MontSerrat-Regular">You will be in contact with your host upon booking.</Text>
    }
    if (accessType === 'Keys') {
      return <Text fontFamily="MontSerrat-Regular">You will need to pick up keys. Deposit may apply*</Text>
    }
    return <Text fontFamily="MontSerrat-Regular">Details of entry will be issued upon successful booking.</Text>
  }

  const _renderTitleAccessInfo = accessType => {
    if (accessType === 'Person') {
      return <Text lineHeight={1}>{accessType} at reception</Text>
    }
    if (accessType === 'Host') {
      return <Text lineHeight={1}>{accessType} will meet you</Text>
    }
    return <Text lineHeight={1}>{accessType}</Text>
  }

  // Load the regular listing view
  if (listing && listing.user.provider !== 'wework') {
    props.history.push(`/space/${match.params.id}`)
    return null
  }

  if (isListingLoading) {
    return <Loader text="Loading listing view" />
  }

  return (
    <>
      {imageHeight === 325 ||
      (listing.photos.length > 1 &&
        listing.settingsParent.category.otherItemName !== 'parking' &&
        listing.settingsParent.category.otherItemName !== 'storage') ? (
        <Box mb="30px">
          <CarouselListing photos={_convertedArrayPhotos(listing.photos)} />
        </Box>
      ) : null}
      <Wrapper>
      <Helmet title={`Find the perfect space for ${listing.settingsParent.category.otherItemName} in ${_getSuburb(listing.location)}. ${listing.listingData.description.substring(0, 100)}`} meta={`Find the perfect space for ${listing.settingsParent.category.otherItemName} in ${_getSuburb(listing.location)}. ${listing.listingData.description.substring(0, 100)}`} />
        <GridStyled columns="auto 350px" columnGap="35px" rowGap="30px">
          <Box display="grid" gridRowGap="15px">
            {listing.photos.length === 1 &&
              listing.settingsParent.category.otherItemName !== 'parking' &&
              listing.settingsParent.category.otherItemName !== 'storage' &&
              imageHeight !== 325 && <CarouselListing photos={_convertedArrayPhotos(listing.photos)} />}

            {imageHeight !== 325 &&
            (listing.settingsParent.category.otherItemName === 'parking' ||
              listing.settingsParent.category.otherItemName === 'storage') ? (
              <Carousel photos={_convertedArrayPhotos(listing.photos)} />
            ) : null}

            <Grid columns={12}>
              <CellStyled width={6}>
                <Box style={{ float: 'left' }}>
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
                <Box margin="0 10px" style={{ float: 'left' }}>
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
              </CellStyled>
              {/* <CellStyled width={6} justifySelf="end">
                <UserDetails hostname={listing.user.profile.displayName} imageProfile={listing.user.profile.picture} />
              </CellStyled> */}
            </Grid>

            <Grid columns={6}>
              <CellStyled width={6}>
                <Title
                  type="h4"
                  title={listing.title}
                  subtitle={_getAddress(listing.location)}
                  subTitleSize={18}
                  subTitleMargin={20}
                  noMargin
                />
              </CellStyled>
              {/* <CellStyled width={3} center>
                <Price
                  currency={listing.listingData.currency}
                  price={listing.listingData.basePrice}
                  currencySymbol="$"
                  bookingPeriod={listing.bookingPeriod}
                  bookingType={listing.listingData.bookingType}
                  size="28px"
                  right
                />
              </CellStyled> */}
            </Grid>

            {/* <Box>
              <Title type="h5" title="Highlights" />
              <Grid columns={5}>
                <Highlights
                  title="Opening Days"
                  name={_getWeekName(listing.accessDays)}
                  icon="specification-opening-days"
                  error={_getWeekName(listing.accessDays) === 'Closed'}
                  last
                />
              </Grid>
            </Box> */}

            <Box>
              <Title type="h5" title="Highlights" />
              <Grid columns="repeat(auto-fit, minmax(120px, 1fr))" rowGap="50px">
                <Highlights
                  title="Minimum term"
                  name={_changeToPlural(
                    listing.bookingPeriod,
                    listing.listingData.minTerm ? listing.listingData.minTerm : 1
                  )}
                  icon="specification-minimum-term"
                />
                <Highlights
                  title="Opening Days"
                  name={_getWeekName(listing.accessDays)}
                  icon="specification-opening-days"
                />
                {objectSpecifications && _renderHighLights(objectSpecifications)}
              </Grid>
            </Box>

            {listing.listingData.accessType && (
              <Box>
                <Title
                  type="h5"
                  title="Access Information"
                  subtitle="How you’ll gain access to this space. Your host will provide the following upon successful booking:"
                />
                <Box
                  display="grid"
                  width="278px"
                  height="170px"
                  gridTemplateRows="repeat(3, auto)"
                  padding="20px"
                  fontFamily="MontSerrat-SemiBold"
                  fontSize="14px"
                  color={listing.listingData.accessType ? 'quartenary' : 'error'}
                  border={listing.listingData.accessType ? '1px solid #c4c4c4' : 'error'}
                  borderRadius="10px"
                >
                  <Box mb="10px">
                    <Icon
                      width="50px"
                      fill="#6ADC91"
                      name={
                        listing.listingData.accessType &&
                        `access-type-${listing.listingData.accessType
                          .toLowerCase()
                          .split(' ')
                          .join('-')}`
                      }
                    />
                  </Box>
                  {_renderTitleAccessInfo(listing.listingData.accessType)}
                  {_renderTextAccessInfo(listing.listingData.accessType)}
                </Box>
              </Box>
            )}

            {listing.listingData.description ? (
              <Box>
                <Title type="h5" title="Description" />
                <p>{listing.listingData.description}</p>
              </Box>
            ) : null}
            {listing.amenities.length > 0 && (
              <Box>
                <Title type="h5" title="Amenities" />
                <Grid columns="repeat(auto-fit, minmax(200px, auto))" rowGap="20px">
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
                </Grid>
              </Box>
            )}
            <Box>
              <Title type="h5" title="Availability" />
              <TimeTable
                data={listing.accessDays.listingAccessHours}
                error={_getWeekName(listing.accessDays) === 'Closed'}
              />
            </Box>
          </Box>
          <Box id="booking-card">
            <BookingCard
              titleComponent={
                <>
                  <Price
                    price={listing.listingData.basePrice}
                    currencySymbol="$"
                    bookingPeriod={listing.bookingPeriod}
                    bookingType={listing.listingData.bookingType}
                    size="28px"
                    periodSize="11px"
                    left
                    lightPeriod
                    lightPrice
                  />
                </>
              }
              contentComponent={<FormPartner {...props} listing={listing} dispatch={dispatch} />}
              footerComponent={
                <UserDetails
                  hostname={listing.user.profile.displayName}
                  imageProfile={listing.user.profile.picture}
                  joined="2019"
                  text="We do what we love and are connected to something greater than ourselves."
                />
              }
            />
          </Box>
        </GridStyled>
        <Box my="45px">
          <Title type="h5" title="Location" />
          <Map position={{ lat: Number(listing.location.lat), lng: Number(listing.location.lng) }} />
        </Box>
        {similarResults.length === 3 && (
          <Box mt="45px">
            <Title type="h5" title="See more similar spaces" />
            <SimilarSpacesContainer>
              {similarResults.map(item => {
                return <CardSearch item={item} key={item.id} />
              })}
            </SimilarSpacesContainer>
          </Box>
        )}
        <Footer />
        <BottomButtonMobile>
          <Grid columns={2} style={{ alignItems: 'center' }}>
            <Cell style={{ alignContent: 'center', justifyContent: 'left', display: 'grid' }}>
              <Price
                currency={listing.listingData.currency}
                price={listing.listingData.basePrice}
                currencySymbol="$"
                bookingPeriod={listing.bookingPeriod}
                bookingType={listing.listingData.bookingType}
                size="18px"
                left
                lightPeriod
              />
            </Cell>
            <Cell justifySelf="self-end">
              <Button
                size="sm"
                onClick={() => {
                  document.getElementById('booking-card').scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Reserve
              </Button>
            </Cell>
          </Grid>
        </BottomButtonMobile>
      </Wrapper>
    </>
  )
}

PartnerPage.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired
}

export default PartnerPage
