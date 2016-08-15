let isFunction = function (obj) {
  return typeof obj === 'function'
}

isFunction._accepts = ['ANY']
isFunction._dependencies = []

export default isFunction