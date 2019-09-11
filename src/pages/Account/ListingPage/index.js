import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Helmet from 'react-helmet'
import { onGetListingsByUser, onUpdateListing } from 'redux/ducks/account'
import { Card, Text, Icon, Loader, BackgroundImage, Grid, Cell, Title, Wrapper, Button } from 'components'

const _parseCategoryIconName = (name, isSub) => {
  let prefix = 'category-'
  if (isSub) prefix = 'sub-category-'
  return prefix + name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

const _handleOnUpdateListing = (dispatch) => (listingId, status) => {
  dispatch(onUpdateListing(listingId, status))
}

const ListingCard = (dispatch, item, index) => {

  return (
    <Card.Horizontal key={index}>
      <Card.Horizontal.Image src={item.photos.length > 0 ? item.photos[0].name : ""} />
      <Card.Horizontal.Body>
        <Card.Horizontal.Title noMargin subTitleMargin={0} type={"h6"} title={<Text>{item.title || ''}</Text>} subtitle={<Text>{`${item.location.address1}, ${item.location.city} ${item.location.state}`}</Text>} />
        <Card.Horizontal.Price noMargin subTitleMargin={0} type={"h6"} title={<Text>AUD ${item.listingData.basePrice ? item.listingData.basePrice.toFixed(2) : 0.00}</Text>} />
      </Card.Horizontal.Body>
      <Card.Horizontal.Footer>
        <Card.Horizontal.Tag small icon={<Icon width="24px" name={_parseCategoryIconName(item.settingsParent.category.otherItemName, false)} />}>
          {item.settingsParent.category.itemName}
        </Card.Horizontal.Tag>
        <Card.Horizontal.Tag small icon={<Icon width="24px" name={_parseCategoryIconName(item.settingsParent.subcategory.otherItemName, true)} />}>
          {item.settingsParent.subcategory.itemName}
        </Card.Horizontal.Tag>
        <Card.Horizontal.Button size={`sm`} onClick={() => _handleOnUpdateListing(dispatch)(item.id, !item.isPublished)}>
          {item.isPublished ? 'Unpublish' : 'Publish'}
        </Card.Horizontal.Button>
      </Card.Horizontal.Footer>
    </Card.Horizontal>
  )
}

const ListingPage = ({ ...props }) => {

  const dispatch = useDispatch();

  const { user: { id } } = useSelector(state => state.auth)
  const { isLoading, get: { listings } } = useSelector(state => state.account)

  useEffect(() => {
    dispatch(onGetListingsByUser(id))
  }, [dispatch, id])

  const _addListing = () => null

  if (isLoading) return <Loader text="Loading listing process" />

  return (
    <Wrapper>
      <Helmet title="Your Listings - Spacenow" />
      <Grid column="12">
        <Cell width={6}>
          <Title type="h4" title="Your Listings" />
        </Cell>
        <Cell width={6} center middle left="none">
          <Button size="sm" onClick={() => _addListing()}>
            Add Listing
          </Button>
        </Cell>
      </Grid>

      {!listings || listings.count === 0 ? (
        <BackgroundImage text="We didn't find any listing :(" />
      ) : (
          <Grid columns={1} rowGap={`30px`}>
            {[].concat(listings.rows).map((item, index) => ListingCard(dispatch, item, index))}
          </Grid>
        )}
    </Wrapper>
  )

}

export default ListingPage;