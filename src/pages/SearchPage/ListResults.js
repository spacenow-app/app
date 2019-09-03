import React, { memo } from 'react'
import styled from 'styled-components'
import { Box, Text, Icon, Tag } from 'components'

const ContainerList = styled.div`
  display: grid;
  grid-template-columns: 420px 420px;
  grid-column-gap: 25px;
  grid-row-gap: 25px;
  overflow-y: scroll;
  height: 100%;
  padding: 5px;

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
`
const CardContent = styled.div`
  padding: 25px;
  line-height: 2;
`

const CardContentUserAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 0.5px solid #ececec;
`

const ListResults = ({ markers, onHoverItem }) => {
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

  const _renderSpecifications = obj => {
    const array = Object.keys(obj).map(i => obj[i])

    console.log(array)

    return (
      <>
        <Box justifySelf="center">
          <Icon name="specification-capacity" width="22px" />
          <Text fontSize="10px" ml="10px">
            120x130m
          </Text>
        </Box>
        <Box justifySelf="center">
          <Icon name="specification-car-large" width="22px" />
          <Text fontSize="10px" ml="10px">
            10 Capactity
          </Text>
        </Box>
        <Box justifySelf="center">
          <Icon name="specification-size" width="22px" />
          <Text fontSize="10px" ml="10px">
            1 Car Spot
          </Text>
        </Box>
      </>
    )

    // return array.slice(0, 3).map((el, index) => {
    //   if (el.field === 'capacity') {
    //     const value = el.value === 0 ? 'Not mentioned' : `${toPlural('Person', el.value)}`
    //     return (
    //       <Icon  title={el.label} name={value} icon="specification-capacity" last={index === 2} />
    //     )
    //   }
    //   if (el.field === 'size') {
    //     const value = el.value === 0 ? 'Not mentioned' : `${el.value} sqm`
    //     return <Highlights key={el.field} title={el.label} name={value} icon="specification-size" last={index === 2} />
    //   }
    //   if (el.field === 'meetingRooms') {
    //     const value = el.value === 0 ? 'None available' : `${el.value} available`
    //     return (
    //       <Highlights
    //         key={el.field}
    //         title={el.label}
    //         name={value}
    //         icon="specification-meetingroom-quantity"
    //         last={index === 2}
    //       />
    //     )
    //   }
    //   if (el.field === 'isFurnished') {
    //     const value = el.value === 0 ? 'No’' : 'Yes'
    //     const icon = el.value === 0 ? 'specification-furnished-no' : 'specification-furnished-yes'
    //     return <Highlights key={el.field} title={el.label} name={value} icon={icon} last={index === 2} />
    //   }
    //   if (el.field === 'carSpace') {
    //     // const value = el.value === 0 ? 'None available’' : `${el.value} available`
    //     // return <Highlights title={el.label} name={value} icon="category-desk" last={index === 2} />
    //   }
    //   if (el.field === 'isFurnished') {
    //     // const value = el.value === 0 ? 'None available’' : `${el.value} available`
    //     // return <Highlights title={el.label} name={value} icon="category-desk" last={index === 2} />
    //   }
    //   return <Highlights key={el.field} title={el.label} name={el.value} icon="category-desk" last={index === 2} />
    // })
  }

  return (
    <ContainerList>
      {markers.map(item => {
        return (
          <CardContainer key={item.id} onMouseEnter={() => onHoverItem(item)} onMouseLeave={() => onHoverItem(null)}>
            <CardImage src={_getCoverPhoto(item)} />
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
              <Box display="grid" gridTemplateColumns="auto auto auto" my="15px">
                {_renderSpecifications(item.listingData)}
              </Box>
              <Box display="grid" gridAutoFlow="column">
                <Text fontSize="14px">
                  From:{' '}
                  <Text fontSize="16px" fontFamily="bold">
                    {`${item.listingData.currency}$${item.listingData.basePrice}`}
                  </Text>{' '}
                  {item.bookingPeriod}
                </Text>
                <Box justifySelf="end">
                  <CardContentUserAvatar src={(item.host.profile && item.host.profile.picture) || ''} />
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
  )
}

const comparisonFn = (prevProps, nextProps) => {
  return prevProps.markers === nextProps.markers
}

export default memo(ListResults, comparisonFn)
