import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  format: 'cjs',
  plugins: [ babel() ],
  dest: 'index.js',
  external: [
    'rollup-plugin-uglify',
    'rollup',
    'rollup-plugin-babel',
    'lodash',
    'browserify',
    'bluebird',
    'path',
    'fs',
    'fs-extra'
  ]
}