import path from 'path'
import FileSystem from 'fs'
import _ from 'lodash'
import Promise from 'bluebird'
import browserify from 'browserify'
import { rollup } from 'rollup'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import dash from '../dash/index'
import query from '../query/index'
// import pkg from '../../package.json'
let pkg = { name: 'liteutils', version: '0.1.0' }
let fs = Promise.promisifyAll(FileSystem)

let libs = { dash, query }

// determine source path during dev or packaged usage
let baseDir = __dirname.replace(/(.*\/liteutils).*/, '$1')
let srcPath = path.resolve(baseDir, './src')
let buildPath = path.resolve(baseDir, './build')
let compilePath = path.resolve(baseDir, './compiled')

// copies a file
export function copy (src, dest, encoding = 'utf8', modifier) {
  return fs.readFileAsync(src, { encoding }).then((data) => {
    data = _.isFunction(modifier) ? modifier(data) : data
    return fs.writeFileAsync(dest, data, { encoding })
  })
}

// cleans the target directory before build/compile
export function clean (dir, except = []) {
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
      _imports.push(`import ${c.name} from './${c.type}.${c.name}'`)
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
  let keep = ['.babelrc']

  return clean(compilePath, '.babelrc').then(() => {
    return Promise.each(_.keys(config), (type) => {
      let libConfig = config[type]
      let includes = _.map(Array.isArray(libConfig.include)
        ? libConfig.include
        : type === 'dash'
          ? _.without(_.keys(dash), '_dependencies')
          : _.without(_.keys(query), '_dependencies'),
        (name) => { return { type, name } })
      includes = _.union(includes, _.get(libs, `${type}._dependencies`, []))
      let nc = normalizeConfig(includes)
      let deps = resolveDependencies(nc)

      return Promise.each(deps, (d) => {
        let srcFile = path.resolve(srcPath, d.type, `${d.name}.js`)
        let dstFile = path.resolve(compilePath, `${d.type}.${d.name}.js`)
        return copy(srcFile, dstFile, encoding, (data) => {
          // prefix import file names with type.
          // filter out dependencies since not necessary in built lib
          return data
            .replace(/(^import.*from\s+'\.\/)(.*)(')/gm, `$1${d.type}.$2$3`)
            .replace(/(^import.* from\s+')(\.)(\.\/.*)(\/)(.*')/gm, '$1$3.$5')
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
            .replace(/(^import\s+)(_)(.*)(\s+from\s+'\.\/)(index)(')/gm, '$1$2$3$4$3$6')
            .replace(/(^import.* from\s+')(\.)(\.\/.*)(\/)(.*')/gm, '$1$3.$5')
            .replace(/'\.\.\//gm, '\'./')
            .replace(/(^let\s+infoName\s+=\s+')(.*)(')/gm, `$1${pkg.name || 'liteutils'}$3`)
            .replace(/(^let\s+infoVersion\s+=\s+')(.*)(')/gm, `$1${pkg.version || '0.0.1'}$3`)
        })
      }).then(() => {
        let entry = path.resolve(compilePath, `${type}.index.js`)
        let destPath = path.resolve(compilePath, `litedash.${type}.js`)
        let plugins = [ babel() ]
        keep.push(`litedash.${type}.js`)

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
      }).then(() => {
        if (!libConfig.browserify) return
        let opts = {
          standalone: libConfig.name
        }
        let srcPath = path.resolve(compilePath, `litedash.${type}.js`)
        let destPath = path.resolve(compilePath, `litedash.${type}.browser.js`)
        keep.push(`litedash.${type}.browser.js`)

        return new Promise((resolve, reject) => {
          browserify(srcPath, opts).bundle((err, buff) => {
            if (err) return reject(err)
            fs.writeFileAsync(destPath, buff, { encoding }).then(resolve).catch(reject)
          })
        })
      })
    }).then(() => {
      if (options.postClean !== false) {
        return clean(compilePath, keep)
      }
    }).catch(console.log)
  })
}

export default compile