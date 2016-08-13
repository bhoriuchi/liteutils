import isArray from './isArray'

export default function uniq (list) {
  return isArray(list) ? [ ...new Set(list) ] : []
}