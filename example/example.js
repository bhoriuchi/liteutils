import path from 'path'
import compile from '../src/compile'

let compiledPath = path.resolve(__dirname, '../compiled')

let config = {
  dash: {
    minify: false,
    include: ['map', 'keys']
  }
}

compile(config, compiledPath, { postClean: true }).then(() => {
  let _ = require(path.resolve(compiledPath, 'litedash.dash'))
  console.log(_.range(10))
})
