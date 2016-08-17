import addClass from './addClass'
import each from './each'
import find from './find'
import mapNodes from './mapNodes'
import off from './off'
import on from './on'

export default {
  _dependencies: [
    'dash.forEach',
    'query.mapNodes'
  ],
  addClass,
  each,
  find,
  mapNodes,
  off,
  on
}