import path from 'path'
import FileSystem from 'fs'
import _ from 'lodash'
import Promise from 'bluebird'
import dash from '../dash'

let fs = Promise.promisifyAll(FileSystem)

let libs = { dash }

// determine source path during dev or packaged usage
let srcPath = path.resolve(__dirname, __dirname.match(/\/liteutils\/src\/compile$/) ? '../../src' : './src')

// copies a file
export default function copy (src, dest, encoding = 'utf8', modifier) {
  return fs.readFileAsync(src, { encoding }).then((data) => {
    data = _.isFunction(modifier) ? modifier(data) : data
    return fs.writeFileAsync(dest, data, { encoding })
  })
}

// cleans the target directory before build/compile
export default function clean (dir, except = []) {
  except = Array.isArray(except) ? except : [except]
  return fs.readdirAsync(dir).then((files) => {
    return Promise.each(files, (file) => {
      if (!_.includes(except, file)) return fs.unlinkAsync(path.resolve(dir, file))
    })
  })
}

// updates the config with the required dependencies
export function resolveDependencies (config) {
  let newConfig = []
  let [ resolved, unresolved ] = [ [], [] ]
  unresolved = _.map(config, (c) => `${c.type}.${c.name}`)
  while (unresolved.length) {
    _.forEach(unresolved, (u) => {
      let [ type, name ] = u.split('.')
      newConfig.push({ type, name })
      resolved.push(u)

      _.forEach(_.get(libs, `${u}._dependencies`, []), (dep) => {
        if (!_.includes(_.union(resolved, unresolved), dep)) {
          unresolved.push(dep)
        }
      })
    })
    _.pull.apply(this, [unresolved].concat(resolved))
  }
  return newConfig
}

// makes the config into objects { type, name } and filters invalid
export function normalizeConfig (config) {
  let added = []
  return _(config).map((c) => {
    // allow shortcut in the form type.name
    if (_.isString(c)) {
      let [ type, name ] = c.split('.')
      c = { type, name }
    }
    let name = c && c.type && c.name ? `${c.type}.${c.name}` : null
    if (!name || _.includes(added, name) || !_.get(libs, name)) return
    added.push(name)
    return c
  }).without(undefined).value()
}

export function buildLib (config, type) {
  let [ _imports, _exports, _returns ] = [ [], [], [] ]
  _.forEach(config, (c) => {
    if (c.type === type) {
      _imports.push(`import ${c.name} from './${c.type}.${c.name}.js'`)
      _exports.push(`export { ${c.name} }`)
      _returns.push(`${c.name}`)
    }
  })
  return `${_imports.join('\n')}

${_exports.join('\n')}

export default {
  ${_returns.join(',\n  ')}
}`
}

// builds/compiles the package
export default function compile (config, dir, options = {}) {
  dir = dir || path.resolve(__dirname, './compiled')
  let encoding = options.encoding || 'utf8'
  let libsToBuild = []
  config = resolveDependencies(normalizeConfig(config))

  console.log(config)

  // clean the build directory
  return clean(dir, '.liteutils').then(() => {
    // copy each file in the config
    return Promise.each(config, (c) => {
      libsToBuild = _.union(libsToBuild, [c.type])
      let srcFile = path.resolve(srcPath, c.type, `${c.name}.js`)
      let dstFile = path.resolve(dir, `${c.type}.${c.name}.js`)
      return copy(srcFile, dstFile, encoding, (data) => {
        // prefix import file names with type.
        return data.replace(/(^import.*from\s+'\.\/)(.*)(')/gm, `$1${c.type}.$2$3`)
      })
    })
  }).then(() => {
    return Promise.each(libsToBuild, (libName) => {
      let libFile = path.resolve(dir, `${libName}.js`)
      let libData = buildLib(config, libName)
      return fs.writeFileAsync(libFile, libData, { encoding })
    })
  })
}