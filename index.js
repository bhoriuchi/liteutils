'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _ = _interopDefault(require('lodash'));
var path = _interopDefault(require('path'));
var Promise$1 = _interopDefault(require('bluebird'));
var Browserify = _interopDefault(require('browserify'));
var rollup = require('rollup');
var babel = _interopDefault(require('rollup-plugin-babel'));
var uglify = _interopDefault(require('rollup-plugin-uglify'));

function isString(obj) {
  return typeof obj === 'string';
}

isString._accepts = ['ANY'];
isString._dependencies = [];

function capitalize(str) {
  return isString(str) && str.length ? '' + str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;
}

capitalize._accepts = [String];
capitalize._dependencies = ['dash.isString'];

function ensureArray(obj) {
  if (!arguments.length) return [];
  return Array.isArray(obj) ? obj : [obj];
}

ensureArray._accepts = ['ANY'];
ensureArray._dependencies = [];

function castArray(value) {
  return ensureArray(value);
}

castArray._accepts = ['ANY'];
castArray._dependencies = [];

function isArray(obj) {
  return Array.isArray(obj);
}

isArray._accepts = ['ANY'];
isArray._dependencies = [];

function forEach(obj, fn) {
  try {
    if (isArray(obj)) {
      var idx = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = obj[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var val = _step.value;

          if (fn(val, idx) === false) break;
          idx++;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else {
      for (var key in obj) {
        if (fn(obj[key], key) === false) break;
      }
    }
  } catch (err) {
    return;
  }
}

forEach._accepts = [Object, Array];
forEach._dependencies = ['dash.isArray'];

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};





















var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function isObject(obj) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null;
}

isObject._accepts = ['ANY'];
isObject._dependencies = [];

function isFunction(obj) {
  return typeof obj === 'function';
}

isFunction._accepts = ['ANY'];
isFunction._dependencies = [];

function contains(list, obj) {
  return list.reduce(function (prev, cur) {
    return cur === obj && prev;
  }, false);
}

contains._accepts = [Array];
contains._dependencies = [];

function isDate(obj) {
  return obj instanceof Date;
}

isDate._accepts = ['ANY'];
isDate._dependencies = [];

function isEmpty(obj) {
  if (obj === '' || obj === null || obj === undefined) return true;
  if ((obj instanceof Buffer || Array.isArray(obj)) && !obj.length) return true;
  if ((obj instanceof Map || obj instanceof Set) && !obj.size) return true;
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && !Object.keys(obj).length) return true;
  return false;
}

isEmpty._accepts = ['ANY'];
isEmpty._dependencies = [];

function isHash(obj) {
  return isObject(obj) && !isArray(obj) && !isDate(obj) && !isEmpty(obj);
}

isHash._accepts = ['ANY'];
isHash._dependencies = ['dash.isArray', 'dash.isDate', 'dash.isObject'];

function includes(obj, key) {
  return isArray(obj) && obj.indexOf(key) !== -1;
}

includes._accepts = [Array];
includes._dependencies = ['dash.isArray'];

// modified from http://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
function mergeDeep(target, source) {
  var seen = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (includes(seen, target) || includes(seen, source)) return target;
  seen = seen.concat([target, source]);

  if (isHash(target) && isHash(source)) {
    for (var key in source) {
      if (isHash(source[key])) {
        if (!target[key]) Object.assign(target, defineProperty({}, key, {}));
        mergeDeep(target[key], source[key], seen.slice());
      } else {
        Object.assign(target, defineProperty({}, key, source[key]));
      }
    }
  }
  return target;
}

function merge() {
  var args = [].concat(Array.prototype.slice.call(arguments));

  if (args.length === 0) return {};else if (args.length === 1) return args[0];else if (!isHash(args[0])) return {};

  var target = args[0];
  var sources = args.slice(1);

  forEach(sources, function (source) {
    if (isHash(source)) mergeDeep(target, source);
  });
  return target;
}

merge._accepts = [Object];
merge._dependencies = ['dash.isHash', 'dash.forEach', 'dash.includes'];

function map(obj, fn) {
  var output = [];
  forEach(obj, function (v, k) {
    return output.push(fn(v, k));
  });
  return output;
}

map._accepts = [Object, Array];
map._dependencies = ['dash.forEach'];

