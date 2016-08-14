let stringToPathArray = function (pathString) {
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

stringToPathArray._chainable = true
stringToPathArray._accepts = [String]
stringToPathArray._dependencies = []

export default stringToPathArray