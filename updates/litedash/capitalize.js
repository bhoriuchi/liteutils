export default function capitalize (str) {
  return typeof str === 'string' && str.length
    ? `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`
    : ''
}
