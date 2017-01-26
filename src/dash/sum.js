function sum (array) {
  if (!Array.isArray(array) || !array.length) return 0
  return array.reduce((total, val) => total += val)
}

sum._accepts = [Array]
sum._dependencies = []

export default sum