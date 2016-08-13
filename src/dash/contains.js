export default function contains (list, obj) {
  return list.reduce((prev, cur) => (cur === obj && prev), false)
}