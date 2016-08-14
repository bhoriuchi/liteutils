let isObject = function (obj) {
  return typeof obj === 'object' && obj !== null
}

isObject._chainable = true
isObject._accepts = ['ANY']
isObject._dependencies = []

export default isObject