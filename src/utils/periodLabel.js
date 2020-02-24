const periodLabel = (periodType, reference) => {
  let label = 'Day'
  switch (periodType) {
    case 'weekly':
      label = 'Week'
      break
    case 'monthly':
      label = 'Month'
      break
    case 'hourly':
      label = 'Hour'
      break
    default:
      label = 'Day'
  }
  if (reference > 1) label = `${label}s`
  return label
}

export default periodLabel