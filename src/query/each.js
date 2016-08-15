import forEach from '../dash/forEach'

let each = function (obj, fn) {
  forEach(obj, (v, k) => fn(v, k))
}

each._dependencies = ['dash.forEach']