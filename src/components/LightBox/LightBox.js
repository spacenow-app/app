import React from 'react'
import PropTypes from 'prop-types'
import Carousel, { Modal, ModalGateway } from 'react-images'

import NoPreviewBackgroundImage from './no-img-preview.jpg'

const LightBox = ({ photos, open, handleClose, ...props }) => {
  const _verifyPhotos = array => {
    if (!array.length) {
      return [{ source: NoPreviewBackgroundImage }]
    }
    return array
  }

  return (
    <ModalGateway>
      {open ? (
        <Modal onClose={handleClose}>
          <Carousel
            views={_verifyPhotos(photos)}
            currentIndex={0}
            styles={{
              container: base => ({
                ...base,
                backgroundColor: '#fafafa',
                borderRadius: props.borderRadius
              }),
              view: () => ({
                height: props.height,
                width: '100%',
                borderRadius: props.borderRadius,
                border: `${photos.length ? '1px solid #c4c4c4' : '1px solid #E05252'}`,
                '& > img': {
                  borderRadius: props.borderRadius,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }
              }),
              navigationPrev: base => ({
                ...base,
                background: '#fff',
                '& > svg': {
                  fill: '#6DDE94'
                }
              }),
              navigationNext: base => ({
                ...base,
                background: '#fff',
                '& > svg': {
                  fill: '#6DDE94'
                }
              })
            }}
            components={{
              Footer: null
            }}
          />
        </Modal>
      ) : (
        ''
      )}
    </ModalGateway>
  )
}

LightBox.defaultProps = {
  photos: null,
  open: false,
  height: 550,
  borderRadius: '15px',
  handleClose: () => {}
}

LightBox.propTypes = {
  photos: PropTypes.instanceOf(Array),
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired
}

export default LightBox
