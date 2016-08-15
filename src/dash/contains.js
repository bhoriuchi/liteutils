let contains = function (list, obj) {
  return list.reduce((prev, cur) => (cur === obj && prev), false)
}

contains._accepts = [Array]
contains._dependencies = []

export default contains