import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { Icon, Image } from 'components'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 8px;
  font-size: 14px;
  margin: 0 0 35px 0;
`

const ContentStyled = styled.div`
  display: grid;
`

const StyledDiv = styled.div`
  // Some styling here
  display: grid;
  height: 150px;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border-radius: 10px;
  border: dashed 1px #cbcbcb;
  overflow: hidden;
`
// const FooterButton = styled.div`
//   display: grid;
// `

const Photo = ({ onDrop, url, ...props }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/jpeg, image/png' })

  return (
    <WrapperStyled>
      <ContentStyled>
        <StyledDiv {...getRootProps()}>
          {url !== null ? (
            <Image src={url} />
          ) : (
            <>
              <input {...getInputProps()} />
              {isDragActive ? (
                <Icon width="40px" fill="#CBCBCB" name="camera" />
              ) : (
                <Icon width="40px" fill="#6ADD92" name="camera" />
              )}
            </>
          )}
          {/* {
            isDragAccept ?
              <FooterButton>
                <Button icon={<Icon width="40px" fill="#6ADD92" name="star-full" />}>Cover</Button>
                <Button icon={<Icon width="40px" fill="#6ADD92" name="bin" />} />
              </FooterButton> : ''
          } */}
        </StyledDiv>
      </ContentStyled>
    </WrapperStyled>
  )
}

Photo.propTypes = {
  // eslint-disable-next-line react/require-default-props
  onDrop: PropTypes.func.isRequired,
  url: PropTypes.string
}

export default Photo
