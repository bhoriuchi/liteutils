import path from 'path'
// import _ from 'lodash'
// import dash from '../src/dash/main'
let compiledPath = path.resolve(__dirname, '../compiled')
import compile from '../src/compile'

compile([
  { type: 'dash', name: 'map' },
  'dash.keys',
  'dash.keys'
], compiledPath)