import isString from './isString'

function properCase (string, separator = ' ') {
  if (!isString(string)) return ''
  return string.replace(/[\s-_]+/g, '-')
    .split('-')
    .map(v => {
      return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()
    }).join(separator)
}

properCase._accepts = [String]
properCase._dependencies = ['dash.isString']

export default properCase