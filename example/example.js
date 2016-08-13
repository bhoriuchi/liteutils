import pretty from '../src/dash/pretty'
import merge from '../src/dash/merge'
import _ from 'lodash'

let a = {
  a: {
    b: {
      c: a
    }
  },
  z: [
    { f: 1 },
    {h: 7, i: 8 },
    [1, new Date()]
  ]
}

let b = {
  z: [
    [9],
    { n: 2, bool: true }
  ],
  u: () => {}
}

/*
let a2 = _.cloneDeep(a)
let b2 = _.cloneDeep(b)

console.log('lite', merge(a, b))
console.log('dash', _.merge(a2, b2))
  */
/*
function tryit (txt) {
  console.log(`tryit ${txt}`)
}

let liteWrap = function (obj) {
  this.obj = obj
}

liteWrap.prototype.tryit = function () {
  return tryit(this.obj)
}

let lite = function (obj) {

  return new liteWrap(obj)
}

lite.tryit = tryit


// lite.tryit('helpyme')
lite('herere').tryit()
*/
import dash from '../src/dash/main'

console.log(dash.keys({a: 1, b: 2}))
console.log(dash({a: 1, b: 2}).keys().map((v) => {
  return { a: v }
}).value())

console.log(dash.keys(dash(1)))