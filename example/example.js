import path from 'path'
import compile from '../src/compile'

let compiledPath = path.resolve(__dirname, '../compiled')

let config = {
  /*
  dash: {
    minify: false,
    include: ['map', 'keys']
  },
  */
  /*
  query: {
    minify: false,
    browserify: true,
    name: '$_',
    include: ['find', 'addClass', 'on', 'off', 'one']
  }
  */
  dash: {
    minify: false,
    include: [
      'circular',
      'contains',
      'ensureArray',
      'filter',
      'find',
      'forEach',
      'get',
      'has',
      'includes',
      'intersection',
      'isArray',
      'isBoolean',
      'isData',
      'isFunction',
      'isHash',
      'isNumber',
      'isObject',
      'isPromise',
      'isString',
      'keys',
      'map',
      'mapValues',
      'mapWith',
      'omitBy',
      'pickBy',
      'pretty',
      'range',
      'set',
      'stringify',
      'union',
      'uniq',
      'without'
    ]
  }
}

compile(config, compiledPath, { postClean: false }).then(() => {
  // let _ = require(path.resolve(compiledPath, 'litedash.dash'))
  // console.log(_.range(10))
  console.log('done')
})
