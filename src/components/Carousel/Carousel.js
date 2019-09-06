import React from 'react'
import PropTypes from 'prop-types'
import CarouselImported from 'react-images'

import NoPreviewBackgroundImage from './no-img-preview.jpg'

const Carousel = ({ photos, ...props }) => {
  const _verifyPhotos = array => {
    if (!array.length) {
      return [{ source: NoPreviewBackgroundImage }]
    }

    return array
  }

  return (
    <CarouselImported
      views={_verifyPhotos(photos)}
      currentIndex={0}
      styles={{
        container: base => ({
          ...base,
          backgroundColor: '#fafafa',
          borderRadius: '15px'
        }),
        view: () => ({
          height: props.height,
          width: '100%',
          borderRadius: '15px',
          border: `${photos.length ? '1px solid #E2E2E2' : '1px solid #E05252'}`,
          '& > img': {
            borderRadius: '15px',
            width: '100%',
            height: '100%'
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
  )
}

Carousel.defaultProps = {
  photos: null,
  height: 500
}

Carousel.propTypes = {
  photos: PropTypes.instanceOf(Array)
}

export default Carousel
