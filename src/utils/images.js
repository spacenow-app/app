/* eslint-disable import/prefer-default-export */
import config from 'variables/config'

const cropPicture = (path, width, height) => {
  if (!path) return ''
  const browserAgent = navigator.userAgent.toLowerCase()
  if (browserAgent.indexOf('safari') > -1) {
    if (browserAgent.indexOf('chrome') <= -1) {
      return path
    }
  }
  let iUrl = `${config.assetsAPI}?path=${path}`
  if (width) iUrl += `&width=${width}`
  if (height) iUrl += `&height=${height}`
  return iUrl
}

export { cropPicture }
