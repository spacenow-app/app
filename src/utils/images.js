/* eslint-disable import/prefer-default-export */
import config from 'variables/config'

const cropPicture = (path, width, height) => {
  if (!path) return ''
  let iUrl = `${config.assetsAPI}?path=${path}`
  if (width) iUrl += `&width=${width}`
  if (height) iUrl += `&height=${height}`
  return iUrl
}

export { cropPicture }
