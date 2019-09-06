import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onGetListingsByUser, onUpdateListing } from 'redux/ducks/account'
import { Card, Text, Icon, Loader, BackgroundImage, Grid, Cell, Title } from 'components'

const _parseCategoryIconName = (name, isSub) => {
  let prefix = 'category-'
  if (isSub) prefix = 'sub-category-'
  return prefix + name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

const ListingCard = (dispatch, item, index) => {

  const _handleOnUpdateListing = (listingId, status) => {
    dispatch(onUpdateListing(listingId, status))
  }

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
        <Card.Horizontal.Button size={`sm`} onClick={() => _handleOnUpdateListing(item.id, !item.isPublished)}>
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

  if (isLoading) return <Loader text="Loading listing process" />
  if (listings)
    if (listings.count === 0)
      return <BackgroundImage text="We didn't find any listing :(" />
    else
      return (
        <>
          <Grid column="12">
            <Cell width={6}>
              <Title type="h4" title="Your Listings" />
            </Cell>
          </Grid>
          <Grid columns={1} rowGap={`30px`}>
            {[].concat(listings.rows).map((item, index) => ListingCard(dispatch, item, index))}
          </Grid>
        </>
      )
  else return null;
}

export default ListingPage;