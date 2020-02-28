import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Helmet from 'react-helmet'
import { onGetSavedListingByUser, onRemoveSavedListingByUser } from 'redux/ducks/listing'
import { Card, Text, Icon, Loader, BackgroundImage, Grid, Price, Cell, Title, Box } from 'components'
import { cropPicture } from 'utils/images'

const _parseCategoryIconName = (name, isSub) => {
  let prefix = 'category-'
  if (isSub) prefix = 'sub-category-'
  return prefix + name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

const _handleRedirect = id => {
  window.open(`/space/${id}`)
}

const _getCoverPhoto = object => {
  if (object.photos.length <= 0) {
    return ''
  }
  const photoCover = object.photos.find(e => e.isCover)
  if (photoCover) {
    return cropPicture(photoCover.name)
  }
  return cropPicture(object.photos[0].name)
}

const ListingCard = (dispatch, item, index, user) => {
  const _handleRemoveSavedListingByUser = async (listingId, userId) => {
    await dispatch(onRemoveSavedListingByUser(listingId, userId))
  }
  return (
    <Card.Horizontal key={index}>
      <Card.Horizontal.Image
        src={_getCoverPhoto(item)}
        handleClick={() => (item.isPublished ? _handleRedirect(item.id) : '')}
      />
      <Card.Horizontal.Body>
        <Card.Horizontal.Title
          noMargin
          subTitleMargin={0}
          type="h6"
          title={<Text width={{ _: '220px', medium: '250px', large: '270px' }}>{item.title || ''}</Text>}
          subtitle={
            <Text width="300px">{`${item.location.address1 ? `${item.location.address1},` : ''} 
            ${item.location.city}, ${item.location.state}`}</Text>
          }
        />
        <Card.Horizontal.Price
          noMargin
          subTitleMargin={0}
          type="h6"
          title={
            <Price
              currency="AUD"
              price={item.listingData.basePrice || 0}
              currencySymbol="$"
              bookingType={item.listingData.bookingType}
              size="18px"
            />
          }
        />
      </Card.Horizontal.Body>
      <Card.Horizontal.Dropdown alignRight>
        <Box onClick={() => _handleRemoveSavedListingByUser(item.id, user.id)} style={{ cursor: 'pointer' }}>
          <Icon name="bookmark-filled" width="30" height="30" fill="#6adc91" />
        </Box>
      </Card.Horizontal.Dropdown>
      <Card.Horizontal.Footer>
        <Card.Horizontal.Tag
          small
          icon={
            <Icon width="24px" name={_parseCategoryIconName(item.settingsParent.subcategory.otherItemName, true)} />
          }
        >
          {item.settingsParent.subcategory.itemName}
        </Card.Horizontal.Tag>
      </Card.Horizontal.Footer>
    </Card.Horizontal>
  )
}

const SavedListingPage = ({ ...props }) => {
  const dispatch = useDispatch()

  const { isLoading, listings } = useSelector(state => state.listing.savedListings)

  const { user } = useSelector(state => state.account.get)

  useEffect(() => {
    if (user) dispatch(onGetSavedListingByUser(user.id))
  }, [dispatch, user])

  if (isLoading) return <Loader text="Loading listing process" />

  return (
    <>
      <Helmet title="Your Saved Listings - Spacenow" />
      <Grid column="12">
        <Cell width={6}>
          <Title type="h4" title="Your saved Listings" />
        </Cell>
      </Grid>
      {!listings || listings.length === 0 ? (
        <BackgroundImage text="We didn't find any listings :(" />
      ) : (
        <Grid columns={1} rowGap="30px">
          {listings.map((item, index) => ListingCard(dispatch, item.listing, index, user))}
        </Grid>
      )}
    </>
  )
}

export default SavedListingPage
