function isEmpty (obj) {
  if (obj === '' || obj === null || obj === undefined) return true
  if ((obj instanceof Buffer || Array.isArray(obj)) && !obj.length) return true
  if ((obj instanceof Map || obj instanceof Set) && !obj.size) return true
  if (typeof obj === 'object' && !Object.keys(obj).length) return true
  return false
}

isEmpty._accepts = ['ANY']
isEmpty._dependencies = []

export default isEmpty