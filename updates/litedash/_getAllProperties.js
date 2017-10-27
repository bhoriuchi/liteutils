export default function _getAllProperties (object) {
  const props = Object.getOwnPropertyNames(object)
  const proto = Object.getPrototypeOf(object)

  return Object.getOwnPropertyNames(proto)
    .concat(props)
}
