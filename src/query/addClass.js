import each from './each'

let addClass = function (elements = [], className) {
  let classList = Array.isArray(className) ? className : className.split(/\s+/)
  each(elements, function (i, el) {
    each(classList, function (j, clazz) {
      el.classList.add(clazz)
    })
  })
}

addClass._dependencies = ['query.each']

export default addClass