let isArray = function (obj) {
  return Array.isArray(obj)
}

isArray._chainable = true
isArray._accepts = ['ANY']
isArray._dependencies = []

export default isArray