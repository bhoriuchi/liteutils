export default function keys (obj) {
  try {
    return Object.keys(obj)
  } catch (err) {
    return []
  }
}
