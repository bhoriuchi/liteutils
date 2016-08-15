import isArray from './isArray'
import isHash from './isHash'
import isDate from './isDate'
import merge from './merge'
import map from './map'

let clone = function (obj, deep = false) {
  if (isArray(obj)) return deep ? map(obj, (o) => clone(o, true)) : obj.slice(0)
  if (isHash(obj)) return deep ? merge({}, obj) : Object.assign({}, obj)
  if (isDate(obj) && deep) return new Date(obj)
  return obj
}

clone._accepts = [Object, Array]
clone._dependencies = [
  'dash.isArray',
  'dash.isHash',
  'dash.isDate',
  'dash.merge',
  'dash.map'
]

export default clone