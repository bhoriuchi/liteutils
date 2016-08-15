import isString from './isString'

let capitalize = function (str) {
  return isString(str) && str.length ? `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}` : str
}

capitalize._accepts = [String]
capitalize._dependencies = ['dash.isString']

export default capitalize