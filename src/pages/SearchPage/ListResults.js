import React, { memo, forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Text, Icon, Tag, Avatar, Pagination, Price, Grid } from 'components'
import { toPlural } from 'utils/strings'

import { cropPicture } from 'utils/images'

const Wrapper = styled.div`
  overflow-y: scroll;
  height: 100%;
  padding: 5px;

  @media only screen and (max-width: 600px) {
    overflow-y: unset;
  }
`

const ContainerList = styled.div`
  display: grid;
  grid-template-columns: ${({ showMap }) => (showMap ? 'repeat(1, 800px)' : 'repeat(auto-fill, minmax(400px, 1fr))')};
  grid-column-gap: 25px;
  grid-row-gap: 25px;

  @media (max-width: 945px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
`

const CardContainer = styled.div`
  /* height: 540px; */
  background: #ffffff 0% 0% no-repeat padding-box;
  /* border: 1px solid #ececec; */
  box-shadow: 0 0 5px 1px #eee;
  border-radius: 6px;
  opacity: 1;
  // min-width: 400px;
  display: grid;
  grid-template-columns: ${({ showMap }) => (showMap ? '357px auto' : '1fr')};

  :hover {
    box-shadow: 0 0 5px 1px #ddd;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
const CardTitle = styled(Text)`
  display: block;
  font-family: 'MontSerrat-Bold';
  font-size: 22px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  width: 363px;

  @media (max-width: 768px) {
    margin-bottom: 5px;
    line-height: 1;
    white-space: pre-wrap;
  }
  @media (max-width: 425px) {
    width: 275px;
  }
`

const CardImage = styled.img`
  width: 100%;
  height: ${({ showMap }) => (showMap ? '248px' : '280px')};
  display: block;
  border-radius: 6px;
  cursor: pointer;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 200px;
  }
`
const CardContent = styled.div`
  padding: ${({ showMap }) => (showMap ? '18px 30px 10px 30px' : '20px 20px 10px 20px')};
  line-height: 2;

  @media (max-width: 768px) {
    padding: 20px 20px 10px 20px;
  }
`

const ContainerPagination = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
`

