import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 8px;
  font-size: 14px;
  margin: 0 0 35px 0;
`

const ContentStyled = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 10px;
`

const Photo = ({
  ...props
}) => (
    <WrapperStyled>
      <ContentStyled>
        <div className={cx("dzInputContainer")}>
          <DropzoneComponent
            config={config}
            eventHandlers={eventHandlers}
            djsConfig={djsConfig}
            multiple={false}
          />
        </div>
      </ContentStyled>
    </WrapperStyled>
  )

Photo.defaultProps = {
}

Photo.propTypes = {
}

export default Photo
