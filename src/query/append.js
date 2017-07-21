import forEach from '../dash/forEach'

let append = function () {
  let contentList = [...arguments]
  this.each(function (i, el) {
    forEach(contentList, (content) => el.classList.add(clazz))
  })
}

append._dependencies = [
  'query.each',
  'dash.forEach'
]

export default append