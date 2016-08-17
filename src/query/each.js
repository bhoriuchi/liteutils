import forEach from '../dash/forEach'

let each = function (fn) {
  forEach(this.slice(0, this.length), (v, k) => fn.bind(v)(k, v))
}

each._baseutil = true
each._dependencies = ['dash.forEach']

export default each