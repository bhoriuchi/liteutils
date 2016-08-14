import isFunction from './isFunction'

let isPromise = function (obj) {
  return obj && isFunction(obj.then) && isFunction(obj.catch)
}

isPromise._chainable = true
isPromise._accepts = ['ANY']
isPromise._dependencies = ['dash.isFunction']

export default isPromise