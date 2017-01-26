function pretty (obj, space = '  ') {
  try {
    return JSON.stringify(obj, null, space)
  } catch (err) {
    console.error(err)
    return ''
  }
}

pretty._accepts = [Object, Array, Date]
pretty._dependencies = []

export default pretty