import addClass from './addClass'
import data from './data'
import each from './each'
import find from './find'
import mapNodes from './mapNodes'
import off from './off'
import on from './on'
import one from './one'
import onEvent from './onEvent'

export default {
  _dependencies: [
    'dash.forEach',
    'query.mapNodes'
  ],
  addClass,
  data,
  each,
  find,
  mapNodes,
  off,
  on,
  one,
  onEvent
}