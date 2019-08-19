import React from 'react'
import PropTypes from 'prop-types'
import ModalVideo from 'react-modal-video'

import './modal_video_style.css'

const VideoModal = props => {
  return <ModalVideo {...props} />
}

VideoModal.defaultProps = {}

VideoModal.propTypes = {}

export default VideoModal
