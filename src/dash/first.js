function first (array) {
  return (!Array.isArray(array) || !array.length)
    ? undefined
    : array[0]
}

first._accepts = [Array]
first._dependencies = []

export default first