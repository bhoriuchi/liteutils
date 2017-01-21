import isString from './isString'

let toLower = function (string) {
  return isString(string) ? string.toLowerCase() : ''
}

toLower._accepts = [String]
toLower._dependencies = ['dash.isString']

export default toLower