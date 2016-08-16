import path from 'path'
import FileSystem from 'fs'
import _ from 'lodash'
import Promise from 'bluebird'
import { rollup } from 'rollup'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
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

// rewrite of compile with more versitile config structure
function compile (config, dir, options = {}) {
  let encoding = options.encoding || 'utf8'

  return clean(compilePath, '.babelrc').then(() => {
    let libs = _.keys(config)
    return Promise.each(libs, (type) => {
      let libConfig = config[type]
      let includes = _.map(libConfig.include, (name) => { return { type, name } })
      let deps = resolveDependencies(normalizeConfig(includes))

      return Promise.each(deps, (d) => {
        let srcFile = path.resolve(srcPath, d.type, `${d.name}.js`)
        let dstFile = path.resolve(compilePath, `${d.type}.${d.name}.js`)
        return copy(srcFile, dstFile, encoding, (data) => {
          // prefix import file names with type.
          // filter out dependencies since not necessary in built lib
          return data
            .replace(/(^import.*from\s+'\.\/)(.*)(')/gm, `$1${d.type}.$2$3`)
            .replace(/^.*\._dependencies.*\n$/gm, '')
        })
      }).then(() => {
        let libFile = path.resolve(compilePath, `${type}.js`)
        let libData = buildLib(deps, type)
        return fs.writeFileAsync(libFile, libData, { encoding })
      }).then(() => {
        let modSrc = path.resolve(srcPath, type, 'main.js')
        let modDest = path.resolve(compilePath, `${type}.index.js`)
        return copy(modSrc, modDest, encoding, (data) => {
          return data
            .replace(/(^import.*from\s+'\.\/)(.*)('\s+\/\/\s+Replace\s+with\s+)(.*)(\n)/gm, `$1$4'\n`)
            .replace(/'\.\.\//gm, '\'./')
        })
      }).then(() => {
        let entry = path.resolve(compilePath, `${type}.index.js`)
        let destPath = path.resolve(compilePath, `litedash.${type}.js`)
        let plugins = [ babel() ]
        if (libConfig.minify) plugins.push(uglify())
        return rollup({
          entry,
          plugins
        }).then((bundle) => {
          return bundle.write({
            format: 'cjs',
            dest: destPath
          })
        })
      })
    }).then(() => {
      if (options.postClean !== false) {
        let except = _.union(_.map(libs, (l) => `litedash.${l}.js`), ['.babelrc'])
        return clean(compilePath, except)
      }
    })
  })
}

export default compile