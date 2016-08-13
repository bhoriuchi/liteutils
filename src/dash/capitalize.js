import isString from './isString'

export default function capitalize (str) {
  return isString(str) && str.length ? `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}` : str
}