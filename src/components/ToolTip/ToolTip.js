import React from 'react'
import PropTypes from 'prop-types'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const ToolTip = ({ children, placement, content, ...props }) => (
  <OverlayTrigger placement={placement} overlay={<Tooltip id={`tooltip-${placement}`}>{content}</Tooltip>}>
    {children}
  </OverlayTrigger>
)

ToolTip.defaultProps = {
  children: null,
  placement: 'bottom',
  content: ''
}

ToolTip.propTypes = {
  children: PropTypes.element,
  placement: PropTypes.string,
  content: PropTypes.string
}

export default ToolTip
