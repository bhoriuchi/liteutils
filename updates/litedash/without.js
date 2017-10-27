export default function without (arr, ...values) {
  if (!Array.isArray(arr)) return []
  return arr.filter(value => {
    return values.indexOf(value) === -1
  })
}
