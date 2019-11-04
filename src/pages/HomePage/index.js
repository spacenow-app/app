import { useEffect } from 'react'
import { config } from 'variables'

export default () => {
  useEffect(() => {
    window.location.href = config.static
  }, [])
  return null
}
