import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { format } from 'date-fns'
import { Box, Text, Icon, Grid, Cell, PriceDetail } from 'components'
import { cropPicture } from 'utils/images'

const CardContainer = styled.div`
  width: 377px;
  background: #f7f7f7 0% 0% no-repeat padding-box;
  box-shadow: 0 0 5px 1px #eee;
  border-radius: 6px;
  opacity: 1;

  @media only screen and (max-width: 991px) {
    width: 100%;
    max-width: 377px;
  }
`

const CardTitle = styled(Text)`
  display: block;
  font-family: 'MontSerrat-Medium';
  font-size: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const CardImage = styled.img`
  width: 100%;
  height: 180px;
  display: block;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  object-fit: cover;
`
const CardContent = styled.div`
  padding: 35px;
  line-height: 2;
  display: grid;
  grid-row-gap: 20px;
`

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

const _spelling = (periodType, reference) => {
  let label = 'Day'
  switch (periodType) {
    case 'weekly':
      label = 'Week'
      break
    case 'monthly':
      label = 'Month'
      break
    case 'hourly':
      label = 'Hour'
      break
    default:
      label = 'Day'
  }
  if (reference > 1) label = `${label}s`
  return label
}

const CardCheckout = ({ reservation, ...props }) => {
  return (
    <>
      <CardContainer>
        <CardImage src={_getCoverPhoto(reservation.listing)} />
        <CardContent>
          <Box>
            <CardTitle>{reservation.listing.title}</CardTitle>
            <Text display="block" fontFamily="regular" fontSize="18px">
              {`${reservation.listing.location.city}, ${reservation.listing.location.country}.`}
            </Text>
          </Box>
          <Grid columns={11} style={{ margin: '20px 0' }}>
            <Cell width={1}>
              <Icon name="calendar" fill="#172439" width="15px" />
            </Cell>
            <Cell width={4}>
              <Text fontSize={{ _: '16px', medium: '16px' }}>
                {format(new Date(reservation.checkIn), 'd LLL yyyy')}
              </Text>
            </Cell>
            <Cell width={1}>
              <Icon name="full-left-arrow" fill="#172439" width="15px" style={{ transform: 'rotate(180deg)' }} />
            </Cell>
            <Cell width={1}>
              <Icon name="calendar" fill="#172439" width="15px" />
            </Cell>
            <Cell width={4}>
              <Text fontSize={{ _: '16px', medium: '16px' }}>
                {format(new Date(reservation.checkOut), 'd LLL yyyy')}
              </Text>
            </Cell>
          </Grid>
          <PriceDetail
            margin="0"
            periodLabel={_spelling(reservation.listing.bookingPeriod, reservation.period)}
            price={reservation.listing.listingData.basePrice}
            isAbsorvedFee={reservation.listing.listingData.isAbsorvedFee}
            days={reservation.period}
            quantity={1}
            dividerTotal
            totalSize="20px"
            fontSize="16px"
            noHeader
          />
        </CardContent>
      </CardContainer>
    </>
  )
}

CardCheckout.propTypes = {
  reservation: PropTypes.instanceOf(Object).isRequired
}

export default CardCheckout
