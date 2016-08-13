import pretty from '../src/dash/pretty'
import merge from '../src/dash/merge'


let a = {
  a: {
    b: {
      c: 1
    }
  },
  z: [
    { f: 1 }
  ]
}

let b = {
  z: [
    { n: 2 }
  ]
}

console.log(pretty(merge(a, b)))