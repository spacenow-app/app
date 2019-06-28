import cookies from 'js-cookie'

export const getCookie = () => {
  return cookies.getJSON('id_token')
}

export const checkCookie = () => {
  const cookieLogged = cookies.getJSON('id_token')
  if (cookieLogged) {
    return true
  }

  return false
}
