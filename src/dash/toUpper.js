import isString from './isString'

function toUpper (string) {
  return isString(string) ? string.toUpperCase() : ''
}

toUpper._accepts = [String]
toUpper._dependencies = ['dash.isString']

export default toUpper