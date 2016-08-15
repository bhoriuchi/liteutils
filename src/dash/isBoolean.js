let isBoolean = function (obj) {
  return obj === true || obj === false
}

isBoolean._accepts = ['ANY']
isBoolean._dependencies = []

export default isBoolean