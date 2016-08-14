import isArray from './isArray'

let forEach = function (obj, fn) {
  try {
    if (isArray(obj)) {
      let idx = 0
      for (let val of obj) {
        if (fn(val, idx) === false) break
        idx++
      }
    } else {
      for (const key in obj) {
        if (fn(obj[key], key) === false) break
      }
    }
  } catch (err) {
    return
  }
}

forEach._chainable = true
forEach._accepts = [Object, Array]
forEach._dependencies = ['dash.isArray']

export default forEach