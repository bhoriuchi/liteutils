import path from 'path'
import liteutils from '../src/index'

liteutils({
  query: {
    minify: false,
    browserify: true,
    name: '$_',
    dest: path.resolve(__dirname, 'query.js'),
    postClean: true
  }
})
.then(() => {
  console.log('done')
})
.catch((err) => {
  console.error(err)
})