function clone(obj) {
  var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (isArray(obj)) return deep ? map(obj, function (o) {
    return clone(o, true);
  }) : obj.slice(0);
  if (isHash(obj)) return deep ? merge({}, obj) : Object.assign({}, obj);
  if (isDate(obj) && deep) return new Date(obj);
  return obj;
}

clone._accepts = [Object, Array];
clone._dependencies = ['dash.isArray', 'dash.isHash', 'dash.isDate', 'dash.merge', 'dash.map'];

function circular(obj) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '[Circular]';

  var circularEx = function circularEx(_obj) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var seen = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    seen.push(_obj);
    if (isObject(_obj)) {
      forEach(_obj, function (o, i) {
        if (contains(seen, o)) _obj[i] = isFunction(value) ? value(_obj, key, clone(seen)) : value;else circularEx(o, i, clone(seen));
      });
    }
    return _obj;
  };

  if (!obj) throw new Error('circular requires an object to examine');
  return circularEx(obj, value);
}

circular._accepts = [Object, Array];
circular._dependencies = ['dash.forEach', 'dash.isObject', 'dash.isFunction', 'dash.contains', 'dash.clone'];

function difference() {
  var args = [].concat(Array.prototype.slice.call(arguments));
  if (!args.length) return [];

  return args.reduce(function (prev, cur) {
    if (!isArray(prev) || !isArray(cur)) return [];
    var left = new Set(prev);
    var right = new Set(cur);
    var d = [].concat(toConsumableArray(left)).filter(function (item) {
      return !right.has(item);
    });
    return [].concat(toConsumableArray(d));
  }, args[0]);
}

difference._accepts = [Array];
difference._dependencies = ['dash.isArray'];

// taken from lodash - https://github.com/lodash/lodash
function escapeRegExp(str) {
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reHasRegExpChar = RegExp(reRegExpChar.source);
  str = toString(str);
  return str && reHasRegExpChar.test(str) ? str.replace(reRegExpChar, '\\$&') : str;
}

escapeRegExp._accepts = [String];
escapeRegExp._dependencies = [];

function filter(obj, fn) {
  var newObj = [];
  if (!isArray(obj)) return newObj;
  forEach(obj, function (v, k) {
    if (fn(v, k)) newObj.push(v);
  });
  return newObj;
}

filter._accepts = [Array];
filter._dependencies = ['dash.isArray', 'dash.forEach'];

function first(array) {
  return !Array.isArray(array) || !array.length ? undefined : array[0];
}

first._accepts = [Array];
first._dependencies = [];

function isNumber(obj) {
  return typeof obj === 'number' && !isNaN(obj);
}

isNumber._accepts = ['ANY'];
isNumber._dependencies = [];

function toPath(pathString) {
  if (isArray(pathString)) return pathString;
  if (isNumber(pathString)) return [pathString];

  // taken from lodash - https://github.com/lodash/lodash
  var pathRx = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g;
  var pathArray = [];

  if (isString(pathString)) {
    pathString.replace(pathRx, function (match, number, quote, string) {
      pathArray.push(quote ? string : number !== undefined ? Number(number) : match);
      return pathArray[pathArray.length - 1];
    });
  }
  return pathArray;
}

toPath._accepts = [String];
toPath._dependencies = ['dash.isString', 'dash.isArray', 'dash.isNumber'];

function get$1(obj, path$$1, defaultValue) {
  var fields = isArray(path$$1) ? path$$1 : toPath(path$$1);

  var idx = 0;
  var length = fields.length;

  while (obj !== null && idx < length) {
    obj = obj[fields[idx++]];
  }

  return idx && idx === length ? obj : defaultValue;
}

get$1._accepts = [Object, Array];
get$1._dependencies = ['dash.isArray', 'dash.toPath'];

function has(obj, path$$1) {
  path$$1 = toPath(path$$1);

  var index = -1;
  var _path = path$$1,
      length = _path.length;

  var result = false;
  var key = void 0;

  while (++index < length) {
    key = path$$1[index];
    if (!(result = obj != null && Object.prototype.hasOwnProperty.call(obj, key))) {
      break;
    }
    obj = obj[key];
  }

  return result;
}

has._accepts = [Object, Array];
has._dependencies = ['dash.toPath'];

function identity(value) {
  return value;
}

identity._accepts = ['ANY'];
identity._dependencies = [];

