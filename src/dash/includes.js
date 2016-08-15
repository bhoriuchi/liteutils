import isArray from './isArray'

let includes = function (obj, key) {
  return isArray(obj) && obj.indexOf(key) !== -1
}

includes._accepts = [Array]
includes._dependencies = ['dash.isArray']

export default includes