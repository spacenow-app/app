import { useEffect } from 'react'
import { config } from 'variables'

export default props => {
  useEffect(() => {
    window.location.href = config.static
  }, [])
  return null
}
