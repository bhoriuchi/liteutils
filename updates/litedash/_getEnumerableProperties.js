export default function _getEnumerableProperties (object) {
  try {
    const props = Object.getOwnPropertyNames(object)
    const proto = Object.getPrototypeOf(object)

    return Object.getOwnPropertyNames(proto)
      .concat(props)
      .filter(prop => {
        try {
          return object.propertyIsEnumerable(prop)
        } catch (err) {
          return false
        }
      })
  } catch (err) {
    return []
  }
}
