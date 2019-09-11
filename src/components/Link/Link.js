import { Link as LinkRouter } from 'react-router-dom'
import styled from 'styled-components'
import { color } from 'styled-system'

const Link = styled(LinkRouter)`
  ${color}

  :hover {
    ${color}
    text-decoration: none;
  }
`

Link.defaultProps = {
  color: 'secondary'
}

export default Link
