import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CarouselImported, { Modal, ModalGateway } from 'react-images'
import { Image, Grid, Cell, Carousel } from 'components'
import styled from 'styled-components'

import NoPreviewBackgroundImage from './no-img-preview.jpg'

const ContainerDesktop = styled.div`
  @media only screen and (max-width: 991px) {
    display: none;
  }
`

const ContainerMobile = styled.div`
  display: none;
  @media only screen and (max-width: 991px) {
    display: block;
  }
`

const CarouselListing = ({ photos, ...props }) => {
  const _verifyPhotos = array => {
    if (!array.length) {
      return [{ source: NoPreviewBackgroundImage }]
    }

    const indexCover = array.findIndex(el => el.isCover)

    if (indexCover >= 0) {
      const coverPhoto = array.find(el => el.isCover)
      array.splice(indexCover, 1)
      array.unshift(coverPhoto)
    }

    return array
  }

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [photosOrdered, setPhotosOrdered] = useState(_verifyPhotos(photos))

  const _toggleModal = e => {
    if (e.target.src) {
      const pIndex = photosOrdered.findIndex(res => res.source === e.target.getAttribute('src'))
      let one = photosOrdered.slice(0)
      let two = photosOrdered.slice(0)
      one = one.splice(0, pIndex)
      two = two.splice(pIndex, two.length)
      setPhotosOrdered(two.concat(one))
    }
    setModalIsOpen(!modalIsOpen)
  }

  return (
    <>
      <ContainerDesktop style={{ cursor: 'pointer' }}>
        {_verifyPhotos(photos).length === 1 && <Carousel photos={_verifyPhotos(photos)} />}
        <>
          <ModalGateway>
            {modalIsOpen ? (
              <Modal onClose={_toggleModal}>
                <CarouselImported views={photosOrdered} />
              </Modal>
            ) : null}
          </ModalGateway>

          {_verifyPhotos(photos).length === 2 && (
            <Grid columns={2} rows={1} gap="2px">
              {_verifyPhotos(photos).map((img, index) => (
                <Cell width={1} height={1} key={index}>
                  <Image src={img.source} handleClick={_toggleModal} width="100%" height="552px" />
                </Cell>
              ))}
            </Grid>
          )}

          {_verifyPhotos(photos).length === 3 && (
            <Grid columns={5} rows={2} gap="2px">
              {_verifyPhotos(photos).map((img, index) =>
                index === 0 ? (
                  <Cell width={3} height={2} key={index}>
                    <Image src={img.source} handleClick={_toggleModal} width="100%" height="552px" />
                  </Cell>
                ) : (
                  <Cell width={2} height={1} key={index}>
                    <Image src={img.source} handleClick={_toggleModal} width="100%" height="275px" />
                  </Cell>
                )
              )}
            </Grid>
          )}

          {_verifyPhotos(photos).length === 4 && (
            <Grid columns={5} rows={2} gap="2px">
              {_verifyPhotos(photos).map(
                (img, index) =>
                  (index === 0 && (
                    <Cell width={3} height={2} key={index}>
                      <Image src={img.source} handleClick={_toggleModal} width="100%" height="552px" />
                    </Cell>
                  )) ||
                  (index === 1 && (
                    <Cell width={2} height={1} key={index}>
                      <Image src={img.source} handleClick={_toggleModal} width="100%" height="275px" />
                    </Cell>
                  )) ||
                  (index > 1 && (
                    <Cell width={1} height={1} key={index}>
                      <Image src={img.source} handleClick={_toggleModal} width="100%" height="275px" />
                    </Cell>
                  ))
              )}
            </Grid>
          )}

          {_verifyPhotos(photos).length > 4 && (
            <Grid columns={5} rows={2} gap="2px">
              {_verifyPhotos(photos).map(
                (img, index) =>
                  (index === 0 && (
                    <Cell width={3} height={2} key={index}>
                      <Image src={img.source} handleClick={_toggleModal} width="100%" height="552px" />
                    </Cell>
                  )) ||
                  (index >= 1 && index < 5 && (
                    <Cell width={1} height={1} key={index}>
                      <Image src={img.source} handleClick={_toggleModal} width="100%" height="275px" />
                    </Cell>
                  ))
              )}
            </Grid>
          )}
        </>
      </ContainerDesktop>

      <ContainerMobile>
        {/* <Box position="absolute" left="15px" top="150px" zIndex="10000" onClick={() => window.close()}>
          <Icon name="arrow-left" width="20px" color="#fff" />
        </Box> */}

        <Carousel photos={_verifyPhotos(photos)} height={325} borderRadius={0} />
      </ContainerMobile>
    </>
  )
}

CarouselListing.defaultProps = {
  photos: null
}

CarouselListing.propTypes = {
  photos: PropTypes.instanceOf(Array)
}

export default CarouselListing
