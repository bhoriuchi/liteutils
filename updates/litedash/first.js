export default function first (arr) {
  return Array.isArray(arr) && arr.length
    ? arr[0]
    : undefined
}
