import _ from 'lodash'
import path from 'path'
import Promise from 'bluebird'
import Browserify from 'browserify'
import { rollup } from 'rollup'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import dash from './dash/index'
import query from './query/index'
let libs = { dash, query }

let fs = Promise.promisifyAll(require('fs-extra'))
let pkg = { name: 'liteutils', version: '0.1.0' }
let baseDir = __dirname.replace(/(.*\/liteutils).*/, '$1')
let srcPath = path.resolve(baseDir, './src')
let compilePath = path.resolve(baseDir, './compiled')

// copy function that can modify the files contents before writing
function copy (src, dest, encoding = 'utf8', modifier) {
  return fs.readFileAsync(src, { encoding }).then((data) => {
    data = _.isFunction(modifier) ? modifier(data) : data
    return fs.writeFileAsync(dest, data, { encoding })
  })
}

class LiteutilsCompiler {
  constructor (config) {
    this.config = config
  }

  compile () {
    Promise.each(_.keys(this.config), type => {
      let opt = _.get(this.config, 'type', {})
      let lib = _.get(libs, `["${type}"]`)
      let o = {}

      if (!_.isString(opt.dest)) throw new Error(`${type} configuration is missing "dest" setting`)
      if (!lib) throw new Error(`${type} is not a valid package`)

      o.encoding = opt.encoding || 'utf8'
      o.compilePath = opt.compileDir
        ? path.resolve(opt.compileDir)
        : compilePath

      // generate a list of includes
      let includes = _.isArray(opt.include)
        ? opt.include
        : _.without(_.keys(lib), '_dependencies')


      this.includes = _.map(_.isArray(opt.include)
        ? opt.include
        : type === 'dash'
          ? _.without(_.keys(dash), '_dependencies')
          : _.without(_.keys(query), '_dependencies'),
        (name) => { return { type, name } })
      this.includes = _.union(this.includes, _.get(libs, `${type}._dependencies`, []))
    })
  }

  resolveIncludes () {
    _.forEach(this.config, (opts, libName) => {
      let lib = _.get(libs, `["${libName}"]`)

    })
  }
}




_.forEach(dash, fn => {
  console.log(`export ${fn.toString()}`)
})
