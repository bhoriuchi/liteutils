let range = function (number = 0, increment = 1) {
  return [ ...Array(number).keys() ].map(i => i * increment)
}

range._chainable = true
range._accepts = [Number]
range._dependencies = []

export default range