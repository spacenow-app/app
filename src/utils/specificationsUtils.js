const camalize = function camalize(str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
}

const mapTo = (originalArray, listingData) => {
  const specifications = {}
  for (let i = 0, size = originalArray.length; i < size; i += 1) {
    const { itemName, specData } = originalArray[i]
    if (specData && specData.length > 0) {
      const specDataObj = JSON.parse(specData)
      specifications[specDataObj.field] = {
        ...specDataObj,
        value: listingData[specDataObj.field] || specDataObj.defaultValue
      }
    } else {
      const fieldTarget = camalize(itemName)
      specifications[fieldTarget] = {
        label: itemName,
        field: fieldTarget,
        value: listingData[fieldTarget]
      }
    }
  }
  return specifications
}

const parseOutput = (state, field) => {
  const newState = JSON.parse(JSON.stringify(state))
  newState.data[field.name].value = field.value
  const fieldReference = newState.data[field.name]
  if (fieldReference.type && field.value) {
    switch (fieldReference.type) {
      case 'Integer': {
        newState.data[field.name].value = parseInt(field.value, 10)
        break
      }
      case 'Boolean': {
        newState.data[field.name].value = field.value === 'true'
        break
      }
      default: {
        newState.data[field.name].value = field.value
      }
    }
  }
  return newState
}

export { mapTo, parseOutput }
