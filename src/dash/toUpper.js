import isString from './isString'

let toUpper = function (string) {
  return isString(string) ? string.toUpperCase() : ''
}

toUpper._accepts = [String]
toUpper._dependencies = ['dash.isString']

export default toUpper