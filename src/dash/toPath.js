import isString from './isString'
import isNumber from './isNumber'
import isArray from './isArray'

function toPath (pathString) {
  if (isArray(pathString)) return pathString
  if (isNumber(pathString)) return [ pathString ]

  // taken from lodash - https://github.com/lodash/lodash
  let pathRx = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g
  let pathArray = []

  if (isString(pathString)) {
    pathString.replace(pathRx, (match, number, quote, string) => {
      pathArray.push(quote ? string : (number !== undefined) ? Number(number) : match)
      return pathArray[pathArray.length - 1]
    })
  }
  return pathArray
}

toPath._accepts = [String]
toPath._dependencies = ['dash.isString', 'dash.isArray', 'dash.isNumber']

export default toPath