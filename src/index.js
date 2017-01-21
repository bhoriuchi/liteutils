import _ from 'lodash'
import path from 'path'
import Promise from 'bluebird'
import Browserify from 'browserify'
import { rollup } from 'rollup'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import dash from './dash/index'
import query from './query/index'

let fs = Promise.promisifyAll(require('fs-extra'))
let pkg = { name: 'liteutils', version: '0.1.0' }
let baseDir = __dirname.replace(/(.*\/liteutils).*/, '$1')
let srcPath = path.resolve(baseDir, './src')
let compilePath = path.resolve(baseDir, './compiled')
let libs = { dash, query }

// copy function that can modify the files contents before writing
function copy (src, dest, encoding = 'utf8', modifier) {
  return fs.readFileAsync(src, { encoding }).then((data) => {
    data = _.isFunction(modifier) ? modifier(data) : data
    return fs.writeFileAsync(dest, data, { encoding })
  })
}

class LiteutilsCompiler {
  constructor (config, callback = () => true) {
    this.config = config
    this.callback = callback
    return this.compile()
  }

  compile () {
    return Promise.each(_.keys(this.config), (type) => {
      let {
        compileDir,
        minify,
        browserify,
        name,
        include,
        dest,
        encoding,
        postClean,
        eslint,
        babelrc
      } = this.config[type]

      encoding = encoding || 'utf8'
      compilePath = compileDir ? path.resolve(compileDir) : compilePath

      if (!_.isString(dest)) throw new Error(`${type} configuration is missing "dest" setting`)

      // generate a list of includes
      let includes = _.map(_.isArray(include)
          ? include
          : type === 'dash'
          ? _.without(_.keys(dash), '_dependencies')
          : _.without(_.keys(query), '_dependencies'),
        (name) => { return { type, name } })
      includes = _.union(includes, _.get(libs, `${type}._dependencies`, []))

      // resolve the dependencies
      let deps = this.resolveDependencies(this.normalizeConfig(includes))

      // clean the dir
      return fs.emptyDirAsync(compilePath)
        .then(() => fs.writeFileAsync(path.resolve(compilePath, '.babelrc'), '{\n  "presets": ["es2015-rollup"]\n}'))
        .then(() => {
          // create a library
          return Promise.each(deps, (dep) => {
            let srcFile = path.resolve(srcPath, dep.type, `${dep.name}.js`)
            let dstFile = path.resolve(compilePath, `${dep.type}.${dep.name}.js`)

            // copy the source to dest and update the imports
            return copy(srcFile, dstFile, encoding, (data) => {
              data = eslint === false ? `/* eslint-disable */\n${data}` : data
              return data
                .replace(/(^import.*from\s+'\.\/)(.*)(')/gm, `$1${dep.type}.$2$3`)
                .replace(/(^import.* from\s+')(\.)(\.\/.*)(\/)(.*')/gm, '$1$3.$5')
                .replace(/^.*\._dependencies.*\n$/gm, '') + '\n'
            })
          })
          // create the lib entry file
            .then(() => {
              let libFile = path.resolve(compilePath, `${type}.js`)
              let libData = this.buildLib(deps, type, eslint)
              return fs.writeFileAsync(libFile, libData, { encoding })
            })
            // copy the current main file with some modifications
            .then(() => {
              let modSrc = path.resolve(srcPath, type, 'main.js')
              let modDest = path.resolve(compilePath, `${type}.index.js`)
              return copy(modSrc, modDest, encoding, (data) => {
                data = eslint === false ? `/* eslint-disable */\n${data}` : data
                return data
                  .replace(/(^import\s+)(_)(.*)(\s+from\s+'\.\/)(index)(')/gm, '$1$2$3$4$3$6')
                  .replace(/(^import.* from\s+')(\.)(\.\/.*)(\/)(.*')/gm, '$1$3.$5')
                  .replace(/'\.\.\//gm, '\'./')
                  .replace(/(^let\s+infoName\s+=\s+')(.*)(')/gm, `$1${pkg.name || 'liteutils'}$3`)
                  .replace(/(^let\s+infoVersion\s+=\s+')(.*)(')/gm, `$1${pkg.version || '0.0.1'}$3`) + '\n'
              })
            })
            // now compile the module
            .then(() => {
              let entry = path.resolve(compilePath, `${type}.index.js`)
              let destPath = path.resolve(compilePath, `litedash.${type}.js`)
              let plugins = [ babel() ]

              if (minify) plugins.push(uglify())
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
            // do browserify transform if specified
            .then(() => {
              if (!browserify) {
                return fs.copyAsync(path.resolve(compilePath, `litedash.${type}.js`), path.resolve(dest))
              }
              let opts = { standalone: name || type }
              let srcPath = path.resolve(compilePath, `litedash.${type}.js`)
              let destPath = path.resolve(dest)

              return new Promise((resolve, reject) => {
                Browserify(srcPath, opts).bundle((err, buff) => {
                  if (err) return reject(err)
                  return fs.writeFileAsync(destPath, buff, { encoding }).then(resolve, reject)
                })
              })
            })
            // optional cleanup
            .then(() => {
              if (postClean) return fs.emptyDirAsync(compilePath)
              return true
            })
        })
    })
      .then(() => this.callback(), (error) => this.callback(error))
  }

  normalizeConfig (config) {
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

  resolveDependencies (config) {
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

  buildLib (config, type, eslint) {
    let [ _imports, _exports, _returns ] = [ [], [], [] ]
    _.forEach(config, (c) => {
      if (c.type === type) {
        _imports.push(`import ${c.name} from './${c.type}.${c.name}'`)
        _exports.push(`export { ${c.name} }`)
        _returns.push(`${c.name}`)
      }
    })
    return `${eslint === false ? '/* eslint-disable */\n' : ''}${_imports.join('\n')}

${_exports.join('\n')}

export default {
  ${_returns.join(',\n  ')}
}
`
  }
}

export default function (config) {
  return new LiteutilsCompiler(config)
}