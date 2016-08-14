let isDate = function (obj) {
  return obj instanceof Date
}

isDate._chainable = true
isDate._accepts = ['ANY']
isDate._dependencies = []

export default isDate