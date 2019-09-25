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
  CarouselListing
} from 'components'

import { onGetListingById, onGetAllSpecifications } from 'redux/ducks/listing'

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

const PartnerPage = ({ match, location, ...props }) => {
  const dispatch = useDispatch()

  const { object: listing, isLoading: isListingLoading } = useSelector(state => state.listing.get)
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
      ? array
          .filter(el => el !== undefined)
          .map(el => ({
            source: `https://api-assets.prod.cloud.spacenow.com?width=800&heigth=500&format=jpeg&path=${el.name}`
          }))
      : []
  }

  // Load the regular listing view
  if (listing && listing.user.provider === 'spacenow') {
    props.history.push(`/space/${match.params.id}`)
    return null
  }

  if (isListingLoading) {
    return <Loader text="Loading listing view" />
  }

  return (
    <>
      {(listing.photos.length > 1 || imageHeight === 325) && (
        <Box mb="30px">
          <CarouselListing photos={_convertedArrayPhotos(listing.photos)} height={imageHeight} />
        </Box>
      )}
      <Wrapper>
        <Helmet title="View Listing - Spacenow" />
        <GridStyled columns="auto 350px" columnGap="35px" rowGap="30px">
          <Box display="grid" gridRowGap="15px">
            {listing.photos.length === 1 && imageHeight !== 325 && (
              <CarouselListing photos={_convertedArrayPhotos(listing.photos)} height={imageHeight} />
            )}

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
              <CellStyled width={6} justifySelf="end">
                <UserDetails hostname={listing.user.profile.displayName} imageProfile={listing.user.profile.picture} />
              </CellStyled>
            </Grid>

            <Grid columns={5}>
              <CellStyled width={3}>
                <Title
                  type="h4"
                  title={listing.title}
                  subtitle={_getAddress(listing.location)}
                  subTitleSize={18}
                  subTitleMargin={20}
                  noMargin
                />
              </CellStyled>
              <CellStyled width={2} center>
                <Title
                  type="h4"
                  title={`$ ${Math.round((listing.listingData.basePrice || 0) * 100) / 100} ${listing.bookingPeriod}`}
                  noMargin
                  right
                  style={{ marginTop: '5px' }}
                />
              </CellStyled>
            </Grid>

            <Box>
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
            </Box>

            <Box>
              <Title type="h5" title="Access Type" />
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
                <Title
                  type="h5"
                  title={listing.title}
                  subtitle={_getAddress(listing.location)}
                  subTitleMargin={10}
                  noMargin
                />
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
        <BottomButtonMobile>
          <Grid columns={2} style={{ alignItems: 'center' }}>
            <Cell style={{ alignContent: 'center', justifyContent: 'left', display: 'grid' }}>
              <span>
                <span
                  style={{ fontFamily: 'Montserrat-Bold', fontSize: '18px' }}
                >{`$ ${listing.listingData.basePrice} ${listing.listingData.currency}`}</span>
                {` ${listing.bookingPeriod}`}
              </span>
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
