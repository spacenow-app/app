import React, { memo, forwardRef } from 'react'
import styled from 'styled-components'
import { Box, Text, Icon, Tag, Avatar, Pagination, Price, Grid } from 'components'
import { toPlural } from 'utils/strings'

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
  grid-template-columns: ${({ showMap }) => (showMap ? 'repeat(2, 400px)' : 'repeat(auto-fill, minmax(400px, 1fr))')};
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

  :hover {
    box-shadow: 0 0 5px 1px #ddd;
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

  @media (max-width: 945px) {
    margin-bottom: 5px;
    line-height: 1;
    white-space: pre-wrap;
  }
`

const CardImage = styled.img`
  width: 100%;
  height: 280px;
  display: block;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  cursor: pointer;
  object-fit: cover;

  @media (max-width: 945px) {
    height: 200px;
  }
`
const CardContent = styled.div`
  padding: 25px;
  line-height: 2;
`

const ContainerPagination = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
`

const ListResults = forwardRef(
  ({ history, markers, onHoverItem, pagination, onPageChanged, showMap, ...props }, ref) => {
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
        return photoCover.name
      }
      return object.photos[0].name
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

        return (
          obj.value !== 0 && (
            <Box key={el.id}>
              <Icon name={_getInfo(obj).icon} width="22px" />
              <Text fontSize="10px" ml="10px">
                {_getInfo(obj).value}
              </Text>
            </Box>
          )
        )
      })
    }

    return (
      <Wrapper ref={ref}>
        <ContainerList showMap={showMap}>
          {markers.map(item => {
            return (
              <CardContainer
                key={item.id}
                onMouseEnter={() => onHoverItem(item)}
                onMouseLeave={() => onHoverItem(null)}
              >
                <CardImage src={_getCoverPhoto(item)} onClick={() => window.open(`/space/${item.id}`)} />
                <CardContent>
                  <Box display="flex" justifyContent="start" mb="15px">
                    <Box>
                      <Tag
                        small
                        icon={<Icon width="24px" name={_parseCategoryIconName(item.category.otherItemName, false)} />}
                      >
                        {item.category.itemName}
                      </Tag>
                    </Box>
                    <Box margin="0 10px">
                      <Tag
                        small
                        icon={<Icon width="24px" name={_parseCategoryIconName(item.subcategory.otherItemName, true)} />}
                      >
                        {item.subcategory.itemName}
                      </Tag>
                    </Box>
                  </Box>
                  <CardTitle onClick={() => window.open(`/space/${item.id}`)}>{item.title}</CardTitle>
                  <Text display="block" fontFamily="regular" fontSize="14px" color="greyscale.1">
                    {`${item.location.address1}, ${item.location.city}`}
                  </Text>
                  <Box
                    my="10px"
                    display="grid"
                    gridTemplateColumns={item.specifications.length >= 3 ? 'auto auto auto' : 'auto auto'}
                  >
                    {_renderSpecifications(item.specifications, item.listingData)}
                  </Box>
                  <Grid columns={item.listingData.bookingType !== 'poa' ? '50px auto auto' : 'auto auto'} columnGap="0">
                    {item.listingData.bookingType !== 'poa' && <Text fontSize="14px">From: &nbsp; </Text>}
                    <Price
                      currency={item.listingData.currency}
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
            )
          })}
        </ContainerList>
        <ContainerPagination>
          <Pagination
            totalPages={pagination.totalPages}
            totalRecords={pagination.total}
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

export default memo(ListResults, comparisonFn)
