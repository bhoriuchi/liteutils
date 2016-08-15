import path from 'path'
import compile from '../src/compile'

let compiledPath = path.resolve(__dirname, '../compiled')

let config = {
  dash: {
    minify: false,
    include: ['map', 'keys']
  }
}

let oldConfig = [
  { type: 'dash', name: 'map' },
  'dash.keys',
  'dash.keys'
]

compile(config, compiledPath, { postClean: false }).then(() => {
  let _ = require(path.resolve(compiledPath, 'litedash.dash'))
  console.log(_.range(10))
})
