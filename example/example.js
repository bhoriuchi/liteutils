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
  query: {
    minify: false,
    browserify: true,
    name: '$_',
    include: ['find', 'addClass', 'on', 'off', 'one']
  }
}

compile(config, compiledPath, { postClean: false }).then(() => {
  // let _ = require(path.resolve(compiledPath, 'litedash.dash'))
  // console.log(_.range(10))
  console.log('done')
})
