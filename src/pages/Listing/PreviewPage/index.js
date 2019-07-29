import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import Carousel from 'react-images'

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
  Checkbox
} from 'components'

import { capitalize, formatterCurrency, toPlural } from 'utils/strings'

import {
  onGetListingById,
  onGetAllRules,
  onGetAllAmenities,
  onGetAllSpecifications,
  onGetPhotosByListingId,
  onPublish
} from 'redux/ducks/listing'

import { openModal, TypesModal } from 'redux/ducks/modal'

import { config } from 'contants'

import GraphCancelattionImage from 'pages/Listing/SpacePage/CancellationTab/graph_cancellation.png'
import NoPreviewBackgroundImage from './no-img-preview.jpg'

const ImageStyled = styled.img`
  width: 100%;
`

const PreviewPage = ({ match, location, ...props }) => {
  const dispatch = useDispatch()

  const { object: listing, isLoading: isListingLoading } = useSelector(state => state.listing.get)
  const { array: arrayRules, isLoading: isLoadingRules } = useSelector(state => state.listing.rules)
  const { array: arrayPhotos } = useSelector(state => state.listing.photos)
  const { object: objectSpecifications } = useSelector(state => state.listing.specifications)
  const { isLoading: isPublishLoading, isPublished } = useSelector(state => state.listing.publishing)
  const { isEmailConfirmed } = useSelector(state => state.auth.user.verification)

  useEffect(() => {
    dispatch(onGetListingById(match.params.id))
  }, [dispatch, match.params.id])

  useEffect(() => {
    if (listing) {
      dispatch(onGetAllSpecifications(listing.settingsParent.id, listing.listingData))
      dispatch(onGetAllAmenities(listing.settingsParent.subcategory.id))
      dispatch(onGetAllRules())
      dispatch(onGetPhotosByListingId(listing.id))
    }
  }, [dispatch, listing])

  const _getAddress = address => {
    const { address1, city, zipcode, state, country } = address
    const convertedAddress = `${address1}, ${city}, ${zipcode}, ${state}, ${country}`
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
    if (!mon && !tue && !wed && !thu && !fri & !sat && !sun) return 'No Data'
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
        const value = el.value === 0 ? 'None available’' : `${el.value} available`
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
        // const value = el.value === 0 ? 'None available’' : `${el.value} available`
        // return <Highlights title={el.label} name={value} icon="category-desk" last={index === 2} />
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

  if (isListingLoading) {
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

  if (isListingLoading || isPublishLoading) {
    return <Loader text="Loading listing preview" />
  }

  if (isPublished) {
    window.location.href = `${config.legacy}/dashboard`
    return null
  }

  return (
    <Wrapper>
      <Title type="h2" title="Just one more thing, review your space!" />
      <Carousel
        views={
          arrayPhotos.filter(el => el !== undefined).length > 0
            ? arrayPhotos
                .filter(el => el !== undefined)
                .map(el => ({
                  source: el.name
                }))
            : [{ source: NoPreviewBackgroundImage }]
        }
        currentIndex={0}
        styles={{
          container: base => ({
            ...base,
            backgroundColor: '#fafafa',
            borderRadius: '15px'
          }),
          view: () => ({
            height: 500,
            width: '100%',
            borderRadius: '15px',
            border: '1px solid #E2E2E2',
            '& > img': {
              borderRadius: '15px',
              width: '100%',
              height: '100%'
            }
          }),
          navigationPrev: base => ({
            ...base,
            background: '#fff',
            '& > svg': {
              fill: '#6DDE94'
            }
          }),
          navigationNext: base => ({
            ...base,
            background: '#fff',
            '& > svg': {
              fill: '#6DDE94'
            }
          })
        }}
        components={{
          Footer: null
        }}
      />
      <Box my="40px">
        <Grid justifyContent="space-between" columnGap="10px" columns={2}>
          <Grid justifyContent="start" columns="160px 160px">
            <Cell>
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
            </Cell>
            <Cell>
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
            </Cell>
          </Grid>
          <Cell style={{ justifySelf: 'end' }}>
            <Tag>
              {listing.listingData.bookingType ? `${capitalize(listing.listingData.bookingType)} Booking` : 'No data'}
            </Tag>
          </Cell>
        </Grid>
      </Box>
      <Grid columns={4}>
        <Cell width={3}>
          <Title
            type="h3"
            title={listing.title ? listing.title : 'No Data'}
            subtitle={_getAddress(listing.location)}
            subTitleSize={18}
            noMargin
          />
        </Cell>
        <Cell width={1} center>
          <Title
            type="h4"
            title={`${formatterCurrency('en-UK', 'AUD').format(listing.listingData.basePrice)} ${
              listing.bookingPeriod
            }`}
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
            icon="specification-capacity"
          />
          <Highlights title="Opening Days" name={_getWeekName(listing.accessDays)} icon="category-desk" />
          {objectSpecifications && _renderHighLights(objectSpecifications)}
        </Grid>
      </Box>

      <Box my="100px">
        <Title type="h4" title="Access Information" />
        <Box
          display="grid"
          border="1px solid #EBEBEB"
          borderRadius="10px"
          width="110px"
          height="130px"
          justifyContent="center"
          textAlign="center"
          fontFamily="MontSerrat-SemiBold"
          fontSize="16px"
        >
          {listing.listingData.accessType ? (
            <>
              <Icon
                style={{ alignSelf: 'center' }}
                width="50px"
                fill="#6ADC91"
                name={`access-type-${listing.listingData.accessType
                  .toLowerCase()
                  .split(' ')
                  .join('-')}`}
              />
              {listing.listingData.accessType}
            </>
          ) : (
            'No Data'
          )}
        </Box>
      </Box>

      <Box my="100px">
        <Title type="h4" title="Description" />
        <p>{listing.listingData.description}</p>
      </Box>

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

      <Box my="100px">
        <Title type="h4" title="Availability" />
        <TimeTable data={listing.accessDays.listingAccessHours} />
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

export default PreviewPage
