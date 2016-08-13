export default function union () {
  let args = [ ...arguments ]
  return [ ...new Set(args.reduce((prev, cur) => [ ...prev ].concat([ ...cur ]), [])) ]
}