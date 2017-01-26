function isNumber (obj) {
  return typeof obj === 'number' && !isNaN(obj)
}

isNumber._accepts = ['ANY']
isNumber._dependencies = []

export default isNumber