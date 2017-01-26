import isArray from './isArray'

function uniq (list) {
  return isArray(list) ? [ ...new Set(list) ] : []
}

uniq._accepts = [Array]
uniq._dependencies = ['dash.isArray']

export default uniq