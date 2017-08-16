import isArray from './isArray'
import isDate from './isDate'
import isObject from './isObject'
import isEmpty from './isEmpty'

function isHash (obj) {
  return isObject(obj) && !isArray(obj) && !isDate(obj) && !isEmpty(obj)
}

isHash._accepts = ['ANY']
isHash._dependencies = [
  'dash.isArray',
  'dash.isDate',
  'dash.isObject',
  'dash.isEmpty'
]

export default isHash