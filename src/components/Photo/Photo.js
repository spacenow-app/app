import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { Icon, Image, Button } from 'components'

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
  max-height: 150px;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border-radius: 10px;
  border: dashed 1px #cbcbcb;
  overflow: hidden;
`

const FooterButton = styled.div`
  display: grid;
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  justify-content: space-between;
  align-self: end;
  grid-template-columns: repeat(2, max-content);
  z-index: 1;
`

const Photo = ({ onDrop, onCover, onDelete, url, isCover, ...props }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/jpeg, image/png' })

  return (
    <WrapperStyled>
      <ContentStyled>
        <StyledDiv {...getRootProps()}>
          {url !== null ? (
            <>
              <Image src={url} width="100%" height="100%" style={{ gridRow: '1/2', gridColumn: '1/2' }} handleClick={onCover} />
              <FooterButton>
                <Button
                  outline="true"
                  icon={
                    !isCover ? (
                      <Icon
                        width="18px"
                        stroke="#6ADD92"
                        fill="#FFFFFF"
                        name="star-outline"
                        style={{ paddingRight: '5px' }}
                      />
                    ) : (
                        <Icon width="18px" fill="#6ADD92" name="star-full" style={{ paddingRight: '5px' }} />
                      )
                  }
                  style={{ width: 'max-content', height: '40px' }}
                  onClick={onCover}
                >
                  Cover
                </Button>
                <Button
                  outline="true"
                  icon={<Icon width="15px" fill="#6ADD92" name="bin" />}
                  style={{ width: '40px', height: '40px' }}
                  onClick={onDelete}
                />
              </FooterButton>
            </>
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
  onDelete: PropTypes.func,
  onCover: PropTypes.func,
  url: PropTypes.string,
  isCover: PropTypes.bool
}

export default Photo
