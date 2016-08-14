import isArray from './isArray'

let ensureArray = function (obj) {
  return !obj ? [] : isArray(obj) ? obj : [obj]
}

ensureArray._chainable = true
ensureArray._accepts = ['ANY']
ensureArray._dependencies = ['dash.isArray']

export default ensureArray