function intersection() {
  var args = [].concat(Array.prototype.slice.call(arguments));
  if (!args.length) return [];

  return args.reduce(function (prev, cur) {
    if (!isArray(prev) || !isArray(cur)) return [];
    var left = new Set(prev);
    var right = new Set(cur);
    var i = [].concat(toConsumableArray(left)).filter(function (item) {
      return right.has(item);
    });
    return [].concat(toConsumableArray(i));
  }, args[0]);
}

intersection._accepts = [Array];
intersection._dependencies = ['dash.isArray'];

function isBoolean(obj) {
  return obj === true || obj === false;
}

isBoolean._accepts = ['ANY'];
isBoolean._dependencies = [];

function isPromise(obj) {
  return obj instanceof Promise || obj && isFunction(obj.then) && isFunction(obj.catch);
}

isPromise._accepts = ['ANY'];
isPromise._dependencies = ['dash.isFunction'];

// ported from https://gist.github.com/tdukart/b87afb278c41245741ae7a0c355a0a0b
function kebabCase(string) {
  if (!isString(string)) return '';
  var result = string;

  // Convert camelCase capitals to kebab-case.
  result = result.replace(/([a-z][A-Z])/g, function (match) {
    return match.substr(0, 1) + '-' + match.substr(1, 1).toLowerCase();
  });

  // Convert non-camelCase capitals to lowercase.
  result = result.toLowerCase();

  // Convert non-alphanumeric characters to hyphens
  result = result.replace(/[^-a-z0-9]+/g, '-');

  // Remove hyphens from both ends
  result = result.replace(/^-+/, '').replace(/-$/, '');

  return result;
}

kebabCase._accepts = [String];
kebabCase._dependencies = ['dash.isString'];

/*
function range (number = 0, increment = 1) {
  return [ ...Array(number).keys() ].map(i => i * increment)
}
*/

function range(start, end, step) {
  if (end === undefined && step === undefined) {
    end = start;
    start = 0;
    step = 1;
  } else if (step === undefined) {
    step = 1;
  }

  // non numbers return empty array
  if (!isNumber(start) || !isNumber(end) || !isNumber(step) || !step) return [];
  if (start === end) return [start];

  var count = start;
  var _range = [];

  if (start < end) {
    while (count < end) {
      _range.push(count);
      count += Math.abs(step);
    }
  } else {
    while (count > end) {
      _range.push(count);
      count -= Math.abs(step);
    }
  }

  return _range;
}

range._accepts = [Number];
range._dependencies = ['dash.isNumber'];

function keys(obj) {
  try {
    return isArray(obj) ? range(obj.length) : Object.keys(obj);
  } catch (err) {
    return [];
  }
}

keys._accepts = [Object, Array];
keys._dependencies = ['dash.isArray', 'dash.range'];

function mapKeys(obj, fn) {
  var newObj = {};
  forEach(obj, function (v, k) {
    var newKey = fn(v, k);
    newObj[typeof newKey === 'string' ? newKey : k] = v;
  });
  return newObj;
}

mapKeys._accepts = [Object];
mapKeys._dependencies = ['dash.forEach'];

function mapValues(obj, fn) {
  var newObj = {};
  forEach(obj, function (v, k) {
    newObj[k] = fn(v, k);
  });
  return newObj;
}

mapValues._accepts = [Object];
mapValues._dependencies = ['dash.forEach'];

function mapWith(obj, fn) {
  var newObj = [];
  forEach(obj, function (v, k) {
    var value = fn(v, k);
    if (value !== undefined) newObj.push(value);
  });
  return newObj;
}

mapWith._accepts = [Object, Array];
mapWith._dependencies = ['dash.forEach'];

function omitBy(obj, fn) {
  var newObj = {};
  if (!isHash(obj)) return newObj;
  forEach(obj, function (v, k) {
    if (!fn(v, k)) newObj[k] = v;
  });
  return newObj;
}

omitBy._accepts = [Object];
omitBy._dependencies = ['dash.isHash', 'dash.forEach'];

function omit(obj, omits) {
  omits = Array.isArray(omits) ? omits : [];
  return omitBy(obj, function (v, k) {
    return omits.indexOf(k) !== -1;
  });
}

omit._accepts = [Object];
omit._dependencies = ['dash.omitBy'];

function pickBy(obj, fn) {
  var newObj = {};
  if (!isHash(obj)) return newObj;
  forEach(obj, function (v, k) {
    if (fn(v, k)) newObj[k] = v;
  });
  return newObj;
}

