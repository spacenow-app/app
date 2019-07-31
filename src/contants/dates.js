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

const weekTimeTable = [
  {
    short: 'mon',
    index: 1,
    name: 'Monday'
  },
  {
    short: 'tue',
    index: 2,
    name: 'Tuesday'
  },
  {
    short: 'wed',
    index: 3,
    name: 'Wednesday'
  },
  {
    short: 'thu',
    index: 4,
    name: 'Thursday'
  },
  {
    short: 'fri',
    index: 5,
    name: 'Friday'
  },
  {
    short: 'sat',
    index: 6,
    name: 'Saturday'
  },
  {
    short: 'sun',
    index: 0,
    name: 'Sunday'
  }
]

const nanDate = date => {
  if (date && date !== 'Invalid Date') return new Date(date)
  return new Date()
}

export { monthNames, nanDate, weekTimeTable }
