// taken from lodash - https://github.com/lodash/lodash
let escapeRegExp = function (str) {
  let reRegExpChar = /[\\^$.*+?()[\]{}|]/g
  let reHasRegExpChar = RegExp(reRegExpChar.source)
  str = toString(str)
  return (str && reHasRegExpChar.test(str)) ? str.replace(reRegExpChar, '\\$&') : str
}

escapeRegExp._chainable = false
escapeRegExp._accepts = [String]
escapeRegExp._dependencies = []

export default escapeRegExp