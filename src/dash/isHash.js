import isArray from './isArray'
import isDate from './isDate'
import isObject from './isObject'

function isHash (obj) {
  return isObject(obj) && !isArray(obj) && !isDate(obj)
}

isHash._accepts = ['ANY']
isHash._dependencies = [
  'dash.isArray',
  'dash.isDate',
  'dash.isObject'
]

export default isHash