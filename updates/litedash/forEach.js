export default function forEach (obj, fn) {
  if (Array.isArray(obj)) {
    let idx = 0
    for (const val of obj) {
      try {
        if (fn(val, idx) === false) break
        idx++
      } catch (err) {
        return
      }
    }
    return
  }
  for (const key in obj) {
    if (typeof obj === 'object' && obj !== null && obj.hasOwnProperty(key)) {
      try {
        if (fn(obj[key], key) === false) break
      } catch (err) {
        return
      }
    }
  }
}
