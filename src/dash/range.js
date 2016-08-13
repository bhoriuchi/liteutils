export default function range (number = 0, increment = 1) {
  return [ ...Array(number).keys() ].map(i => i * increment)
}