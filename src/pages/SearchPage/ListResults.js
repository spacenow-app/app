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
  border-radius: 100%;
  border: 0.5px solid #ececec;
`

const ListResults = ({ markers, onHoverItem }) => {
  console.log('render')
  return (
    <ContainerList>
      {markers.map(item => {
        return (
          <CardContainer
            key={item.photo_id}
            onMouseEnter={() => onHoverItem(item)}
            onMouseLeave={() => onHoverItem(null)}
          >
            <CardImage src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
            <CardContent>
              <Box display="flex" justifyContent="start" mb="15px">
                <Box>
                  <Tag small icon={<Icon width="24px" name="category-venue" />}>
                    Venue
                  </Tag>
                </Box>
                <Box margin="0 10px">
                  <Tag small icon={<Icon width="24px" name="sub-category-health-fitness" />}>
                    Health & Fitness
                  </Tag>
                </Box>
              </Box>
              <CardTitle>Creative Space in Alexandria</CardTitle>
              <Text display="block" fontFamily="regular" fontSize="14px" color="greyscale.1">
                Address street, Suburb
              </Text>
              <Box display="grid" gridTemplateColumns="auto auto auto" my="15px">
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
              </Box>
              <Box display="grid" gridAutoFlow="column">
                <Text fontSize="14px">
                  From:{' '}
                  <Text fontSize="16px" fontFamily="bold">
                    AU$3,000{' '}
                  </Text>{' '}
                  Daily
                </Text>
                <Box justifySelf="end">
                  <CardContentUserAvatar src="https://avatars3.githubusercontent.com/u/9704744?s=400&v=4" />
                  <Text fontSize="12px" ml="10px" fontFamily="medium">
                    Bruno Valenga
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

export default React.memo(ListResults, comparisonFn)
