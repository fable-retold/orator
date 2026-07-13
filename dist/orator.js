"use strict";

const _excluded = ["version", "host"];
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.Orator = f();
  }
})(function () {
  var define, module, exports;
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }
          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }
        return n[i].exports;
      }
      for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
      return o;
    }
    return r;
  }()({
    1: [function (require, module, exports) {
      (function (global) {
        (function () {
          'use strict';

          var objectAssign = require('object.assign/polyfill')();

          // compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
          // original notice:

          /*!
           * The buffer module from node.js, for the browser.
           *
           * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
           * @license  MIT
           */
          function compare(a, b) {
            if (a === b) {
              return 0;
            }
            var x = a.length;
            var y = b.length;
            for (var i = 0, len = Math.min(x, y); i < len; ++i) {
              if (a[i] !== b[i]) {
                x = a[i];
                y = b[i];
                break;
              }
            }
            if (x < y) {
              return -1;
            }
            if (y < x) {
              return 1;
            }
            return 0;
          }
          function isBuffer(b) {
            if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
              return global.Buffer.isBuffer(b);
            }
            return !!(b != null && b._isBuffer);
          }

          // based on node assert, original notice:
          // NB: The URL to the CommonJS spec is kept just for tradition.
          //     node-assert has evolved a lot since then, both in API and behavior.

          // http://wiki.commonjs.org/wiki/Unit_Testing/1.0
          //
          // THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
          //
          // Originally from narwhal.js (http://narwhaljs.org)
          // Copyright (c) 2009 Thomas Robinson <280north.com>
          //
          // Permission is hereby granted, free of charge, to any person obtaining a copy
          // of this software and associated documentation files (the 'Software'), to
          // deal in the Software without restriction, including without limitation the
          // rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
          // sell copies of the Software, and to permit persons to whom the Software is
          // furnished to do so, subject to the following conditions:
          //
          // The above copyright notice and this permission notice shall be included in
          // all copies or substantial portions of the Software.
          //
          // THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
          // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
          // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
          // AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
          // ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
          // WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

          var util = require('util/');
          var hasOwn = Object.prototype.hasOwnProperty;
          var pSlice = Array.prototype.slice;
          var functionsHaveNames = function () {
            return function foo() {}.name === 'foo';
          }();
          function pToString(obj) {
            return Object.prototype.toString.call(obj);
          }
          function isView(arrbuf) {
            if (isBuffer(arrbuf)) {
              return false;
            }
            if (typeof global.ArrayBuffer !== 'function') {
              return false;
            }
            if (typeof ArrayBuffer.isView === 'function') {
              return ArrayBuffer.isView(arrbuf);
            }
            if (!arrbuf) {
              return false;
            }
            if (arrbuf instanceof DataView) {
              return true;
            }
            if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
              return true;
            }
            return false;
          }
          // 1. The assert module provides functions that throw
          // AssertionError's when particular conditions are not met. The
          // assert module must conform to the following interface.

          var assert = module.exports = ok;

          // 2. The AssertionError is defined in assert.
          // new assert.AssertionError({ message: message,
          //                             actual: actual,
          //                             expected: expected })

          var regex = /\s*function\s+([^\(\s]*)\s*/;
          // based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
          function getName(func) {
            if (!util.isFunction(func)) {
              return;
            }
            if (functionsHaveNames) {
              return func.name;
            }
            var str = func.toString();
            var match = str.match(regex);
            return match && match[1];
          }
          assert.AssertionError = function AssertionError(options) {
            this.name = 'AssertionError';
            this.actual = options.actual;
            this.expected = options.expected;
            this.operator = options.operator;
            if (options.message) {
              this.message = options.message;
              this.generatedMessage = false;
            } else {
              this.message = getMessage(this);
              this.generatedMessage = true;
            }
            var stackStartFunction = options.stackStartFunction || fail;
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, stackStartFunction);
            } else {
              // non v8 browsers so we can have a stacktrace
              var err = new Error();
              if (err.stack) {
                var out = err.stack;

                // try to strip useless frames
                var fn_name = getName(stackStartFunction);
                var idx = out.indexOf('\n' + fn_name);
                if (idx >= 0) {
                  // once we have located the function frame
                  // we need to strip out everything before it (and its line)
                  var next_line = out.indexOf('\n', idx + 1);
                  out = out.substring(next_line + 1);
                }
                this.stack = out;
              }
            }
          };

          // assert.AssertionError instanceof Error
          util.inherits(assert.AssertionError, Error);
          function truncate(s, n) {
            if (typeof s === 'string') {
              return s.length < n ? s : s.slice(0, n);
            } else {
              return s;
            }
          }
          function inspect(something) {
            if (functionsHaveNames || !util.isFunction(something)) {
              return util.inspect(something);
            }
            var rawname = getName(something);
            var name = rawname ? ': ' + rawname : '';
            return '[Function' + name + ']';
          }
          function getMessage(self) {
            return truncate(inspect(self.actual), 128) + ' ' + self.operator + ' ' + truncate(inspect(self.expected), 128);
          }

          // At present only the three keys mentioned above are used and
          // understood by the spec. Implementations or sub modules can pass
          // other keys to the AssertionError's constructor - they will be
          // ignored.

          // 3. All of the following functions must throw an AssertionError
          // when a corresponding condition is not met, with a message that
          // may be undefined if not provided.  All assertion methods provide
          // both the actual and expected values to the assertion error for
          // display purposes.

          function fail(actual, expected, message, operator, stackStartFunction) {
            throw new assert.AssertionError({
              message: message,
              actual: actual,
              expected: expected,
              operator: operator,
              stackStartFunction: stackStartFunction
            });
          }

          // EXTENSION! allows for well behaved errors defined elsewhere.
          assert.fail = fail;

          // 4. Pure assertion tests whether a value is truthy, as determined
          // by !!guard.
          // assert.ok(guard, message_opt);
          // This statement is equivalent to assert.equal(true, !!guard,
          // message_opt);. To test strictly for the value true, use
          // assert.strictEqual(true, guard, message_opt);.

          function ok(value, message) {
            if (!value) fail(value, true, message, '==', assert.ok);
          }
          assert.ok = ok;

          // 5. The equality assertion tests shallow, coercive equality with
          // ==.
          // assert.equal(actual, expected, message_opt);

          assert.equal = function equal(actual, expected, message) {
            if (actual != expected) fail(actual, expected, message, '==', assert.equal);
          };

          // 6. The non-equality assertion tests for whether two objects are not equal
          // with != assert.notEqual(actual, expected, message_opt);

          assert.notEqual = function notEqual(actual, expected, message) {
            if (actual == expected) {
              fail(actual, expected, message, '!=', assert.notEqual);
            }
          };

          // 7. The equivalence assertion tests a deep equality relation.
          // assert.deepEqual(actual, expected, message_opt);

          assert.deepEqual = function deepEqual(actual, expected, message) {
            if (!_deepEqual(actual, expected, false)) {
              fail(actual, expected, message, 'deepEqual', assert.deepEqual);
            }
          };
          assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
            if (!_deepEqual(actual, expected, true)) {
              fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
            }
          };
          function _deepEqual(actual, expected, strict, memos) {
            // 7.1. All identical values are equivalent, as determined by ===.
            if (actual === expected) {
              return true;
            } else if (isBuffer(actual) && isBuffer(expected)) {
              return compare(actual, expected) === 0;

              // 7.2. If the expected value is a Date object, the actual value is
              // equivalent if it is also a Date object that refers to the same time.
            } else if (util.isDate(actual) && util.isDate(expected)) {
              return actual.getTime() === expected.getTime();

              // 7.3 If the expected value is a RegExp object, the actual value is
              // equivalent if it is also a RegExp object with the same source and
              // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
            } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
              return actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase;

              // 7.4. Other pairs that do not both pass typeof value == 'object',
              // equivalence is determined by ==.
            } else if ((actual === null || typeof actual !== 'object') && (expected === null || typeof expected !== 'object')) {
              return strict ? actual === expected : actual == expected;

              // If both values are instances of typed arrays, wrap their underlying
              // ArrayBuffers in a Buffer each to increase performance
              // This optimization requires the arrays to have the same type as checked by
              // Object.prototype.toString (aka pToString). Never perform binary
              // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
              // bit patterns are not identical.
            } else if (isView(actual) && isView(expected) && pToString(actual) === pToString(expected) && !(actual instanceof Float32Array || actual instanceof Float64Array)) {
              return compare(new Uint8Array(actual.buffer), new Uint8Array(expected.buffer)) === 0;

              // 7.5 For all other Object pairs, including Array objects, equivalence is
              // determined by having the same number of owned properties (as verified
              // with Object.prototype.hasOwnProperty.call), the same set of keys
              // (although not necessarily the same order), equivalent values for every
              // corresponding key, and an identical 'prototype' property. Note: this
              // accounts for both named and indexed properties on Arrays.
            } else if (isBuffer(actual) !== isBuffer(expected)) {
              return false;
            } else {
              memos = memos || {
                actual: [],
                expected: []
              };
              var actualIndex = memos.actual.indexOf(actual);
              if (actualIndex !== -1) {
                if (actualIndex === memos.expected.indexOf(expected)) {
                  return true;
                }
              }
              memos.actual.push(actual);
              memos.expected.push(expected);
              return objEquiv(actual, expected, strict, memos);
            }
          }
          function isArguments(object) {
            return Object.prototype.toString.call(object) == '[object Arguments]';
          }
          function objEquiv(a, b, strict, actualVisitedObjects) {
            if (a === null || a === undefined || b === null || b === undefined) return false;
            // if one is a primitive, the other must be same
            if (util.isPrimitive(a) || util.isPrimitive(b)) return a === b;
            if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
            var aIsArgs = isArguments(a);
            var bIsArgs = isArguments(b);
            if (aIsArgs && !bIsArgs || !aIsArgs && bIsArgs) return false;
            if (aIsArgs) {
              a = pSlice.call(a);
              b = pSlice.call(b);
              return _deepEqual(a, b, strict);
            }
            var ka = objectKeys(a);
            var kb = objectKeys(b);
            var key, i;
            // having the same number of owned properties (keys incorporates
            // hasOwnProperty)
            if (ka.length !== kb.length) return false;
            //the same set of keys (although not necessarily the same order),
            ka.sort();
            kb.sort();
            //~~~cheap key test
            for (i = ka.length - 1; i >= 0; i--) {
              if (ka[i] !== kb[i]) return false;
            }
            //equivalent values for every corresponding key, and
            //~~~possibly expensive deep test
            for (i = ka.length - 1; i >= 0; i--) {
              key = ka[i];
              if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects)) return false;
            }
            return true;
          }

          // 8. The non-equivalence assertion tests for any deep inequality.
          // assert.notDeepEqual(actual, expected, message_opt);

          assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
            if (_deepEqual(actual, expected, false)) {
              fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
            }
          };
          assert.notDeepStrictEqual = notDeepStrictEqual;
          function notDeepStrictEqual(actual, expected, message) {
            if (_deepEqual(actual, expected, true)) {
              fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
            }
          }

          // 9. The strict equality assertion tests strict equality, as determined by ===.
          // assert.strictEqual(actual, expected, message_opt);

          assert.strictEqual = function strictEqual(actual, expected, message) {
            if (actual !== expected) {
              fail(actual, expected, message, '===', assert.strictEqual);
            }
          };

          // 10. The strict non-equality assertion tests for strict inequality, as
          // determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

          assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
            if (actual === expected) {
              fail(actual, expected, message, '!==', assert.notStrictEqual);
            }
          };
          function expectedException(actual, expected) {
            if (!actual || !expected) {
              return false;
            }
            if (Object.prototype.toString.call(expected) == '[object RegExp]') {
              return expected.test(actual);
            }
            try {
              if (actual instanceof expected) {
                return true;
              }
            } catch (e) {
              // Ignore.  The instanceof check doesn't work for arrow functions.
            }
            if (Error.isPrototypeOf(expected)) {
              return false;
            }
            return expected.call({}, actual) === true;
          }
          function _tryBlock(block) {
            var error;
            try {
              block();
            } catch (e) {
              error = e;
            }
            return error;
          }
          function _throws(shouldThrow, block, expected, message) {
            var actual;
            if (typeof block !== 'function') {
              throw new TypeError('"block" argument must be a function');
            }
            if (typeof expected === 'string') {
              message = expected;
              expected = null;
            }
            actual = _tryBlock(block);
            message = (expected && expected.name ? ' (' + expected.name + ').' : '.') + (message ? ' ' + message : '.');
            if (shouldThrow && !actual) {
              fail(actual, expected, 'Missing expected exception' + message);
            }
            var userProvidedMessage = typeof message === 'string';
            var isUnwantedException = !shouldThrow && util.isError(actual);
            var isUnexpectedException = !shouldThrow && actual && !expected;
            if (isUnwantedException && userProvidedMessage && expectedException(actual, expected) || isUnexpectedException) {
              fail(actual, expected, 'Got unwanted exception' + message);
            }
            if (shouldThrow && actual && expected && !expectedException(actual, expected) || !shouldThrow && actual) {
              throw actual;
            }
          }

          // 11. Expected to throw an error:
          // assert.throws(block, Error_opt, message_opt);

          assert.throws = function (block, /*optional*/error, /*optional*/message) {
            _throws(true, block, error, message);
          };

          // EXTENSION! This is annoying to write outside this module.
          assert.doesNotThrow = function (block, /*optional*/error, /*optional*/message) {
            _throws(false, block, error, message);
          };
          assert.ifError = function (err) {
            if (err) throw err;
          };

          // Expose a strict only variant of assert
          function strict(value, message) {
            if (!value) fail(value, true, message, '==', strict);
          }
          assert.strict = objectAssign(strict, assert, {
            equal: assert.strictEqual,
            deepEqual: assert.deepStrictEqual,
            notEqual: assert.notStrictEqual,
            notDeepEqual: assert.notDeepStrictEqual
          });
          assert.strict.strict = assert.strict;
          var objectKeys = Object.keys || function (obj) {
            var keys = [];
            for (var key in obj) {
              if (hasOwn.call(obj, key)) keys.push(key);
            }
            return keys;
          };
        }).call(this);
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "object.assign/polyfill": 64,
      "util/": 4
    }],
    2: [function (require, module, exports) {
      if (typeof Object.create === 'function') {
        // implementation from standard node.js 'util' module
        module.exports = function inherits(ctor, superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        };
      } else {
        // old school shim for old browsers
        module.exports = function inherits(ctor, superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function TempCtor() {};
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        };
      }
    }, {}],
    3: [function (require, module, exports) {
      module.exports = function isBuffer(arg) {
        return arg && typeof arg === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
      };
    }, {}],
    4: [function (require, module, exports) {
      (function (process, global) {
        (function () {
          // Copyright Joyent, Inc. and other Node contributors.
          //
          // Permission is hereby granted, free of charge, to any person obtaining a
          // copy of this software and associated documentation files (the
          // "Software"), to deal in the Software without restriction, including
          // without limitation the rights to use, copy, modify, merge, publish,
          // distribute, sublicense, and/or sell copies of the Software, and to permit
          // persons to whom the Software is furnished to do so, subject to the
          // following conditions:
          //
          // The above copyright notice and this permission notice shall be included
          // in all copies or substantial portions of the Software.
          //
          // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
          // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
          // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
          // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
          // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
          // USE OR OTHER DEALINGS IN THE SOFTWARE.

          var formatRegExp = /%[sdj%]/g;
          exports.format = function (f) {
            if (!isString(f)) {
              var objects = [];
              for (var i = 0; i < arguments.length; i++) {
                objects.push(inspect(arguments[i]));
              }
              return objects.join(' ');
            }
            var i = 1;
            var args = arguments;
            var len = args.length;
            var str = String(f).replace(formatRegExp, function (x) {
              if (x === '%%') return '%';
              if (i >= len) return x;
              switch (x) {
                case '%s':
                  return String(args[i++]);
                case '%d':
                  return Number(args[i++]);
                case '%j':
                  try {
                    return JSON.stringify(args[i++]);
                  } catch (_) {
                    return '[Circular]';
                  }
                default:
                  return x;
              }
            });
            for (var x = args[i]; i < len; x = args[++i]) {
              if (isNull(x) || !isObject(x)) {
                str += ' ' + x;
              } else {
                str += ' ' + inspect(x);
              }
            }
            return str;
          };

          // Mark that a method should not be used.
          // Returns a modified function which warns once by default.
          // If --no-deprecation is set, then it is a no-op.
          exports.deprecate = function (fn, msg) {
            // Allow for deprecating things in the process of starting up.
            if (isUndefined(global.process)) {
              return function () {
                return exports.deprecate(fn, msg).apply(this, arguments);
              };
            }
            if (process.noDeprecation === true) {
              return fn;
            }
            var warned = false;
            function deprecated() {
              if (!warned) {
                if (process.throwDeprecation) {
                  throw new Error(msg);
                } else if (process.traceDeprecation) {
                  console.trace(msg);
                } else {
                  console.error(msg);
                }
                warned = true;
              }
              return fn.apply(this, arguments);
            }
            return deprecated;
          };
          var debugs = {};
          var debugEnviron;
          exports.debuglog = function (set) {
            if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
            set = set.toUpperCase();
            if (!debugs[set]) {
              if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
                var pid = process.pid;
                debugs[set] = function () {
                  var msg = exports.format.apply(exports, arguments);
                  console.error('%s %d: %s', set, pid, msg);
                };
              } else {
                debugs[set] = function () {};
              }
            }
            return debugs[set];
          };

          /**
           * Echos the value of a value. Trys to print the value out
           * in the best way possible given the different types.
           *
           * @param {Object} obj The object to print out.
           * @param {Object} opts Optional options object that alters the output.
           */
          /* legacy: obj, showHidden, depth, colors*/
          function inspect(obj, opts) {
            // default options
            var ctx = {
              seen: [],
              stylize: stylizeNoColor
            };
            // legacy...
            if (arguments.length >= 3) ctx.depth = arguments[2];
            if (arguments.length >= 4) ctx.colors = arguments[3];
            if (isBoolean(opts)) {
              // legacy...
              ctx.showHidden = opts;
            } else if (opts) {
              // got an "options" object
              exports._extend(ctx, opts);
            }
            // set default options
            if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
            if (isUndefined(ctx.depth)) ctx.depth = 2;
            if (isUndefined(ctx.colors)) ctx.colors = false;
            if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
            if (ctx.colors) ctx.stylize = stylizeWithColor;
            return formatValue(ctx, obj, ctx.depth);
          }
          exports.inspect = inspect;

          // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
          inspect.colors = {
            'bold': [1, 22],
            'italic': [3, 23],
            'underline': [4, 24],
            'inverse': [7, 27],
            'white': [37, 39],
            'grey': [90, 39],
            'black': [30, 39],
            'blue': [34, 39],
            'cyan': [36, 39],
            'green': [32, 39],
            'magenta': [35, 39],
            'red': [31, 39],
            'yellow': [33, 39]
          };

          // Don't use 'blue' not visible on cmd.exe
          inspect.styles = {
            'special': 'cyan',
            'number': 'yellow',
            'boolean': 'yellow',
            'undefined': 'grey',
            'null': 'bold',
            'string': 'green',
            'date': 'magenta',
            // "name": intentionally not styling
            'regexp': 'red'
          };
          function stylizeWithColor(str, styleType) {
            var style = inspect.styles[styleType];
            if (style) {
              return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
            } else {
              return str;
            }
          }
          function stylizeNoColor(str, styleType) {
            return str;
          }
          function arrayToHash(array) {
            var hash = {};
            array.forEach(function (val, idx) {
              hash[val] = true;
            });
            return hash;
          }
          function formatValue(ctx, value, recurseTimes) {
            // Provide a hook for user-specified inspect functions.
            // Check that value is an object with an inspect function on it
            if (ctx.customInspect && value && isFunction(value.inspect) &&
            // Filter out the util module, it's inspect function is special
            value.inspect !== exports.inspect &&
            // Also filter out any prototype objects using the circular check.
            !(value.constructor && value.constructor.prototype === value)) {
              var ret = value.inspect(recurseTimes, ctx);
              if (!isString(ret)) {
                ret = formatValue(ctx, ret, recurseTimes);
              }
              return ret;
            }

            // Primitive types cannot have properties
            var primitive = formatPrimitive(ctx, value);
            if (primitive) {
              return primitive;
            }

            // Look up the keys of the object.
            var keys = Object.keys(value);
            var visibleKeys = arrayToHash(keys);
            if (ctx.showHidden) {
              keys = Object.getOwnPropertyNames(value);
            }

            // IE doesn't make error fields non-enumerable
            // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
            if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
              return formatError(value);
            }

            // Some type of object without properties can be shortcutted.
            if (keys.length === 0) {
              if (isFunction(value)) {
                var name = value.name ? ': ' + value.name : '';
                return ctx.stylize('[Function' + name + ']', 'special');
              }
              if (isRegExp(value)) {
                return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
              }
              if (isDate(value)) {
                return ctx.stylize(Date.prototype.toString.call(value), 'date');
              }
              if (isError(value)) {
                return formatError(value);
              }
            }
            var base = '',
              array = false,
              braces = ['{', '}'];

            // Make Array say that they are Array
            if (isArray(value)) {
              array = true;
              braces = ['[', ']'];
            }

            // Make functions say that they are functions
            if (isFunction(value)) {
              var n = value.name ? ': ' + value.name : '';
              base = ' [Function' + n + ']';
            }

            // Make RegExps say that they are RegExps
            if (isRegExp(value)) {
              base = ' ' + RegExp.prototype.toString.call(value);
            }

            // Make dates with properties first say the date
            if (isDate(value)) {
              base = ' ' + Date.prototype.toUTCString.call(value);
            }

            // Make error with message first say the error
            if (isError(value)) {
              base = ' ' + formatError(value);
            }
            if (keys.length === 0 && (!array || value.length == 0)) {
              return braces[0] + base + braces[1];
            }
            if (recurseTimes < 0) {
              if (isRegExp(value)) {
                return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
              } else {
                return ctx.stylize('[Object]', 'special');
              }
            }
            ctx.seen.push(value);
            var output;
            if (array) {
              output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
            } else {
              output = keys.map(function (key) {
                return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
              });
            }
            ctx.seen.pop();
            return reduceToSingleString(output, base, braces);
          }
          function formatPrimitive(ctx, value) {
            if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
            if (isString(value)) {
              var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
              return ctx.stylize(simple, 'string');
            }
            if (isNumber(value)) return ctx.stylize('' + value, 'number');
            if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
            // For some reason typeof null is "object", so special case here.
            if (isNull(value)) return ctx.stylize('null', 'null');
          }
          function formatError(value) {
            return '[' + Error.prototype.toString.call(value) + ']';
          }
          function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
            var output = [];
            for (var i = 0, l = value.length; i < l; ++i) {
              if (hasOwnProperty(value, String(i))) {
                output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
              } else {
                output.push('');
              }
            }
            keys.forEach(function (key) {
              if (!key.match(/^\d+$/)) {
                output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
              }
            });
            return output;
          }
          function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
            var name, str, desc;
            desc = Object.getOwnPropertyDescriptor(value, key) || {
              value: value[key]
            };
            if (desc.get) {
              if (desc.set) {
                str = ctx.stylize('[Getter/Setter]', 'special');
              } else {
                str = ctx.stylize('[Getter]', 'special');
              }
            } else {
              if (desc.set) {
                str = ctx.stylize('[Setter]', 'special');
              }
            }
            if (!hasOwnProperty(visibleKeys, key)) {
              name = '[' + key + ']';
            }
            if (!str) {
              if (ctx.seen.indexOf(desc.value) < 0) {
                if (isNull(recurseTimes)) {
                  str = formatValue(ctx, desc.value, null);
                } else {
                  str = formatValue(ctx, desc.value, recurseTimes - 1);
                }
                if (str.indexOf('\n') > -1) {
                  if (array) {
                    str = str.split('\n').map(function (line) {
                      return '  ' + line;
                    }).join('\n').substr(2);
                  } else {
                    str = '\n' + str.split('\n').map(function (line) {
                      return '   ' + line;
                    }).join('\n');
                  }
                }
              } else {
                str = ctx.stylize('[Circular]', 'special');
              }
            }
            if (isUndefined(name)) {
              if (array && key.match(/^\d+$/)) {
                return str;
              }
              name = JSON.stringify('' + key);
              if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                name = name.substr(1, name.length - 2);
                name = ctx.stylize(name, 'name');
              } else {
                name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
                name = ctx.stylize(name, 'string');
              }
            }
            return name + ': ' + str;
          }
          function reduceToSingleString(output, base, braces) {
            var numLinesEst = 0;
            var length = output.reduce(function (prev, cur) {
              numLinesEst++;
              if (cur.indexOf('\n') >= 0) numLinesEst++;
              return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
            }, 0);
            if (length > 60) {
              return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
            }
            return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
          }

          // NOTE: These type checking functions intentionally don't use `instanceof`
          // because it is fragile and can be easily faked with `Object.create()`.
          function isArray(ar) {
            return Array.isArray(ar);
          }
          exports.isArray = isArray;
          function isBoolean(arg) {
            return typeof arg === 'boolean';
          }
          exports.isBoolean = isBoolean;
          function isNull(arg) {
            return arg === null;
          }
          exports.isNull = isNull;
          function isNullOrUndefined(arg) {
            return arg == null;
          }
          exports.isNullOrUndefined = isNullOrUndefined;
          function isNumber(arg) {
            return typeof arg === 'number';
          }
          exports.isNumber = isNumber;
          function isString(arg) {
            return typeof arg === 'string';
          }
          exports.isString = isString;
          function isSymbol(arg) {
            return typeof arg === 'symbol';
          }
          exports.isSymbol = isSymbol;
          function isUndefined(arg) {
            return arg === void 0;
          }
          exports.isUndefined = isUndefined;
          function isRegExp(re) {
            return isObject(re) && objectToString(re) === '[object RegExp]';
          }
          exports.isRegExp = isRegExp;
          function isObject(arg) {
            return typeof arg === 'object' && arg !== null;
          }
          exports.isObject = isObject;
          function isDate(d) {
            return isObject(d) && objectToString(d) === '[object Date]';
          }
          exports.isDate = isDate;
          function isError(e) {
            return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
          }
          exports.isError = isError;
          function isFunction(arg) {
            return typeof arg === 'function';
          }
          exports.isFunction = isFunction;
          function isPrimitive(arg) {
            return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' ||
            // ES6 symbol
            typeof arg === 'undefined';
          }
          exports.isPrimitive = isPrimitive;
          exports.isBuffer = require('./support/isBuffer');
          function objectToString(o) {
            return Object.prototype.toString.call(o);
          }
          function pad(n) {
            return n < 10 ? '0' + n.toString(10) : n.toString(10);
          }
          var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

          // 26 Feb 16:19:34
          function timestamp() {
            var d = new Date();
            var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
            return [d.getDate(), months[d.getMonth()], time].join(' ');
          }

          // log is just a thin wrapper to console.log that prepends a timestamp
          exports.log = function () {
            console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
          };

          /**
           * Inherit the prototype methods from one constructor into another.
           *
           * The Function.prototype.inherits from lang.js rewritten as a standalone
           * function (not on Function.prototype). NOTE: If this file is to be loaded
           * during bootstrapping this function needs to be rewritten using some native
           * functions as prototype setup using normal JavaScript does not work as
           * expected during bootstrapping (see mirror.js in r114903).
           *
           * @param {function} ctor Constructor function which needs to inherit the
           *     prototype.
           * @param {function} superCtor Constructor function to inherit prototype from.
           */
          exports.inherits = require('inherits');
          exports._extend = function (origin, add) {
            // Don't do anything if add isn't an object
            if (!add || !isObject(add)) return origin;
            var keys = Object.keys(add);
            var i = keys.length;
            while (i--) {
              origin[keys[i]] = add[keys[i]];
            }
            return origin;
          };
          function hasOwnProperty(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
          }
        }).call(this);
      }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "./support/isBuffer": 3,
      "_process": 66,
      "inherits": 2
    }],
    5: [function (require, module, exports) {}, {}],
    6: [function (require, module, exports) {
      'use strict';

      var bind = require('function-bind');
      var $apply = require('./functionApply');
      var $call = require('./functionCall');
      var $reflectApply = require('./reflectApply');

      /** @type {import('./actualApply')} */
      module.exports = $reflectApply || bind.call($call, $apply);
    }, {
      "./functionApply": 7,
      "./functionCall": 8,
      "./reflectApply": 10,
      "function-bind": 42
    }],
    7: [function (require, module, exports) {
      'use strict';

      /** @type {import('./functionApply')} */
      module.exports = Function.prototype.apply;
    }, {}],
    8: [function (require, module, exports) {
      'use strict';

      /** @type {import('./functionCall')} */
      module.exports = Function.prototype.call;
    }, {}],
    9: [function (require, module, exports) {
      'use strict';

      var bind = require('function-bind');
      var $TypeError = require('es-errors/type');
      var $call = require('./functionCall');
      var $actualApply = require('./actualApply');

      /** @type {(args: [Function, thisArg?: unknown, ...args: unknown[]]) => Function} TODO FIXME, find a way to use import('.') */
      module.exports = function callBindBasic(args) {
        if (args.length < 1 || typeof args[0] !== 'function') {
          throw new $TypeError('a function is required');
        }
        return $actualApply(bind, $call, args);
      };
    }, {
      "./actualApply": 6,
      "./functionCall": 8,
      "es-errors/type": 19,
      "function-bind": 42
    }],
    10: [function (require, module, exports) {
      'use strict';

      /** @type {import('./reflectApply')} */
      module.exports = typeof Reflect !== 'undefined' && Reflect && Reflect.apply;
    }, {}],
    11: [function (require, module, exports) {
      'use strict';

      var GetIntrinsic = require('get-intrinsic');
      var callBindBasic = require('call-bind-apply-helpers');

      /** @type {(thisArg: string, searchString: string, position?: number) => number} */
      var $indexOf = callBindBasic([GetIntrinsic('%String.prototype.indexOf%')]);

      /** @type {import('.')} */
      module.exports = function callBoundIntrinsic(name, allowMissing) {
        /* eslint no-extra-parens: 0 */

        var intrinsic = /** @type {(this: unknown, ...args: unknown[]) => unknown} */GetIntrinsic(name, !!allowMissing);
        if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
          return callBindBasic(/** @type {const} */[intrinsic]);
        }
        return intrinsic;
      };
    }, {
      "call-bind-apply-helpers": 9,
      "get-intrinsic": 43
    }],
    12: [function (require, module, exports) {
      'use strict';

      var callBind = require('call-bind-apply-helpers');
      var gOPD = require('gopd');
      var hasProtoAccessor;
      try {
        // eslint-disable-next-line no-extra-parens, no-proto
        hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */[].__proto__ === Array.prototype;
      } catch (e) {
        if (!e || typeof e !== 'object' || !('code' in e) || e.code !== 'ERR_PROTO_ACCESS') {
          throw e;
        }
      }

      // eslint-disable-next-line no-extra-parens
      var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, /** @type {keyof typeof Object.prototype} */'__proto__');
      var $Object = Object;
      var $getPrototypeOf = $Object.getPrototypeOf;

      /** @type {import('./get')} */
      module.exports = desc && typeof desc.get === 'function' ? callBind([desc.get]) : typeof $getPrototypeOf === 'function' ? /** @type {import('./get')} */function getDunder(value) {
        // eslint-disable-next-line eqeqeq
        return $getPrototypeOf(value == null ? value : $Object(value));
      } : false;
    }, {
      "call-bind-apply-helpers": 9,
      "gopd": 48
    }],
    13: [function (require, module, exports) {
      'use strict';

      /** @type {import('.')} */
      var $defineProperty = Object.defineProperty || false;
      if ($defineProperty) {
        try {
          $defineProperty({}, 'a', {
            value: 1
          });
        } catch (e) {
          // IE 8 has a broken defineProperty
          $defineProperty = false;
        }
      }
      module.exports = $defineProperty;
    }, {}],
    14: [function (require, module, exports) {
      'use strict';

      /** @type {import('./eval')} */
      module.exports = EvalError;
    }, {}],
    15: [function (require, module, exports) {
      'use strict';

      /** @type {import('.')} */
      module.exports = Error;
    }, {}],
    16: [function (require, module, exports) {
      'use strict';

      /** @type {import('./range')} */
      module.exports = RangeError;
    }, {}],
    17: [function (require, module, exports) {
      'use strict';

      /** @type {import('./ref')} */
      module.exports = ReferenceError;
    }, {}],
    18: [function (require, module, exports) {
      'use strict';

      /** @type {import('./syntax')} */
      module.exports = SyntaxError;
    }, {}],
    19: [function (require, module, exports) {
      'use strict';

      /** @type {import('./type')} */
      module.exports = TypeError;
    }, {}],
    20: [function (require, module, exports) {
      'use strict';

      /** @type {import('./uri')} */
      module.exports = URIError;
    }, {}],
    21: [function (require, module, exports) {
      'use strict';

      /** @type {import('.')} */
      module.exports = Object;
    }, {}],
    22: [function (require, module, exports) {
      module.exports = {
        "name": "fable-serviceproviderbase",
        "version": "3.0.19",
        "description": "Simple base classes for fable services.",
        "main": "source/Fable-ServiceProviderBase.js",
        "scripts": {
          "start": "node source/Fable-ServiceProviderBase.js",
          "test": "npx quack test",
          "tests": "npx quack test -g",
          "coverage": "npx quack coverage",
          "build": "npx quack build",
          "types": "tsc -p ./tsconfig.build.json",
          "check": "tsc -p . --noEmit"
        },
        "types": "types/source/Fable-ServiceProviderBase.d.ts",
        "mocha": {
          "diff": true,
          "extension": ["js"],
          "package": "./package.json",
          "reporter": "spec",
          "slow": "75",
          "timeout": "5000",
          "ui": "tdd",
          "watch-files": ["source/**/*.js", "test/**/*.js"],
          "watch-ignore": ["lib/vendor"]
        },
        "repository": {
          "type": "git",
          "url": "https://github.com/stevenvelozo/fable-serviceproviderbase.git"
        },
        "keywords": ["entity", "behavior"],
        "author": "Steven Velozo <steven@velozo.com> (http://velozo.com/)",
        "license": "MIT",
        "bugs": {
          "url": "https://github.com/stevenvelozo/fable-serviceproviderbase/issues"
        },
        "homepage": "https://github.com/stevenvelozo/fable-serviceproviderbase",
        "devDependencies": {
          "@types/mocha": "^10.0.10",
          "fable": "^3.1.62",
          "quackage": "^1.0.58",
          "typescript": "^5.9.3"
        }
      };
    }, {}],
    23: [function (require, module, exports) {
      /**
      * Fable Service Base
      * @author <steven@velozo.com>
      */

      const libPackage = require('../package.json');
      class FableServiceProviderBase {
        /**
         * The constructor can be used in two ways:
         * 1) With a fable, options object and service hash (the options object and service hash are optional)a
         * 2) With an object or nothing as the first parameter, where it will be treated as the options object
         *
         * @param {import('fable')|Record<string, any>} [pFable] - (optional) The fable instance, or the options object if there is no fable
         * @param {Record<string, any>|string} [pOptions] - (optional) The options object, or the service hash if there is no fable
         * @param {string} [pServiceHash] - (optional) The service hash to identify this service instance
         */
        constructor(pFable, pOptions, pServiceHash) {
          /** @type {import('fable')} */
          this.fable;
          /** @type {string} */
          this.UUID;
          /** @type {Record<string, any>} */
          this.options;
          /** @type {Record<string, any>} */
          this.services;
          /** @type {Record<string, any>} */
          this.servicesMap;

          // Check if a fable was passed in; connect it if so
          if (typeof pFable === 'object' && pFable.isFable) {
            this.connectFable(pFable);
          } else {
            this.fable = false;
          }

          // Initialize the services map if it wasn't passed in
          /** @type {Record<string, any>} */
          this._PackageFableServiceProvider = libPackage;

          // initialize options and UUID based on whether the fable was passed in or not.
          if (this.fable) {
            this.UUID = pFable.getUUID();
            this.options = typeof pOptions === 'object' ? pOptions : {};
          } else {
            // With no fable, check to see if there was an object passed into either of the first two
            // Parameters, and if so, treat it as the options object
            this.options = typeof pFable === 'object' && !pFable.isFable ? pFable : typeof pOptions === 'object' ? pOptions : {};
            this.UUID = "CORE-SVC-".concat(Math.floor(Math.random() * (99999 - 10000) + 10000));
          }

          // It's expected that the deriving class will set this
          this.serviceType = "Unknown-".concat(this.UUID);

          // The service hash is used to identify the specific instantiation of the service in the services map
          this.Hash = typeof pServiceHash === 'string' ? pServiceHash : !this.fable && typeof pOptions === 'string' ? pOptions : "".concat(this.UUID);
        }

        /**
         * @param {import('fable')} pFable
         */
        connectFable(pFable) {
          if (typeof pFable !== 'object' || !pFable.isFable) {
            let tmpErrorMessage = "Fable Service Provider Base: Cannot connect to Fable, invalid Fable object passed in.  The pFable parameter was a [".concat(typeof pFable, "].}");
            console.log(tmpErrorMessage);
            return new Error(tmpErrorMessage);
          }
          if (!this.fable) {
            this.fable = pFable;
          }
          if (!this.log) {
            this.log = this.fable.Logging;
          }
          if (!this.services) {
            this.services = this.fable.services;
          }
          if (!this.servicesMap) {
            this.servicesMap = this.fable.servicesMap;
          }
          return true;
        }
      }
      _defineProperty(FableServiceProviderBase, "isFableService", true);
      module.exports = FableServiceProviderBase;

      // This is left here in case we want to go back to having different code/base class for "core" services
      module.exports.CoreServiceProviderBase = FableServiceProviderBase;
    }, {
      "../package.json": 22
    }],
    24: [function (require, module, exports) {
      'use strict';

      var UTF8_ACCEPT = 12;
      var UTF8_REJECT = 0;
      var UTF8_DATA = [
      // The first part of the table maps bytes to character to a transition.
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 10, 9, 9, 9, 11, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
      // The second part of the table maps a state to a new state when adding a
      // transition.
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 24, 36, 48, 60, 72, 84, 96, 0, 12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      // The third part maps the current transition to a mask that needs to apply
      // to the byte.
      0x7F, 0x3F, 0x3F, 0x3F, 0x00, 0x1F, 0x0F, 0x0F, 0x0F, 0x07, 0x07, 0x07];
      function decodeURIComponent(uri) {
        var percentPosition = uri.indexOf('%');
        if (percentPosition === -1) return uri;
        var length = uri.length;
        var decoded = '';
        var last = 0;
        var codepoint = 0;
        var startOfOctets = percentPosition;
        var state = UTF8_ACCEPT;
        while (percentPosition > -1 && percentPosition < length) {
          var high = hexCodeToInt(uri[percentPosition + 1], 4);
          var low = hexCodeToInt(uri[percentPosition + 2], 0);
          var byte = high | low;
          var type = UTF8_DATA[byte];
          state = UTF8_DATA[256 + state + type];
          codepoint = codepoint << 6 | byte & UTF8_DATA[364 + type];
          if (state === UTF8_ACCEPT) {
            decoded += uri.slice(last, startOfOctets);
            decoded += codepoint <= 0xFFFF ? String.fromCharCode(codepoint) : String.fromCharCode(0xD7C0 + (codepoint >> 10), 0xDC00 + (codepoint & 0x3FF));
            codepoint = 0;
            last = percentPosition + 3;
            percentPosition = startOfOctets = uri.indexOf('%', last);
          } else if (state === UTF8_REJECT) {
            return null;
          } else {
            percentPosition += 3;
            if (percentPosition < length && uri.charCodeAt(percentPosition) === 37) continue;
            return null;
          }
        }
        return decoded + uri.slice(last);
      }
      var HEX = {
        '0': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        'a': 10,
        'A': 10,
        'b': 11,
        'B': 11,
        'c': 12,
        'C': 12,
        'd': 13,
        'D': 13,
        'e': 14,
        'E': 14,
        'f': 15,
        'F': 15
      };
      function hexCodeToInt(c, shift) {
        var i = HEX[c];
        return i === undefined ? 255 : i << shift;
      }
      module.exports = decodeURIComponent;
    }, {}],
    25: [function (require, module, exports) {
      'use strict';

      // do not edit .js files directly - edit src/index.jst
      module.exports = function equal(a, b) {
        if (a === b) return true;
        if (a && b && typeof a == 'object' && typeof b == 'object') {
          if (a.constructor !== b.constructor) return false;
          var length, i, keys;
          if (Array.isArray(a)) {
            length = a.length;
            if (length != b.length) return false;
            for (i = length; i-- !== 0;) if (!equal(a[i], b[i])) return false;
            return true;
          }
          if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
          if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
          if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
          keys = Object.keys(a);
          length = keys.length;
          if (length !== Object.keys(b).length) return false;
          for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
          for (i = length; i-- !== 0;) {
            var key = keys[i];
            if (!equal(a[key], b[key])) return false;
          }
          return true;
        }

        // true if both NaN, false otherwise
        return a !== a && b !== b;
      };
    }, {}],
    26: [function (require, module, exports) {
      "use strict";

      const parse = require("./parse");
      const stringify = require("./stringify");
      const fastQuerystring = {
        parse,
        stringify
      };

      /**
       * Enable TS and JS support
       *
       * - `const qs = require('fast-querystring')`
       * - `import qs from 'fast-querystring'`
       */
      module.exports = fastQuerystring;
      module.exports.default = fastQuerystring;
      module.exports.parse = parse;
      module.exports.stringify = stringify;
    }, {
      "./parse": 28,
      "./stringify": 29
    }],
    27: [function (require, module, exports) {
      // This file is taken from Node.js project.
      // Full implementation can be found from https://github.com/nodejs/node/blob/main/lib/internal/querystring.js

      const hexTable = Array.from({
        length: 256
      }, (_, i) => "%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());

      // These characters do not need escaping when generating query strings:
      // ! - . _ ~
      // ' ( ) *
      // digits
      // alpha (uppercase)
      // alpha (lowercase)
      // rome-ignore format: the array should not be formatted
      const noEscape = new Int8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      // 0 - 15
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      // 16 - 31
      0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0,
      // 32 - 47
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
      // 48 - 63
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      // 64 - 79
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
      // 80 - 95
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      // 96 - 111
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0 // 112 - 127
      ]);

      /**
       * @param {string} str
       * @returns {string}
       */
      function encodeString(str) {
        const len = str.length;
        if (len === 0) return "";
        let out = "";
        let lastPos = 0;
        let i = 0;
        outer: for (; i < len; i++) {
          let c = str.charCodeAt(i);

          // ASCII
          while (c < 0x80) {
            if (noEscape[c] !== 1) {
              if (lastPos < i) out += str.slice(lastPos, i);
              lastPos = i + 1;
              out += hexTable[c];
            }
            if (++i === len) break outer;
            c = str.charCodeAt(i);
          }
          if (lastPos < i) out += str.slice(lastPos, i);

          // Multi-byte characters ...
          if (c < 0x800) {
            lastPos = i + 1;
            out += hexTable[0xc0 | c >> 6] + hexTable[0x80 | c & 0x3f];
            continue;
          }
          if (c < 0xd800 || c >= 0xe000) {
            lastPos = i + 1;
            out += hexTable[0xe0 | c >> 12] + hexTable[0x80 | c >> 6 & 0x3f] + hexTable[0x80 | c & 0x3f];
            continue;
          }
          // Surrogate pair
          ++i;

          // This branch should never happen because all URLSearchParams entries
          // should already be converted to USVString. But, included for
          // completion's sake anyway.
          if (i >= len) {
            throw new Error("URI malformed");
          }
          const c2 = str.charCodeAt(i) & 0x3ff;
          lastPos = i + 1;
          c = 0x10000 + ((c & 0x3ff) << 10 | c2);
          out += hexTable[0xf0 | c >> 18] + hexTable[0x80 | c >> 12 & 0x3f] + hexTable[0x80 | c >> 6 & 0x3f] + hexTable[0x80 | c & 0x3f];
        }
        if (lastPos === 0) return str;
        if (lastPos < len) return out + str.slice(lastPos);
        return out;
      }
      module.exports = {
        encodeString
      };
    }, {}],
    28: [function (require, module, exports) {
      "use strict";

      const fastDecode = require("fast-decode-uri-component");
      const plusRegex = /\+/g;
      const Empty = function Empty() {};
      Empty.prototype = Object.create(null);

      /**
       * @callback parse
       * @param {string} input
       */
      function parse(input) {
        // Optimization: Use new Empty() instead of Object.create(null) for performance
        // v8 has a better optimization for initializing functions compared to Object
        const result = new Empty();
        if (typeof input !== "string") {
          return result;
        }
        let inputLength = input.length;
        let key = "";
        let value = "";
        let startingIndex = -1;
        let equalityIndex = -1;
        let shouldDecodeKey = false;
        let shouldDecodeValue = false;
        let keyHasPlus = false;
        let valueHasPlus = false;
        let hasBothKeyValuePair = false;
        let c = 0;

        // Have a boundary of input.length + 1 to access last pair inside the loop.
        for (let i = 0; i < inputLength + 1; i++) {
          c = i !== inputLength ? input.charCodeAt(i) : 38;

          // Handle '&' and end of line to pass the current values to result
          if (c === 38) {
            hasBothKeyValuePair = equalityIndex > startingIndex;

            // Optimization: Reuse equality index to store the end of key
            if (!hasBothKeyValuePair) {
              equalityIndex = i;
            }
            key = input.slice(startingIndex + 1, equalityIndex);

            // Add key/value pair only if the range size is greater than 1; a.k.a. contains at least "="
            if (hasBothKeyValuePair || key.length > 0) {
              // Optimization: Replace '+' with space
              if (keyHasPlus) {
                key = key.replace(plusRegex, " ");
              }

              // Optimization: Do not decode if it's not necessary.
              if (shouldDecodeKey) {
                key = fastDecode(key) || key;
              }
              if (hasBothKeyValuePair) {
                value = input.slice(equalityIndex + 1, i);
                if (valueHasPlus) {
                  value = value.replace(plusRegex, " ");
                }
                if (shouldDecodeValue) {
                  value = fastDecode(value) || value;
                }
              }
              const currentValue = result[key];
              if (currentValue === undefined) {
                result[key] = value;
              } else {
                // Optimization: value.pop is faster than Array.isArray(value)
                if (currentValue.pop) {
                  currentValue.push(value);
                } else {
                  result[key] = [currentValue, value];
                }
              }
            }

            // Reset reading key value pairs
            value = "";
            startingIndex = i;
            equalityIndex = i;
            shouldDecodeKey = false;
            shouldDecodeValue = false;
            keyHasPlus = false;
            valueHasPlus = false;
          }
          // Check '='
          else if (c === 61) {
            if (equalityIndex <= startingIndex) {
              equalityIndex = i;
            }
            // If '=' character occurs again, we should decode the input.
            else {
              shouldDecodeValue = true;
            }
          }
          // Check '+', and remember to replace it with empty space.
          else if (c === 43) {
            if (equalityIndex > startingIndex) {
              valueHasPlus = true;
            } else {
              keyHasPlus = true;
            }
          }
          // Check '%' character for encoding
          else if (c === 37) {
            if (equalityIndex > startingIndex) {
              shouldDecodeValue = true;
            } else {
              shouldDecodeKey = true;
            }
          }
        }
        return result;
      }
      module.exports = parse;
    }, {
      "fast-decode-uri-component": 24
    }],
    29: [function (require, module, exports) {
      "use strict";

      const _require = require("./internals/querystring"),
        encodeString = _require.encodeString;
      function getAsPrimitive(value) {
        const type = typeof value;
        if (type === "string") {
          // Length check is handled inside encodeString function
          return encodeString(value);
        } else if (type === "bigint") {
          return value.toString();
        } else if (type === "boolean") {
          return value ? "true" : "false";
        } else if (type === "number" && Number.isFinite(value)) {
          return value < 1e21 ? "" + value : encodeString("" + value);
        }
        return "";
      }

      /**
       * @param {Record<string, string | number | boolean
       * | ReadonlyArray<string | number | boolean> | null>} input
       * @returns {string}
       */
      function stringify(input) {
        let result = "";
        if (input === null || typeof input !== "object") {
          return result;
        }
        const separator = "&";
        const keys = Object.keys(input);
        const keyLength = keys.length;
        let valueLength = 0;
        for (let i = 0; i < keyLength; i++) {
          const key = keys[i];
          const value = input[key];
          const encodedKey = encodeString(key) + "=";
          if (i) {
            result += separator;
          }
          if (Array.isArray(value)) {
            valueLength = value.length;
            for (let j = 0; j < valueLength; j++) {
              if (j) {
                result += separator;
              }

              // Optimization: Dividing into multiple lines improves the performance.
              // Since v8 does not need to care about the '+' character if it was one-liner.
              result += encodedKey;
              result += getAsPrimitive(value[j]);
            }
          } else {
            result += encodedKey;
            result += getAsPrimitive(value);
          }
        }
        return result;
      }
      module.exports = stringify;
    }, {
      "./internals/querystring": 27
    }],
    30: [function (require, module, exports) {
      'use strict';

      /*
        Char codes:
          '!': 33 - !
          '#': 35 - %23
          '$': 36 - %24
          '%': 37 - %25
          '&': 38 - %26
          ''': 39 - '
          '(': 40 - (
          ')': 41 - )
          '*': 42 - *
          '+': 43 - %2B
          ',': 44 - %2C
          '-': 45 - -
          '.': 46 - .
          '/': 47 - %2F
          ':': 58 - %3A
          ';': 59 - %3B
          '=': 61 - %3D
          '?': 63 - %3F
          '@': 64 - %40
          '_': 95 - _
          '~': 126 - ~
      */
      const assert = require('assert');
      const querystring = require('fast-querystring');
      const isRegexSafe = require('safe-regex2');
      const deepEqual = require('fast-deep-equal');
      const _require2 = require('./lib/pretty-print'),
        prettyPrintTree = _require2.prettyPrintTree;
      const _require3 = require('./lib/node'),
        StaticNode = _require3.StaticNode,
        NODE_TYPES = _require3.NODE_TYPES;
      const Constrainer = require('./lib/constrainer');
      const httpMethods = require('./lib/http-methods');
      const httpMethodStrategy = require('./lib/strategies/http-method');
      const _require4 = require('./lib/url-sanitizer'),
        safeDecodeURI = _require4.safeDecodeURI,
        safeDecodeURIComponent = _require4.safeDecodeURIComponent;
      const FULL_PATH_REGEXP = /^https?:\/\/.*?\//;
      const OPTIONAL_PARAM_REGEXP = /(\/:[^/()]*?)\?(\/?)/;
      const ESCAPE_REGEXP = /[.*+?^${}()|[\]\\]/g;
      const REMOVE_DUPLICATE_SLASHES_REGEXP = /\/\/+/g;
      if (!isRegexSafe(FULL_PATH_REGEXP)) {
        throw new Error('the FULL_PATH_REGEXP is not safe, update this module');
      }
      if (!isRegexSafe(OPTIONAL_PARAM_REGEXP)) {
        throw new Error('the OPTIONAL_PARAM_REGEXP is not safe, update this module');
      }
      if (!isRegexSafe(ESCAPE_REGEXP)) {
        throw new Error('the ESCAPE_REGEXP is not safe, update this module');
      }
      if (!isRegexSafe(REMOVE_DUPLICATE_SLASHES_REGEXP)) {
        throw new Error('the REMOVE_DUPLICATE_SLASHES_REGEXP is not safe, update this module');
      }
      function Router(opts) {
        if (!(this instanceof Router)) {
          return new Router(opts);
        }
        opts = opts || {};
        this._opts = opts;
        if (opts.defaultRoute) {
          assert(typeof opts.defaultRoute === 'function', 'The default route must be a function');
          this.defaultRoute = opts.defaultRoute;
        } else {
          this.defaultRoute = null;
        }
        if (opts.onBadUrl) {
          assert(typeof opts.onBadUrl === 'function', 'The bad url handler must be a function');
          this.onBadUrl = opts.onBadUrl;
        } else {
          this.onBadUrl = null;
        }
        if (opts.buildPrettyMeta) {
          assert(typeof opts.buildPrettyMeta === 'function', 'buildPrettyMeta must be a function');
          this.buildPrettyMeta = opts.buildPrettyMeta;
        } else {
          this.buildPrettyMeta = defaultBuildPrettyMeta;
        }
        if (opts.querystringParser) {
          assert(typeof opts.querystringParser === 'function', 'querystringParser must be a function');
          this.querystringParser = opts.querystringParser;
        } else {
          this.querystringParser = query => query.length === 0 ? {} : querystring.parse(query);
        }
        this.caseSensitive = opts.caseSensitive === undefined ? true : opts.caseSensitive;
        this.ignoreTrailingSlash = opts.ignoreTrailingSlash || false;
        this.ignoreDuplicateSlashes = opts.ignoreDuplicateSlashes || false;
        this.maxParamLength = opts.maxParamLength || 100;
        this.onMaxParamLength = opts.onMaxParamLength || null;
        this.allowUnsafeRegex = opts.allowUnsafeRegex || false;
        this.constrainer = new Constrainer(opts.constraints);
        this.useSemicolonDelimiter = opts.useSemicolonDelimiter || false;
        this.routes = [];
        this.trees = {};
      }
      Router.prototype.on = function on(method, path, opts, handler, store) {
        if (typeof opts === 'function') {
          if (handler !== undefined) {
            store = handler;
          }
          handler = opts;
          opts = {};
        }
        // path validation
        assert(typeof path === 'string', 'Path should be a string');
        assert(path.length > 0, 'The path could not be empty');
        assert(path[0] === '/' || path[0] === '*', 'The first character of a path should be `/` or `*`');
        // handler validation
        assert(typeof handler === 'function', 'Handler should be a function');

        // path ends with optional parameter
        const optionalParamMatch = path.match(OPTIONAL_PARAM_REGEXP);
        if (optionalParamMatch) {
          assert(path.length === optionalParamMatch.index + optionalParamMatch[0].length, 'Optional Parameter needs to be the last parameter of the path');
          const pathFull = path.replace(OPTIONAL_PARAM_REGEXP, '$1$2');
          const pathOptional = path.replace(OPTIONAL_PARAM_REGEXP, '$2') || '/';
          this.on(method, pathFull, opts, handler, store);
          this.on(method, pathOptional, opts, handler, store);
          return;
        }
        const route = path;
        if (this.ignoreDuplicateSlashes) {
          path = removeDuplicateSlashes(path);
        }
        if (this.ignoreTrailingSlash) {
          path = trimLastSlash(path);
        }
        const methods = Array.isArray(method) ? method : [method];
        for (const method of methods) {
          assert(typeof method === 'string', 'Method should be a string');
          assert(httpMethods.includes(method), "Method '".concat(method, "' is not an http method."));
          this._on(method, path, opts, handler, store, route);
        }
      };
      Router.prototype._on = function _on(method, path, opts, handler, store) {
        let constraints = {};
        if (opts.constraints !== undefined) {
          assert(typeof opts.constraints === 'object' && opts.constraints !== null, 'Constraints should be an object');
          if (Object.keys(opts.constraints).length !== 0) {
            constraints = opts.constraints;
          }
        }
        this.constrainer.validateConstraints(constraints);
        // Let the constrainer know if any constraints are being used now
        this.constrainer.noteUsage(constraints);

        // Boot the tree for this method if it doesn't exist yet
        if (this.trees[method] === undefined) {
          this.trees[method] = new StaticNode('/');
        }
        let pattern = path;
        if (pattern === '*' && this.trees[method].prefix.length !== 0) {
          const currentRoot = this.trees[method];
          this.trees[method] = new StaticNode('');
          this.trees[method].staticChildren['/'] = currentRoot;
        }
        let currentNode = this.trees[method];
        let parentNodePathIndex = currentNode.prefix.length;
        const params = [];
        for (let i = 0; i <= pattern.length; i++) {
          if (pattern.charCodeAt(i) === 58 && pattern.charCodeAt(i + 1) === 58) {
            // It's a double colon
            i++;
            continue;
          }
          const isParametricNode = pattern.charCodeAt(i) === 58 && pattern.charCodeAt(i + 1) !== 58;
          const isWildcardNode = pattern.charCodeAt(i) === 42;
          if (isParametricNode || isWildcardNode || i === pattern.length && i !== parentNodePathIndex) {
            let staticNodePath = pattern.slice(parentNodePathIndex, i);
            if (!this.caseSensitive) {
              staticNodePath = staticNodePath.toLowerCase();
            }
            staticNodePath = staticNodePath.replaceAll('::', ':');
            staticNodePath = staticNodePath.replaceAll('%', '%25');
            // add the static part of the route to the tree
            currentNode = currentNode.createStaticChild(staticNodePath);
          }
          if (isParametricNode) {
            let isRegexNode = false;
            let isParamSafe = true;
            let backtrack = '';
            const regexps = [];
            let lastParamStartIndex = i + 1;
            for (let j = lastParamStartIndex;; j++) {
              const charCode = pattern.charCodeAt(j);
              const isRegexParam = charCode === 40;
              const isStaticPart = charCode === 45 || charCode === 46;
              const isEndOfNode = charCode === 47 || j === pattern.length;
              if (isRegexParam || isStaticPart || isEndOfNode) {
                const paramName = pattern.slice(lastParamStartIndex, j);
                params.push(paramName);
                isRegexNode = isRegexNode || isRegexParam || isStaticPart;
                if (isRegexParam) {
                  const endOfRegexIndex = getClosingParenthensePosition(pattern, j);
                  const regexString = pattern.slice(j, endOfRegexIndex + 1);
                  if (!this.allowUnsafeRegex) {
                    assert(isRegexSafe(new RegExp(regexString)), "The regex '".concat(regexString, "' is not safe!"));
                  }
                  regexps.push(trimRegExpStartAndEnd(regexString));
                  j = endOfRegexIndex + 1;
                  isParamSafe = true;
                } else {
                  regexps.push(isParamSafe ? '(.*?)' : "(".concat(backtrack, "|(?:(?!").concat(backtrack, ").)*)"));
                  isParamSafe = false;
                }
                const staticPartStartIndex = j;
                for (; j < pattern.length; j++) {
                  const charCode = pattern.charCodeAt(j);
                  if (charCode === 47) break;
                  if (charCode === 58) {
                    const nextCharCode = pattern.charCodeAt(j + 1);
                    if (nextCharCode === 58) j++;else break;
                  }
                }
                let staticPart = pattern.slice(staticPartStartIndex, j);
                if (staticPart) {
                  staticPart = staticPart.replaceAll('::', ':');
                  staticPart = staticPart.replaceAll('%', '%25');
                  regexps.push(backtrack = escapeRegExp(staticPart));
                }
                lastParamStartIndex = j + 1;
                if (isEndOfNode || pattern.charCodeAt(j) === 47 || j === pattern.length) {
                  const nodePattern = isRegexNode ? '()' + staticPart : staticPart;
                  const nodePath = pattern.slice(i, j);
                  pattern = pattern.slice(0, i + 1) + nodePattern + pattern.slice(j);
                  i += nodePattern.length;
                  const regex = isRegexNode ? new RegExp('^' + regexps.join('') + '$') : null;
                  currentNode = currentNode.createParametricChild(regex, staticPart || null, nodePath);
                  parentNodePathIndex = i + 1;
                  break;
                }
              }
            }
          } else if (isWildcardNode) {
            // add the wildcard parameter
            params.push('*');
            currentNode = currentNode.createWildcardChild();
            parentNodePathIndex = i + 1;
            if (i !== pattern.length - 1) {
              throw new Error('Wildcard must be the last character in the route');
            }
          }
        }
        if (!this.caseSensitive) {
          pattern = pattern.toLowerCase();
        }
        if (pattern === '*') {
          pattern = '/*';
        }
        for (const existRoute of this.routes) {
          const routeConstraints = existRoute.opts.constraints || {};
          if (existRoute.method === method && existRoute.pattern === pattern && deepEqual(routeConstraints, constraints)) {
            throw new Error("Method '".concat(method, "' already declared for route '").concat(pattern, "' with constraints '").concat(JSON.stringify(constraints), "'"));
          }
        }
        const route = {
          method,
          path,
          pattern,
          params,
          opts,
          handler,
          store
        };
        this.routes.push(route);
        currentNode.addRoute(route, this.constrainer);
      };
      Router.prototype.hasRoute = function hasRoute(method, path, constraints) {
        const route = this.findRoute(method, path, constraints);
        return route !== null;
      };
      Router.prototype.findRoute = function findNode(method, path) {
        let constraints = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        if (this.trees[method] === undefined) {
          return null;
        }
        let pattern = path;
        let currentNode = this.trees[method];
        let parentNodePathIndex = currentNode.prefix.length;
        const params = [];
        for (let i = 0; i <= pattern.length; i++) {
          if (pattern.charCodeAt(i) === 58 && pattern.charCodeAt(i + 1) === 58) {
            // It's a double colon
            i++;
            continue;
          }
          const isParametricNode = pattern.charCodeAt(i) === 58 && pattern.charCodeAt(i + 1) !== 58;
          const isWildcardNode = pattern.charCodeAt(i) === 42;
          if (isParametricNode || isWildcardNode || i === pattern.length && i !== parentNodePathIndex) {
            let staticNodePath = pattern.slice(parentNodePathIndex, i);
            if (!this.caseSensitive) {
              staticNodePath = staticNodePath.toLowerCase();
            }
            staticNodePath = staticNodePath.replaceAll('::', ':');
            staticNodePath = staticNodePath.replaceAll('%', '%25');
            // add the static part of the route to the tree
            currentNode = currentNode.getStaticChild(staticNodePath);
            if (currentNode === null) {
              return null;
            }
          }
          if (isParametricNode) {
            let isRegexNode = false;
            let isParamSafe = true;
            let backtrack = '';
            const regexps = [];
            let lastParamStartIndex = i + 1;
            for (let j = lastParamStartIndex;; j++) {
              const charCode = pattern.charCodeAt(j);
              const isRegexParam = charCode === 40;
              const isStaticPart = charCode === 45 || charCode === 46;
              const isEndOfNode = charCode === 47 || j === pattern.length;
              if (isRegexParam || isStaticPart || isEndOfNode) {
                const paramName = pattern.slice(lastParamStartIndex, j);
                params.push(paramName);
                isRegexNode = isRegexNode || isRegexParam || isStaticPart;
                if (isRegexParam) {
                  const endOfRegexIndex = getClosingParenthensePosition(pattern, j);
                  const regexString = pattern.slice(j, endOfRegexIndex + 1);
                  if (!this.allowUnsafeRegex) {
                    assert(isRegexSafe(new RegExp(regexString)), "The regex '".concat(regexString, "' is not safe!"));
                  }
                  regexps.push(trimRegExpStartAndEnd(regexString));
                  j = endOfRegexIndex + 1;
                  isParamSafe = false;
                } else {
                  regexps.push(isParamSafe ? '(.*?)' : "(".concat(backtrack, "|(?:(?!").concat(backtrack, ").)*)"));
                  isParamSafe = false;
                }
                const staticPartStartIndex = j;
                for (; j < pattern.length; j++) {
                  const charCode = pattern.charCodeAt(j);
                  if (charCode === 47) break;
                  if (charCode === 58) {
                    const nextCharCode = pattern.charCodeAt(j + 1);
                    if (nextCharCode === 58) j++;else break;
                  }
                }
                let staticPart = pattern.slice(staticPartStartIndex, j);
                if (staticPart) {
                  staticPart = staticPart.replaceAll('::', ':');
                  staticPart = staticPart.replaceAll('%', '%25');
                  regexps.push(backtrack = escapeRegExp(staticPart));
                }
                lastParamStartIndex = j + 1;
                if (isEndOfNode || pattern.charCodeAt(j) === 47 || j === pattern.length) {
                  const nodePattern = isRegexNode ? '()' + staticPart : staticPart;
                  const nodePath = pattern.slice(i, j);
                  pattern = pattern.slice(0, i + 1) + nodePattern + pattern.slice(j);
                  i += nodePattern.length;
                  const regex = isRegexNode ? new RegExp('^' + regexps.join('') + '$') : null;
                  currentNode = currentNode.getParametricChild(regex, staticPart || null, nodePath);
                  if (currentNode === null) {
                    return null;
                  }
                  parentNodePathIndex = i + 1;
                  break;
                }
              }
            }
          } else if (isWildcardNode) {
            // add the wildcard parameter
            params.push('*');
            currentNode = currentNode.getWildcardChild();
            parentNodePathIndex = i + 1;
            if (i !== pattern.length - 1) {
              throw new Error('Wildcard must be the last character in the route');
            }
          }
        }
        if (!this.caseSensitive) {
          pattern = pattern.toLowerCase();
        }
        for (const existRoute of this.routes) {
          const routeConstraints = existRoute.opts.constraints || {};
          if (existRoute.method === method && existRoute.pattern === pattern && deepEqual(routeConstraints, constraints)) {
            return {
              handler: existRoute.handler,
              store: existRoute.store,
              params: existRoute.params
            };
          }
        }
        return null;
      };
      Router.prototype.hasConstraintStrategy = function (strategyName) {
        return this.constrainer.hasConstraintStrategy(strategyName);
      };
      Router.prototype.addConstraintStrategy = function (constraints) {
        this.constrainer.addConstraintStrategy(constraints);
        this._rebuild(this.routes);
      };
      Router.prototype.reset = function reset() {
        this.trees = {};
        this.routes = [];
      };
      Router.prototype.off = function off(method, path, constraints) {
        // path validation
        assert(typeof path === 'string', 'Path should be a string');
        assert(path.length > 0, 'The path could not be empty');
        assert(path[0] === '/' || path[0] === '*', 'The first character of a path should be `/` or `*`');
        // options validation
        assert(typeof constraints === 'undefined' || typeof constraints === 'object' && !Array.isArray(constraints) && constraints !== null, 'Constraints should be an object or undefined.');

        // path ends with optional parameter
        const optionalParamMatch = path.match(OPTIONAL_PARAM_REGEXP);
        if (optionalParamMatch) {
          assert(path.length === optionalParamMatch.index + optionalParamMatch[0].length, 'Optional Parameter needs to be the last parameter of the path');
          const pathFull = path.replace(OPTIONAL_PARAM_REGEXP, '$1$2');
          const pathOptional = path.replace(OPTIONAL_PARAM_REGEXP, '$2');
          this.off(method, pathFull, constraints);
          this.off(method, pathOptional, constraints);
          return;
        }
        if (this.ignoreDuplicateSlashes) {
          path = removeDuplicateSlashes(path);
        }
        if (this.ignoreTrailingSlash) {
          path = trimLastSlash(path);
        }
        const methods = Array.isArray(method) ? method : [method];
        for (const method of methods) {
          this._off(method, path, constraints);
        }
      };
      Router.prototype._off = function _off(method, path, constraints) {
        // method validation
        assert(typeof method === 'string', 'Method should be a string');
        assert(httpMethods.includes(method), "Method '".concat(method, "' is not an http method."));
        function matcherWithoutConstraints(route) {
          return method !== route.method || path !== route.path;
        }
        function matcherWithConstraints(route) {
          return matcherWithoutConstraints(route) || !deepEqual(constraints, route.opts.constraints || {});
        }
        const predicate = constraints ? matcherWithConstraints : matcherWithoutConstraints;

        // Rebuild tree without the specific route
        const newRoutes = this.routes.filter(predicate);
        this._rebuild(newRoutes);
      };
      Router.prototype.lookup = function lookup(req, res, ctx, done) {
        if (typeof ctx === 'function') {
          done = ctx;
          ctx = undefined;
        }
        if (done === undefined) {
          const constraints = this.constrainer.deriveConstraints(req, ctx);
          const handle = this.find(req.method, req.url, constraints);
          return this.callHandler(handle, req, res, ctx);
        }
        this.constrainer.deriveConstraints(req, ctx, (err, constraints) => {
          if (err !== null) {
            done(err);
            return;
          }
          try {
            const handle = this.find(req.method, req.url, constraints);
            const result = this.callHandler(handle, req, res, ctx);
            done(null, result);
          } catch (err) {
            done(err);
          }
        });
      };
      Router.prototype.callHandler = function callHandler(handle, req, res, ctx) {
        if (handle === null) return this._defaultRoute(req, res, ctx);
        return ctx === undefined ? handle.handler(req, res, handle.params, handle.store, handle.searchParams) : handle.handler.call(ctx, req, res, handle.params, handle.store, handle.searchParams);
      };
      Router.prototype.find = function find(method, path, derivedConstraints) {
        let currentNode = this.trees[method];
        if (currentNode === undefined) return null;
        if (path.charCodeAt(0) !== 47) {
          // 47 is '/'
          path = path.replace(FULL_PATH_REGEXP, '/');
        }

        // This must be run before sanitizeUrl as the resulting function
        // .sliceParameter must be constructed with same URL string used
        // throughout the rest of this function.
        if (this.ignoreDuplicateSlashes) {
          path = removeDuplicateSlashes(path);
        }
        let sanitizedUrl;
        let querystring;
        let shouldDecodeParam;
        try {
          sanitizedUrl = safeDecodeURI(path, this.useSemicolonDelimiter);
          path = sanitizedUrl.path;
          querystring = sanitizedUrl.querystring;
          shouldDecodeParam = sanitizedUrl.shouldDecodeParam;
        } catch (error) {
          return this._onBadUrl(path);
        }
        if (this.ignoreTrailingSlash) {
          path = trimLastSlash(path);
        }
        const originPath = path;
        if (this.caseSensitive === false) {
          path = path.toLowerCase();
        }
        const maxParamLength = this.maxParamLength;
        let pathIndex = currentNode.prefix.length;
        const params = [];
        const pathLen = path.length;
        const brothersNodesStack = [];
        let maxParamLengthExceeded = false;
        while (true) {
          if (pathIndex === pathLen && currentNode.isLeafNode) {
            const handle = currentNode.handlerStorage.getMatchingHandler(derivedConstraints);
            if (handle !== null) {
              return {
                handler: handle.handler,
                store: handle.store,
                params: handle._createParamsObject(params),
                searchParams: this.querystringParser(querystring)
              };
            }
          }
          let node = currentNode.getNextNode(path, pathIndex, brothersNodesStack, params.length);
          if (node === null) {
            if (brothersNodesStack.length === 0) {
              if (maxParamLengthExceeded && this.onMaxParamLength) {
                return this._onMaxParamLength(originPath);
              }
              return null;
            }
            const brotherNodeState = brothersNodesStack.pop();
            pathIndex = brotherNodeState.brotherPathIndex;
            params.splice(brotherNodeState.paramsCount);
            node = brotherNodeState.brotherNode;
          }
          currentNode = node;

          // static route
          if (currentNode.kind === NODE_TYPES.STATIC) {
            pathIndex += currentNode.prefix.length;
            continue;
          }
          if (currentNode.kind === NODE_TYPES.WILDCARD) {
            let param = originPath.slice(pathIndex);
            if (shouldDecodeParam) {
              param = safeDecodeURIComponent(param);
            }
            params.push(param);
            pathIndex = pathLen;
            continue;
          }

          // parametric node
          let paramEndIndex = originPath.indexOf('/', pathIndex);
          if (paramEndIndex === -1) {
            paramEndIndex = pathLen;
          }
          let param = originPath.slice(pathIndex, paramEndIndex);
          if (shouldDecodeParam) {
            param = safeDecodeURIComponent(param);
          }
          if (currentNode.isRegex) {
            const matchedParameters = currentNode.regex.exec(param);
            if (matchedParameters === null) {
              node = null;
              continue;
            }
            let regexMaxParamLengthExceeded = false;
            for (let i = 1; i < matchedParameters.length; i++) {
              const matchedParam = matchedParameters[i];
              if (matchedParam.length > maxParamLength) {
                regexMaxParamLengthExceeded = true;
                break;
              }
            }
            if (regexMaxParamLengthExceeded) {
              maxParamLengthExceeded = true;
              node = null;
              continue;
            }
            for (let i = 1; i < matchedParameters.length; i++) {
              params.push(matchedParameters[i]);
            }
          } else {
            if (param.length > maxParamLength) {
              maxParamLengthExceeded = true;
              node = null;
              continue;
            }
            params.push(param);
          }
          pathIndex = paramEndIndex;
        }
      };
      Router.prototype._rebuild = function (routes) {
        this.reset();
        for (const route of routes) {
          const method = route.method,
            path = route.path,
            opts = route.opts,
            handler = route.handler,
            store = route.store;
          this._on(method, path, opts, handler, store);
        }
      };
      Router.prototype._defaultRoute = function (req, res, ctx) {
        if (this.defaultRoute !== null) {
          return ctx === undefined ? this.defaultRoute(req, res) : this.defaultRoute.call(ctx, req, res);
        } else {
          res.statusCode = 404;
          res.end();
        }
      };
      Router.prototype._onBadUrl = function (path) {
        if (this.onBadUrl === null) {
          return null;
        }
        const onBadUrl = this.onBadUrl;
        return {
          handler: (req, res, ctx) => onBadUrl(path, req, res),
          params: {},
          store: null
        };
      };
      Router.prototype._onMaxParamLength = function (path) {
        if (this.onMaxParamLength === null) {
          return null;
        }
        const onMaxParamLength = this.onMaxParamLength;
        return {
          handler: (req, res, ctx) => onMaxParamLength(path, req, res),
          params: {},
          store: null
        };
      };
      Router.prototype.prettyPrint = function () {
        let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        const method = options.method;
        options.buildPrettyMeta = this.buildPrettyMeta.bind(this);
        let tree = null;
        if (method === undefined) {
          const _this$constrainer$str = this.constrainer.strategies,
            version = _this$constrainer$str.version,
            host = _this$constrainer$str.host,
            constraints = _objectWithoutProperties(_this$constrainer$str, _excluded);
          constraints[httpMethodStrategy.name] = httpMethodStrategy;
          const mergedRouter = new Router(_objectSpread(_objectSpread({}, this._opts), {}, {
            constraints
          }));
          const mergedRoutes = this.routes.map(route => {
            const constraints = _objectSpread(_objectSpread({}, route.opts.constraints), {}, {
              [httpMethodStrategy.name]: route.method
            });
            return _objectSpread(_objectSpread({}, route), {}, {
              method: 'MERGED',
              opts: {
                constraints
              }
            });
          });
          mergedRouter._rebuild(mergedRoutes);
          tree = mergedRouter.trees.MERGED;
        } else {
          tree = this.trees[method];
        }
        if (tree == null) return '(empty tree)';
        return prettyPrintTree(tree, options);
      };
      for (const i in httpMethods) {
        /* eslint no-prototype-builtins: "off" */
        if (!httpMethods.hasOwnProperty(i)) continue;
        const m = httpMethods[i];
        const methodName = m.toLowerCase();
        Router.prototype[methodName] = function (path, handler, store) {
          return this.on(m, path, handler, store);
        };
      }
      Router.prototype.all = function (path, handler, store) {
        this.on(httpMethods, path, handler, store);
      };
      Router.sanitizeUrlPath = function sanitizeUrlPath(url, useSemicolonDelimiter) {
        const decoded = safeDecodeURI(url, useSemicolonDelimiter);
        if (decoded.shouldDecodeParam) {
          return safeDecodeURIComponent(decoded.path);
        }
        return decoded.path;
      };
      Router.removeDuplicateSlashes = removeDuplicateSlashes;
      Router.trimLastSlash = trimLastSlash;
      module.exports = Router;
      function escapeRegExp(string) {
        return string.replace(ESCAPE_REGEXP, '\\$&');
      }
      function removeDuplicateSlashes(path) {
        return path.indexOf('//') !== -1 ? path.replace(REMOVE_DUPLICATE_SLASHES_REGEXP, '/') : path;
      }
      function trimLastSlash(path) {
        if (path.length > 1 && path.charCodeAt(path.length - 1) === 47) {
          return path.slice(0, -1);
        }
        return path;
      }
      function trimRegExpStartAndEnd(regexString) {
        // removes chars that marks start "^" and end "$" of regexp
        if (regexString.charCodeAt(1) === 94) {
          regexString = regexString.slice(0, 1) + regexString.slice(2);
        }
        if (regexString.charCodeAt(regexString.length - 2) === 36) {
          regexString = regexString.slice(0, regexString.length - 2) + regexString.slice(regexString.length - 1);
        }
        return regexString;
      }
      function getClosingParenthensePosition(path, idx) {
        // `path.indexOf()` will always return the first position of the closing parenthese,
        // but it's inefficient for grouped or wrong regexp expressions.
        // see issues #62 and #63 for more info

        let parentheses = 1;
        while (idx < path.length) {
          idx++;

          // ignore skipped chars "\"
          if (path.charCodeAt(idx) === 92) {
            idx++;
            continue;
          }
          if (path.charCodeAt(idx) === 41) {
            parentheses--;
          } else if (path.charCodeAt(idx) === 40) {
            parentheses++;
          }
          if (!parentheses) return idx;
        }
        throw new TypeError('Invalid regexp expression in "' + path + '"');
      }
      function defaultBuildPrettyMeta(route) {
        // buildPrettyMeta function must return an object, which will be parsed into key/value pairs for display
        if (!route) return {};
        if (!route.store) return {};
        return Object.assign({}, route.store);
      }
    }, {
      "./lib/constrainer": 31,
      "./lib/http-methods": 33,
      "./lib/node": 34,
      "./lib/pretty-print": 36,
      "./lib/strategies/http-method": 39,
      "./lib/url-sanitizer": 40,
      "assert": 1,
      "fast-deep-equal": 25,
      "fast-querystring": 26,
      "safe-regex2": 78
    }],
    31: [function (require, module, exports) {
      'use strict';

      const acceptVersionStrategy = require('./strategies/accept-version');
      const acceptHostStrategy = require('./strategies/accept-host');
      const assert = require('assert');
      class Constrainer {
        constructor(customStrategies) {
          this.strategies = {
            version: acceptVersionStrategy,
            host: acceptHostStrategy
          };
          this.strategiesInUse = new Set();
          this.asyncStrategiesInUse = new Set();

          // validate and optimize prototypes of given custom strategies
          if (customStrategies) {
            for (const strategy of Object.values(customStrategies)) {
              this.addConstraintStrategy(strategy);
            }
          }
        }
        isStrategyUsed(strategyName) {
          return this.strategiesInUse.has(strategyName) || this.asyncStrategiesInUse.has(strategyName);
        }
        hasConstraintStrategy(strategyName) {
          const customConstraintStrategy = this.strategies[strategyName];
          if (customConstraintStrategy !== undefined) {
            return customConstraintStrategy.isCustom || this.isStrategyUsed(strategyName);
          }
          return false;
        }
        addConstraintStrategy(strategy) {
          assert(typeof strategy.name === 'string' && strategy.name !== '', 'strategy.name is required.');
          assert(strategy.storage && typeof strategy.storage === 'function', 'strategy.storage function is required.');
          assert(strategy.deriveConstraint && typeof strategy.deriveConstraint === 'function', 'strategy.deriveConstraint function is required.');
          if (this.strategies[strategy.name] && this.strategies[strategy.name].isCustom) {
            throw new Error("There already exists a custom constraint with the name ".concat(strategy.name, "."));
          }
          if (this.isStrategyUsed(strategy.name)) {
            throw new Error("There already exists a route with ".concat(strategy.name, " constraint."));
          }
          strategy.isCustom = true;
          strategy.isAsync = strategy.deriveConstraint.length === 3;
          this.strategies[strategy.name] = strategy;
          if (strategy.mustMatchWhenDerived) {
            this.noteUsage({
              [strategy.name]: strategy
            });
          }
        }
        deriveConstraints(req, ctx, done) {
          const constraints = this.deriveSyncConstraints(req, ctx);
          if (done === undefined) {
            return constraints;
          }
          this.deriveAsyncConstraints(constraints, req, ctx, done);
        }
        deriveSyncConstraints(req, ctx) {
          return undefined;
        }

        // When new constraints start getting used, we need to rebuild the deriver to derive them. Do so if we see novel constraints used.
        noteUsage(constraints) {
          if (constraints) {
            const beforeSize = this.strategiesInUse.size;
            for (const key in constraints) {
              if (!Object.hasOwn(constraints, key)) continue;
              const strategy = this.strategies[key];
              if (strategy.isAsync) {
                this.asyncStrategiesInUse.add(key);
              } else {
                this.strategiesInUse.add(key);
              }
            }
            if (beforeSize !== this.strategiesInUse.size) {
              this._buildDeriveConstraints();
            }
          }
        }
        newStoreForConstraint(constraint) {
          if (!this.strategies[constraint]) {
            throw new Error("No strategy registered for constraint key ".concat(constraint));
          }
          return this.strategies[constraint].storage();
        }
        validateConstraints(constraints) {
          for (const key in constraints) {
            if (!Object.hasOwn(constraints, key)) continue;
            const value = constraints[key];
            if (typeof value === 'undefined') {
              throw new Error('Can\'t pass an undefined constraint value, must pass null or no key at all');
            }
            const strategy = this.strategies[key];
            if (!strategy) {
              throw new Error("No strategy registered for constraint key ".concat(key));
            }
            if (strategy.validate) {
              strategy.validate(value);
            }
          }
        }
        deriveAsyncConstraints(constraints, req, ctx, done) {
          let asyncConstraintsCount = this.asyncStrategiesInUse.size;
          if (asyncConstraintsCount === 0) {
            done(null, constraints);
            return;
          }
          constraints = constraints || {};
          for (const key of this.asyncStrategiesInUse) {
            const strategy = this.strategies[key];
            strategy.deriveConstraint(req, ctx, (err, constraintValue) => {
              if (err !== null) {
                done(err);
                return;
              }
              constraints[key] = constraintValue;
              if (--asyncConstraintsCount === 0) {
                done(null, constraints);
              }
            });
          }
        }

        // Optimization: build a fast function for deriving the constraints for all the strategies at once. We inline the definitions of the version constraint and the host constraint for performance.
        // If no constraining strategies are in use (no routes constrain on host, or version, or any custom strategies) then we don't need to derive constraints for each route match, so don't do anything special, and just return undefined
        // This allows us to not allocate an object to hold constraint values if no constraints are defined.
        _buildDeriveConstraints() {
          if (this.strategiesInUse.size === 0) return;
          const lines = ['return {'];
          for (const key of this.strategiesInUse) {
            const strategy = this.strategies[key];
            // Optimization: inline the derivation for the common built in constraints
            if (!strategy.isCustom) {
              if (key === 'version') {
                lines.push('   version: req.headers[\'accept-version\'],');
              } else {
                lines.push('   host: req.headers.host || req.headers[\':authority\'],');
              }
            } else {
              lines.push("  ".concat(strategy.name, ": this.strategies.").concat(key, ".deriveConstraint(req, ctx),"));
            }
          }
          lines.push('}');
          this.deriveSyncConstraints = new Function('req', 'ctx', lines.join('\n')).bind(this); // eslint-disable-line
        }
      }
      module.exports = Constrainer;
    }, {
      "./strategies/accept-host": 37,
      "./strategies/accept-version": 38,
      "assert": 1
    }],
    32: [function (require, module, exports) {
      'use strict';

      const _require5 = require('./null-object'),
        NullObject = _require5.NullObject;
      const httpMethodStrategy = require('./strategies/http-method');
      class HandlerStorage {
        constructor() {
          this.unconstrainedHandler = null; // optimized reference to the handler that will match most of the time
          this.constraints = [];
          this.handlers = []; // unoptimized list of handler objects for which the fast matcher function will be compiled
          this.constrainedHandlerStores = null;
        }

        // This is the hot path for node handler finding -- change with care!
        getMatchingHandler(derivedConstraints) {
          if (derivedConstraints === undefined) {
            return this.unconstrainedHandler;
          }
          return this._getHandlerMatchingConstraints(derivedConstraints);
        }
        addHandler(constrainer, route) {
          const params = route.params;
          const constraints = route.opts.constraints || {};
          const handlerObject = {
            params,
            constraints,
            handler: route.handler,
            store: route.store || null,
            _createParamsObject: this._compileCreateParamsObject(params)
          };
          const constraintsNames = Object.keys(constraints);
          if (constraintsNames.length === 0) {
            this.unconstrainedHandler = handlerObject;
          }
          for (const constraint of constraintsNames) {
            if (!this.constraints.includes(constraint)) {
              if (constraint === 'version') {
                // always check the version constraint first as it is the most selective
                this.constraints.unshift(constraint);
              } else {
                this.constraints.push(constraint);
              }
            }
          }
          const isMergedTree = constraintsNames.includes(httpMethodStrategy.name);
          if (!isMergedTree && this.handlers.length >= 31) {
            throw new Error('find-my-way supports a maximum of 31 route handlers per node when there are constraints, limit reached');
          }
          this.handlers.push(handlerObject);
          // Sort the most constrained handlers to the front of the list of handlers so they are tested first.
          this.handlers.sort((a, b) => Object.keys(a.constraints).length - Object.keys(b.constraints).length);
          if (!isMergedTree) {
            this._compileGetHandlerMatchingConstraints(constrainer, constraints);
          }
        }
        _compileCreateParamsObject(params) {
          const fnBody = [];
          fnBody.push('const fn = function _createParamsObject (paramsArray) {');
          fnBody.push('const params = new NullObject()');
          for (let i = 0; i < params.length; i++) {
            fnBody.push("params['".concat(params[i], "'] = paramsArray[").concat(i, "]"));
          }
          fnBody.push('return params');
          fnBody.push('}');
          fnBody.push('return fn');
          return new Function('NullObject', fnBody.join('\n'))(NullObject); // eslint-disable-line
        }
        _getHandlerMatchingConstraints() {
          return null;
        }

        // Builds a store object that maps from constraint values to a bitmap of handler indexes which pass the constraint for a value
        // So for a host constraint, this might look like { "fastify.io": 0b0010, "google.ca": 0b0101 }, meaning the 3rd handler is constrainted to fastify.io, and the 2nd and 4th handlers are constrained to google.ca.
        // The store's implementation comes from the strategies provided to the Router.
        _buildConstraintStore(store, constraint) {
          for (let i = 0; i < this.handlers.length; i++) {
            const handler = this.handlers[i];
            const constraintValue = handler.constraints[constraint];
            if (constraintValue !== undefined) {
              let indexes = store.get(constraintValue) || 0;
              indexes |= 1 << i; // set the i-th bit for the mask because this handler is constrained by this value https://stackoverflow.com/questions/1436438/how-do-you-set-clear-and-toggle-a-single-bit-in-javascrip
              store.set(constraintValue, indexes);
            }
          }
        }

        // Builds a bitmask for a given constraint that has a bit for each handler index that is 0 when that handler *is* constrained and 1 when the handler *isnt* constrainted. This is opposite to what might be obvious, but is just for convienience when doing the bitwise operations.
        _constrainedIndexBitmask(constraint) {
          let mask = 0;
          for (let i = 0; i < this.handlers.length; i++) {
            const handler = this.handlers[i];
            const constraintValue = handler.constraints[constraint];
            if (constraintValue !== undefined) {
              mask |= 1 << i;
            }
          }
          return ~mask;
        }

        // Compile a fast function to match the handlers for this node
        // The function implements a general case multi-constraint matching algorithm.
        // The general idea is this: we have a bunch of handlers, each with a potentially different set of constraints, and sometimes none at all. We're given a list of constraint values and we have to use the constraint-value-comparison strategies to see which handlers match the constraint values passed in.
        // We do this by asking each constraint store which handler indexes match the given constraint value for each store. Trickily, the handlers that a store says match are the handlers constrained by that store, but handlers that aren't constrained at all by that store could still match just fine. So, each constraint store can only describe matches for it, and it won't have any bearing on the handlers it doesn't care about. For this reason, we have to ask each stores which handlers match and track which have been matched (or not cared about) by all of them.
        // We use bitmaps to represent these lists of matches so we can use bitwise operations to implement this efficiently. Bitmaps are cheap to allocate, let us implement this masking behaviour in one CPU instruction, and are quite compact in memory. We start with a bitmap set to all 1s representing every handler that is a match candidate, and then for each constraint, see which handlers match using the store, and then mask the result by the mask of handlers that that store applies to, and bitwise AND with the candidate list. Phew.
        // We consider all this compiling function complexity to be worth it, because the naive implementation that just loops over the handlers asking which stores match is quite a bit slower.
        _compileGetHandlerMatchingConstraints(constrainer) {
          this.constrainedHandlerStores = {};
          for (const constraint of this.constraints) {
            const store = constrainer.newStoreForConstraint(constraint);
            this.constrainedHandlerStores[constraint] = store;
            this._buildConstraintStore(store, constraint);
          }
          const lines = [];
          lines.push("\n    let candidates = ".concat((1 << this.handlers.length) - 1, "\n    let mask, matches\n    "));
          for (const constraint of this.constraints) {
            // Setup the mask for indexes this constraint applies to. The mask bits are set to 1 for each position if the constraint applies.
            lines.push("\n      mask = ".concat(this._constrainedIndexBitmask(constraint), "\n      value = derivedConstraints.").concat(constraint, "\n      "));

            // If there's no constraint value, none of the handlers constrained by this constraint can match. Remove them from the candidates.
            // If there is a constraint value, get the matching indexes bitmap from the store, and mask it down to only the indexes this constraint applies to, and then bitwise and with the candidates list to leave only matching candidates left.
            const strategy = constrainer.strategies[constraint];
            const matchMask = strategy.mustMatchWhenDerived ? 'matches' : '(matches | mask)';
            lines.push("\n      if (value === undefined) {\n        candidates &= mask\n      } else {\n        matches = this.constrainedHandlerStores.".concat(constraint, ".get(value) || 0\n        candidates &= ").concat(matchMask, "\n      }\n      if (candidates === 0) return null;\n      "));
          }

          // There are some constraints that can be derived and marked as "must match", where if they are derived, they only match routes that actually have a constraint on the value, like the SemVer version constraint.
          // An example: a request comes in for version 1.x, and this node has a handler that matches the path, but there's no version constraint. For SemVer, the find-my-way semantics do not match this handler to that request.
          // This function is used by Nodes with handlers to match when they don't have any constrained routes to exclude request that do have must match derived constraints present.
          for (const constraint in constrainer.strategies) {
            if (!Object.hasOwn(constrainer.strategies, constraint)) continue;
            const strategy = constrainer.strategies[constraint];
            if (strategy.mustMatchWhenDerived && !this.constraints.includes(constraint)) {
              lines.push("if (derivedConstraints.".concat(constraint, " !== undefined) return null"));
            }
          }

          // Return the highest set bit index in the candidates bitmask.
          lines.push('return this.handlers[31 - Math.clz32(candidates)]');
          this._getHandlerMatchingConstraints = new Function('derivedConstraints', lines.join('\n')); // eslint-disable-line
        }
      }
      module.exports = HandlerStorage;
    }, {
      "./null-object": 35,
      "./strategies/http-method": 39
    }],
    33: [function (require, module, exports) {
      'use strict';

      // defined by Node.js http module, a snapshot from Node.js 22.9.0
      const httpMethods = ['ACL', 'BIND', 'CHECKOUT', 'CONNECT', 'COPY', 'DELETE', 'GET', 'HEAD', 'LINK', 'LOCK', 'M-SEARCH', 'MERGE', 'MKACTIVITY', 'MKCALENDAR', 'MKCOL', 'MOVE', 'NOTIFY', 'OPTIONS', 'PATCH', 'POST', 'PROPFIND', 'PROPPATCH', 'PURGE', 'PUT', 'QUERY', 'REBIND', 'REPORT', 'SEARCH', 'SOURCE', 'SUBSCRIBE', 'TRACE', 'UNBIND', 'UNLINK', 'UNLOCK', 'UNSUBSCRIBE'];
      module.exports = httpMethods;
    }, {}],
    34: [function (require, module, exports) {
      'use strict';

      const HandlerStorage = require('./handler-storage');
      const NODE_TYPES = {
        STATIC: 0,
        PARAMETRIC: 1,
        WILDCARD: 2
      };
      class Node {
        constructor() {
          this.isLeafNode = false;
          this.routes = null;
          this.handlerStorage = null;
        }
        addRoute(route, constrainer) {
          if (this.routes === null) {
            this.routes = [];
          }
          if (this.handlerStorage === null) {
            this.handlerStorage = new HandlerStorage();
          }
          this.isLeafNode = true;
          this.routes.push(route);
          this.handlerStorage.addHandler(constrainer, route);
        }
      }
      class ParentNode extends Node {
        constructor() {
          super();
          this.staticChildren = {};
        }
        findStaticMatchingChild(path, pathIndex) {
          const staticChild = this.staticChildren[path.charAt(pathIndex)];
          if (staticChild === undefined || !staticChild.matchPrefix(path, pathIndex)) {
            return null;
          }
          return staticChild;
        }
        getStaticChild(path) {
          let pathIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          if (path.length === pathIndex) {
            return this;
          }
          const staticChild = this.findStaticMatchingChild(path, pathIndex);
          if (staticChild) {
            return staticChild.getStaticChild(path, pathIndex + staticChild.prefix.length);
          }
          return null;
        }
        createStaticChild(path) {
          if (path.length === 0) {
            return this;
          }
          let staticChild = this.staticChildren[path.charAt(0)];
          if (staticChild) {
            let i = 1;
            for (; i < staticChild.prefix.length; i++) {
              if (path.charCodeAt(i) !== staticChild.prefix.charCodeAt(i)) {
                staticChild = staticChild.split(this, i);
                break;
              }
            }
            return staticChild.createStaticChild(path.slice(i));
          }
          const label = path.charAt(0);
          this.staticChildren[label] = new StaticNode(path);
          return this.staticChildren[label];
        }
      }
      class StaticNode extends ParentNode {
        constructor(prefix) {
          super();
          this.prefix = prefix;
          this.wildcardChild = null;
          this.parametricChildren = [];
          this.kind = NODE_TYPES.STATIC;
          this._compilePrefixMatch();
        }
        getParametricChild(regex) {
          const regexpSource = regex && regex.source;
          const parametricChild = this.parametricChildren.find(child => {
            const childRegexSource = child.regex && child.regex.source;
            return childRegexSource === regexpSource;
          });
          if (parametricChild) {
            return parametricChild;
          }
          return null;
        }
        createParametricChild(regex, staticSuffix, nodePath) {
          let parametricChild = this.getParametricChild(regex);
          if (parametricChild) {
            parametricChild.nodePaths.add(nodePath);
            return parametricChild;
          }
          parametricChild = new ParametricNode(regex, staticSuffix, nodePath);
          this.parametricChildren.push(parametricChild);
          this.parametricChildren.sort((child1, child2) => {
            if (!child1.isRegex) return 1;
            if (!child2.isRegex) return -1;
            if (child1.staticSuffix === null) return 1;
            if (child2.staticSuffix === null) return -1;
            if (child2.staticSuffix.endsWith(child1.staticSuffix)) return 1;
            if (child1.staticSuffix.endsWith(child2.staticSuffix)) return -1;
            return 0;
          });
          return parametricChild;
        }
        getWildcardChild() {
          return this.wildcardChild;
        }
        createWildcardChild() {
          this.wildcardChild = this.getWildcardChild() || new WildcardNode();
          return this.wildcardChild;
        }
        split(parentNode, length) {
          const parentPrefix = this.prefix.slice(0, length);
          const childPrefix = this.prefix.slice(length);
          this.prefix = childPrefix;
          this._compilePrefixMatch();
          const staticNode = new StaticNode(parentPrefix);
          staticNode.staticChildren[childPrefix.charAt(0)] = this;
          parentNode.staticChildren[parentPrefix.charAt(0)] = staticNode;
          return staticNode;
        }
        getNextNode(path, pathIndex, nodeStack, paramsCount) {
          let node = this.findStaticMatchingChild(path, pathIndex);
          let parametricBrotherNodeIndex = 0;
          if (node === null) {
            if (this.parametricChildren.length === 0) {
              return this.wildcardChild;
            }
            node = this.parametricChildren[0];
            parametricBrotherNodeIndex = 1;
          }
          if (this.wildcardChild !== null) {
            nodeStack.push({
              paramsCount,
              brotherPathIndex: pathIndex,
              brotherNode: this.wildcardChild
            });
          }
          for (let i = this.parametricChildren.length - 1; i >= parametricBrotherNodeIndex; i--) {
            nodeStack.push({
              paramsCount,
              brotherPathIndex: pathIndex,
              brotherNode: this.parametricChildren[i]
            });
          }
          return node;
        }
        _compilePrefixMatch() {
          if (this.prefix.length === 1) {
            this.matchPrefix = () => true;
            return;
          }
          const lines = [];
          for (let i = 1; i < this.prefix.length; i++) {
            const charCode = this.prefix.charCodeAt(i);
            lines.push("path.charCodeAt(i + ".concat(i, ") === ").concat(charCode));
          }
          this.matchPrefix = new Function('path', 'i', "return ".concat(lines.join(' && '))); // eslint-disable-line
        }
      }
      class ParametricNode extends ParentNode {
        constructor(regex, staticSuffix, nodePath) {
          super();
          this.isRegex = !!regex;
          this.regex = regex || null;
          this.staticSuffix = staticSuffix || null;
          this.kind = NODE_TYPES.PARAMETRIC;
          this.nodePaths = new Set([nodePath]);
        }
        getNextNode(path, pathIndex) {
          return this.findStaticMatchingChild(path, pathIndex);
        }
      }
      class WildcardNode extends Node {
        constructor() {
          super();
          this.kind = NODE_TYPES.WILDCARD;
        }
        getNextNode() {
          return null;
        }
      }
      module.exports = {
        StaticNode,
        ParametricNode,
        WildcardNode,
        NODE_TYPES
      };
    }, {
      "./handler-storage": 32
    }],
    35: [function (require, module, exports) {
      'use strict';

      const NullObject = function NullObject() {};
      NullObject.prototype = Object.create(null);
      module.exports = {
        NullObject
      };
    }, {}],
    36: [function (require, module, exports) {
      'use strict';

      const deepEqual = require('fast-deep-equal');
      const httpMethodStrategy = require('./strategies/http-method');
      const treeDataSymbol = Symbol('treeData');
      function printObjectTree(obj) {
        let parentPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        let tree = '';
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const value = obj[key];
          const isLast = i === keys.length - 1;
          const nodePrefix = isLast ? '└── ' : '├── ';
          const childPrefix = isLast ? '    ' : '│   ';
          const nodeData = value[treeDataSymbol] || '';
          const prefixedNodeData = nodeData.replaceAll('\n', '\n' + parentPrefix + childPrefix);
          tree += parentPrefix + nodePrefix + key + prefixedNodeData + '\n';
          tree += printObjectTree(value, parentPrefix + childPrefix);
        }
        return tree;
      }
      function parseFunctionName(fn) {
        let fName = fn.name || '';
        fName = fName.replace('bound', '').trim();
        fName = (fName || 'anonymous') + '()';
        return fName;
      }
      function parseMeta(meta) {
        if (Array.isArray(meta)) return meta.map(m => parseMeta(m));
        if (typeof meta === 'symbol') return meta.toString();
        if (typeof meta === 'function') return parseFunctionName(meta);
        return meta;
      }
      function getRouteMetaData(route, options) {
        if (!options.includeMeta) return {};
        const metaDataObject = options.buildPrettyMeta(route);
        const filteredMetaData = {};
        let includeMetaKeys = options.includeMeta;
        if (!Array.isArray(includeMetaKeys)) {
          includeMetaKeys = Reflect.ownKeys(metaDataObject);
        }
        for (const metaKey of includeMetaKeys) {
          if (!Object.prototype.hasOwnProperty.call(metaDataObject, metaKey)) continue;
          const serializedKey = metaKey.toString();
          const metaValue = metaDataObject[metaKey];
          if (metaValue !== undefined && metaValue !== null) {
            const serializedValue = JSON.stringify(parseMeta(metaValue));
            filteredMetaData[serializedKey] = serializedValue;
          }
        }
        return filteredMetaData;
      }
      function serializeMetaData(metaData) {
        let serializedMetaData = '';
        for (const _ref of Object.entries(metaData)) {
          var _ref2 = _slicedToArray(_ref, 2);
          const key = _ref2[0];
          const value = _ref2[1];
          serializedMetaData += "\n\u2022 (".concat(key, ") ").concat(value);
        }
        return serializedMetaData;
      }

      // get original merged tree node route
      function normalizeRoute(route) {
        const constraints = _objectSpread({}, route.opts.constraints);
        const method = constraints[httpMethodStrategy.name];
        delete constraints[httpMethodStrategy.name];
        return _objectSpread(_objectSpread({}, route), {}, {
          method,
          opts: {
            constraints
          }
        });
      }
      function serializeRoute(route) {
        let serializedRoute = " (".concat(route.method, ")");
        const constraints = route.opts.constraints || {};
        if (Object.keys(constraints).length !== 0) {
          serializedRoute += ' ' + JSON.stringify(constraints);
        }
        serializedRoute += serializeMetaData(route.metaData);
        return serializedRoute;
      }
      function mergeSimilarRoutes(routes) {
        return routes.reduce((mergedRoutes, route) => {
          for (const nodeRoute of mergedRoutes) {
            if (deepEqual(route.opts.constraints, nodeRoute.opts.constraints) && deepEqual(route.metaData, nodeRoute.metaData)) {
              nodeRoute.method += ', ' + route.method;
              return mergedRoutes;
            }
          }
          mergedRoutes.push(route);
          return mergedRoutes;
        }, []);
      }
      function serializeNode(node, prefix, options) {
        let routes = node.routes;
        if (options.method === undefined) {
          routes = routes.map(normalizeRoute);
        }
        routes = routes.map(route => {
          route.metaData = getRouteMetaData(route, options);
          return route;
        });
        if (options.method === undefined) {
          routes = mergeSimilarRoutes(routes);
        }
        return routes.map(serializeRoute).join("\n".concat(prefix));
      }
      function buildObjectTree(node, tree, prefix, options) {
        if (node.isLeafNode || options.commonPrefix !== false) {
          prefix = prefix || '(empty root node)';
          tree = tree[prefix] = {};
          if (node.isLeafNode) {
            tree[treeDataSymbol] = serializeNode(node, prefix, options);
          }
          prefix = '';
        }
        if (node.staticChildren) {
          for (const child of Object.values(node.staticChildren)) {
            buildObjectTree(child, tree, prefix + child.prefix, options);
          }
        }
        if (node.parametricChildren) {
          for (const child of Object.values(node.parametricChildren)) {
            const childPrefix = Array.from(child.nodePaths).join('|');
            buildObjectTree(child, tree, prefix + childPrefix, options);
          }
        }
        if (node.wildcardChild) {
          buildObjectTree(node.wildcardChild, tree, '*', options);
        }
      }
      function prettyPrintTree(root, options) {
        const objectTree = {};
        buildObjectTree(root, objectTree, root.prefix, options);
        return printObjectTree(objectTree);
      }
      module.exports = {
        prettyPrintTree
      };
    }, {
      "./strategies/http-method": 39,
      "fast-deep-equal": 25
    }],
    37: [function (require, module, exports) {
      'use strict';

      const assert = require('assert');
      function HostStorage() {
        const hosts = new Map();
        const regexHosts = [];
        return {
          get: host => {
            const exact = hosts.get(host);
            if (exact) {
              return exact;
            }
            for (const regex of regexHosts) {
              if (regex.host.test(host)) {
                return regex.value;
              }
            }
          },
          set: (host, value) => {
            if (host instanceof RegExp) {
              regexHosts.push({
                host,
                value
              });
            } else {
              hosts.set(host, value);
            }
          }
        };
      }
      module.exports = {
        name: 'host',
        mustMatchWhenDerived: false,
        storage: HostStorage,
        validate(value) {
          assert(typeof value === 'string' || Object.prototype.toString.call(value) === '[object RegExp]', 'Host should be a string or a RegExp');
        }
      };
    }, {
      "assert": 1
    }],
    38: [function (require, module, exports) {
      'use strict';

      const assert = require('assert');
      function SemVerStore() {
        if (!(this instanceof SemVerStore)) {
          return new SemVerStore();
        }
        this.store = new Map();
        this.maxMajor = 0;
        this.maxMinors = {};
        this.maxPatches = {};
      }
      SemVerStore.prototype.set = function (version, store) {
        if (typeof version !== 'string') {
          throw new TypeError('Version should be a string');
        }
        let _version$split = version.split('.', 3),
          _version$split2 = _slicedToArray(_version$split, 3),
          major = _version$split2[0],
          minor = _version$split2[1],
          patch = _version$split2[2];
        if (isNaN(major)) {
          throw new TypeError('Major version must be a numeric value');
        }
        major = Number(major);
        minor = Number(minor) || 0;
        patch = Number(patch) || 0;
        if (major >= this.maxMajor) {
          this.maxMajor = major;
          this.store.set('x', store);
          this.store.set('*', store);
          this.store.set('x.x', store);
          this.store.set('x.x.x', store);
        }
        if (minor >= (this.maxMinors[major] || 0)) {
          this.maxMinors[major] = minor;
          this.store.set("".concat(major, ".x"), store);
          this.store.set("".concat(major, ".x.x"), store);
        }
        if (patch >= (this.maxPatches["".concat(major, ".").concat(minor)] || 0)) {
          this.maxPatches["".concat(major, ".").concat(minor)] = patch;
          this.store.set("".concat(major, ".").concat(minor, ".x"), store);
        }
        this.store.set("".concat(major, ".").concat(minor, ".").concat(patch), store);
        return this;
      };
      SemVerStore.prototype.get = function (version) {
        return this.store.get(version);
      };
      module.exports = {
        name: 'version',
        mustMatchWhenDerived: true,
        storage: SemVerStore,
        validate(value) {
          assert(typeof value === 'string', 'Version should be a string');
        }
      };
    }, {
      "assert": 1
    }],
    39: [function (require, module, exports) {
      'use strict';

      module.exports = {
        name: '__fmw_internal_strategy_merged_tree_http_method__',
        storage: function storage() {
          const handlers = new Map();
          return {
            get: type => {
              return handlers.get(type) || null;
            },
            set: (type, store) => {
              handlers.set(type, store);
            }
          };
        },
        /* c8 ignore next 1 */
        deriveConstraint: req => req.method,
        mustMatchWhenDerived: true
      };
    }, {}],
    40: [function (require, module, exports) {
      'use strict';

      // It must spot all the chars where decodeURIComponent(x) !== decodeURI(x)
      // The chars are: # $ & + , / : ; = ? @
      function decodeComponentChar(highCharCode, lowCharCode) {
        if (highCharCode === 50) {
          if (lowCharCode === 53) return '%';
          if (lowCharCode === 51) return '#';
          if (lowCharCode === 52) return '$';
          if (lowCharCode === 54) return '&';
          if (lowCharCode === 66) return '+';
          if (lowCharCode === 98) return '+';
          if (lowCharCode === 67) return ',';
          if (lowCharCode === 99) return ',';
          if (lowCharCode === 70) return '/';
          if (lowCharCode === 102) return '/';
          return null;
        }
        if (highCharCode === 51) {
          if (lowCharCode === 65) return ':';
          if (lowCharCode === 97) return ':';
          if (lowCharCode === 66) return ';';
          if (lowCharCode === 98) return ';';
          if (lowCharCode === 68) return '=';
          if (lowCharCode === 100) return '=';
          if (lowCharCode === 70) return '?';
          if (lowCharCode === 102) return '?';
          return null;
        }
        if (highCharCode === 52 && lowCharCode === 48) {
          return '@';
        }
        return null;
      }

      /**
       * Safely decodes a URI path, preserving reserved characters in querystring.
       *
       * @param {string} path - The full request path, possibly including querystring.
       * @param {boolean} [useSemicolonDelimiter] - When true, also treat `;` as a query delimiter.
       * @returns {{ path: string, querystring: string, shouldDecodeParam: boolean }}
       * An object containing the decoded path, the raw querystring, and a flag indicating
       * whether any path parameters contain percent-encoded reserved characters.
       */
      function safeDecodeURI(path, useSemicolonDelimiter) {
        let shouldDecode = false;
        let shouldDecodeParam = false;
        let querystring = '';
        for (let i = 1; i < path.length; i++) {
          const charCode = path.charCodeAt(i);
          if (charCode === 37) {
            const highCharCode = path.charCodeAt(i + 1);
            const lowCharCode = path.charCodeAt(i + 2);
            if (decodeComponentChar(highCharCode, lowCharCode) === null) {
              shouldDecode = true;
            } else {
              shouldDecodeParam = true;
              // %25 - encoded % char. We need to encode one more time to prevent double decoding
              if (highCharCode === 50 && lowCharCode === 53) {
                shouldDecode = true;
                path = path.slice(0, i + 1) + '25' + path.slice(i + 1);
                i += 2;
              }
              i += 2;
            }
            // Some systems do not follow RFC and separate the path and query
            // string with a `;` character (code 59), e.g. `/foo;jsessionid=123456`.
            // Thus, we need to split on `;` as well as `?` and `#` if the useSemicolonDelimiter option is enabled.
          } else if (charCode === 63 || charCode === 35 || charCode === 59 && useSemicolonDelimiter) {
            querystring = path.slice(i + 1);
            path = path.slice(0, i);
            break;
          }
        }
        const decodedPath = shouldDecode ? decodeURI(path) : path;
        return {
          path: decodedPath,
          querystring,
          shouldDecodeParam
        };
      }
      function safeDecodeURIComponent(uriComponent) {
        const startIndex = uriComponent.indexOf('%');
        if (startIndex === -1) return uriComponent;
        let decoded = '';
        let lastIndex = startIndex;
        for (let i = startIndex; i < uriComponent.length; i++) {
          if (uriComponent.charCodeAt(i) === 37) {
            const highCharCode = uriComponent.charCodeAt(i + 1);
            const lowCharCode = uriComponent.charCodeAt(i + 2);
            const decodedChar = decodeComponentChar(highCharCode, lowCharCode);
            decoded += uriComponent.slice(lastIndex, i) + decodedChar;
            lastIndex = i + 3;
          }
        }
        return uriComponent.slice(0, startIndex) + decoded + uriComponent.slice(lastIndex);
      }
      module.exports = {
        safeDecodeURI,
        safeDecodeURIComponent
      };
    }, {}],
    41: [function (require, module, exports) {
      'use strict';

      /* eslint no-invalid-this: 1 */
      var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
      var toStr = Object.prototype.toString;
      var max = Math.max;
      var funcType = '[object Function]';
      var concatty = function concatty(a, b) {
        var arr = [];
        for (var i = 0; i < a.length; i += 1) {
          arr[i] = a[i];
        }
        for (var j = 0; j < b.length; j += 1) {
          arr[j + a.length] = b[j];
        }
        return arr;
      };
      var slicy = function slicy(arrLike, offset) {
        var arr = [];
        for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
          arr[j] = arrLike[i];
        }
        return arr;
      };
      var joiny = function joiny(arr, joiner) {
        var str = '';
        for (var i = 0; i < arr.length; i += 1) {
          str += arr[i];
          if (i + 1 < arr.length) {
            str += joiner;
          }
        }
        return str;
      };
      module.exports = function bind(that) {
        var target = this;
        if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
          throw new TypeError(ERROR_MESSAGE + target);
        }
        var args = slicy(arguments, 1);
        var bound;
        var binder = function binder() {
          if (this instanceof bound) {
            var result = target.apply(this, concatty(args, arguments));
            if (Object(result) === result) {
              return result;
            }
            return this;
          }
          return target.apply(that, concatty(args, arguments));
        };
        var boundLength = max(0, target.length - args.length);
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
          boundArgs[i] = '$' + i;
        }
        bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);
        if (target.prototype) {
          var Empty = function Empty() {};
          Empty.prototype = target.prototype;
          bound.prototype = new Empty();
          Empty.prototype = null;
        }
        return bound;
      };
    }, {}],
    42: [function (require, module, exports) {
      'use strict';

      var implementation = require('./implementation');
      module.exports = Function.prototype.bind || implementation;
    }, {
      "./implementation": 41
    }],
    43: [function (require, module, exports) {
      'use strict';

      var undefined;
      var $Object = require('es-object-atoms');
      var $Error = require('es-errors');
      var $EvalError = require('es-errors/eval');
      var $RangeError = require('es-errors/range');
      var $ReferenceError = require('es-errors/ref');
      var $SyntaxError = require('es-errors/syntax');
      var $TypeError = require('es-errors/type');
      var $URIError = require('es-errors/uri');
      var abs = require('math-intrinsics/abs');
      var floor = require('math-intrinsics/floor');
      var max = require('math-intrinsics/max');
      var min = require('math-intrinsics/min');
      var pow = require('math-intrinsics/pow');
      var round = require('math-intrinsics/round');
      var sign = require('math-intrinsics/sign');
      var $Function = Function;

      // eslint-disable-next-line consistent-return
      var getEvalledConstructor = function getEvalledConstructor(expressionSyntax) {
        try {
          return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
        } catch (e) {}
      };
      var $gOPD = require('gopd');
      var $defineProperty = require('es-define-property');
      var throwTypeError = function throwTypeError() {
        throw new $TypeError();
      };
      var ThrowTypeError = $gOPD ? function () {
        try {
          // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
          arguments.callee; // IE 8 does not throw here
          return throwTypeError;
        } catch (calleeThrows) {
          try {
            // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
            return $gOPD(arguments, 'callee').get;
          } catch (gOPDthrows) {
            return throwTypeError;
          }
        }
      }() : throwTypeError;
      var hasSymbols = require('has-symbols')();
      var getProto = require('get-proto');
      var $ObjectGPO = require('get-proto/Object.getPrototypeOf');
      var $ReflectGPO = require('get-proto/Reflect.getPrototypeOf');
      var $apply = require('call-bind-apply-helpers/functionApply');
      var $call = require('call-bind-apply-helpers/functionCall');
      var needsEval = {};
      var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);
      var INTRINSICS = {
        __proto__: null,
        '%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
        '%Array%': Array,
        '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
        '%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
        '%AsyncFromSyncIteratorPrototype%': undefined,
        '%AsyncFunction%': needsEval,
        '%AsyncGenerator%': needsEval,
        '%AsyncGeneratorFunction%': needsEval,
        '%AsyncIteratorPrototype%': needsEval,
        '%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
        '%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
        '%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
        '%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
        '%Boolean%': Boolean,
        '%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
        '%Date%': Date,
        '%decodeURI%': decodeURI,
        '%decodeURIComponent%': decodeURIComponent,
        '%encodeURI%': encodeURI,
        '%encodeURIComponent%': encodeURIComponent,
        '%Error%': $Error,
        '%eval%': eval,
        // eslint-disable-line no-eval
        '%EvalError%': $EvalError,
        '%Float16Array%': typeof Float16Array === 'undefined' ? undefined : Float16Array,
        '%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
        '%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
        '%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
        '%Function%': $Function,
        '%GeneratorFunction%': needsEval,
        '%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
        '%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
        '%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
        '%isFinite%': isFinite,
        '%isNaN%': isNaN,
        '%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
        '%JSON%': typeof JSON === 'object' ? JSON : undefined,
        '%Map%': typeof Map === 'undefined' ? undefined : Map,
        '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
        '%Math%': Math,
        '%Number%': Number,
        '%Object%': $Object,
        '%Object.getOwnPropertyDescriptor%': $gOPD,
        '%parseFloat%': parseFloat,
        '%parseInt%': parseInt,
        '%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
        '%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
        '%RangeError%': $RangeError,
        '%ReferenceError%': $ReferenceError,
        '%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
        '%RegExp%': RegExp,
        '%Set%': typeof Set === 'undefined' ? undefined : Set,
        '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
        '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
        '%String%': String,
        '%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
        '%Symbol%': hasSymbols ? Symbol : undefined,
        '%SyntaxError%': $SyntaxError,
        '%ThrowTypeError%': ThrowTypeError,
        '%TypedArray%': TypedArray,
        '%TypeError%': $TypeError,
        '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
        '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
        '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
        '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
        '%URIError%': $URIError,
        '%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
        '%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
        '%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
        '%Function.prototype.call%': $call,
        '%Function.prototype.apply%': $apply,
        '%Object.defineProperty%': $defineProperty,
        '%Object.getPrototypeOf%': $ObjectGPO,
        '%Math.abs%': abs,
        '%Math.floor%': floor,
        '%Math.max%': max,
        '%Math.min%': min,
        '%Math.pow%': pow,
        '%Math.round%': round,
        '%Math.sign%': sign,
        '%Reflect.getPrototypeOf%': $ReflectGPO
      };
      if (getProto) {
        try {
          null.error; // eslint-disable-line no-unused-expressions
        } catch (e) {
          // https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
          var errorProto = getProto(getProto(e));
          INTRINSICS['%Error.prototype%'] = errorProto;
        }
      }
      var doEval = function doEval(name) {
        var value;
        if (name === '%AsyncFunction%') {
          value = getEvalledConstructor('async function () {}');
        } else if (name === '%GeneratorFunction%') {
          value = getEvalledConstructor('function* () {}');
        } else if (name === '%AsyncGeneratorFunction%') {
          value = getEvalledConstructor('async function* () {}');
        } else if (name === '%AsyncGenerator%') {
          var fn = doEval('%AsyncGeneratorFunction%');
          if (fn) {
            value = fn.prototype;
          }
        } else if (name === '%AsyncIteratorPrototype%') {
          var gen = doEval('%AsyncGenerator%');
          if (gen && getProto) {
            value = getProto(gen.prototype);
          }
        }
        INTRINSICS[name] = value;
        return value;
      };
      var LEGACY_ALIASES = {
        __proto__: null,
        '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
        '%ArrayPrototype%': ['Array', 'prototype'],
        '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
        '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
        '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
        '%ArrayProto_values%': ['Array', 'prototype', 'values'],
        '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
        '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
        '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
        '%BooleanPrototype%': ['Boolean', 'prototype'],
        '%DataViewPrototype%': ['DataView', 'prototype'],
        '%DatePrototype%': ['Date', 'prototype'],
        '%ErrorPrototype%': ['Error', 'prototype'],
        '%EvalErrorPrototype%': ['EvalError', 'prototype'],
        '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
        '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
        '%FunctionPrototype%': ['Function', 'prototype'],
        '%Generator%': ['GeneratorFunction', 'prototype'],
        '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
        '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
        '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
        '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
        '%JSONParse%': ['JSON', 'parse'],
        '%JSONStringify%': ['JSON', 'stringify'],
        '%MapPrototype%': ['Map', 'prototype'],
        '%NumberPrototype%': ['Number', 'prototype'],
        '%ObjectPrototype%': ['Object', 'prototype'],
        '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
        '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
        '%PromisePrototype%': ['Promise', 'prototype'],
        '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
        '%Promise_all%': ['Promise', 'all'],
        '%Promise_reject%': ['Promise', 'reject'],
        '%Promise_resolve%': ['Promise', 'resolve'],
        '%RangeErrorPrototype%': ['RangeError', 'prototype'],
        '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
        '%RegExpPrototype%': ['RegExp', 'prototype'],
        '%SetPrototype%': ['Set', 'prototype'],
        '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
        '%StringPrototype%': ['String', 'prototype'],
        '%SymbolPrototype%': ['Symbol', 'prototype'],
        '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
        '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
        '%TypeErrorPrototype%': ['TypeError', 'prototype'],
        '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
        '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
        '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
        '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
        '%URIErrorPrototype%': ['URIError', 'prototype'],
        '%WeakMapPrototype%': ['WeakMap', 'prototype'],
        '%WeakSetPrototype%': ['WeakSet', 'prototype']
      };
      var bind = require('function-bind');
      var hasOwn = require('hasown');
      var $concat = bind.call($call, Array.prototype.concat);
      var $spliceApply = bind.call($apply, Array.prototype.splice);
      var $replace = bind.call($call, String.prototype.replace);
      var $strSlice = bind.call($call, String.prototype.slice);
      var $exec = bind.call($call, RegExp.prototype.exec);

      /* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
      var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
      var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
      var stringToPath = function stringToPath(string) {
        var first = $strSlice(string, 0, 1);
        var last = $strSlice(string, -1);
        if (first === '%' && last !== '%') {
          throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
        } else if (last === '%' && first !== '%') {
          throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
        }
        var result = [];
        $replace(string, rePropName, function (match, number, quote, subString) {
          result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
        });
        return result;
      };
      /* end adaptation */

      var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
        var intrinsicName = name;
        var alias;
        if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
          alias = LEGACY_ALIASES[intrinsicName];
          intrinsicName = '%' + alias[0] + '%';
        }
        if (hasOwn(INTRINSICS, intrinsicName)) {
          var value = INTRINSICS[intrinsicName];
          if (value === needsEval) {
            value = doEval(intrinsicName);
          }
          if (typeof value === 'undefined' && !allowMissing) {
            throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
          }
          return {
            alias: alias,
            name: intrinsicName,
            value: value
          };
        }
        throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
      };
      module.exports = function GetIntrinsic(name, allowMissing) {
        if (typeof name !== 'string' || name.length === 0) {
          throw new $TypeError('intrinsic name must be a non-empty string');
        }
        if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
          throw new $TypeError('"allowMissing" argument must be a boolean');
        }
        if ($exec(/^%?[^%]*%?$/, name) === null) {
          throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
        }
        var parts = stringToPath(name);
        var intrinsicBaseName = parts.length > 0 ? parts[0] : '';
        var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
        var intrinsicRealName = intrinsic.name;
        var value = intrinsic.value;
        var skipFurtherCaching = false;
        var alias = intrinsic.alias;
        if (alias) {
          intrinsicBaseName = alias[0];
          $spliceApply(parts, $concat([0, 1], alias));
        }
        for (var i = 1, isOwn = true; i < parts.length; i += 1) {
          var part = parts[i];
          var first = $strSlice(part, 0, 1);
          var last = $strSlice(part, -1);
          if ((first === '"' || first === "'" || first === '`' || last === '"' || last === "'" || last === '`') && first !== last) {
            throw new $SyntaxError('property names with quotes must have matching quotes');
          }
          if (part === 'constructor' || !isOwn) {
            skipFurtherCaching = true;
          }
          intrinsicBaseName += '.' + part;
          intrinsicRealName = '%' + intrinsicBaseName + '%';
          if (hasOwn(INTRINSICS, intrinsicRealName)) {
            value = INTRINSICS[intrinsicRealName];
          } else if (value != null) {
            if (!(part in value)) {
              if (!allowMissing) {
                throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
              }
              return void undefined;
            }
            if ($gOPD && i + 1 >= parts.length) {
              var desc = $gOPD(value, part);
              isOwn = !!desc;

              // By convention, when a data property is converted to an accessor
              // property to emulate a data property that does not suffer from
              // the override mistake, that accessor's getter is marked with
              // an `originalValue` property. Here, when we detect this, we
              // uphold the illusion by pretending to see that original data
              // property, i.e., returning the value rather than the getter
              // itself.
              if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
                value = desc.get;
              } else {
                value = value[part];
              }
            } else {
              isOwn = hasOwn(value, part);
              value = value[part];
            }
            if (isOwn && !skipFurtherCaching) {
              INTRINSICS[intrinsicRealName] = value;
            }
          }
        }
        return value;
      };
    }, {
      "call-bind-apply-helpers/functionApply": 7,
      "call-bind-apply-helpers/functionCall": 8,
      "es-define-property": 13,
      "es-errors": 15,
      "es-errors/eval": 14,
      "es-errors/range": 16,
      "es-errors/ref": 17,
      "es-errors/syntax": 18,
      "es-errors/type": 19,
      "es-errors/uri": 20,
      "es-object-atoms": 21,
      "function-bind": 42,
      "get-proto": 46,
      "get-proto/Object.getPrototypeOf": 44,
      "get-proto/Reflect.getPrototypeOf": 45,
      "gopd": 48,
      "has-symbols": 49,
      "hasown": 51,
      "math-intrinsics/abs": 52,
      "math-intrinsics/floor": 53,
      "math-intrinsics/max": 55,
      "math-intrinsics/min": 56,
      "math-intrinsics/pow": 57,
      "math-intrinsics/round": 58,
      "math-intrinsics/sign": 59
    }],
    44: [function (require, module, exports) {
      'use strict';

      var $Object = require('es-object-atoms');

      /** @type {import('./Object.getPrototypeOf')} */
      module.exports = $Object.getPrototypeOf || null;
    }, {
      "es-object-atoms": 21
    }],
    45: [function (require, module, exports) {
      'use strict';

      /** @type {import('./Reflect.getPrototypeOf')} */
      module.exports = typeof Reflect !== 'undefined' && Reflect.getPrototypeOf || null;
    }, {}],
    46: [function (require, module, exports) {
      'use strict';

      var reflectGetProto = require('./Reflect.getPrototypeOf');
      var originalGetProto = require('./Object.getPrototypeOf');
      var getDunderProto = require('dunder-proto/get');

      /** @type {import('.')} */
      module.exports = reflectGetProto ? function getProto(O) {
        // @ts-expect-error TS can't narrow inside a closure, for some reason
        return reflectGetProto(O);
      } : originalGetProto ? function getProto(O) {
        if (!O || typeof O !== 'object' && typeof O !== 'function') {
          throw new TypeError('getProto: not an object');
        }
        // @ts-expect-error TS can't narrow inside a closure, for some reason
        return originalGetProto(O);
      } : getDunderProto ? function getProto(O) {
        // @ts-expect-error TS can't narrow inside a closure, for some reason
        return getDunderProto(O);
      } : null;
    }, {
      "./Object.getPrototypeOf": 44,
      "./Reflect.getPrototypeOf": 45,
      "dunder-proto/get": 12
    }],
    47: [function (require, module, exports) {
      'use strict';

      /** @type {import('./gOPD')} */
      module.exports = Object.getOwnPropertyDescriptor;
    }, {}],
    48: [function (require, module, exports) {
      'use strict';

      /** @type {import('.')} */
      var $gOPD = require('./gOPD');
      if ($gOPD) {
        try {
          $gOPD([], 'length');
        } catch (e) {
          // IE 8 has a broken gOPD
          $gOPD = null;
        }
      }
      module.exports = $gOPD;
    }, {
      "./gOPD": 47
    }],
    49: [function (require, module, exports) {
      'use strict';

      var origSymbol = typeof Symbol !== 'undefined' && Symbol;
      var hasSymbolSham = require('./shams');

      /** @type {import('.')} */
      module.exports = function hasNativeSymbols() {
        if (typeof origSymbol !== 'function') {
          return false;
        }
        if (typeof Symbol !== 'function') {
          return false;
        }
        if (typeof origSymbol('foo') !== 'symbol') {
          return false;
        }
        if (typeof Symbol('bar') !== 'symbol') {
          return false;
        }
        return hasSymbolSham();
      };
    }, {
      "./shams": 50
    }],
    50: [function (require, module, exports) {
      'use strict';

      /** @type {import('./shams')} */
      /* eslint complexity: [2, 18], max-statements: [2, 33] */
      module.exports = function hasSymbols() {
        if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
          return false;
        }
        if (typeof Symbol.iterator === 'symbol') {
          return true;
        }

        /** @type {{ [k in symbol]?: unknown }} */
        var obj = {};
        var sym = Symbol('test');
        var symObj = Object(sym);
        if (typeof sym === 'string') {
          return false;
        }
        if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
          return false;
        }
        if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
          return false;
        }

        // temp disabled per https://github.com/ljharb/object.assign/issues/17
        // if (sym instanceof Symbol) { return false; }
        // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
        // if (!(symObj instanceof Symbol)) { return false; }

        // if (typeof Symbol.prototype.toString !== 'function') { return false; }
        // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

        var symVal = 42;
        obj[sym] = symVal;
        for (var _ in obj) {
          return false;
        } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
        if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
          return false;
        }
        if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
          return false;
        }
        var syms = Object.getOwnPropertySymbols(obj);
        if (syms.length !== 1 || syms[0] !== sym) {
          return false;
        }
        if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
          return false;
        }
        if (typeof Object.getOwnPropertyDescriptor === 'function') {
          // eslint-disable-next-line no-extra-parens
          var descriptor = /** @type {PropertyDescriptor} */Object.getOwnPropertyDescriptor(obj, sym);
          if (descriptor.value !== symVal || descriptor.enumerable !== true) {
            return false;
          }
        }
        return true;
      };
    }, {}],
    51: [function (require, module, exports) {
      'use strict';

      var call = Function.prototype.call;
      var $hasOwn = Object.prototype.hasOwnProperty;
      var bind = require('function-bind');

      /** @type {import('.')} */
      module.exports = bind.call(call, $hasOwn);
    }, {
      "function-bind": 42
    }],
    52: [function (require, module, exports) {
      'use strict';

      /** @type {import('./abs')} */
      module.exports = Math.abs;
    }, {}],
    53: [function (require, module, exports) {
      'use strict';

      /** @type {import('./floor')} */
      module.exports = Math.floor;
    }, {}],
    54: [function (require, module, exports) {
      'use strict';

      /** @type {import('./isNaN')} */
      module.exports = Number.isNaN || function isNaN(a) {
        return a !== a;
      };
    }, {}],
    55: [function (require, module, exports) {
      'use strict';

      /** @type {import('./max')} */
      module.exports = Math.max;
    }, {}],
    56: [function (require, module, exports) {
      'use strict';

      /** @type {import('./min')} */
      module.exports = Math.min;
    }, {}],
    57: [function (require, module, exports) {
      'use strict';

      /** @type {import('./pow')} */
      module.exports = Math.pow;
    }, {}],
    58: [function (require, module, exports) {
      'use strict';

      /** @type {import('./round')} */
      module.exports = Math.round;
    }, {}],
    59: [function (require, module, exports) {
      'use strict';

      var $isNaN = require('./isNaN');

      /** @type {import('./sign')} */
      module.exports = function sign(number) {
        if ($isNaN(number) || number === 0) {
          return number;
        }
        return number < 0 ? -1 : +1;
      };
    }, {
      "./isNaN": 54
    }],
    60: [function (require, module, exports) {
      'use strict';

      var keysShim;
      if (!Object.keys) {
        // modified from https://github.com/es-shims/es5-shim
        var has = Object.prototype.hasOwnProperty;
        var toStr = Object.prototype.toString;
        var isArgs = require('./isArguments'); // eslint-disable-line global-require
        var isEnumerable = Object.prototype.propertyIsEnumerable;
        var hasDontEnumBug = !isEnumerable.call({
          toString: null
        }, 'toString');
        var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
        var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
        var equalsConstructorPrototype = function equalsConstructorPrototype(o) {
          var ctor = o.constructor;
          return ctor && ctor.prototype === o;
        };
        var excludedKeys = {
          $applicationCache: true,
          $console: true,
          $external: true,
          $frame: true,
          $frameElement: true,
          $frames: true,
          $innerHeight: true,
          $innerWidth: true,
          $onmozfullscreenchange: true,
          $onmozfullscreenerror: true,
          $outerHeight: true,
          $outerWidth: true,
          $pageXOffset: true,
          $pageYOffset: true,
          $parent: true,
          $scrollLeft: true,
          $scrollTop: true,
          $scrollX: true,
          $scrollY: true,
          $self: true,
          $webkitIndexedDB: true,
          $webkitStorageInfo: true,
          $window: true
        };
        var hasAutomationEqualityBug = function () {
          /* global window */
          if (typeof window === 'undefined') {
            return false;
          }
          for (var k in window) {
            try {
              if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
                try {
                  equalsConstructorPrototype(window[k]);
                } catch (e) {
                  return true;
                }
              }
            } catch (e) {
              return true;
            }
          }
          return false;
        }();
        var equalsConstructorPrototypeIfNotBuggy = function equalsConstructorPrototypeIfNotBuggy(o) {
          /* global window */
          if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
            return equalsConstructorPrototype(o);
          }
          try {
            return equalsConstructorPrototype(o);
          } catch (e) {
            return false;
          }
        };
        keysShim = function keys(object) {
          var isObject = object !== null && typeof object === 'object';
          var isFunction = toStr.call(object) === '[object Function]';
          var isArguments = isArgs(object);
          var isString = isObject && toStr.call(object) === '[object String]';
          var theKeys = [];
          if (!isObject && !isFunction && !isArguments) {
            throw new TypeError('Object.keys called on a non-object');
          }
          var skipProto = hasProtoEnumBug && isFunction;
          if (isString && object.length > 0 && !has.call(object, 0)) {
            for (var i = 0; i < object.length; ++i) {
              theKeys.push(String(i));
            }
          }
          if (isArguments && object.length > 0) {
            for (var j = 0; j < object.length; ++j) {
              theKeys.push(String(j));
            }
          } else {
            for (var name in object) {
              if (!(skipProto && name === 'prototype') && has.call(object, name)) {
                theKeys.push(String(name));
              }
            }
          }
          if (hasDontEnumBug) {
            var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
            for (var k = 0; k < dontEnums.length; ++k) {
              if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
                theKeys.push(dontEnums[k]);
              }
            }
          }
          return theKeys;
        };
      }
      module.exports = keysShim;
    }, {
      "./isArguments": 62
    }],
    61: [function (require, module, exports) {
      'use strict';

      var slice = Array.prototype.slice;
      var isArgs = require('./isArguments');
      var origKeys = Object.keys;
      var keysShim = origKeys ? function keys(o) {
        return origKeys(o);
      } : require('./implementation');
      var originalKeys = Object.keys;
      keysShim.shim = function shimObjectKeys() {
        if (Object.keys) {
          var keysWorksWithArguments = function () {
            // Safari 5.0 bug
            var args = Object.keys(arguments);
            return args && args.length === arguments.length;
          }(1, 2);
          if (!keysWorksWithArguments) {
            Object.keys = function keys(object) {
              // eslint-disable-line func-name-matching
              if (isArgs(object)) {
                return originalKeys(slice.call(object));
              }
              return originalKeys(object);
            };
          }
        } else {
          Object.keys = keysShim;
        }
        return Object.keys || keysShim;
      };
      module.exports = keysShim;
    }, {
      "./implementation": 60,
      "./isArguments": 62
    }],
    62: [function (require, module, exports) {
      'use strict';

      var toStr = Object.prototype.toString;
      module.exports = function isArguments(value) {
        var str = toStr.call(value);
        var isArgs = str === '[object Arguments]';
        if (!isArgs) {
          isArgs = str !== '[object Array]' && value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr.call(value.callee) === '[object Function]';
        }
        return isArgs;
      };
    }, {}],
    63: [function (require, module, exports) {
      'use strict';

      // modified from https://github.com/es-shims/es6-shim
      var objectKeys = require('object-keys');
      var hasSymbols = require('has-symbols/shams')();
      var callBound = require('call-bound');
      var $Object = require('es-object-atoms');
      var $push = callBound('Array.prototype.push');
      var $propIsEnumerable = callBound('Object.prototype.propertyIsEnumerable');
      var originalGetSymbols = hasSymbols ? $Object.getOwnPropertySymbols : null;

      // eslint-disable-next-line no-unused-vars
      module.exports = function assign(target, source1) {
        if (target == null) {
          throw new TypeError('target must be an object');
        }
        var to = $Object(target); // step 1
        if (arguments.length === 1) {
          return to; // step 2
        }
        for (var s = 1; s < arguments.length; ++s) {
          var from = $Object(arguments[s]); // step 3.a.i

          // step 3.a.ii:
          var keys = objectKeys(from);
          var getSymbols = hasSymbols && ($Object.getOwnPropertySymbols || originalGetSymbols);
          if (getSymbols) {
            var syms = getSymbols(from);
            for (var j = 0; j < syms.length; ++j) {
              var key = syms[j];
              if ($propIsEnumerable(from, key)) {
                $push(keys, key);
              }
            }
          }

          // step 3.a.iii:
          for (var i = 0; i < keys.length; ++i) {
            var nextKey = keys[i];
            if ($propIsEnumerable(from, nextKey)) {
              // step 3.a.iii.2
              var propValue = from[nextKey]; // step 3.a.iii.2.a
              to[nextKey] = propValue; // step 3.a.iii.2.b
            }
          }
        }
        return to; // step 4
      };
    }, {
      "call-bound": 11,
      "es-object-atoms": 21,
      "has-symbols/shams": 50,
      "object-keys": 61
    }],
    64: [function (require, module, exports) {
      'use strict';

      var implementation = require('./implementation');
      var lacksProperEnumerationOrder = function lacksProperEnumerationOrder() {
        if (!Object.assign) {
          return false;
        }
        /*
         * v8, specifically in node 4.x, has a bug with incorrect property enumeration order
         * note: this does not detect the bug unless there's 20 characters
         */
        var str = 'abcdefghijklmnopqrst';
        var letters = str.split('');
        var map = {};
        for (var i = 0; i < letters.length; ++i) {
          map[letters[i]] = letters[i];
        }
        var obj = Object.assign({}, map);
        var actual = '';
        for (var k in obj) {
          actual += k;
        }
        return str !== actual;
      };
      var assignHasPendingExceptions = function assignHasPendingExceptions() {
        if (!Object.assign || !Object.preventExtensions) {
          return false;
        }
        /*
         * Firefox 37 still has "pending exception" logic in its Object.assign implementation,
         * which is 72% slower than our shim, and Firefox 40's native implementation.
         */
        var thrower = Object.preventExtensions({
          1: 2
        });
        try {
          Object.assign(thrower, 'xy');
        } catch (e) {
          return thrower[1] === 'y';
        }
        return false;
      };
      module.exports = function getPolyfill() {
        if (!Object.assign) {
          return implementation;
        }
        if (lacksProperEnumerationOrder()) {
          return implementation;
        }
        if (assignHasPendingExceptions()) {
          return implementation;
        }
        return Object.assign;
      };
    }, {
      "./implementation": 63
    }],
    65: [function (require, module, exports) {
      const libFableServiceProviderBase = require('fable-serviceproviderbase');

      /**
       * @template [TRequest=any]
       * @template [TResponse=any]
       * @typedef {(pRequest: TRequest, pResponse: TResponse, fNext: (pError?: Error) => void) => void} RequestHandler
       */
      /**
       * A route handler type that accepts either a single request handler or an array of request handlers.
       * This accommodates frameworks like restify where middleware (e.g. bodyParser) returns an array of handlers.
       *
       * @template [TRequest=any]
       * @template [TResponse=any]
       * @typedef {RequestHandler<TRequest, TResponse> | RequestHandler<TRequest, TResponse>[]} RouteHandler
       */
      /**
       * OratorServiceServerBase class represents the base class for the Orator service server.
       * It provides basic functionality for handling what is usually an HTTP service's lifecycle, content parsing, and route creation.
       * Derived classes can override the base functions to implement specific handlers (e.g. restify or express).
       *
       * @class
       * @template [TRequest=any] - The request type for the concrete server implementation.
       * @template [TResponse=any] - The response type for the concrete server implementation.
       * @template [TServer=any] - The server type for the concrete server implementation.
       */
      class OratorServiceServerBase extends libFableServiceProviderBase {
        /**
         * @param {import('fable')|Record<string, any>} [pFable] - (optional) The fable instance, or the options object if there is no fable
         * @param {Record<string, any>|string} [pOptions] - (optional) The options object, or the service hash if there is no fable
         * @param {string} [pServiceHash] - (optional) The service hash to identify this service instance
         */
        constructor(pFable, pOptions, pServiceHash) {
          super(pFable, pOptions, pServiceHash);
          this.serviceType = 'OratorServiceServer';
          this.ServiceServerType = 'Base';
          this.Name = this.fable.settings.Product;
          this.URL = 'BASE_SERVICE_SERVER';
          this.Port = this.options.ServicePort;
          this.Active = false;
        }

        /*
         * Service Lifecycle Functions
         *************************************************************************/

        /**
         * Listens for network calls on the specified port (or starts a virtual serviceserver for that "port").
         * @param {number} pPort - The port number to listen on.
         * @param {(pError?: Error) => void} fCallback - The callback function to execute after listening.
         * @return {any} The result of the callback function.
         */
        listen(pPort, fCallback) {
          // Sometimes, listen does not listen on network calls.
          this.Active = true;
          return fCallback();
        }

        /**
         * Closes the service server.
         *
         * @param {(pError?: Error) => any} fCallback - The callback function to be executed after closing the server.
         * @return {any} - The result of the callback function.
         */
        close(fCallback) {
          this.Active = false;
          return fCallback();
        }
        /*************************************************************************
         * End of Service Lifecycle Functions
         */

        /*
         * Content parsing functions
         *************************************************************************/
        /**
         * Middleware function for parsing the request body.
         *
         * @param {Record<string, any>} [pOptions] - The options for the body parser.
         * @return {RequestHandler<TRequest, TResponse> | RequestHandler<TRequest, TResponse>[]} - The middleware function.
         */
        bodyParser(pOptions) {
          return (pRequest, pResponse, fNext) => {
            fNext();
          };
        }
        /*************************************************************************
         * End of Service Lifecycle Functions
         */

        /*
         * Service Route Creation Functions
         *
         * These base functions provide basic validation for the routes, but don't actually
         * do anything with them.  The design intent here is to allow derived classes to call
         * these functions to validate that they conform to expected standards.
         *
         * Something like:
        		get (pRoute, ...fRouteProcessingFunctions)
        	{
        		if (!super.get(pRoute, ...fRouteProcessingFunctions))
        		{
        			this.log.error(`Restify provider failed to map route [${pRoute}]!`);
        			return false;
        		}
        			//...now we can do our actual get mapping function!....
        	}
        	 * This pattern and calling super is totally optional, obviously.
         *************************************************************************/
        /**
         * Registers a global handler function to be used by the Orator service server.
         *
         * @param {RequestHandler<TRequest, TResponse>} fHandlerFunction - The handler function to be registered. It should have the prototype function(Request, Response, Next).
         * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        use(fHandlerFunction) {
          if (typeof fHandlerFunction != 'function') {
            this.log.error("Orator USE global handler mapping failed -- parameter was expected to be a function with prototype function(Request, Response, Next) but type was ".concat(typeof fHandlerFunction, " instead of a string."));
            return false;
          }
          return true;
        }

        /**
         * Registers a global handler function to be used by the Orator service server that runs before routing.
         *
         * @param {RequestHandler<TRequest, TResponse>} fHandlerFunction - The handler function to be registered. It should have the prototype function(Request, Response, Next).
         * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        pre(fHandlerFunction) {
          if (typeof fHandlerFunction != 'function') {
            this.log.error("Orator PRE global handler mapping failed -- parameter was expected to be a function with prototype function(Request, Response, Next) but type was ".concat(typeof fHandlerFunction, " instead."));
            return false;
          }
          return true;
        }

        /**
         * Handles HTTP GET requests -- this is a base function that does nothing; override by the serviceserver is expected.
         *
         * @param {string} pRoute - The route of the request.
         * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions for the route.
         * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        doGet(pRoute) {
          return true;
        }
        /**
         * Maps a GET request handler for the specified route.
         *
         * @param {string} pRoute - The route to handle GET requests for.
         * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to be executed for the route.
         * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        get(pRoute) {
          if (typeof pRoute != 'string') {
            this.log.error("Orator GET Route mapping failed -- route parameter was ".concat(typeof pRoute, " instead of a string."));
            return false;
          }
          for (var _len = arguments.length, fRouteProcessingFunctions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            fRouteProcessingFunctions[_key - 1] = arguments[_key];
          }
          return this.doGet(pRoute, ...fRouteProcessingFunctions);
        }
        /**
         * A helper method that maps a GET request method with a body parser middleware.
         *
         * @param {string} pRoute - The route path.
         * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The route processing functions.
         * @returns {any} - Result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        getWithBodyParser(pRoute) {
          for (var _len2 = arguments.length, fRouteProcessingFunctions = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            fRouteProcessingFunctions[_key2 - 1] = arguments[_key2];
          }
          return this.get(pRoute, this.bodyParser(), ...fRouteProcessingFunctions);
        }

        /**
         * Handles HTTP PUT requests -- this is a base function that does nothing; override by the serviceserver is expected.
         *
         * @param {string} pRoute - The route to handle.
         * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to execute for the route.
         * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        doPut(pRoute) {
          return true;
        }
        /**
         * Maps a PUT request handler for the specified route.
         *
         * @param {string} pRoute - The route to be mapped.
         * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to be executed for the route.
         * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        put(pRoute) {
          if (typeof pRoute != 'string') {
            this.log.error("Orator PUT Route mapping failed -- route parameter was ".concat(typeof pRoute, " instead of a string."));
            return false;
          }
          for (var _len3 = arguments.length, fRouteProcessingFunctions = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            fRouteProcessingFunctions[_key3 - 1] = arguments[_key3];
          }
          return this.doPut(pRoute, ...fRouteProcessingFunctions);
        }
        /**
         * A helper method that maps a PUT request method with a body parser middleware.
         *
         * @param {string} pRoute - The route to send the PUT request to.
         * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - Optional route processing functions.
         * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        putWithBodyParser(pRoute) {
          for (var _len4 = arguments.length, fRouteProcessingFunctions = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            fRouteProcessingFunctions[_key4 - 1] = arguments[_key4];
          }
          return this.put(pRoute, this.bodyParser(), ...fRouteProcessingFunctions);
        }

        /**
         * Handles the HTTP POST request for a specific route.
         *
         * @param {string} pRoute - The route to handle the POST request for.
         * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to execute for the route.
         * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        doPost(pRoute) {
          return true;
        }
        /**
         * Maps a POST request handler for the specified route.
         *
         * @param {string} pRoute - The route to send the POST request to.
         * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to be executed for the route.
         * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        post(pRoute) {
          if (typeof pRoute != 'string') {
            this.log.error("Orator POST Route mapping failed -- route parameter was ".concat(typeof pRoute, " instead of a string."));
            return false;
          }
          for (var _len5 = arguments.length, fRouteProcessingFunctions = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
            fRouteProcessingFunctions[_key5 - 1] = arguments[_key5];
          }
          return this.doPost(pRoute, ...fRouteProcessingFunctions);
        }
        /**
         * A helper method that maps a POST request method with a body parser middleware.
         *
         * @param {string} pRoute - The route to handle the POST request for.
         * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to execute for the route.
         * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        postWithBodyParser(pRoute) {
          for (var _len6 = arguments.length, fRouteProcessingFunctions = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
            fRouteProcessingFunctions[_key6 - 1] = arguments[_key6];
          }
          return this.post(pRoute, this.bodyParser(), ...fRouteProcessingFunctions);
        }

        /**
         * Handles HTTP DELETE requests -- this is a base function that does nothing; override by the serviceserver is expected.
         *
         * @param {string} pRoute - The route of the resource to delete.
         * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to be executed to delete the resource.
         * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        doDel(pRoute) {
          return true;
        }
        /**
         * Maps a DEL request handler for the specified route.
         *
         * @param {string} pRoute - The route to map the delete function to.
         * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The additional processing functions to execute
         * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        del(pRoute) {
          if (typeof pRoute != 'string') {
            this.log.error("Orator DEL Route mapping failed -- route parameter was ".concat(typeof pRoute, " instead of a string."));
            return false;
          }
          for (var _len7 = arguments.length, fRouteProcessingFunctions = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
            fRouteProcessingFunctions[_key7 - 1] = arguments[_key7];
          }
          return this.doDel(pRoute, ...fRouteProcessingFunctions);
        }
        /**
         * A helper method that maps a DEL request method with a body parser middleware.
         *
         * @param {string} pRoute - The route path for the DELETE request.
         * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - Additional route processing functions.
         * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        delWithBodyParser(pRoute) {
          for (var _len8 = arguments.length, fRouteProcessingFunctions = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
            fRouteProcessingFunctions[_key8 - 1] = arguments[_key8];
          }
          return this.del(pRoute, this.bodyParser(), ...fRouteProcessingFunctions);
        }

        /**
         * Handles HTTP PATCH requests -- this is a base function that does nothing; override by the serviceserver is expected.
         *
         * @param {string} pRoute - The route to send the PATCH request to.
         * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to apply to the route.
         * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        doPatch(pRoute) {
          return true;
        }
        /**
         * Maps a PATCH request handler for the specified route.
         *
         * @param {string} pRoute - The route mapping.
         * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The route processing functions.
         * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        patch(pRoute) {
          if (typeof pRoute != 'string') {
            this.log.error("Orator PATCH Route mapping failed -- route parameter was ".concat(typeof pRoute, " instead of a string."));
            return false;
          }
          for (var _len9 = arguments.length, fRouteProcessingFunctions = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
            fRouteProcessingFunctions[_key9 - 1] = arguments[_key9];
          }
          return this.doPatch(pRoute, ...fRouteProcessingFunctions);
        }
        /**
         * A helper method that maps a PATCH request method with a body parser middleware.
         *
         * @param {string} pRoute - The route to map.
         * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - Route processing functions.
         * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        patchWithBodyParser(pRoute) {
          for (var _len0 = arguments.length, fRouteProcessingFunctions = new Array(_len0 > 1 ? _len0 - 1 : 0), _key0 = 1; _key0 < _len0; _key0++) {
            fRouteProcessingFunctions[_key0 - 1] = arguments[_key0];
          }
          return this.patch(pRoute, this.bodyParser(), ...fRouteProcessingFunctions);
        }

        /**
         * Handles HTTP OPT requests -- this is a base function that does nothing; override by the serviceserver is expected.
         *
         * @param {string} pRoute - The route.
         * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to apply to the route.
         * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        doOpts(pRoute) {
          return true;
        }
        /**
         * Maps a OPT request handler for the specified route.
         *
         * @param {string} pRoute - The route to be mapped.
         * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions for the route.
         * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        opts(pRoute) {
          if (typeof pRoute != 'string') {
            this.log.error("Orator OPTS Route mapping failed -- route parameter was ".concat(typeof pRoute, " instead of a string."));
            return false;
          }
          for (var _len1 = arguments.length, fRouteProcessingFunctions = new Array(_len1 > 1 ? _len1 - 1 : 0), _key1 = 1; _key1 < _len1; _key1++) {
            fRouteProcessingFunctions[_key1 - 1] = arguments[_key1];
          }
          return this.doOpts(pRoute, ...fRouteProcessingFunctions);
        }
        /**
         * A helper method that maps a OPT request method with a body parser middleware.
         * @param {string} pRoute - The route path.
         * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The route processing functions.
         * @returns {Object} - The result of the opts method.
         */
        optsWithBodyParser(pRoute) {
          for (var _len10 = arguments.length, fRouteProcessingFunctions = new Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
            fRouteProcessingFunctions[_key10 - 1] = arguments[_key10];
          }
          return this.opts(pRoute, this.bodyParser(), ...fRouteProcessingFunctions);
        }

        /**
         * Handles HTTP HEAD requests -- this is a base function that does nothing; override by the serviceserver is expected.
         *
         * @param {string} pRoute - The route to handle the HEAD request for.
         * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to execute for the route.
         * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        doHead(pRoute) {
          return true;
        }
        /**
         * Maps a HEAD request handler for the specified route.
         *
         * @param {string} pRoute - The route to handle the HEAD request for.
         * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - The processing functions to execute for the route.
         * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        head(pRoute) {
          if (typeof pRoute != 'string') {
            this.log.error("Orator HEAD Route mapping failed -- route parameter was ".concat(typeof pRoute, " instead of a string."));
            return false;
          }
          for (var _len11 = arguments.length, fRouteProcessingFunctions = new Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
            fRouteProcessingFunctions[_key11 - 1] = arguments[_key11];
          }
          return this.doHead(pRoute, ...fRouteProcessingFunctions);
        }
        /**
         * A helper method that combines the HEAD method with the bodyParser middleware.
         *
         * @param {string} pRoute - The route path for the HEAD request.
         * @param {...RouteHandler<TRequest, TResponse>} fRouteProcessingFunctions - Optional route processing functions.
         * @returns {any} - The result of adding the route to the concrete service provider (ex. a route object, a boolean).
         */
        headWithBodyParser(pRoute) {
          for (var _len12 = arguments.length, fRouteProcessingFunctions = new Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
            fRouteProcessingFunctions[_key12 - 1] = arguments[_key12];
          }
          return this.head(pRoute, this.bodyParser(), ...fRouteProcessingFunctions);
        }
        /*************************************************************************
         * End of Service Route Creation Functions
         */

        /**
         * Serve static files from a directory -- this is a base function that uses serve-static;
         * derived classes can override to use their own static file serving implementation (e.g. restify's built-in serveStatic plugin).
         *
         * @param {string} pRoute - The route to serve static files on.
         * @param {Object} pOptions - Options for the static file server.
         * @param {string} pOptions.directory - The directory to serve files from.
         * @param {string} [pOptions.default] - The default file to serve (e.g. 'index.html').
         * @returns {boolean} - Returns false in the base class; override in derived classes.
         */
        serveStatic(pRoute, pOptions) {
          // The base class version of this does nothing -- override in derived classes
          this.log.debug("Orator serveStatic called for route [".concat(pRoute, "] and landed on the base class; the service provider likely does not implement static file serving."));
          return false;
        }

        /**
         * Invokes a method on the service server programmatically -- expects to be overloaded by the service provider.
         *
         * @param {string} pMethod - The method to invoke.
         * @param {string} pRoute - The route to invoke the method on.
         * @param {any} pData - The data to pass to the method.
         * @param {Function} fCallback - The callback function to execute after the method is invoked.
         * @returns {boolean} - Returns true if the method was successfully invoked, false otherwise.
         */
        invoke(pMethod, pRoute, pData, fCallback) {
          // The base class version of this does nothing
          this.log.debug("Orator invoke called for route [".concat(pRoute, "] and landed on the base class; the service provider likely does not implement programmatic invoke capabilities."), pData);
          fCallback();
          return false;
        }
      }
      module.exports = OratorServiceServerBase;
    }, {
      "fable-serviceproviderbase": 23
    }],
    66: [function (require, module, exports) {
      // shim for using process in browser
      var process = module.exports = {};

      // cached from whatever global is present so that test runners that stub it
      // don't break things.  But we need to wrap it in a try catch in case it is
      // wrapped in strict mode code which doesn't define any globals.  It's inside a
      // function because try/catches deoptimize in certain engines.

      var cachedSetTimeout;
      var cachedClearTimeout;
      function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
      }
      function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
      }
      (function () {
        try {
          if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
          }
        }
      }
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;
      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }
      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }
      process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };

      // v8 likes predictible objects
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function () {
        this.fun.apply(null, this.array);
      };
      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = ''; // empty string to avoid regexp issues
      process.versions = {};
      function noop() {}
      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;
      process.prependListener = noop;
      process.prependOnceListener = noop;
      process.listeners = function (name) {
        return [];
      };
      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };
      process.cwd = function () {
        return '/';
      };
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };
      process.umask = function () {
        return 0;
      };
    }, {}],
    67: [function (require, module, exports) {
      "use strict";

      var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function get() {
            return m[k];
          }
        });
      } : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = this && this.__exportStar || function (m, exports) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.types = void 0;
      /* istanbul ignore file */
      const types_1 = require("./types");
      Object.defineProperty(exports, "types", {
        enumerable: true,
        get: function get() {
          return types_1.types;
        }
      });
      __exportStar(require("./tokenizer"), exports);
      __exportStar(require("./reconstruct"), exports);
      const tokenizer_1 = require("./tokenizer");
      const reconstruct_1 = require("./reconstruct");
      __exportStar(require("./types"), exports);
      exports.default = tokenizer_1.tokenizer;
      module.exports = tokenizer_1.tokenizer;
      module.exports.types = types_1.types;
      module.exports.reconstruct = reconstruct_1.reconstruct;
    }, {
      "./reconstruct": 68,
      "./tokenizer": 71,
      "./types": 72
    }],
    68: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.reconstruct = void 0;
      const types_1 = require("./types");
      const write_set_tokens_1 = require("./write-set-tokens");
      const reduceStack = stack => stack.map(exports.reconstruct).join('');
      const createAlternate = token => {
        if ('options' in token) {
          return token.options.map(reduceStack).join('|');
        } else if ('stack' in token) {
          return reduceStack(token.stack);
        } else {
          throw new Error("options or stack must be Root or Group token");
        }
      };
      exports.reconstruct = token => {
        switch (token.type) {
          case types_1.types.ROOT:
            return createAlternate(token);
          case types_1.types.CHAR:
            {
              const c = String.fromCharCode(token.value);
              // Note that the escaping for characters inside classes is handled
              // in the write-set-tokens module so '-' and ']' are not escaped here
              return (/[[\\{}$^.|?*+()]/.test(c) ? '\\' : '') + c;
            }
          case types_1.types.POSITION:
            if (token.value === '^' || token.value === '$') {
              return token.value;
            } else {
              return "\\".concat(token.value);
            }
          case types_1.types.REFERENCE:
            return "\\".concat(token.value);
          case types_1.types.SET:
            return write_set_tokens_1.writeSetTokens(token);
          case types_1.types.GROUP:
            {
              // Check token.remember
              const prefix = token.name ? "?<".concat(token.name, ">") : token.remember ? '' : token.followedBy ? '?=' : token.notFollowedBy ? '?!' : '?:';
              return "(".concat(prefix).concat(createAlternate(token), ")");
            }
          case types_1.types.REPETITION:
            {
              const min = token.min,
                max = token.max;
              let endWith;
              if (min === 0 && max === 1) {
                endWith = '?';
              } else if (min === 1 && max === Infinity) {
                endWith = '+';
              } else if (min === 0 && max === Infinity) {
                endWith = '*';
              } else if (max === Infinity) {
                endWith = "{".concat(min, ",}");
              } else if (min === max) {
                endWith = "{".concat(min, "}");
              } else {
                endWith = "{".concat(min, ",").concat(max, "}");
              }
              return "".concat(exports.reconstruct(token.value)).concat(endWith);
            }
          case types_1.types.RANGE:
            return "".concat(write_set_tokens_1.setChar(token.from), "-").concat(write_set_tokens_1.setChar(token.to));
          default:
            throw new Error("Invalid token type ".concat(token));
        }
      };
    }, {
      "./types": 72,
      "./write-set-tokens": 77
    }],
    69: [function (require, module, exports) {
      "use strict";

      var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function get() {
            return m[k];
          }
        });
      } : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
        Object.defineProperty(o, "default", {
          enumerable: true,
          value: v
        });
      } : function (o, v) {
        o["default"] = v;
      });
      var __importStar = this && this.__importStar || function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.NOTANYCHAR = exports.WHITESPACE = exports.WORDS = exports.INTS = void 0;
      const Sets = __importStar(require("./sets"));
      const types_1 = require("./types");
      function setToLookup(tokens) {
        let _lookup = {};
        let len = 0;
        for (const token of tokens) {
          if (token.type === types_1.types.CHAR) {
            _lookup[token.value] = true;
          }
          // Note this is in an if statement because
          // the SetTokens type is (Char | Range | Set)[]
          // so a type error is thrown if it is not.
          // If the SetTokens type is modified the if statement
          // can be removed
          if (token.type === types_1.types.RANGE) {
            _lookup["".concat(token.from, "-").concat(token.to)] = true;
          }
          len += 1;
        }
        return {
          lookup: () => Object.assign({}, _lookup),
          len
        };
      }
      exports.INTS = setToLookup(Sets.ints().set);
      exports.WORDS = setToLookup(Sets.words().set);
      exports.WHITESPACE = setToLookup(Sets.whitespace().set);
      exports.NOTANYCHAR = setToLookup(Sets.anyChar().set);
    }, {
      "./sets": 70,
      "./types": 72
    }],
    70: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.anyChar = exports.notWhitespace = exports.whitespace = exports.notInts = exports.ints = exports.notWords = exports.words = void 0;
      const types_1 = require("./types");
      const INTS = () => [{
        type: types_1.types.RANGE,
        from: 48,
        to: 57
      }];
      const WORDS = () => [{
        type: types_1.types.CHAR,
        value: 95
      }, {
        type: types_1.types.RANGE,
        from: 97,
        to: 122
      }, {
        type: types_1.types.RANGE,
        from: 65,
        to: 90
      }, {
        type: types_1.types.RANGE,
        from: 48,
        to: 57
      }];
      const WHITESPACE = () => [{
        type: types_1.types.CHAR,
        value: 9
      }, {
        type: types_1.types.CHAR,
        value: 10
      }, {
        type: types_1.types.CHAR,
        value: 11
      }, {
        type: types_1.types.CHAR,
        value: 12
      }, {
        type: types_1.types.CHAR,
        value: 13
      }, {
        type: types_1.types.CHAR,
        value: 32
      }, {
        type: types_1.types.CHAR,
        value: 160
      }, {
        type: types_1.types.CHAR,
        value: 5760
      }, {
        type: types_1.types.RANGE,
        from: 8192,
        to: 8202
      }, {
        type: types_1.types.CHAR,
        value: 8232
      }, {
        type: types_1.types.CHAR,
        value: 8233
      }, {
        type: types_1.types.CHAR,
        value: 8239
      }, {
        type: types_1.types.CHAR,
        value: 8287
      }, {
        type: types_1.types.CHAR,
        value: 12288
      }, {
        type: types_1.types.CHAR,
        value: 65279
      }];
      const NOTANYCHAR = () => [{
        type: types_1.types.CHAR,
        value: 10
      }, {
        type: types_1.types.CHAR,
        value: 13
      }, {
        type: types_1.types.CHAR,
        value: 8232
      }, {
        type: types_1.types.CHAR,
        value: 8233
      }];
      // Predefined class objects.
      exports.words = () => ({
        type: types_1.types.SET,
        set: WORDS(),
        not: false
      });
      exports.notWords = () => ({
        type: types_1.types.SET,
        set: WORDS(),
        not: true
      });
      exports.ints = () => ({
        type: types_1.types.SET,
        set: INTS(),
        not: false
      });
      exports.notInts = () => ({
        type: types_1.types.SET,
        set: INTS(),
        not: true
      });
      exports.whitespace = () => ({
        type: types_1.types.SET,
        set: WHITESPACE(),
        not: false
      });
      exports.notWhitespace = () => ({
        type: types_1.types.SET,
        set: WHITESPACE(),
        not: true
      });
      exports.anyChar = () => ({
        type: types_1.types.SET,
        set: NOTANYCHAR(),
        not: true
      });
    }, {
      "./types": 72
    }],
    71: [function (require, module, exports) {
      "use strict";

      var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function get() {
            return m[k];
          }
        });
      } : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
        Object.defineProperty(o, "default", {
          enumerable: true,
          value: v
        });
      } : function (o, v) {
        o["default"] = v;
      });
      var __importStar = this && this.__importStar || function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.tokenizer = void 0;
      const util = __importStar(require("./util"));
      const types_1 = require("./types");
      const sets = __importStar(require("./sets"));
      /**
       * Valid opening characters for capture group names.
       */
      const captureGroupFirstChar = /^[a-zA-Z_$]$/i;
      /**
       * Valid characters for capture group names.
       */
      const captureGroupChars = /^[a-zA-Z0-9_$]$/i;
      const digit = /\d/;
      /**
       * Tokenizes a regular expression (that is currently a string)
       * @param {string} regexpStr String of regular expression to be tokenized
       *
       * @returns {Root}
       */
      exports.tokenizer = regexpStr => {
        let i = 0,
          c;
        let start = {
          type: types_1.types.ROOT,
          stack: []
        };
        // Keep track of last clause/group and stack.
        let lastGroup = start;
        let last = start.stack;
        let groupStack = [];
        let referenceQueue = [];
        let groupCount = 0;
        const repeatErr = col => {
          throw new SyntaxError("Invalid regular expression: /".concat(regexpStr, "/: Nothing to repeat at column ").concat(col - 1));
        };
        // Decode a few escaped characters.
        let str = util.strToChars(regexpStr);
        // Iterate through each character in string.
        while (i < str.length) {
          switch (c = str[i++]) {
            // Handle escaped characters, inclues a few sets.
            case '\\':
              if (i === str.length) {
                throw new SyntaxError("Invalid regular expression: /".concat(regexpStr, "/: \\ at end of pattern"));
              }
              switch (c = str[i++]) {
                case 'b':
                  last.push({
                    type: types_1.types.POSITION,
                    value: 'b'
                  });
                  break;
                case 'B':
                  last.push({
                    type: types_1.types.POSITION,
                    value: 'B'
                  });
                  break;
                case 'w':
                  last.push(sets.words());
                  break;
                case 'W':
                  last.push(sets.notWords());
                  break;
                case 'd':
                  last.push(sets.ints());
                  break;
                case 'D':
                  last.push(sets.notInts());
                  break;
                case 's':
                  last.push(sets.whitespace());
                  break;
                case 'S':
                  last.push(sets.notWhitespace());
                  break;
                default:
                  // Check if c is integer.
                  // In which case it's a reference.
                  if (digit.test(c)) {
                    let digits = c;
                    while (i < str.length && digit.test(str[i])) {
                      digits += str[i++];
                    }
                    let value = parseInt(digits, 10);
                    const reference = {
                      type: types_1.types.REFERENCE,
                      value
                    };
                    last.push(reference);
                    referenceQueue.push({
                      reference,
                      stack: last,
                      index: last.length - 1
                    });
                    // Escaped character.
                  } else {
                    last.push({
                      type: types_1.types.CHAR,
                      value: c.charCodeAt(0)
                    });
                  }
              }
              break;
            // Positionals.
            case '^':
              last.push({
                type: types_1.types.POSITION,
                value: '^'
              });
              break;
            case '$':
              last.push({
                type: types_1.types.POSITION,
                value: '$'
              });
              break;
            // Handle custom sets.
            case '[':
              {
                // Check if this class is 'anti' i.e. [^abc].
                let not;
                if (str[i] === '^') {
                  not = true;
                  i++;
                } else {
                  not = false;
                }
                // Get all the characters in class.
                let classTokens = util.tokenizeClass(str.slice(i), regexpStr);
                // Increase index by length of class.
                i += classTokens[1];
                last.push({
                  type: types_1.types.SET,
                  set: classTokens[0],
                  not
                });
                break;
              }
            // Class of any character except \n.
            case '.':
              last.push(sets.anyChar());
              break;
            // Push group onto stack.
            case '(':
              {
                // Create group.
                let group = {
                  type: types_1.types.GROUP,
                  stack: [],
                  remember: true
                };
                // If this is a special kind of group.
                if (str[i] === '?') {
                  c = str[i + 1];
                  i += 2;
                  // Match if followed by.
                  if (c === '=') {
                    group.followedBy = true;
                    group.remember = false;
                    // Match if not followed by.
                  } else if (c === '!') {
                    group.notFollowedBy = true;
                    group.remember = false;
                  } else if (c === '<') {
                    let name = '';
                    if (captureGroupFirstChar.test(str[i])) {
                      name += str[i];
                      i++;
                    } else {
                      throw new SyntaxError("Invalid regular expression: /".concat(regexpStr, "/: Invalid capture group name, character '").concat(str[i], "'") + " after '<' at column ".concat(i + 1));
                    }
                    while (i < str.length && captureGroupChars.test(str[i])) {
                      name += str[i];
                      i++;
                    }
                    if (!name) {
                      throw new SyntaxError("Invalid regular expression: /".concat(regexpStr, "/: Invalid capture group name, character '").concat(str[i], "'") + " after '<' at column ".concat(i + 1));
                    }
                    if (str[i] !== '>') {
                      throw new SyntaxError("Invalid regular expression: /".concat(regexpStr, "/: Unclosed capture group name, expected '>', found") + " '".concat(str[i], "' at column ").concat(i + 1));
                    }
                    group.name = name;
                    i++;
                  } else if (c === ':') {
                    group.remember = false;
                  } else {
                    throw new SyntaxError("Invalid regular expression: /".concat(regexpStr, "/: Invalid group, character '").concat(c, "'") + " after '?' at column ".concat(i - 1));
                  }
                } else {
                  groupCount += 1;
                }
                // Insert subgroup into current group stack.
                last.push(group);
                // Remember the current group for when the group closes.
                groupStack.push(lastGroup);
                // Make this new group the current group.
                lastGroup = group;
                last = group.stack;
                break;
              }
            // Pop group out of stack.
            case ')':
              if (groupStack.length === 0) {
                throw new SyntaxError("Invalid regular expression: /".concat(regexpStr, "/: Unmatched ) at column ").concat(i - 1));
              }
              lastGroup = groupStack.pop();
              // Check if this group has a PIPE.
              // To get back the correct last stack.
              last = lastGroup.options ? lastGroup.options[lastGroup.options.length - 1] : lastGroup.stack;
              break;
            // Use pipe character to give more choices.
            case '|':
              {
                // Create array where options are if this is the first PIPE
                // in this clause.
                if (!lastGroup.options) {
                  lastGroup.options = [lastGroup.stack];
                  delete lastGroup.stack;
                }
                // Create a new stack and add to options for rest of clause.
                let stack = [];
                lastGroup.options.push(stack);
                last = stack;
                break;
              }
            // Repetition.
            // For every repetition, remove last element from last stack
            // then insert back a RANGE object.
            // This design is chosen because there could be more than
            // one repetition symbols in a regex i.e. `a?+{2,3}`.
            case '{':
              {
                let rs = /^(\d+)(,(\d+)?)?\}/.exec(str.slice(i)),
                  min,
                  max;
                if (rs !== null) {
                  if (last.length === 0) {
                    repeatErr(i);
                  }
                  min = parseInt(rs[1], 10);
                  max = rs[2] ? rs[3] ? parseInt(rs[3], 10) : Infinity : min;
                  i += rs[0].length;
                  last.push({
                    type: types_1.types.REPETITION,
                    min,
                    max,
                    value: last.pop()
                  });
                } else {
                  last.push({
                    type: types_1.types.CHAR,
                    value: 123
                  });
                }
                break;
              }
            case '?':
              if (last.length === 0) {
                repeatErr(i);
              }
              last.push({
                type: types_1.types.REPETITION,
                min: 0,
                max: 1,
                value: last.pop()
              });
              break;
            case '+':
              if (last.length === 0) {
                repeatErr(i);
              }
              last.push({
                type: types_1.types.REPETITION,
                min: 1,
                max: Infinity,
                value: last.pop()
              });
              break;
            case '*':
              if (last.length === 0) {
                repeatErr(i);
              }
              last.push({
                type: types_1.types.REPETITION,
                min: 0,
                max: Infinity,
                value: last.pop()
              });
              break;
            // Default is a character that is not `\[](){}?+*^$`.
            default:
              last.push({
                type: types_1.types.CHAR,
                value: c.charCodeAt(0)
              });
          }
        }
        // Check if any groups have not been closed.
        if (groupStack.length !== 0) {
          throw new SyntaxError("Invalid regular expression: /".concat(regexpStr, "/: Unterminated group"));
        }
        updateReferences(referenceQueue, groupCount);
        return start;
      };
      /**
       * This is a side effecting function that changes references to chars
       * if there are not enough capturing groups to reference
       * See: https://github.com/fent/ret.js/pull/39#issuecomment-1006475703
       * See: https://github.com/fent/ret.js/issues/38
       * @param {(Reference | Char)[]} referenceQueue
       * @param {number} groupCount
       * @returns {void}
       */
      function updateReferences(referenceQueue, groupCount) {
        // Note: We go through the queue in reverse order so
        // that index we use is correct even if we have to add
        // multiple tokens to one stack
        for (const elem of referenceQueue.reverse()) {
          if (groupCount < elem.reference.value) {
            // If there is nothing to reference then turn this into a char token
            elem.reference.type = types_1.types.CHAR;
            const valueString = elem.reference.value.toString();
            elem.reference.value = parseInt(valueString, 8);
            // If the number is not octal then we need to create multiple tokens
            // https://github.com/fent/ret.js/pull/39#issuecomment-1008229226
            if (!/^[0-7]+$/.test(valueString)) {
              let i = 0;
              while (valueString[i] !== '8' && valueString[i] !== '9') {
                i += 1;
              }
              if (i === 0) {
                // Handling case when escaped number starts with 8 or 9
                elem.reference.value = valueString.charCodeAt(0);
                i += 1;
              } else {
                // If the escaped number does not start with 8 or 9, then all
                // 0-7 digits before the first 8/9 form the first character code
                // see: https://github.com/fent/ret.js/pull/39#discussion_r780747085
                elem.reference.value = parseInt(valueString.slice(0, i), 8);
              }
              if (valueString.length > i) {
                const tail = elem.stack.splice(elem.index + 1);
                for (const char of valueString.slice(i)) {
                  elem.stack.push({
                    type: types_1.types.CHAR,
                    value: char.charCodeAt(0)
                  });
                }
                elem.stack.push(...tail);
              }
            }
          }
        }
      }
    }, {
      "./sets": 70,
      "./types": 72,
      "./util": 76
    }],
    72: [function (require, module, exports) {
      "use strict";

      var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function get() {
            return m[k];
          }
        });
      } : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = this && this.__exportStar || function (m, exports) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      __exportStar(require("./tokens"), exports);
      __exportStar(require("./types"), exports);
      __exportStar(require("./set-lookup"), exports);
    }, {
      "./set-lookup": 73,
      "./tokens": 74,
      "./types": 75
    }],
    73: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
    }, {}],
    74: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
    }, {}],
    75: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.types = void 0;
      var types;
      (function (types) {
        types[types["ROOT"] = 0] = "ROOT";
        types[types["GROUP"] = 1] = "GROUP";
        types[types["POSITION"] = 2] = "POSITION";
        types[types["SET"] = 3] = "SET";
        types[types["RANGE"] = 4] = "RANGE";
        types[types["REPETITION"] = 5] = "REPETITION";
        types[types["REFERENCE"] = 6] = "REFERENCE";
        types[types["CHAR"] = 7] = "CHAR";
      })(types = exports.types || (exports.types = {}));
    }, {}],
    76: [function (require, module, exports) {
      "use strict";

      var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function get() {
            return m[k];
          }
        });
      } : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
        Object.defineProperty(o, "default", {
          enumerable: true,
          value: v
        });
      } : function (o, v) {
        o["default"] = v;
      });
      var __importStar = this && this.__importStar || function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.tokenizeClass = exports.strToChars = void 0;
      const types_1 = require("./types");
      const sets = __importStar(require("./sets"));
      const CTRL = '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?';
      /**
       * Finds character representations in str and convert all to
       * their respective characters.
       *
       * @param {string} str
       * @returns {string}
       */
      exports.strToChars = str => {
        const charsRegex = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|c([@A-Z[\\\]^?])|([0tnvfr]))/g;
        return str.replace(charsRegex, (s, b, lbs, a16, b16, dctrl, eslsh) => {
          if (lbs) {
            return s;
          }
          let code = b ? 8 : a16 ? parseInt(a16, 16) : b16 ? parseInt(b16, 16) : dctrl ? CTRL.indexOf(dctrl) : {
            0: 0,
            t: 9,
            n: 10,
            v: 11,
            f: 12,
            r: 13
          }[eslsh];
          let c = String.fromCharCode(code);
          // Escape special regex characters.
          return /[[\]{}^$.|?*+()]/.test(c) ? "\\".concat(c) : c;
        });
      };
      /**
       * Turns class into tokens
       * reads str until it encounters a ] not preceeded by a \
       *
       * @param {string} str
       * @param {string} regexpStr
       * @returns {Array.<Array.<Object>, number>}
       */
      exports.tokenizeClass = (str, regexpStr) => {
        var _a, _b, _c, _d, _e, _f, _g;
        let tokens = [],
          rs,
          c;
        const regexp = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(((?:\\)])|(((?:\\)?([^\]])))))|(\])|(?:\\)?([^])/g;
        while ((rs = regexp.exec(str)) !== null) {
          const p = (_g = (_f = (_e = (_d = (_c = (_b = (_a = rs[1] && sets.words()) !== null && _a !== void 0 ? _a : rs[2] && sets.ints()) !== null && _b !== void 0 ? _b : rs[3] && sets.whitespace()) !== null && _c !== void 0 ? _c : rs[4] && sets.notWords()) !== null && _d !== void 0 ? _d : rs[5] && sets.notInts()) !== null && _e !== void 0 ? _e : rs[6] && sets.notWhitespace()) !== null && _f !== void 0 ? _f : rs[7] && {
            type: types_1.types.RANGE,
            from: (rs[8] || rs[9]).charCodeAt(0),
            to: (c = rs[10]).charCodeAt(c.length - 1)
          }) !== null && _g !== void 0 ? _g : (c = rs[16]) && {
            type: types_1.types.CHAR,
            value: c.charCodeAt(0)
          };
          if (p) {
            tokens.push(p);
          } else {
            return [tokens, regexp.lastIndex];
          }
        }
        throw new SyntaxError("Invalid regular expression: /".concat(regexpStr, "/: Unterminated character class"));
      };
    }, {
      "./sets": 70,
      "./types": 72
    }],
    77: [function (require, module, exports) {
      "use strict";

      var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function get() {
            return m[k];
          }
        });
      } : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
        Object.defineProperty(o, "default", {
          enumerable: true,
          value: v
        });
      } : function (o, v) {
        o["default"] = v;
      });
      var __importStar = this && this.__importStar || function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.writeSetTokens = exports.setChar = void 0;
      const types_1 = require("./types");
      const sets = __importStar(require("./sets-lookup"));
      /**
       * Takes character code and returns character to be displayed in a set
       * @param {number} charCode Character code of set element
       * @returns {string} The string for the sets character
       */
      function setChar(charCode) {
        return charCode === 94 ? '\\^' : charCode === 92 ? '\\\\' : charCode === 93 ? '\\]' : charCode === 45 ? '\\-' : String.fromCharCode(charCode);
      }
      exports.setChar = setChar;
      /**
       * Test if a character set matches a 'set-lookup'
       * @param {SetTokens} set The set to be tested
       * @param {SetLookup} param The predefined 'set-lookup' & the number of elements in the lookup
       * @returns {boolean} True if the character set corresponds to the 'set-lookup'
       */
      function isSameSet(set, _ref3) {
        let lookup = _ref3.lookup,
          len = _ref3.len;
        // If the set and the lookup are not of the same length
        // then we immediately know that the lookup will be false
        if (len !== set.length) {
          return false;
        }
        const map = lookup();
        for (const elem of set) {
          if (elem.type === types_1.types.SET) {
            return false;
          }
          const key = elem.type === types_1.types.CHAR ? elem.value : "".concat(elem.from, "-").concat(elem.to);
          if (map[key]) {
            map[key] = false;
          } else {
            return false;
          }
        }
        return true;
      }
      /**
       * Writes the tokens for a set
       * @param {Set} set The set to display
       * @param {boolean} isNested Whether the token is nested inside another set token
       * @returns {string} The tokens for the set
       */
      function writeSetTokens(set) {
        let isNested = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (isSameSet(set.set, sets.INTS)) {
          return set.not ? '\\D' : '\\d';
        }
        if (isSameSet(set.set, sets.WORDS)) {
          return set.not ? '\\W' : '\\w';
        }
        // Notanychar is only relevant when not nested inside another set token
        if (set.not && isSameSet(set.set, sets.NOTANYCHAR)) {
          return '.';
        }
        if (isSameSet(set.set, sets.WHITESPACE)) {
          return set.not ? '\\S' : '\\s';
        }
        let tokenString = '';
        for (let i = 0; i < set.set.length; i++) {
          const subset = set.set[i];
          tokenString += writeSetToken(subset);
        }
        const contents = "".concat(set.not ? '^' : '').concat(tokenString);
        return isNested ? contents : "[".concat(contents, "]");
      }
      exports.writeSetTokens = writeSetTokens;
      /**
       * Writes a token within a set
       * @param {Range | Char | Set} set The set token to display
       * @returns {string} The token as a string
       */
      function writeSetToken(set) {
        if (set.type === types_1.types.CHAR) {
          return setChar(set.value);
        } else if (set.type === types_1.types.RANGE) {
          return "".concat(setChar(set.from), "-").concat(setChar(set.to));
        }
        return writeSetTokens(set, true);
      }
    }, {
      "./sets-lookup": 69,
      "./types": 72
    }],
    78: [function (require, module, exports) {
      'use strict';

      const parse = require('ret');
      const _require6 = require('ret'),
        types = _require6.types;

      /**
       * @param {*} node
       * @param {object} opts
       * @param {number} opts.reps - The number of repetitions encountered
       * @param {number} opts.limit - The maximum number of repetitions allowed
       * @param {number} starHeight - The current height of the star in the regex tree
       * @returns {boolean}
       */
      function walk(node, opts, starHeight) {
        var _node$value, _node$value2;
        let i;
        let ok;
        let len;
        if (node.type === types.REPETITION) {
          starHeight++;
          opts.reps++;
          if (starHeight > 1) return false;
          if (opts.reps > opts.limit) return false;
        }
        const options = node.options || ((_node$value = node.value) === null || _node$value === void 0 ? void 0 : _node$value.options);
        if (options) {
          for (i = 0, len = options.length; i < len; i++) {
            ok = walk({
              stack: options[i]
            }, opts, starHeight);
            if (!ok) return false;
          }
        }
        const stack = node.stack || ((_node$value2 = node.value) === null || _node$value2 === void 0 ? void 0 : _node$value2.stack);
        if (!stack) return true;
        for (i = 0, len = stack.length; i < len; i++) {
          ok = walk(stack[i], opts, starHeight);
          if (!ok) return false;
        }
        return true;
      }

      /**
       * @param {string|RegExp} re - The regular expression to check, can be a string or RegExp object
       * @param {object} [options]
       * @param {number} [options.limit=25] - The maximum number of repetitions allowed
       * @returns {boolean} - Returns true if the regex is safe, false if it is unsafe or invalid
       */
      function safeRegex(re, options) {
        var _options$limit;
        const opts = {
          reps: 0,
          limit: (_options$limit = options === null || options === void 0 ? void 0 : options.limit) !== null && _options$limit !== void 0 ? _options$limit : 25
        };
        if (isRegExp(re)) re = re.source;else if (typeof re !== 'string') re = String(re);
        try {
          return walk(parse(re), opts, 0);
        } catch (_unused) {
          return false;
        }
      }

      /**
       * @param {*} x
       * @returns {x is RegExp}
       */
      function isRegExp(x) {
        return Object.prototype.toString.call(x) === '[object RegExp]';
      }
      module.exports = safeRegex;
      module.exports.default = safeRegex;
      module.exports.safeRegex = safeRegex;
    }, {
      "ret": 67
    }],
    79: [function (require, module, exports) {
      // Simple default configuration for application, when none is provided

      module.exports = {
        "Product": "Unnamed_Service",
        "ProductVersion": "0.0.1",
        "ServicePort": 8080
      };
    }, {}],
    80: [function (require, module, exports) {
      /**
      * Default Service Server
      */
      module.exports = require('./Orator-ServiceServer-IPC.js');
    }, {
      "./Orator-ServiceServer-IPC.js": 82
    }],
    81: [function (require, module, exports) {
      /**
       * Represents a synthesized server response for the Orator service server IPC.
       *
       * @class
       */
      class OratorServiceServerIPCSynthesizedResponse {
        constructor(pHandler, pLog, pRequestGUID) {
          this.log = pLog;
          if (pHandler.hasOwnProperty('params')) {
            this.params = pHandler.params;
          } else {
            this.params = {};
          }
          if (pHandler.hasOwnProperty('searchParams')) {
            this.searchParams = pHandler.searchParams;
          } else {
            this.searchParams = {};
          }
          this.requestGUID = pRequestGUID;
          this.responseData = null;
          this.responseStatus = -1;
        }

        /**
         * Sends data to the server.
         * 
         * @param {string|object} pData - The data to be sent. It can be either a string or an object.
         * @returns {boolean} - Returns true if the data was successfully sent, false otherwise.
         */
        send(pData) {
          if (typeof pData == 'string') {
            // This is a string!  Append it to the responsedata.
            if (this.responseData === null) {
              this.responseData = pData;
              return true;
            } else if (typeof this.responseData == 'string') {
              this.responseData = this.responseData + pData;
              return true;
            } else {
              this.log("Request ".concat(this.requestGUID, " has tried to send() a string value after send()ing data type ").concat(typeof this.responseData, "."), pData);
              return false;
            }
          } else if (typeof pData == 'object') {
            if (this.responseData === null) {
              this.responseData = JSON.stringify(pData);
              return true;
            } else if (typeof this.responseData == 'string') {
              // TODO: Discuss best way to handle this / if to handle this
              this.responseData += this.responseData + JSON.stringify(pData);
              return true;
            } else {
              this.log("Request ".concat(this.requestGUID, " has tried to send() an object value to be auto stringified after send()ing data type ").concat(typeof this.responseData, "."), pData);
              return false;
            }
          }
        }
      }
      module.exports = OratorServiceServerIPCSynthesizedResponse;
    }, {}],
    82: [function (require, module, exports) {
      const libOratorServiceServerBase = require('orator-serviceserver-base');

      // A synthesized response object, for simple IPC.
      const libOratorServiceServerIPCSynthesizedResponse = require('./Orator-ServiceServer-IPC-SynthesizedResponse.js');

      // This library is the default router for our services
      const libFindMyWay = require('find-my-way');

      /**
       * OratorServiceServerIPC class.
       *
       * @class
       * @extends libOratorServiceServerBase
       * @classdesc Represents an IPC service server for Orator.
       */
      class OratorServiceServerIPC extends libOratorServiceServerBase {
        constructor(pFable, pOptions, pServiceHash) {
          super(pFable, pOptions, pServiceHash);
          this.router = libFindMyWay(this.options);
          this.ServiceServerType = 'IPC';
          this.URL = 'IPC';
          this.Port = 0;
          this.preBehaviorFunctions = [];
          this.behaviorMap = {};
          this.postBehaviorFunctions = [];
        }
        use(fHandlerFunction) {
          return this.addPreBehaviorFunction(fHandlerFunction);
        }
        addPreBehaviorFunction(fHandlerFunction) {
          if (!super.use(fHandlerFunction)) {
            this.log.error("IPC provider failed to map USE handler function!");
            return false;
          }
          this.preBehaviorFunctions.push(fHandlerFunction);
          return true;
        }
        executePreBehaviorFunctions(pRequest, pResponse, fNext) {
          let tmpAnticipate = this.fable.serviceManager.instantiateServiceProviderWithoutRegistration('Anticipate');
          for (let i = 0; i < this.preBehaviorFunctions.length; i++) {
            let tmpPreBehaviorFunction = this.preBehaviorFunctions[i];
            tmpAnticipate.anticipate(fStageComplete => {
              return tmpPreBehaviorFunction(pRequest, pResponse, fStageComplete);
            });
          }
          tmpAnticipate.wait(pError => {
            if (pError) {
              this.log.error("IPC Provider preBehaviorFunction failed with error: ".concat(pError), pError);
            }
            return fNext(pError);
          });
        }
        addPostBehaviorFunction(fHandlerFunction) {
          if (!super.use(fHandlerFunction)) {
            this.log.error("IPC provider failed to map USE handler function!");
            return false;
          }
          this.postBehaviorFunctions.push(fHandlerFunction);
          return true;
        }
        executePostBehaviorFunctions(pRequest, pResponse, fNext) {
          let tmpAnticipate = this.fable.serviceManager.instantiateServiceProviderWithoutRegistration('Anticipate');
          for (let i = 0; i < this.postBehaviorFunctions.length; i++) {
            let tmpPostBehaviorFunction = this.postBehaviorFunctions[i];
            tmpAnticipate.anticipate(fStageComplete => {
              return tmpPostBehaviorFunction(pRequest, pResponse, fStageComplete);
            });
          }
          tmpAnticipate.wait(pError => {
            if (pError) {
              this.log.error("IPC Provider postBehaviorFunction failed with error: ".concat(pError), pError);
            }
            return fNext(pError);
          });
        }

        /*
         * Service Route Creation Functions
         *
         * These base functions provide basic validation for the routes, but don't actually 
         * do anything with them.  The design intent here is to allow derived classes to call
         * these functions to validate that they conform to expected standards.
         *
         * Something like:
        		get (pRoute, ...fRouteProcessingFunctions)
        	{
        		//...now we can do our actual get mapping function!....
        	}
        	 * This pattern and calling super is totally optional, obviously.
         *************************************************************************/
        addRouteProcessor(pMethod, pRoute, pRouteFunctionArray) {
          // We have a constrainer on IPC so we can control channels eventually, if we like.
          // For now it just makes sure it was added with an IPC service server.
          this.router.on(pMethod, pRoute, this.buildFindMyWayHandler(pRouteFunctionArray));
          return true;
        }
        buildFindMyWayHandler(pRouteFunctionArray) {
          let tmpRouteFunctionArray = pRouteFunctionArray;
          return (pRequest, pResponse) => {
            let tmpAnticipate = this.fable.serviceManager.instantiateServiceProviderWithoutRegistration('Anticipate');
            tmpAnticipate.anticipate(fNext => {
              return this.executePreBehaviorFunctions(pRequest, pResponse, fNext);
            });
            for (let i = 0; i < tmpRouteFunctionArray.length; i++) {
              let tmpRouteFunction = tmpRouteFunctionArray[i];
              tmpAnticipate.anticipate(fNext => {
                return tmpRouteFunction(pRequest, pResponse, fNext);
              });
            }
            tmpAnticipate.anticipate(fStageComplete => {
              return this.executePostBehaviorFunctions(pRequest, pResponse, fStageComplete);
            });
            return new Promise((fResolve, fReject) => {
              tmpAnticipate.wait(pBehaviorFunctionError => {
                if (pBehaviorFunctionError) {
                  this.log.error("IPC Provider behavior function failed with error: ".concat(pBehaviorFunctionError), pBehaviorFunctionError);
                  return fReject(pBehaviorFunctionError);
                }
                return fResolve();
              });
            });
          };
        }

        // This is the virtualized "body parser"
        bodyParser() {
          return (pRequest, pResponse, fNext) => {
            return fNext();
          };
        }

        /**
         * Handles the HTTP GET request for a specific route.
         *
         * @param {string} pRoute - The route to handle.
         * @param {...Function} fRouteProcessingFunctions - The processing functions to execute for the route.
         * @returns {Promise} A promise that resolves when the route processing is complete.
         */
        doGet(pRoute) {
          for (var _len13 = arguments.length, fRouteProcessingFunctions = new Array(_len13 > 1 ? _len13 - 1 : 0), _key13 = 1; _key13 < _len13; _key13++) {
            fRouteProcessingFunctions[_key13 - 1] = arguments[_key13];
          }
          return this.addRouteProcessor('GET', pRoute, Array.from(fRouteProcessingFunctions));
        }

        /**
         * Handles the PUT request for a specific route.
         *
         * @param {string} pRoute - The route to handle.
         * @param {...Function} fRouteProcessingFunctions - The processing functions to execute for the route.
         * @returns {Promise} - A promise that resolves when the route processing is complete.
         */
        doPut(pRoute) {
          for (var _len14 = arguments.length, fRouteProcessingFunctions = new Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {
            fRouteProcessingFunctions[_key14 - 1] = arguments[_key14];
          }
          return this.addRouteProcessor('PUT', pRoute, Array.from(fRouteProcessingFunctions));
        }

        /**
         * Handles the HTTP POST request for a specific route.
         *
         * @param {string} pRoute - The route to handle.
         * @param {...Function} fRouteProcessingFunctions - The processing functions to execute for the route.
         * @returns {Promise} - A promise that resolves when the route processing is complete.
         */
        doPost(pRoute) {
          for (var _len15 = arguments.length, fRouteProcessingFunctions = new Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
            fRouteProcessingFunctions[_key15 - 1] = arguments[_key15];
          }
          return this.addRouteProcessor('POST', pRoute, Array.from(fRouteProcessingFunctions));
        }

        /**
         * Handles the HTTP DEL request for a specific route.
         *
         * @param {string} pRoute - The route to be deleted.
         * @param {...Function} fRouteProcessingFunctions - The route processing functions to be added.
         * @returns {Object} - The updated route processor object.
         */
        doDel(pRoute) {
          for (var _len16 = arguments.length, fRouteProcessingFunctions = new Array(_len16 > 1 ? _len16 - 1 : 0), _key16 = 1; _key16 < _len16; _key16++) {
            fRouteProcessingFunctions[_key16 - 1] = arguments[_key16];
          }
          return this.addRouteProcessor('DELETE', pRoute, Array.from(fRouteProcessingFunctions));
        }

        /**
         * Adds a PATCH route processor to the service server.
         *
         * @param {string} pRoute - The route to be processed.
         * @param {...Function} fRouteProcessingFunctions - The route processing functions.
         * @returns {boolean} - Returns true if the route processor was added successfully, false otherwise.
         */
        doPatch(pRoute) {
          for (var _len17 = arguments.length, fRouteProcessingFunctions = new Array(_len17 > 1 ? _len17 - 1 : 0), _key17 = 1; _key17 < _len17; _key17++) {
            fRouteProcessingFunctions[_key17 - 1] = arguments[_key17];
          }
          return this.addRouteProcessor('PATCH', pRoute, Array.from(fRouteProcessingFunctions));
        }

        /**
         * Adds a route processor for the OPTIONS method.
         *
         * @param {string} pRoute - The route to add the processor to.
         * @param {...Function} fRouteProcessingFunctions - The processing functions to be executed for the route.
         * @returns {Object} - The updated Orator-ServiceServer-IPC object.
         */
        doOpts(pRoute) {
          for (var _len18 = arguments.length, fRouteProcessingFunctions = new Array(_len18 > 1 ? _len18 - 1 : 0), _key18 = 1; _key18 < _len18; _key18++) {
            fRouteProcessingFunctions[_key18 - 1] = arguments[_key18];
          }
          return this.addRouteProcessor('OPTIONS', pRoute, Array.from(fRouteProcessingFunctions));
        }

        /**
         * Handles the HEAD request for a specific route.
         *
         * @param {string} pRoute - The route to handle.
         * @param {...Function} fRouteProcessingFunctions - The processing functions to execute for the route.
         * @returns {Promise} - A promise that resolves when the route processing is complete.
         */
        doHead(pRoute) {
          for (var _len19 = arguments.length, fRouteProcessingFunctions = new Array(_len19 > 1 ? _len19 - 1 : 0), _key19 = 1; _key19 < _len19; _key19++) {
            fRouteProcessingFunctions[_key19 - 1] = arguments[_key19];
          }
          return this.addRouteProcessor('HEAD', pRoute, Array.from(fRouteProcessingFunctions));
        }
        /*************************************************************************
         * End of Service Route Creation Functions
         */

        /**
         * Invokes a method on the IPC provider.
         *
         * The route handler is dispatched with the canonical find-my-way signature
         * (pRequest, pResponse, pParams, pStore, pSearchParams), so handlers
         * registered directly on the router see the same arguments as lookup().
         *
         * @param {string} pMethod - The method to invoke.
         * @param {string} pRoute - The route to invoke.
         * @param {any|Function} pData - The request body, exposed to handlers as pRequest.body, or the completion callback when the body is skipped.
         * @param {Function} [fCallback] - The callback function to handle the response; required unless passed via pData.
         * @throws {Error} Throws an error if invoked without a callback function.
         */
        invoke(pMethod, pRoute, pData, fCallback) {
          // If the data is skipped and a callback is parameter 3, do the right thing
          let tmpCallback = typeof fCallback == 'function' ? fCallback : typeof pData == 'function' ? pData : false;
          if (!tmpCallback) {
            throw new Error("IPC Provider invoke() called without a callback function.");
          }

          // Create a bare minimum request object for IPC to pass to our router
          let tmpRequest = {
            method: pMethod,
            url: pRoute,
            body: typeof pData == 'function' ? undefined : pData,
            guid: this.fable.getUUID()
          };

          // For now, dealing with no handler constraints.
          let tmpHandler = this.router.find(tmpRequest.method, tmpRequest.url);

          // Create a container for the IPC response data to be aggregated to from send() methodds
          let tmpSynthesizedResponseData = new libOratorServiceServerIPCSynthesizedResponse(tmpHandler, this.log, tmpRequest.guid);

          // Map parsed params back to the request object
          tmpRequest.params = tmpSynthesizedResponseData.params;
          tmpRequest.searchParams = tmpSynthesizedResponseData.searchParams;

          //params: handle._createParamsObject(params)//,
          //searchParams: this.querystringParser(querystring)

          // Dispatch with the canonical find-my-way handler signature so handlers
          // registered directly on the router see the same arguments as lookup().
          tmpHandler.handler(tmpRequest, tmpSynthesizedResponseData, tmpHandler.params, tmpHandler.store, tmpHandler.searchParams).then(pResults => {
            return tmpCallback(null, tmpSynthesizedResponseData.responseData, tmpSynthesizedResponseData, pResults);
          }, pError => {
            this.log.trace('IPC Response Received', {
              Error: pError
            });
            if (pError) {
              this.log.error("IPC Request Error Request GUID [".concat(tmpRequest.guid, "] handling route [").concat(pRoute, "]: ").concat(pError), {
                Error: pError,
                Route: pRoute,
                Data: pData
              });
            }
            return tmpCallback(pError, tmpSynthesizedResponseData.responseData, tmpSynthesizedResponseData);
          });
        }
      }
      module.exports = OratorServiceServerIPC;
    }, {
      "./Orator-ServiceServer-IPC-SynthesizedResponse.js": 81,
      "find-my-way": 30,
      "orator-serviceserver-base": 65
    }],
    83: [function (require, module, exports) {
      /**
      * Orator Service Abstraction
      *
      * @license MIT
      *
      * @author Steven Velozo <steven@velozo.com>
      * @module Orator Service
      */

      const libFableServiceProviderBase = require('fable-serviceproviderbase');
      const libDefaultOratorServiceServer = require('./Orator-Default-ServiceServer.js');

      // orator-static-server is lazy-loaded so that browser bundles using orator's
      // IPC mode don't pay the cost of (or trip over) its server-only deps. Only
      // setMimeHeader / addStaticRoute / addStaticRouteWithFallbacks need it, and
      // none of those are reachable from IPC-only consumers.
      let libOratorStaticServer = null;
      const getOratorStaticServer = () => {
        if (!libOratorStaticServer) {
          libOratorStaticServer = require('orator-static-server');
        }
        return libOratorStaticServer;
      };
      const defaultOratorConfiguration = require('./Orator-Default-Configuration.js');

      /**
       * @class Orator
       * @extends libFableServiceProviderBase
       * 
       * Represents the Orator service provider.
       * 
       * @param {Object} pFable - The Fable instance.
       * @param {Object} pOptions - The options for the Orator service.
       * @param {string} pServiceHash - The hash of the service.
       */
      class Orator extends libFableServiceProviderBase {
        constructor(pFable, pOptions, pServiceHash) {
          super(pFable, pOptions, pServiceHash);
          this.serviceType = 'Orator';

          // Create the empty, important logic containers
          this.serviceServer = false;
          this.serviceServerProvider = false;

          // Now check to see that the ServicePort is set (this used to be APIServerPort)
          if (!this.options.hasOwnProperty('ServicePort')) {
            if (this.fable.settings.hasOwnProperty('APIServerPort')) {
              // Automatically migrate the legacy APIServerPort to ServicePort
              this.options.ServicePort = this.fable.settings.APIServerPort;
            } else {
              // Default to whatever the ... default is!
              this.options.ServicePort = defaultOratorConfiguration.ServicePort;
            }
          }

          // Now check to see that the Product name is set
          if (!this.options.hasOwnProperty('Product')) {
            this.options.Product = defaultOratorConfiguration.Product;
          }
        }

        /**
         * Lifecycle event that executes before initializing the service.  For overloading.
         */
        onBeforeInitialize() {
          if (this.fable.settings.LogNoisiness > 3) {
            this.log.trace("Orator [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Product, " onBeforeInitialize:"));
          }
        }
        /**
         * Lifecycle event that executes before initializing the service.  For overloading.
         * 
         * @param {Function} fNext - The callback function to be called after the actions are executed.
         */
        onBeforeInitializeAsync(fNext) {
          this.onBeforeInitialize();
          // Check to see if there is a service server active; if not instantiate one (and use IPC if none is registered with Fable as the default provider)
          if (!this.serviceServer) {
            // If the developer hasn't set this to a service provider class of their own choosing, 
            // TODO: Give the developer a chance to set a service provider instantiation address of their own choosing.
            // use the built-in network-less one.
            if (!this.fable.OratorServiceServer) {
              // If there isn't a default Service Server setup, create one.
              let tmpServiceServerOptions = typeof this.options.ServiceServerOptions == 'undefined' ? {} : this.options.ServiceServerOptions;
              if (!this.fable.serviceManager.servicesMap.hasOwnProperty('OratorServiceServer')) {
                // Only register IPC if there isn't one yet.
                this.fable.serviceManager.addServiceType('OratorServiceServer', libDefaultOratorServiceServer);
              }
              this.fable.serviceManager.instantiateServiceProvider('OratorServiceServer', tmpServiceServerOptions, 'OratorServiceServer-AutoInit');
            }
            this.serviceServer = this.fable.OratorServiceServer;
            // For legacy reasons, we also will provide this under the "webServer" variable.
            this.webServer = this.serviceServer;
          } else {
            this.log.warn("Orator attempting to initialize a service server after initialization has already completed.");
          }
          fNext();
        }
        onInitialize() {
          if (this.fable.settings.LogNoisiness > 3) {
            this.log.trace("Orator [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Product, " onInitialize:"));
          }
        }
        /**
         * Lifecycle event that executes at the moment of initializing the service.  For overloading.
         *
         * @param {Function} fNext - The callback function to be executed after initialization.
         */
        onInitializeAsync(fNext) {
          this.onInitialize();
          return fNext();
        }

        /**
         * Lifecycle event that executes after initializing the service.  For overloading.
         */
        onAfterInitialize() {
          if (this.fable.settings.LogNoisiness > 3) {
            this.log.trace("Orator [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Product, " onAfterInitialize:"));
          }
        }
        /**
         * Lifecycle event that executes after initializing the service.  For overloading.
         * @param {Function} fNext - The callback function to be called after executing onAfterInitialize.
         * @returns {Promise} - A promise that resolves when the callback function is called.
         */
        onAfterInitializeAsync(fNext) {
          this.onAfterInitialize();
          return fNext();
        }

        /**
         * Initializes the Orator instance.
         *
         * @param {Function} fCallback - The callback function to be executed after initialization.
         */
        initialize(fCallback) {
          // I hate this -- as long as we want to be "mostly" backwards compatible it needs to do it though
          let tmpCallback = typeof fCallback === 'function' ? fCallback : () => {};
          if (!this.initializeTimestamp) {
            let tmpAnticipate = this.fable.serviceManager.instantiateServiceProviderWithoutRegistration('Anticipate');
            if (this.fable.LogNoisiness > 3) {
              this.log.trace("Orator [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Product, " beginning initialization steps..."));
            }
            tmpAnticipate.anticipate(this.onBeforeInitializeAsync.bind(this));
            tmpAnticipate.anticipate(this.onInitializeAsync.bind(this));
            tmpAnticipate.anticipate(this.onAfterInitializeAsync.bind(this));
            tmpAnticipate.wait(pError => {
              this.initializeTimestamp = this.fable.log.getTimeStamp();
              if (this.fable.LogNoisiness > 2) {
                this.log.trace("Orator [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Product, " initialization steps complete."));
              }
              return tmpCallback(pError);
            });
          } else {
            this.log.warn("Orator [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Product, " async initialize called but initialization is already completed.  Aborting."));
            // TODO: Should this be returning an error?
            return tmpCallback();
          }
        }

        /**
         * Lifecycle event that executes before starting the service.  For overloading.
         *
         * @param {Function} fNext - The function to be executed before starting the service.
         * @returns {Promise} A promise that resolves when the function is completed.
         */
        onBeforeStartService(fNext) {
          return fNext();
        }
        /**
         * Lifecycle event that executes when the service starts.  For overloading.
         * 
         * @param {Function} fNext - The callback function to be called after the service starts.
         * @returns {Promise} A promise that resolves when the service starts successfully, or rejects with an error.
         */
        onStartService(fNext) {
          this.onAfterInitialize();
          return this.serviceServer.listen(this.options.ServicePort, pError => {
            this.log.info("".concat(this.serviceServer.Name, " listening on port ").concat(this.options.ServicePort));
            return fNext(pError);
          });
        }
        /**
         * Lifecycle event that executes after starting the service.  For overloading.
         *
         * @param {Function} fNext - The callback function to be executed after the service starts.
         * @returns {Promise} - A promise that resolves when the callback function is completed.
         */
        onAfterStartService(fNext) {
          return fNext();
        }

        /**
         * Starts the service.
         * 
         * @param {Function} fNext - The callback function to be executed after the service has started.
         */
        startService(fNext) {
          var tmpNext = typeof fNext === 'function' ? fNext : () => {};
          let tmpAnticipate = this.fable.serviceManager.instantiateServiceProviderWithoutRegistration('Anticipate');
          if (this.fable.LogNoisiness > 3) {
            this.log.trace("Orator [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Product, " beginning startService steps..."));
          }

          // Auto initialize if there is no serviceServer
          if (!this.serviceServer) {
            tmpAnticipate.anticipate(this.initialize.bind(this));
          }
          tmpAnticipate.anticipate(this.onBeforeStartService.bind(this));
          tmpAnticipate.anticipate(this.onStartService.bind(this));
          tmpAnticipate.anticipate(this.onAfterStartService.bind(this));
          tmpAnticipate.wait(pError => {
            this.startServiceTimestamp = this.fable.log.getTimeStamp();
            if (this.fable.LogNoisiness > 2) {
              this.log.trace("Orator [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Product, " startService steps complete."));
            }
            return tmpNext(pError);
          });
        }

        /**
         * Stops the service server.
         * 
         * @param {Function} fCallback - The callback function to be executed after the service server is stopped.
         * @returns {void}
         */
        stopService(fCallback) {
          var tmpCallback = typeof fCallback === 'function' ? fCallback : () => {};
          if (!this.serviceServer) {
            let tmpMessage = "Orator attempting to stop a service server but the service server has not been intialized yet.";
            this.log.warn(tmpMessage);
            return tmpCallback(tmpMessage);
          }
          if (!this.serviceServer.Active) {
            let tmpMessage = "Orator attempting to stop a service server but the service server is not actively running.";
            this.log.warn(tmpMessage);
            return tmpCallback(tmpMessage);
          }
          return this.serviceServer.close(tmpCallback);
        }

        /**
         * Programmatically invokes a method on the service server.
         *
         * @param {string} pMethod - The method to invoke.
         * @param {string} pRoute - The route to invoke.
         * @param {any|Function} pData - The request body, exposed to handlers as pRequest.body, or the completion callback when the body is skipped.
         * @param {Function} [fCallback] - The callback function to execute after the invocation; required unless passed via pData.
         * @returns {any} - The result of the invocation.
         */
        invoke(pMethod, pRoute, pData, fCallback) {
          //this.log.trace(`Orator [${this.UUID}]::[${this.Hash}] ${this.options.Product} invoking ${pMethod} ${pRoute}`);
          return this.serviceServer.invoke(pMethod, pRoute, pData, fCallback);
        }

        /*
         * Legacy Orator / Backwards Compatibility Functions
         *************************************************************************/
        /**
         * Starts the web server.
         *
         * @param {Function} fNext - The callback function to be executed after the web server starts.
         * @returns {Promise} A promise that resolves when the web server has started.
         */
        startWebServer(fNext) {
          return this.startService(fNext);
        }

        /**
         * Stops the web server.
         *
         * @param {Function} fNext - The callback function to be called after the web server is stopped.
         * @returns {Promise} A promise that resolves when the web server is stopped.
         */
        stopWebServer(fNext) {
          return this.stopService(fNext);
        }

        /**
         * Retrieves the web server instance.
         * 
         * @returns {WebServer} The web server instance.
         */
        getWebServer() {
          // The old behavior was to lazily construct the service the first time 
          // this accessor function is called.
          if (!this.serviceServer) {
            this.initialize();
          }
          return this.serviceServer;
        }
        /*************************************************************************
         * End of Legacy Orator Functions
         */

        /*
         * Backwards Compatibility: setMimeHeader and oldLibMime
         *
         * These used to live directly on Orator but now live on OratorStaticServer.
         * These thin wrappers delegate to the OratorStaticServer instance so that
         * any code calling orator.setMimeHeader() or reading orator.oldLibMime
         * continues to work without changes.
         *************************************************************************/
        /**
         * @deprecated Use fable.OratorStaticServer.oldLibMime instead.
         */
        get oldLibMime() {
          if (this.fable.OratorStaticServer) {
            return this.fable.OratorStaticServer.oldLibMime;
          }
          return false;
        }

        /**
         * @deprecated Use fable.OratorStaticServer.setMimeHeader() instead.
         */
        setMimeHeader(pFileName, pResponse) {
          if (!this.fable.OratorStaticServer) {
            // Force auto-registration so the method is available
            if (!this.fable.serviceManager.servicesMap.hasOwnProperty('OratorStaticServer')) {
              this.fable.serviceManager.addServiceType('OratorStaticServer', getOratorStaticServer());
            }
            this.fable.serviceManager.instantiateServiceProvider('OratorStaticServer', {}, 'OratorStaticServer-AutoInit');
          }
          return this.fable.OratorStaticServer.setMimeHeader(pFileName, pResponse);
        }

        /**
         * Serve a static folder, optionally with magic subdomain masking.
         * Delegates to the OratorStaticServer service provider.
         *
         * @param {string} pFilePath The path on disk that we are serving files from.
         * @param {string?} pDefaultFile (optional) The default file served if no specific file is requested.
         * @param {string?} pRoute (optional) The route matcher that will be used. Defaults to everything.
         * @param {string?} pRouteStrip (optional) If provided, this prefix will be removed from URL paths before being served.
         * @param {object?} pParams (optional) Additional parameters to pass to serve-static.
         * @return {boolean} true if the handler was successfully installed, otherwise false.
         */
        addStaticRoute(pFilePath, pDefaultFile, pRoute, pRouteStrip, pParams) {
          // Auto-register the OratorStaticServer service type if it hasn't been registered yet
          if (!this.fable.serviceManager.servicesMap.hasOwnProperty('OratorStaticServer')) {
            this.fable.serviceManager.addServiceType('OratorStaticServer', getOratorStaticServer());
          }

          // Auto-instantiate a default OratorStaticServer instance if none exists
          if (!this.fable.OratorStaticServer) {
            this.fable.serviceManager.instantiateServiceProvider('OratorStaticServer', {}, 'OratorStaticServer-AutoInit');
          }
          return this.fable.OratorStaticServer.addStaticRoute(pFilePath, pDefaultFile, pRoute, pRouteStrip, pParams);
        }

        /**
         * Register a static-file route with a per-file CDN fallback map.
         *
         * Behaves like addStaticRoute for every local hit. For any request whose
         * relative path is a key in pFallbackMap and whose file isn't present
         * on disk, responds with 302 to the mapped URL instead of a 404. Any
         * request whose relative path isn't in the map behaves exactly as
         * addStaticRoute would (local hit → stream, local miss → 404).
         *
         * @param {string} pFilePath The path on disk that we are serving files from.
         * @param {string?} pDefaultFile (optional) The default file served if no specific file is requested.
         * @param {string?} pRoute (optional) The route matcher that will be used. Defaults to everything.
         * @param {string?} pRouteStrip (optional) If provided, this prefix will be removed from URL paths before being served.
         * @param {object?} pParams (optional) Additional parameters to pass to serve-static.
         * @param {Object<string,string>?} pFallbackMap (optional) Map of relative path (under the route prefix) to absolute URL for CDN fallback.
         * @return {boolean} true if the handler was successfully installed, otherwise false.
         */
        addStaticRouteWithFallbacks(pFilePath, pDefaultFile, pRoute, pRouteStrip, pParams, pFallbackMap) {
          if (!this.fable.serviceManager.servicesMap.hasOwnProperty('OratorStaticServer')) {
            this.fable.serviceManager.addServiceType('OratorStaticServer', getOratorStaticServer());
          }
          if (!this.fable.OratorStaticServer) {
            this.fable.serviceManager.instantiateServiceProvider('OratorStaticServer', {}, 'OratorStaticServer-AutoInit');
          }
          return this.fable.OratorStaticServer.addStaticRouteWithFallbacks(pFilePath, pDefaultFile, pRoute, pRouteStrip, pParams, pFallbackMap);
        }
      }
      module.exports = Orator;
      module.exports.ServiceServerBase = require('orator-serviceserver-base');
      module.exports.ServiceServerIPC = require('./Orator-ServiceServer-IPC.js');
    }, {
      "./Orator-Default-Configuration.js": 79,
      "./Orator-Default-ServiceServer.js": 80,
      "./Orator-ServiceServer-IPC.js": 82,
      "fable-serviceproviderbase": 23,
      "orator-serviceserver-base": 65,
      "orator-static-server": 5
    }]
  }, {}, [83])(83);
});
//# sourceMappingURL=orator.js.map
