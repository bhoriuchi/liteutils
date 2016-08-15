let isString = function (obj) {
  return typeof obj === 'string'
}

isString._accepts = ['ANY']
isString._dependencies = []

export default isString