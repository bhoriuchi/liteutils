function isDate (obj) {
  return obj instanceof Date
}

isDate._accepts = ['ANY']
isDate._dependencies = []

export default isDate