pickBy._accepts = [Object];
pickBy._dependencies = ['dash.isHash', 'dash.forEach'];

function pretty(obj) {
  var space = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '  ';

  try {
    return JSON.stringify(obj, null, space);
  } catch (err) {
    console.error(err);
    return '';
  }
}

pretty._accepts = [Object, Array, Date];
pretty._dependencies = [];

function properCase(string) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';

  if (!isString(string)) return '';
  return string.replace(/[\s-_]+/g, '-').split('-').map(function (v) {
    return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
  }).join(separator);
}

properCase._accepts = [String];
properCase._dependencies = ['dash.isString'];

function reduce(collection, iteratee, accumulator) {
  if (!isObject(collection) && !isArray(collection)) return undefined;
  if (!isFunction(iteratee)) {
    accumulator = iteratee;
    iteratee = identity;
  }

  accumulator = accumulator !== undefined ? accumulator : isArray(collection) ? collection.length ? collection[0] : undefined : keys(collection).length ? collection[keys(collection)[0]] : undefined;

  forEach(collection, function (value, key) {
    accumulator = iteratee(accumulator, value, key, collection);
  });

  return accumulator;
}

reduce._accepts = [Object, Array];
reduce._dependencies = ['dash.forEach', 'dash.isObject', 'dash.isArray', 'dash.isFunction', 'dash.identity', 'dash.keys'];

function set$1(obj, path$$1, val) {
  var fields = isArray(path$$1) ? path$$1 : toPath(path$$1);

  forEach(fields, function (field, idx) {
    if (idx === fields.length - 1) obj[field] = val;else if (!obj[field]) obj[field] = isNumber(field) ? [] : {};
    obj = obj[field];
  });
}

set$1._accepts = [Object, Array];
set$1._dependencies = ['dash.isArray', 'dash.isNumber', 'dash.toPath', 'dash.forEach'];

function stringify(obj) {
  try {
    if (isHash(obj) || isArray(obj)) return JSON.stringify(obj);else if (has(obj, 'toString')) return obj.toString();else return String(obj);
  } catch (err) {}
  return '';
}

stringify._accepts = ['ANY'];
stringify._dependencies = ['dash.has', 'dash.isArray', 'dash.isHash'];

function sum(array) {
  if (!Array.isArray(array) || !array.length) return 0;
  return array.reduce(function (total, val) {
    return total += val;
  });
}

sum._accepts = [Array];
sum._dependencies = [];

function toLower(string) {
  return isString(string) ? string.toLowerCase() : '';
}

toLower._accepts = [String];
toLower._dependencies = ['dash.isString'];

function toUpper(string) {
  return isString(string) ? string.toUpperCase() : '';
}

toUpper._accepts = [String];
toUpper._dependencies = ['dash.isString'];

function union() {
  var args = [].concat(Array.prototype.slice.call(arguments));
  if (!args.length) return [];

  try {
    var u = args.reduce(function (prev, cur) {
      if (!isArray(prev) || !isArray(cur)) return [];
      return prev.concat(cur);
    }, []);

    return [].concat(toConsumableArray(new Set(u)));
  } catch (err) {
    console.error(err);
    return [];
  }
}

union._accepts = ['ANY'];
union._dependencies = ['dash.isArray'];

function uniq(list) {
  return isArray(list) ? [].concat(toConsumableArray(new Set(list))) : [];
}

uniq._accepts = [Array];
uniq._dependencies = ['dash.isArray'];

// taken from hat - https://github.com/substack/node-hat
function uuid(bits, base) {
  if (!base) base = 16;
  if (bits === undefined) bits = 128;
  if (bits <= 0) return '0';

  var digits = Math.log(Math.pow(2, bits)) / Math.log(base);
  for (var i = 2; digits === Infinity; i *= 2) {
    digits = Math.log(Math.pow(2, bits / i)) / Math.log(base) * i;
  }

  var rem = digits - Math.floor(digits);

  var res = '';

  for (var _i = 0; _i < Math.floor(digits); _i++) {
    var x = Math.floor(Math.random() * base).toString(base);
    res = x + res;
  }

  if (rem) {
    var b = Math.pow(base, rem);
    var _x = Math.floor(Math.random() * b).toString(base);
    res = _x + res;
  }

  var parsed = parseInt(res, base);
  if (parsed !== Infinity && parsed >= Math.pow(2, bits)) {
    return uuid(bits, base);
  } else return res;
}

