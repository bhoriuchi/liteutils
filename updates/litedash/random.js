import isNumber from './isNumber'
import isBoolean from './isBoolean'

export default function random (...args) {
  let lower = 0
  let upper = 1
  let floating = false

  switch (args.length) {
    case 1:
      if (isBoolean(args[0])) {
        floating = args[0]
      } else if (isNumber(args[0])) {
        upper = Math.ceil(args[0])
      }
      break
    case 2:
      if (isNumber(args[0])) {
        lower = Math.ceil(args[0])
      }
      if (isBoolean(args[1])) {
        floating = args[1]
      } else if (isNumber(args[1])) {
        upper = Math.ceil(args[1])
      }
      break
    case 3:
      if (isNumber(args[0])) {
        lower = Math.ceil(args[0])
      }
      if (isNumber(args[1])) {
        upper = Math.ceil(args[1])
      }
      if (isBoolean(args[2])) {
        floating = args[2]
      }
      break
  }

  if (lower > upper) lower = upper
  const rand = (Math.random() * (upper - lower)) + lower

  return floating
    ? rand
    : Math.floor(rand)
}
