let isNumber = function (obj) {
  return typeof obj === 'number' && !isNaN(obj)
}

isNumber._chainable = true
isNumber._accepts = ['ANY']
isNumber._dependencies = []

export default isNumber