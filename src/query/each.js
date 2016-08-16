import forEach from '../dash/forEach'

let each = function (elements = [], fn) {
  forEach(elements, (v, k) => fn.bind(v)(k, v))
}

each._baseutil = true
each._dependencies = ['dash.forEach']

export default each