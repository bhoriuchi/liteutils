export default function toPath (pathString) {
  if (Array.isArray(pathString)) return pathString
  if (typeof pathString === 'number') return [ Math.floor(pathString) ]

  // taken from lodash - https://github.com/lodash/lodash
  const pathRx = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g
  const pathArray = []

  if (typeof pathString === 'string' && pathString !== '') {
    pathString.replace(pathRx, (match, number, quote, string) => {
      pathArray.push(
        quote
          ? string
          : number !== undefined
            ? Math.floor(Number(number))
            : match
      )
      return pathArray[pathArray.length - 1]
    })
  }
  return pathArray
}
