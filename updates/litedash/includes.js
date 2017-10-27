import values from './values'

export default function includes (collection, value) {
  if (Array.isArray(collection) || typeof collection === 'string') {
    return collection.indexOf(value) !== -1
  } else if (typeof collection === 'object' && collection !== null) {
    return values(collection).indexOf(value) !== -1
  }
  return false
}