uuid._accepts = [];
uuid._dependencies = [];

function without() {
  var output = [];
  var args = [].concat(Array.prototype.slice.call(arguments));
  if (args.length < 2) return args.length ? args[0] : [];
  var search = args.slice(1);

  forEach(args[0], function (val) {
    if (!includes(search, val)) output.push(val);
  });
  return output;
}

without._accepts = [Array];
without._dependencies = ['dash.forEach', 'dash.includes'];

var dash = {
  capitalize: capitalize,
  castArray: castArray,
  circular: circular,
  clone: clone,
  contains: contains,
  difference: difference,
  ensureArray: ensureArray,
  escapeRegExp: escapeRegExp,
  filter: filter,
  first: first,
  find: filter,
  forEach: forEach,
  get: get$1,
  has: has,
  identity: identity,
  includes: includes,
  intersection: intersection,
  isArray: isArray,
  isBoolean: isBoolean,
  isDate: isDate,
  isEmpty: isEmpty,
  isFunction: isFunction,
  isHash: isHash,
  isNumber: isNumber,
  isObject: isObject,
  isPromise: isPromise,
  isString: isString,
  kebabCase: kebabCase,
  keys: keys,
  map: map,
  mapKeys: mapKeys,
  mapValues: mapValues,
  mapWith: mapWith,
  merge: merge,
  omit: omit,
  omitBy: omitBy,
  pickBy: pickBy,
  pretty: pretty,
  properCase: properCase,
  range: range,
  reduce: reduce,
  set: set$1,
  stringify: stringify,
  sum: sum,
  toLower: toLower,
  toPath: toPath,
  toUpper: toUpper,
  union: union,
  uniq: uniq,
  uuid: uuid,
  without: without
};

var addClass = function addClass(className) {
  var classList = Array.isArray(className) ? className : className.split(/\s+/);
  this.each(function (i, el) {
    forEach(classList, function (clazz) {
      return el.classList.add(clazz);
    });
  });
};

addClass._dependencies = ['query.each', 'dash.forEach'];

var rx = /^data-(.+)/;

function getAttrs(node) {
  var obj = {};

  forEach(node.attributes, function (attr) {
    var name = attr.name,
        nodeName = attr.nodeName,
        localName = attr.localName,
        value = attr.value,
        nodeValue = attr.nodeValue,
        textContent = attr.textContent;

    name = name || nodeName || localName;
    value = value || nodeValue || textContent;

    if (isString(name) && name.match(rx)) {
      obj[name.replace(rx, '$1')] = value;
    }
  });
  return obj;
}

function hasAttr(node, attrName) {
  var has = false;
  if (!node || !node.attributes) return has;
  forEach(node.attributes, function () {
    var _attr = attr,
        name = _attr.name,
        nodeName = _attr.nodeName,
        localName = _attr.localName;

    name = name || nodeName || localName;
    if (name === 'data-' + attrName) {
      has = true;
      return false;
    }
  });
  return has;
}

function setAttr(node, key, value) {
  if (hasAttr(node, key)) {
    node.setAttribute('data-' + key, value);
  } else {
    var _attr2 = document.createAttribute('data-' + key);
    _attr2.value = value;
    node.setAttributeNode(_attr2);
  }
}

var data = function data(key, val) {
  var node = this[0];

  if (!node) {
    return null;
  } else if (!key) {
    return getAttrs(node);
  } else if (key && val === undefined) {
    if (isString(key)) {
      return getAttrs(node)[key];
    } else if (isObject(key)) {
      return forEach(key, function (v, k) {
        setAttr(node, k, v);
      });
    }
  }

  // set a key/value
  setAttr(node, key, val);
};

data._dependencies = ['dash.isString', 'dash.isObject', 'dash.forEach'];

var each = function each(fn) {
  forEach(this.slice(0, this.length), function (v, k) {
    return fn.bind(v)(k, v);
  });
};

each._baseutil = true;
each._dependencies = ['dash.forEach'];

var mapNodes = function mapNodes(element, selector) {
  return mapWith(element.querySelectorAll(selector), function (v) {
    return isObject(v) ? v : undefined;
  });
};

mapNodes._chainable = false;
mapNodes._dependencies = ['dash.mapWith', 'dash.isObject'];

