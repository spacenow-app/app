const getByName = cname => {
  const name = `${cname}=`
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

/**
 * @deprecated
 */
const deleteByName = cname => {
  const value = getByName(cname)
  if (value) {
    document.cookie = `${cname}=${value}; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  }
}

export { getByName, deleteByName }
