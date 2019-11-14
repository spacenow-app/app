import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { Icon, Box, Button, Text } from 'components'

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
  align-self: end;
  justify-content: end;
  z-index: 1;
`

const Video = ({ onDrop, onDelete, url, isCover, ...props }) => {
  const maxSize = 1e7
  const { getRootProps, getInputProps, isDragActive, rejectedFiles } = useDropzone({
    onDrop,
    accept: 'video/mp4',
    minSize: 0,
    maxSize // 5242880
  })
  const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize

  return (
    <WrapperStyled>
      <ContentStyled>
        <StyledDiv {...getRootProps()}>
          {url !== null ? (
            <>
              <Box style={{ gridRow: '1/2', gridColumn: '1/2' }}>
                <video width="100%" height="140px" controls>
                  <source src={url} type="video/mp4" />
                </video>
              </Box>
              <FooterButton>
                <Button
                  outline
                  icon={<Icon width="15px" fill="#6ADD92" name="bin" />}
                  style={{ width: '40px', height: '40px', margin: '5px' }}
                  onClick={onDelete}
                />
              </FooterButton>
            </>
          ) : (
            <>
              <input {...getInputProps()} />
              {isDragActive ? (
                <Icon width="50px" fill="#CBCBCB" name="movie-camera" />
              ) : (
                <Icon width="50px" fill="#6ADD92" name="movie-camera" />
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
      {isFileTooLarge && (
        <Text color="#C45151" fontSize="12px">
          File is too large. Max size: 10MB
        </Text>
      )}
    </WrapperStyled>
  )
}

Video.propTypes = {
  // eslint-disable-next-line react/require-default-props
  onDrop: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  url: PropTypes.string,
  isCover: PropTypes.bool
}

export default Video
