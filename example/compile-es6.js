import path from 'path'
import liteutils from '../src/index'

liteutils({
  query: {
    minify: false,
    browserify: true,
    name: '$_',
    dest: path.resolve(__dirname, 'query.js'),
    compileDir: path.resolve(__dirname, 'compiled')
  }
})
.then(() => {
  console.log('done')
})
.catch((err) => {
  console.error(err)
})