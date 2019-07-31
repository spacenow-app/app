import pluralize from 'pluralize'

export const capitalize = s => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const formatterCurrency = (country, currency) =>
  new Intl.NumberFormat(country, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  })

export const toPlural = (string, number) => {
  return pluralize(string, number, true)
}

export const camalize = str => {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
}
