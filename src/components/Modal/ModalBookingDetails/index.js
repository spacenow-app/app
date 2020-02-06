import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'

import { Box, Carousel, Tag, Icon, Title, Label, ListDates, BookingPriceDetail } from 'components'

import { closeModal } from 'redux/ducks/modal'

import { cropPicture } from 'utils/images'

const ModalBookingDetails = ({ options, booking, userType }) => {
  const dispatch = useDispatch()

  const _convertedArrayPhotos = array => {
    return array.filter(el => el !== undefined).length > 0
      ? array.filter(el => el !== undefined).map(el => ({ source: cropPicture(el.name) }))
      : []
  }

  const _parseCategoryIconName = (name, isSub) => {
    let prefix = 'category-'
    if (isSub) prefix = 'sub-category-'
    return prefix + name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
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

  return (
    <Modal show onHide={() => dispatch(closeModal())} centered size="lg">
      {options.title && (
        <Modal.Header closeButton>
          <Modal.Title>
            <Title noMargin type="h5" title={options.title} />
          </Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>
        <Carousel photos={_convertedArrayPhotos(booking.listing.photos)} height={300} />
        <Box my="40px" display="grid" gridTemplateColumns="auto auto 1fr" gridColumnGap="10px">
          <Tag
            icon={
              <Icon
                width="24px"
                name={_parseCategoryIconName(booking.listing.settingsParent.category.otherItemName, false)}
              />
            }
          >
            {booking.listing.settingsParent.category.itemName}
          </Tag>
          <Tag
            icon={
              <Icon
                width="24px"
                name={_parseCategoryIconName(booking.listing.settingsParent.subcategory.otherItemName, true)}
              />
            }
          >
            {booking.listing.settingsParent.subcategory.itemName}
          </Tag>
          <Label justify="end" bg={booking.bookingState} color="white">
            {booking.bookingState}
          </Label>
        </Box>
        <Box my="40px">
          <Title
            type="h4"
            title={booking.listing.title}
            subtitle={`${booking.listing.location.address1 ? `${booking.listing.location.address1  }, ` : ''}  ${
              booking.listing.location.city
            }, ${booking.listing.location.state}`}
            subTitleMargin={0}
          />
        </Box>
        <ListDates dates={booking.reservations} />
        {booking.reservations.length > 0 && (
          <BookingPriceDetail
            periodLabel={_spelling(booking.priceType, booking.period)}
            valuePerQuantity={booking.priceDetails.valuePerQuantity}
            valueFee={
              userType !== 'host'
                ? booking.priceDetails.valueFee
                : booking.basePrice * booking.period * booking.hostServiceFee * -1
            }
            valueDiscount={booking.priceDetails.valueDiscount}
            valueVoucher={booking.priceDetails.valueVoucher}
            total={userType !== 'host' ? booking.priceDetails.total : booking.basePrice * booking.period * 0.89}
            days={booking.period}
          />
        )}
      </Modal.Body>
    </Modal>
  )
}

ModalBookingDetails.propTypes = {
  options: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string.isRequired
  }).isRequired,
  booking: PropTypes.instanceOf(Object).isRequired,
  userType: PropTypes.string
}

export default ModalBookingDetails