var find$1 = function find(selector) {
  var results = [];
  this.each(function () {
    results = union(results, mapNodes(this, selector));
  });
  return this.init(results, this);
};

find$1._terminates = true;
find$1._dependencies = ['query.mapNodes', 'query.each', 'dash.union'];

function removeEvent(store, el, event, handler, uuid) {
  var toRemove = [];

  var _event$split = event.split(/\.(.+)?/),
      _event$split2 = slicedToArray(_event$split, 2),
      evt = _event$split2[0],
      ns = _event$split2[1];

  forEach(store.active, function (e) {
    var isElement = e.el === el;
    var isNS = e.ns === ns || !e.ns && !ns;
    var isEvent = e.event === event && isNS;
    var isHandler = e.handler === handler;
    var foundUUID = uuid === e.uuid;
    var foundEvent = isElement && (!event || isEvent && (isHandler || !handler));
    if (foundUUID || foundEvent) {
      toRemove.push(e);
      if (isFunction(e.off)) e.off();
    }
  });
  store.active = without.apply(this, [store.active].concat(toRemove));
}

var off = function off(events, selector, handler) {
  var queue = [];

  if (isFunction(selector) && !handler) {
    handler = selector;
    selector = undefined;
  }

  var base = selector ? this.find(selector) : this;

  if (isString(events)) {
    queue = map(events.split(/\s+/g), function (event) {
      return { event: event, handler: handler };
    });
  } else if (events instanceof this.$root.Event) {
    queue = [{ uuid: events.handlerId }];
  } else if (isHash(events)) {
    forEach(events, function (h, e) {
      queue = union(queue, map(e.split(/\s+/g), function (event) {
        return { event: event, handler: h };
      }));
    });
  } else if (!events) {
    base.each(function () {
      removeEvent(base.$root.event, this);
    });
    return this;
  }

  base.each(function () {
    var _this = this;

    forEach(queue, function (q) {
      return removeEvent(base.$root.event, _this, q.event, q.handler, q.uuid);
    });
  });

  return this;
};

off._dependencies = ['dash.isFunction', 'dash.isString', 'dash.isHash', 'dash.forEach', 'dash.union', 'dash.without', 'dash.map'];

function offHandler(el, event, handler) {
  if (el.addEventListener) {
    el.addEventListener(event, handler, false);
    return function () {
      return el.removeEventListener(event, handler, false);
    };
  } else if (el.attachEvent) {
    el.attachEvent(event, handler);
    return function () {
      return el.detachEvent(event, handler);
    };
  }
  return function () {
    return false;
  };
}

function addEvents(one, events, selector, data, fn) {
  if (!isString(selector)) {
    fn = data;
    data = selector;
    selector = undefined;
  }
  if (!isFunction(fn) && isFunction(data)) {
    fn = data;
    data = undefined;
  }
  if (!fn) fn = function fn() {
    return false;
  };

  var base = selector ? this.find(selector) : this;
  var uuid = base.$root.uuid();

  base.each(function (i, el) {
    var handler = function handler(event) {
      var e = new base.$root.Event(event, data, uuid);
      fn.call(el, e);
      if (one) base.off(e);
    };
    var prefix = !el.addEventListener ? 'on' : '';

    forEach(events.split(/\s+/g), function (event) {
      var _event$split = event.split(/\.(.+)?/),
          _event$split2 = slicedToArray(_event$split, 2),
          evt = _event$split2[0],
          ns = _event$split2[1];

      event = evt;
      var off = offHandler(el, '' + prefix + evt, handler);
      base.$root.event.active.push({ el: el, event: event, ns: ns, handler: handler, off: off, uuid: uuid });
    });
  });
}

var onEvent = function onEvent(one, events, selector, data, fn) {
  var _this = this;

  if (isHash(events)) forEach(events, function (h, e) {
    return addEvents.call(_this, one, e, selector, data, h);
  });else if (isString(events)) addEvents.call(this, one, events, selector, data, fn);
  return this;
};

onEvent._chainable = false;
onEvent._dependencies = ['dash.isFunction', 'dash.isString', 'dash.isHash', 'dash.forEach', 'query.each', 'query.find'];

var on = function on(events, selector, data, fn) {
  onEvent.call(this, false, events, selector, data, fn);
  return this;
};

on._dependencies = ['query.onEvent'];

var one = function one(events, selector, data, fn) {
  onEvent.call(this, true, events, selector, data, fn);
  return this;
};

