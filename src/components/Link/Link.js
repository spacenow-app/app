import { Link as LinkRouter } from 'react-router-dom'
import styled from 'styled-components'
import { color } from 'styled-system'

const Link = styled(LinkRouter)`
  ${color}

  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: ${props => (props.small && `${14 * 0.875}px`) || (props.large && `${14 * 1.375}px`) || '14px'}};
  font-family: 'Montserrat-SemiBold';
  line-height: ${props => (props.small && '2.2') || (props.large && '1.25') || '2.5'};
  padding: ${props => (props.large ? '16px 25px 17px' : '0 12px')};
  display: grid;
  justify-content: ${props => props.align};
  aling-items: center;
  padding: 6px 12px;
  margin-bottom: 0;
  line-height: 1.42857143;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  user-select: none;
  outline-offset: -2px;
  > a {
    color: ${props =>
      props.disabled ? props.theme.link.default.inactive.textColor : props.theme.link.default.active.textColor};
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    text-decoration: none;
  }
  :hover {
    ${color}
  }
`

Link.defaultProps = {
  color: 'secondary'
}

Link.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  small: PropTypes.bool,
  large: PropTypes.bool,
  to: PropTypes.string,
  align: PropTypes.string
}

export default Link
