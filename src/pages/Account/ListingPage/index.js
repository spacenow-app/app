import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Helmet from 'react-helmet'
import { onGetListingsByUser, onUpdateListing, onDeleteListing } from 'redux/ducks/account'
import { Card, Text, Icon, Loader, BackgroundImage, Grid, Cell, Title, Button, Price } from 'components'
import { cropPicture } from 'utils/images'

const _parseCategoryIconName = (name, isSub) => {
  let prefix = 'category-'
  if (isSub) prefix = 'sub-category-'
  return prefix + name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

const _handleOnUpdateListing = dispatch => (listingId, status) => {
  dispatch(onUpdateListing(listingId, status))
}

const _handleRedirect = id => {
  window.open(`/space/${id}`)
}

const _handleEditRedirect = id => {
  window.open(`/listing/space/${id}/specification`)
}

const _handleDelete = dispatch => id => {
  dispatch(onDeleteListing(id))
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

const ListingCard = (dispatch, item, index) => {
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
            <Text width="300px">{`${item.location.address1}, ${item.location.city} ${item.location.state}`}</Text>
          }
        />
        <Card.Horizontal.Price
          noMargin
          subTitleMargin={0}
          type="h6"
          title={
            // <Text>
            //   AUD ${' '}
            //   {item.listingData.basePrice
            //     ? item.listingData.basePrice
            //         .toFixed(2)
            //         .toString()
            //         .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            //     : 0.0}
            // </Text>
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
        <Card.Horizontal.Dropdown.Toggle size="sm">
          <Text color="primary" fontSize="12px">
            Option
          </Text>
        </Card.Horizontal.Dropdown.Toggle>
        <Card.Horizontal.Dropdown.Menu>
          <Card.Horizontal.Dropdown.Item onClick={() => _handleEditRedirect(item.id)}>
            Edit
          </Card.Horizontal.Dropdown.Item>
          <Card.Horizontal.Dropdown.Item onClick={() => _handleDelete(dispatch)(item.id)}>
            Delete
          </Card.Horizontal.Dropdown.Item>
        </Card.Horizontal.Dropdown.Menu>
      </Card.Horizontal.Dropdown>
      <Card.Horizontal.Footer>
        <Card.Horizontal.Tag
          small
          icon={<Icon width="24px" name={_parseCategoryIconName(item.settingsParent.category.otherItemName, false)} />}
        >
          {item.settingsParent.category.itemName}
        </Card.Horizontal.Tag>
        <Card.Horizontal.Tag
          small
          icon={
            <Icon width="24px" name={_parseCategoryIconName(item.settingsParent.subcategory.otherItemName, true)} />
          }
        >
          {item.settingsParent.subcategory.itemName}
        </Card.Horizontal.Tag>
        <Card.Horizontal.Button
          size="xs"
          onClick={() => _handleOnUpdateListing(dispatch)(item.id, !item.isPublished)}
          disabled={!item.isReady && !item.isPublished}
        >
          {item.isPublished ? 'Unpublish' : 'Publish'}
        </Card.Horizontal.Button>
      </Card.Horizontal.Footer>
    </Card.Horizontal>
  )
}

const ListingPage = ({ ...props }) => {
  const dispatch = useDispatch()

  const {
    isLoading,
    get: {
      listings,
      user: { id }
    }
  } = useSelector(state => state.account)

  useEffect(() => {
    dispatch(onGetListingsByUser(id))
  }, [dispatch, id])

  const _addListing = () => {
    window.location.href = `/listing/intro`
  }

  if (isLoading) return <Loader text="Loading listing process" />

  return (
    <>
      <Helmet title="Your Listings - Spacenow" />
      <Grid column="12">
        <Cell width={6}>
          <Title type="h4" title="Your Listings" />
        </Cell>
        <Cell width={6} justifySelf="end" middle>
          <Button my="30px" size="sm" onClick={() => _addListing()}>
            Add Listing
          </Button>
        </Cell>
      </Grid>

      {!listings || listings.count === 0 ? (
        <BackgroundImage text="We didn't find any listings :(" />
      ) : (
        <Grid columns={1} rowGap="30px">
          {[].concat(listings.rows).map((item, index) => ListingCard(dispatch, item, index))}
        </Grid>
      )}
    </>
  )
}

export default ListingPage