one._dependencies = ['query.onEvent'];

var query = {
  _dependencies: ['dash.forEach', 'query.mapNodes'],
  addClass: addClass,
  data: data,
  each: each,
  find: find$1,
  mapNodes: mapNodes,
  off: off,
  on: on,
  one: one,
  onEvent: onEvent
};

var fs = Promise$1.promisifyAll(require('fs-extra'));
var pkg = { name: 'liteutils', version: '0.1.0' };
var baseDir = __dirname.replace(/(.*\/liteutils).*/, '$1');
var srcPath = path.resolve(baseDir, './src');
var compilePath = path.resolve(baseDir, './compiled');
var libs = { dash: dash, query: query

  // copy function that can modify the files contents before writing
};function copy(src, dest) {
  var encoding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'utf8';
  var modifier = arguments[3];

  return fs.readFileAsync(src, { encoding: encoding }).then(function (data) {
    data = _.isFunction(modifier) ? modifier(data) : data;
    return fs.writeFileAsync(dest, data, { encoding: encoding });
  });
}

var LiteutilsCompiler = function () {
  function LiteutilsCompiler(config) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
      return true;
    };
    classCallCheck(this, LiteutilsCompiler);

    this.config = config;
    this.callback = callback;
    return this.compile();
  }

  createClass(LiteutilsCompiler, [{
    key: 'compile',
    value: function compile() {
      var _this = this;

      return Promise$1.each(_.keys(this.config), function (type) {
        var _config$type = _this.config[type],
            compileDir = _config$type.compileDir,
            minify = _config$type.minify,
            browserify = _config$type.browserify,
            name = _config$type.name,
            include = _config$type.include,
            dest = _config$type.dest,
            encoding = _config$type.encoding,
            postClean = _config$type.postClean,
            eslint = _config$type.eslint,
            babelrc = _config$type.babelrc;


        encoding = encoding || 'utf8';
        compilePath = compileDir ? path.resolve(compileDir) : compilePath;

        if (!_.isString(dest)) throw new Error(type + ' configuration is missing "dest" setting');

        // generate a list of includes
        var includes = _.map(_.isArray(include) ? include : type === 'dash' ? _.without(_.keys(dash), '_dependencies') : _.without(_.keys(query), '_dependencies'), function (name) {
          return { type: type, name: name };
        });
        includes = _.union(includes, _.get(libs, type + '._dependencies', []));

        // resolve the dependencies
        var deps = _this.resolveDependencies(_this.normalizeConfig(includes));

        // clean the dir
        return fs.emptyDirAsync(compilePath).then(function () {
          return fs.writeFileAsync(path.resolve(compilePath, '.babelrc'), '{\n  "presets": ["es2015-rollup"]\n}');
        }).then(function () {
          // create a library
          return Promise$1.each(deps, function (dep) {
            var srcFile = path.resolve(srcPath, dep.type, dep.name + '.js');
            var dstFile = path.resolve(compilePath, dep.type + '.' + dep.name + '.js');

            // copy the source to dest and update the imports
            return copy(srcFile, dstFile, encoding, function (data) {
              data = eslint === false ? '/* eslint-disable */\n' + data : data;
              return data.replace(/(^import.*from\s+'\.\/)(.*)(')/gm, '$1' + dep.type + '.$2$3').replace(/(^import.* from\s+')(\.)(\.\/.*)(\/)(.*')/gm, '$1$3.$5').replace(/^.*\._dependencies.*\n$/gm, '') + '\n';
            });
          })
          // create the lib entry file
          .then(function () {
            var libFile = path.resolve(compilePath, type + '.js');
            var libData = _this.buildLib(deps, type, eslint);
            return fs.writeFileAsync(libFile, libData, { encoding: encoding });
          })
          // copy the current main file with some modifications
          .then(function () {
            var modSrc = path.resolve(srcPath, type, 'main.js');
            var modDest = path.resolve(compilePath, type + '.index.js');
            return copy(modSrc, modDest, encoding, function (data) {
              return data.replace(/(^import\s+)(_)(.*)(\s+from\s+'\.\/)(index)(')/gm, '$1$2$3$4$3$6').replace(/(^import.* from\s+')(\.)(\.\/.*)(\/)(.*')/gm, '$1$3.$5').replace(/'\.\.\//gm, '\'./').replace(/(^let\s+infoName\s+=\s+')(.*)(')/gm, '$1' + (pkg.name || 'liteutils') + '$3').replace(/(^let\s+infoVersion\s+=\s+')(.*)(')/gm, '$1' + (pkg.version || '0.0.1') + '$3') + '\n';
            });
          })
          // now compile the module
          .then(function () {
            var entry = path.resolve(compilePath, type + '.index.js');
            var destPath = path.resolve(compilePath, 'litedash.' + type + '.js');
            var plugins = [babel()];

            if (minify) plugins.push(uglify());
            return rollup.rollup({
              entry: entry,
              plugins: plugins
            }).then(function (bundle) {
              return bundle.write({
                format: 'cjs',
                dest: destPath
              });
            }).then(function () {
              copy(destPath, destPath, encoding, function (data) {
                return eslint === false ? '/* eslint-disable */\n' + data : data;
              });
            });
          })
          // do browserify transform if specified
          .then(function () {
            if (!browserify) {
              return fs.copyAsync(path.resolve(compilePath, 'litedash.' + type + '.js'), path.resolve(dest));
            }
            var opts = { standalone: name || type };
            var srcPath = path.resolve(compilePath, 'litedash.' + type + '.js');
            var destPath = path.resolve(dest);

            return new Promise$1(function (resolve, reject) {
              Browserify(srcPath, opts).bundle(function (err, buff) {
                if (err) return reject(err);
                return fs.writeFileAsync(destPath, buff, { encoding: encoding }).then(resolve, reject);
              });
            }).then(function () {
              copy(destPath, destPath, encoding, function (data) {
                return eslint === false ? '/* eslint-disable */\n' + data : data;
              });
            });
          })
          // remove babelrc files
          .then(function () {
            if (babelrc === false) return fs.unlinkAsync(path.resolve(compilePath, './.babelrc'));
            return true;
          })
          // optional cleanup
          .then(function () {
            if (postClean) return fs.emptyDirAsync(compilePath);
            return true;
          });
        });
      }).then(function () {
        return _this.callback();
      }, function (error) {
        console.error(error);
        _this.callback(error);
      });
    }
  }, {
    key: 'normalizeConfig',
    value: function normalizeConfig(config) {
      var added = [];
      return _(config).map(function (c) {
        // allow shortcut in the form type.name
        if (_.isString(c)) {
          var _c$split = c.split('.'),
              _c$split2 = slicedToArray(_c$split, 2),
              type = _c$split2[0],
              _name = _c$split2[1];

          c = { type: type, name: _name };
        }
        var name = c && c.type && c.name ? c.type + '.' + c.name : null;
        if (!name || _.includes(added, name) || !_.get(libs, name)) return;
        added.push(name);
        return c;
      }).without(undefined).value();
    }
  }, {
    key: 'resolveDependencies',
    value: function resolveDependencies(config) {
      var newConfig = [];
      var resolved = [],
          unresolved = [];

      unresolved = _.map(config, function (c) {
        return c.type + '.' + c.name;
      });
      while (unresolved.length) {
        _.forEach(unresolved, function (u) {
          var _u$split = u.split('.'),
              _u$split2 = slicedToArray(_u$split, 2),
              type = _u$split2[0],
              name = _u$split2[1];

          newConfig.push({ type: type, name: name });
          resolved.push(u);
          _.forEach(_.get(libs, u + '._dependencies', []), function (dep) {
            if (!_.includes(_.union(resolved, unresolved), dep)) {
              unresolved.push(dep);
            }
          });
        });
        _.pull.apply(this, [unresolved].concat(resolved));
      }
      return newConfig;
    }
  }, {
    key: 'buildLib',
    value: function buildLib(config, type, eslint) {
      var _imports = [],
          _exports = [],
          _returns = [];

      _.forEach(config, function (c) {
        if (c.type === type) {
          _imports.push('import ' + c.name + ' from \'./' + c.type + '.' + c.name + '\'');
          _exports.push('export { ' + c.name + ' }');
          _returns.push('' + c.name);
        }
      });
      return '' + (eslint === false ? '/* eslint-disable */\n' : '') + _imports.join('\n') + '\n\n' + _exports.join('\n') + '\n\nexport default {\n  ' + _returns.join(',\n  ') + '\n}\n';
    }
  }]);
  return LiteutilsCompiler;
}();

var index = function (config) {
  return new LiteutilsCompiler(config);
};

module.exports = index;
