import React, { memo } from 'react'
import styled from 'styled-components'
import { Box, Text, Icon, Tag, Avatar, Pagination } from 'components'
import { toPlural } from 'utils/strings'

const Wrapper = styled.div`
  overflow-y: scroll;
  height: 100%;
  padding: 5px;
`

const ContainerList = styled.div`
  display: grid;
  grid-template-columns: 420px 420px;
  grid-column-gap: 25px;
  grid-row-gap: 25px;

  @media (max-width: 945px) {
    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  }
`

const CardContainer = styled.div`
  height: 540px;
  background: #ffffff 0% 0% no-repeat padding-box;
  /* border: 1px solid #ececec; */
  box-shadow: 0 0 5px 1px #eee;
  border-radius: 6px;
  opacity: 1;

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
`

const CardImage = styled.img`
  width: 100%;
  height: 280px;
  display: block;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  cursor: pointer;
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

const ListResults = ({ history, markers, onHoverItem, pagination, onPageChanged, ...props }) => {
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
            value: el.value === 0 ? 'Not mentioned' : `${toPlural('Person', el.value)}`
          }
        case 'size':
          return {
            icon: 'specification-size',
            value: el.value === 0 ? 'Not mentioned' : `${el.value} sqm`
          }
        case 'meetingRooms':
          return {
            icon: 'specification-meetingroom-quantity',
            value: el.value === 0 ? 'None available' : `${el.value} available`
          }
        case 'isFurnished':
          return {
            icon: el.value === 0 ? 'specification-furnished-no' : 'specification-furnished-yes',
            value: el.value === 0 ? 'No' : 'Yes'
          }
        case 'carSpace':
          return {
            icon: 'category-desk',
            value: el.value === 0 ? 'None available' : `${el.value} available`
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
        <Box justifySelf="center" key={el.id}>
          <Icon name={_getInfo(obj).icon} width="22px" />
          <Text fontSize="10px" ml="10px">
            {_getInfo(obj).value}
          </Text>
        </Box>
      )
    })
  }

  return (
    <Wrapper>
      <ContainerList>
        {markers.map(item => {
          return (
            <CardContainer key={item.id} onMouseEnter={() => onHoverItem(item)} onMouseLeave={() => onHoverItem(null)}>
              <CardImage src={_getCoverPhoto(item)} onClick={() => history.push(`/space/${item.id}`)} />
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
                <CardTitle>{item.title}</CardTitle>
                <Text display="block" fontFamily="regular" fontSize="14px" color="greyscale.1">
                  {`${item.location.address1}, ${item.location.city}`}
                </Text>
                <Box
                  display="grid"
                  gridTemplateColumns={item.specifications.length >= 3 ? 'auto auto auto' : 'auto auto'}
                  my="15px"
                >
                  {_renderSpecifications(item.specifications, item.listingData)}
                </Box>
                <Box display="grid" gridAutoFlow="column">
                  <Text fontSize="14px">
                    From:{' '}
                    <Text fontSize="16px" fontFamily="bold">
                      {`${item.listingData.currency}$${item.listingData.basePrice}`}
                    </Text>{' '}
                    {item.bookingPeriod}
                  </Text>
                  <Box justifySelf="end" display="flex" alignItems="center">
                    <Avatar width="30px" height="30px" image={item.host.profile && item.host.profile.picture} />
                    <Text fontSize="12px" ml="10px" fontFamily="medium">
                      {`${item.host.profile && item.host.profile.firstName}`}
                    </Text>
                  </Box>
                </Box>
              </CardContent>
            </CardContainer>
          )
        })}
      </ContainerList>
      <ContainerPagination>
        <Pagination totalPages={pagination.totalPages} totalRecords={pagination.total} onPageChanged={onPageChanged} />
      </ContainerPagination>
    </Wrapper>
  )
}

const comparisonFn = (prevProps, nextProps) => {
  return prevProps.markers === nextProps.markers
}

export default memo(ListResults, comparisonFn)
