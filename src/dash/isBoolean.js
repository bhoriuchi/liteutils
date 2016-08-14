let isBoolean = function (obj) {
  return obj === true || obj === false
}

isBoolean._chainable = true
isBoolean._accepts = ['ANY']
isBoolean._dependencies = []

export default isBoolean