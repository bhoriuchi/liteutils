export default function htmlGenerator (html) {
  let div = document.createElement('div')
  div.innerHTML = html
  return div.childNodes
}