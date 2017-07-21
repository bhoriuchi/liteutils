# liteutils
Customizable jQuery-like and lodash-like libraries

### Why?
The aim of this project is to provide dependency free, customized builds of 
jQuery-like and lodash-like libraries. With liteutils you can produce a library
that contains only the methods/commands you need. This can potentially reduce the 
size of your application considerably.

Liteutils produces libraries with no dependencies that can be used in browser
and node.js applications.

### Usage

Liteutils requires node.js to build and should always be set as a devDependency.
A build file/application is required to perform the custom library build

### Example Build file

```js
var liteutils = require('liteutils')
var path = require('path')

var config = {
  query: {
    dest: path.resolve(__dirname, '../src/liteutils.query.js'),
    postClean: true,
    include: [
      'each',
      'find'
    ]
  },
  dash: {
    dest: path.resolve(__dirname, '../src/liteutils.dash.js'),
    postClean: true,
    include: [
      'forEach',
      'get'
    ]
  }
}

liteutils(config).then(function () {
  console.log('liteutils build complete')
})
  .catch(console.error)
```