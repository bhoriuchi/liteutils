import path from 'path'
import compile from '../src/compile'

let compiledPath = path.resolve(__dirname, '../compiled')

compile([
  { type: 'dash', name: 'map' },
  'dash.keys',
  'dash.keys'
], compiledPath, { postClean: true }).then(() => {
  let _ = require(path.resolve(compiledPath, 'litedash.dash'))
  console.log(_.range(10))
})
