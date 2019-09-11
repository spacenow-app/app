const convertedDate = date => {
  const h = new Date(date)
  const u = new Date(
    h.getUTCFullYear(),
    h.getUTCMonth(),
    h.getUTCDate(),
    h.getUTCHours(),
    h.getUTCMinutes(),
    h.getSeconds()
  )
  return u
}

export { convertedDate }
