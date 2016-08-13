import forEach from './forEach'
import includes from './includes'

export default function without () {
  let output = []
  let args = [ ...arguments ]
  if (args.length < 2) return args.length ? args[0] : []
  let search = args.slice(1)

  forEach(args[0], function (val) {
    if (!includes(search, val)) output.push(val)
  })
  return output
}