const ListResults = forwardRef(
  ({ history, markers, onHoverItem, pagination, onPageChanged, showMap, eventSpace, ...props }, ref) => {
    const _parseCategoryIconName = (name, isSub) => {
      const prefix = isSub ? 'sub-category-' : 'category-'
      return prefix + name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
    }

    const _getCoverPhoto = object => {
      if (object.photos.length <= 0) {
        return ''
      }
      const photoCover = object.photos.find(e => e.isCover)
      if (photoCover) {
        return cropPicture(photoCover.name, 350)
      }
      return cropPicture(object.photos[0].name, 350)
    }

    const _renderSpecifications = (spec, listingData) => {
      const _getInfo = el => {
        switch (el.field) {
          case 'capacity':
            return {
              icon: 'specification-capacity',
              value: `${toPlural('Person', el.value)}`
            }
          case 'size':
            return {
              icon: 'specification-size',
              value: `${el.value} sqm`
            }
          case 'meetingRooms':
            return {
              icon: 'specification-meetingroom-quantity',
              value: `${el.value} available`
            }
          case 'isFurnished':
            return {
              icon: el.value === 0 ? 'specification-furnished-no' : 'specification-furnished-yes',
              value: el.value === 0 ? 'No' : 'Yes'
            }
          case 'carSpace':
            return {
              icon: 'category-desk',
              value: `${el.value} available`
            }
          case 'spaceType': {
            return {
              icon: `specification-${el.value.toLowerCase()}`,
              value: `${el.value}`
            }
          }
          default:
            return {
              icon: '',
              value: ''
            }
        }
      }
      return spec.slice(0, 3).map(el => {
        const specDataObject = JSON.parse(el.specData)
        const obj = {
          field: specDataObject.field,
          value: listingData[specDataObject.field]
        }
        return obj.value && obj.value !== 0 ? (
          <Box key={el.id}>
            <Icon name={_getInfo(obj).icon} width="22px" />
            <Text fontSize="10px" ml="10px">
              {_getInfo(obj).value}
            </Text>
          </Box>
        ) : (
          <></>
        )
      })
    }

    const _getAddress = address => {
      const { address1 = '', city = '' } = address
      const convertedAddress = `${address1 ? `${address1}, ` : ''} ${city ? `${city}` : ''}`
      return convertedAddress.replace(/\0.*$/g, '')
    }

    return (
      <Wrapper ref={ref}>
        <ContainerList showMap={showMap}>
          {markers.map(item => {
            return (
              <>
                {eventSpace &&
                  item.subcategory.otherItemName !== 'healthFitness' &&
                  item.subcategory.otherItemName !== 'creative' && (
                    // TODO: Remove above condition when include again health and creative spaces in event search
                    <CardContainer
                      key={item.id}
                      onMouseEnter={() => onHoverItem(item)}
                      onMouseLeave={() => onHoverItem(null)}
                      showMap={showMap}
                    >
                      <CardImage
                        showMap={showMap}
                        src={_getCoverPhoto(item)}
                        onClick={() => window.open(`/space/${item.id}`)}
                      />
                      <CardContent showMap={showMap}>
                        <Box display="flex" justifyContent="start" mb="10px">
                          <Box>
                            <Tag
                              small
                              icon={
                                <Icon width="24px" name={_parseCategoryIconName(item.category.otherItemName, false)} />
                              }
                            >
                              {item.category.itemName}
                            </Tag>
                          </Box>
                          <Box margin="0 10px">
                            <Tag
                              small
                              icon={
                                <Icon
                                  width="24px"
                                  name={_parseCategoryIconName(item.subcategory.otherItemName, true)}
                                />
                              }
                            >
                              {item.subcategory.itemName}
                            </Tag>
                          </Box>
                        </Box>
                        <Box>
                          <CardTitle onClick={() => window.open(`/space/${item.id}`)}>{item.title}</CardTitle>
                        </Box>
                        <Text display="block" fontFamily="regular" fontSize="14px" color="greyscale.1" margin="3px 0px">
                          {_getAddress(item.location)}
                        </Text>
                        <Box
                          mt="8px"
                          mb="13px"
                          display="grid"
                          gridTemplateColumns={item.specifications.length >= 3 ? 'auto auto auto' : 'auto auto'}
                          justifyContent="space-between"
                          borderBottom="1px solid #eee"
                          pb="13px"
                        >
                          {_renderSpecifications(item.specifications, item.listingData)}
                        </Box>
                        <Grid
                          columns={item.listingData.bookingType !== 'poa' ? '50px auto auto' : 'auto auto'}
                          columnGap="0"
                        >
                          {item.listingData.bookingType !== 'poa' && <Text fontSize="14px">From: &nbsp; </Text>}
                          <Price
                            // currency={item.listingData.currency}
                            price={item.listingData.basePrice}
                            currencySymbol="$"
                            bookingPeriod={item.bookingPeriod}
                            bookingType={item.listingData.bookingType}
                            size="16px"
                            lightPeriod
                          />
                          <Box justifySelf="end" display="flex" alignItems="center">
                            <Avatar width="30px" height="30px" image={item.host.profile && item.host.profile.picture} />
                            <Text fontSize="12px" ml="10px" fontFamily="medium">
                              {`${item.host.profile && item.host.profile.firstName}`}
                            </Text>
                          </Box>
                        </Grid>
                      </CardContent>
                    </CardContainer>
                  )}

                {/* TODO: Remove code underneath code when include again health and creative spaces in event search */}
                {!eventSpace && (
                  <CardContainer
                    key={item.id}
                    onMouseEnter={() => onHoverItem(item)}
                    onMouseLeave={() => onHoverItem(null)}
                    showMap={showMap}
                  >
                    <CardImage
                      showMap={showMap}
                      src={_getCoverPhoto(item)}
                      onClick={() => window.open(`/space/${item.id}`)}
                    />
                    <CardContent showMap={showMap}>
                      <Box display="flex" justifyContent="start" mb="10px">
                        <Box>
                          <Tag
                            small
                            icon={
                              <Icon width="24px" name={_parseCategoryIconName(item.category.otherItemName, false)} />
                            }
                          >
                            {item.category.itemName}
                          </Tag>
                        </Box>
                        <Box margin="0 10px">
                          <Tag
                            small
                            icon={
                              <Icon width="24px" name={_parseCategoryIconName(item.subcategory.otherItemName, true)} />
                            }
                          >
                            {item.subcategory.itemName}
                          </Tag>
                        </Box>
                      </Box>
                      <Box>
                        <CardTitle onClick={() => window.open(`/space/${item.id}`)}>{item.title}</CardTitle>
                      </Box>
                      <Text display="block" fontFamily="regular" fontSize="14px" color="greyscale.1" margin="3px 0px">
                        {_getAddress(item.location)}
                      </Text>
                      <Box
                        mt="8px"
                        mb="13px"
                        display="grid"
                        gridTemplateColumns={item.specifications.length >= 3 ? 'auto auto auto' : 'auto auto'}
                        justifyContent="space-between"
                        borderBottom="1px solid #eee"
                        pb="13px"
                      >
                        {_renderSpecifications(item.specifications, item.listingData)}
                      </Box>
                      <Grid
                        columns={item.listingData.bookingType !== 'poa' ? '50px auto auto' : 'auto auto'}
                        columnGap="0"
                      >
                        {item.listingData.bookingType !== 'poa' && <Text fontSize="14px">From: &nbsp; </Text>}
                        <Price
                          // currency={item.listingData.currency}
                          price={item.listingData.basePrice}
                          currencySymbol="$"
                          bookingPeriod={item.bookingPeriod}
                          bookingType={item.listingData.bookingType}
                          size="16px"
                          lightPeriod
                        />
                        <Box justifySelf="end" display="flex" alignItems="center">
                          <Avatar width="30px" height="30px" image={item.host.profile && item.host.profile.picture} />
                          <Text fontSize="12px" ml="10px" fontFamily="medium">
                            {`${item.host.profile && item.host.profile.firstName}`}
                          </Text>
                        </Box>
                      </Grid>
                    </CardContent>
                  </CardContainer>
                )}
              </>
            )
          })}
        </ContainerList>
        <ContainerPagination>
          <Pagination
            totalPages={pagination.totalPages}
            totalRecords={pagination.total}
            pageIndex={pagination.page - 1}
            onPageChanged={onPageChanged}
          />
        </ContainerPagination>
      </Wrapper>
    )
  }
)

const comparisonFn = (prevProps, nextProps) => {
  return prevProps === nextProps
}

ListResults.propTypes = {
  markers: PropTypes.instanceOf(Object).isRequired,
  pagination: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  onHoverItem: PropTypes.instanceOf(Object).isRequired,
  onPageChanged: PropTypes.instanceOf(Object).isRequired,
  showMap: PropTypes.bool.isRequired,
  eventSpace: PropTypes.bool // TODO: Remove when include again health and creative spaces in event search
}

export default memo(ListResults, comparisonFn)
