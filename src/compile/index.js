import path from 'path'
import FileSystem from 'fs'
import _ from 'lodash'
import Promise from 'bluebird'
import { rollup } from 'rollup'
import babel from 'rollup-plugin-babel'
import dash from '../dash'

let fs = Promise.promisifyAll(FileSystem)

let libs = { dash }

// determine source path during dev or packaged usage
let baseDir = __dirname.replace(/(.*\/liteutils).*/, '$1')
let srcPath = path.resolve(baseDir, './src')
let buildPath = path.resolve(baseDir, './build')
let compilePath = path.resolve(baseDir, './compiled')

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

export function buildIndex (lib) {
  let chainName = `${lib.charAt(0).toUpperCase()}${lib.slice(1).toLowerCase()}Chain`

  return `import _${lib} from './${lib}'
  
let ${chainName} = function (obj) {
  this._value = obj
}
${chainName}.prototype.value = function () {
  return this._value
}

let ${lib} = function (obj) {
  return new ${chainName}(obj)
}

for (const name in _${lib}) {
  let fn = _${lib}[name]
  ${lib}[name] = fn
  if (fn._chainable === true) {
    ${chainName}.prototype[name] = function () {
      let args = [this._value].concat([ ...arguments ])
      this._value = fn.apply(this, args)
      return fn._terminates ? this._value : this
    }
  }
}

export default ${lib}`
}

// builds/compiles the package
export default function compile (config, dir, options = {}) {
  // dir = dir || path.resolve(baseDir, './compiled')
  let encoding = options.encoding || 'utf8'
  let libsToBuild = []
  config = resolveDependencies(normalizeConfig(config))

  // clean the build directory and copy all the source files
  return clean(compilePath, '.babelrc').then(() => {
    return Promise.each(config, (c) => {
      libsToBuild = _.union(libsToBuild, [c.type])
      let srcFile = path.resolve(srcPath, c.type, `${c.name}.js`)
      let dstFile = path.resolve(compilePath, `${c.type}.${c.name}.js`)
      return copy(srcFile, dstFile, encoding, (data) => {
        // prefix import file names with type.
        // filter out dependencies since not necessary in built lib
        return data
          .replace(/(^import.*from\s+'\.\/)(.*)(')/gm, `$1${c.type}.$2$3`)
          .replace(/^.*\._dependencies.*\n$/gm, '')
      })
    })
  }).then(() => {
    // build each main library
    return Promise.each(libsToBuild, (libName) => {
      let libFile = path.resolve(compilePath, `${libName}.js`)
      let libData = buildLib(config, libName)
      return fs.writeFileAsync(libFile, libData, { encoding })
    })
  }).then(() => {
    // build each module library
    return Promise.each(libsToBuild, (libName) => {
      let libFile = path.resolve(compilePath, `${libName}.index.js`)
      let libData = buildIndex(libName)
      return fs.writeFileAsync(libFile, libData, { encoding })
    })
  }).then(() => {
    // do rollup builds
    return Promise.each(libsToBuild, (libName) => {
      let entryPath = path.resolve(compilePath, `${libName}.index.js`)
      let destPath = path.resolve(compilePath, `litedash.${libName}.js`)
      return rollup({
        entry: entryPath,
        plugins: [ babel() ]
      }).then((bundle) => {
        return bundle.write({
          format: 'cjs',
          dest: destPath
        })
      })
    }).then(() => {
      if (options.postClean !== false) {
        let except = _.union(_.map(libsToBuild, (l) => `litedash.${l}.js`), ['.babelrc'])
        return clean(compilePath, except)
      }
    })
  })
}