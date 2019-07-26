const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const nanDate = date => {
  if (date && date !== 'Invalid Date') return new Date(date)
  return new Date()
}

export { monthNames, nanDate }
