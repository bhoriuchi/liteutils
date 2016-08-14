let pretty = function (obj, space = '  ') {
  try {
    return JSON.stringify(obj, null, space)
  } catch (err) {
    console.error(err)
    return ''
  }
}

pretty._chainable = true
pretty._accepts = [Object, Array, Date]
pretty._dependencies = []

export default pretty