let isObject = function (obj) {
  return typeof obj === 'object' && obj !== null
}

isObject._accepts = ['ANY']
isObject._dependencies = []

export default isObject