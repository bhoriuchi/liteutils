import ensureArray from './ensureArray'

function castArray (value) {
  return ensureArray(value)
}

castArray._accepts = ['ANY']
castArray._dependencies = []

export default castArray