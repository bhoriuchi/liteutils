import _query from './index' // Replace with query

let arr = []

let forEach = function (obj, fn) {
  if (Array.isArray(obj)) {
    let idx = 0
    for (let val of obj) {
      if (fn(val, idx) === false) break
      idx++
    }
  } else {
    for (const key in obj) {
      if (fn(obj[key], key) === false) break
    }
  }
}

function mapNodes (element, selector) {
  let obj = []
  forEach(element.querySelectorAll(selector), (v) => {
    if (typeof v === 'object') obj.push(v)
  })
  return obj
}

let lQuery = function (selector, context) {
  let nodes = []
  if (selector instanceof lQuery) nodes = selector
  else if (typeof selector === 'string') nodes = mapNodes(context || document, selector)
  else nodes = [ selector ]
  this.length = nodes.length
  forEach(nodes, (node, idx) => {
    this[idx] = node
  })
}

let query = function (selector, context) {
  return new query.fn.init(selector, context)
}

query.fn = {
  init: function (selector, context) {
    console.log('initing')
    forEach(query.fn, (v, k) => {
      lQuery.prototype[k] = v
    })
    return new lQuery(selector, context)
  },
  find: function (selector) {
    let results = []
  }
}

forEach(_query, (fn, name) => {
  if (fn._baseutil === true) query[name] = fn
  if (fn._chainable !== false) {
    query.fn[name] = function () {
      let args = [this.slice(0, this.length)].concat([ ...arguments ])
      let result = fn.apply(this, args)
      return fn._terminates == true ? result : this
    }
  }
  query.fn.splice = arr.splice
  query.fn.slice = arr.slice
  query.fn.pop = arr.pop
  query.fn.push = arr.push
})

export default query