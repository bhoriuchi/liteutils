function identity (value) {
  return value
}

identity._accepts = ['ANY']
identity._dependencies = []

export default identity