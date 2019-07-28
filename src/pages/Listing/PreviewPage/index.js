import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
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
import GraphCancelattionImage from 'pages/Listing/SpacePage/CancellationTab/graph_cancellation.png'

const ImageStyled = styled.img`
  width: 100%;
`

const images = [
  {
    source:
      'https://images.unsplash.com/photo-1558981420-87aa9dad1c89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80'
  },
  {
    source:
      'https://images.unsplash.com/photo-1563387852576-964bc31b73af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2582&q=80'
  },
  {
    source:
      'https://images.unsplash.com/photo-1563387920443-6f3171e4793b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80'
  }
]

const PreviewPage = ({ match, location, ...props }) => {
  const { object: objectListing } = useSelector(state => state.listing.get)
  const { array: arrayRules, isLoading: isLoadingRules } = useSelector(state => state.listing.rules)

  useEffect(() => {
    console.log('Mount Preview page')
  })

  useEffect(() => {
    if (!objectListing || Number(objectListing.id) !== Number(match.params.id)) {
      props.history.replace(`/listing/space/${match.params.id}`)
    }
  })

  const _getAddress = address => {
    const { address1, city, zipcode, state, country } = address
    const convertedAddress = `${address1}, ${city}, ${zipcode}, ${state}, ${country}`
    return convertedAddress.replace(/\0.*$/g, '')
  }

  const _parseIconName = (name, isSub) => {
    let prefix = 'category-'
    if (isSub) prefix = 'sub-category-'
    return prefix + name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
  }

  const _changeToPlural = (string, number) => {
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
    return 'Custom'
  }

  if (!objectListing) {
    return null
  }

  return (
    <Wrapper>
      <Title type="h2" title="Just one more thing, review your space!" />
      <Carousel
        views={images}
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
            '& > img': {
              borderRadius: '15px'
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
                    name={_parseIconName(objectListing.settingsParent.category.otherItemName, false)}
                  />
                }
              >
                {objectListing.settingsParent.category.itemName}
              </Tag>
            </Cell>
            <Cell>
              <Tag
                icon={
                  <Icon
                    width="24px"
                    name={_parseIconName(objectListing.settingsParent.subcategory.otherItemName, true)}
                  />
                }
              >
                {objectListing.settingsParent.subcategory.itemName}
              </Tag>
            </Cell>
          </Grid>
          <Cell style={{ justifySelf: 'end' }}>
            <Tag>{`${capitalize(objectListing.listingData.bookingType)} Booking`}</Tag>
          </Cell>
        </Grid>
      </Box>
      <Grid columns={4}>
        <Cell width={3}>
          <Title
            type="h3"
            title={objectListing.title}
            subtitle={_getAddress(objectListing.location)}
            subTitleSize={18}
            noMargin
          />
        </Cell>
        <Cell width={1} center>
          <Title
            type="h4"
            title={`${formatterCurrency('en-UK', 'AUD').format(objectListing.listingData.basePrice)} ${
              objectListing.bookingPeriod
            }`}
            noMargin
            right
            style={{ marginTop: '5px' }}
          />
        </Cell>
      </Grid>
      <Title type="h4" title="Highlights" />
      <Grid columns={5}>
        <Highlights
          title="Minimum term"
          name={_changeToPlural(objectListing.bookingPeriod, objectListing.listingData.minTerm)}
          icon="category-desk"
        />
        <Highlights title="Opening Days" name={_getWeekName(objectListing.accessDays)} icon="category-desk" />
        <Highlights title="Capacity" name="1 person" icon="category-desk" />
        <Highlights title="Size" name="120 sqm" icon="category-desk" />
        <Highlights title="Car Space" name="2 Uncovered" icon="category-desk" last />
      </Grid>

      <Title type="h4" title="Access Information" />

      <Title type="h4" title="Description" />
      <p>{objectListing.listingData.description}</p>
      <Title type="h4" title="Amenities" subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />

      <Title type="h4" title="Space Rules" subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elite" />
      <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridRowGap="40px">
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
              checked={objectListing.rules.some(rule => rule.listSettingsId === item.id)}
            />
          ))
        )}
      </Box>

      <Title type="h4" title="Availability" />
      <TimeTable data={objectListing.accessDays.listingAccessHours} />

      <Title type="h4" title="Location" />
      <Map position={{ lat: Number(objectListing.location.lat), lng: Number(objectListing.location.lng) }} />

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
        next={{ onClick: () => {}, title: 'Publish' }}
      />
    </Wrapper>
  )
}

export default PreviewPage
