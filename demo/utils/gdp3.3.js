!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define('gio-cdp', t)
    : ((e = 'undefined' != typeof globalThis ? globalThis : e || self)[
        'gio-cdp'
      ] = t());
})(this, function () {
  'use strict';
  function getAugmentedNamespace(e) {
    if (e.__esModule) return e;
    var t = Object.defineProperty({}, '__esModule', { value: !0 });
    return (
      Object.keys(e).forEach(function (n) {
        var i = Object.getOwnPropertyDescriptor(e, n);
        Object.defineProperty(
          t,
          n,
          i.get
            ? i
            : {
                enumerable: !0,
                get: function () {
                  return e[n];
                }
              }
        );
      }),
      t
    );
  }
  var main = {},
    extendStatics = function (e, t) {
      return (
        (extendStatics =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (e, t) {
              e.__proto__ = t;
            }) ||
          function (e, t) {
            for (var n in t) ({}.hasOwnProperty.call(t, n) && (e[n] = t[n]));
          }),
        extendStatics(e, t)
      );
    };
  function __extends(e, t) {
    if ('function' != typeof t && null !== t)
      throw new TypeError(
        'Class extends value ' + t + ' is not a constructor or null'
      );
    function n() {
      this.constructor = e;
    }
    extendStatics(e, t),
      (e.prototype =
        null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
  }
  var __assign = function () {
    return (
      (__assign =
        Object.assign ||
        function (e) {
          for (var t, n = 1, i = arguments.length; i > n; n++)
            for (var r in (t = arguments[n]))
              ({}.hasOwnProperty.call(t, r) && (e[r] = t[r]));
          return e;
        }),
      __assign.apply(this, arguments)
    );
  };
  function __rest(e, t) {
    var n = {};
    for (var i in e)
      ({}.hasOwnProperty.call(e, i) && 0 > t.indexOf(i) && (n[i] = e[i]));
    if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (i = Object.getOwnPropertySymbols(e); r < i.length; r++)
        0 > t.indexOf(i[r]) &&
          {}.propertyIsEnumerable.call(e, i[r]) &&
          (n[i[r]] = e[i[r]]);
    }
    return n;
  }
  function __decorate(e, t, n, i) {
    var r,
      o = arguments.length,
      s =
        3 > o
          ? t
          : null === i
          ? (i = Object.getOwnPropertyDescriptor(t, n))
          : i;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, n, i);
    else
      for (var a = e.length - 1; a >= 0; a--)
        (r = e[a]) && (s = (3 > o ? r(s) : o > 3 ? r(t, n, s) : r(t, n)) || s);
    return o > 3 && s && Object.defineProperty(t, n, s), s;
  }
  function __param(e, t) {
    return function (n, i) {
      t(n, i, e);
    };
  }
  function __metadata(e, t) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, t);
  }
  function __awaiter(e, t, n, i) {
    return new (n || (n = Promise))(function (r, o) {
      function s(e) {
        try {
          u(i.next(e));
        } catch (e) {
          o(e);
        }
      }
      function a(e) {
        try {
          u(i.throw(e));
        } catch (e) {
          o(e);
        }
      }
      function u(e) {
        var t;
        e.done
          ? r(e.value)
          : ((t = e.value),
            t instanceof n
              ? t
              : new n(function (e) {
                  e(t);
                })).then(s, a);
      }
      u((i = i.apply(e, t || [])).next());
    });
  }
  function __generator(e, t) {
    var n,
      i,
      r,
      o,
      s = {
        label: 0,
        sent: function () {
          if (1 & r[0]) throw r[1];
          return r[1];
        },
        trys: [],
        ops: []
      };
    return (
      (o = { next: a(0), throw: a(1), return: a(2) }),
      'function' == typeof Symbol &&
        (o[Symbol.iterator] = function () {
          return this;
        }),
      o
    );
    function a(o) {
      return function (a) {
        return (function (o) {
          if (n) throw new TypeError('Generator is already executing.');
          for (; s; )
            try {
              if (
                ((n = 1),
                i &&
                  (r =
                    2 & o[0]
                      ? i.return
                      : o[0]
                      ? i.throw || ((r = i.return) && r.call(i), 0)
                      : i.next) &&
                  !(r = r.call(i, o[1])).done)
              )
                return r;
              switch (((i = 0), r && (o = [2 & o[0], r.value]), o[0])) {
                case 0:
                case 1:
                  r = o;
                  break;
                case 4:
                  return s.label++, { value: o[1], done: !1 };
                case 5:
                  s.label++, (i = o[1]), (o = [0]);
                  continue;
                case 7:
                  (o = s.ops.pop()), s.trys.pop();
                  continue;
                default:
                  if (
                    !(
                      (r = (r = s.trys).length > 0 && r[r.length - 1]) ||
                      (6 !== o[0] && 2 !== o[0])
                    )
                  ) {
                    s = 0;
                    continue;
                  }
                  if (3 === o[0] && (!r || (o[1] > r[0] && o[1] < r[3]))) {
                    s.label = o[1];
                    break;
                  }
                  if (6 === o[0] && s.label < r[1]) {
                    (s.label = r[1]), (r = o);
                    break;
                  }
                  if (r && s.label < r[2]) {
                    (s.label = r[2]), s.ops.push(o);
                    break;
                  }
                  r[2] && s.ops.pop(), s.trys.pop();
                  continue;
              }
              o = t.call(e, s);
            } catch (e) {
              (o = [6, e]), (i = 0);
            } finally {
              n = r = 0;
            }
          if (5 & o[0]) throw o[1];
          return { value: o[0] ? o[1] : void 0, done: !0 };
        })([o, a]);
      };
    }
  }
  var __createBinding = Object.create
    ? function (e, t, n, i) {
        void 0 === i && (i = n),
          Object.defineProperty(e, i, {
            enumerable: !0,
            get: function () {
              return t[n];
            }
          });
      }
    : function (e, t, n, i) {
        void 0 === i && (i = n), (e[i] = t[n]);
      };
  function __exportStar(e, t) {
    for (var n in e)
      'default' === n ||
        {}.hasOwnProperty.call(t, n) ||
        __createBinding(t, e, n);
  }
  function __values(e) {
    var t = 'function' == typeof Symbol && Symbol.iterator,
      n = t && e[t],
      i = 0;
    if (n) return n.call(e);
    if (e && 'number' == typeof e.length)
      return {
        next: function () {
          return (
            e && i >= e.length && (e = void 0), { value: e && e[i++], done: !e }
          );
        }
      };
    throw new TypeError(
      t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
    );
  }
  function __read(e, t) {
    var n = 'function' == typeof Symbol && e[Symbol.iterator];
    if (!n) return e;
    var i,
      r,
      o = n.call(e),
      s = [];
    try {
      for (; (void 0 === t || t-- > 0) && !(i = o.next()).done; )
        s.push(i.value);
    } catch (e) {
      r = { error: e };
    } finally {
      try {
        i && !i.done && (n = o.return) && n.call(o);
      } finally {
        if (r) throw r.error;
      }
    }
    return s;
  }
  function __spread() {
    for (var e = [], t = 0; arguments.length > t; t++)
      e = e.concat(__read(arguments[t]));
    return e;
  }
  function __spreadArrays() {
    for (var e = 0, t = 0, n = arguments.length; n > t; t++)
      e += arguments[t].length;
    var i = Array(e),
      r = 0;
    for (t = 0; n > t; t++)
      for (var o = arguments[t], s = 0, a = o.length; a > s; s++, r++)
        i[r] = o[s];
    return i;
  }
  function __spreadArray(e, t, n) {
    if (n || 2 === arguments.length)
      for (var i, r = 0, o = t.length; o > r; r++)
        (!i && r in t) || (i || (i = [].slice.call(t, 0, r)), (i[r] = t[r]));
    return e.concat(i || [].slice.call(t));
  }
  function __await(e) {
    return this instanceof __await ? ((this.v = e), this) : new __await(e);
  }
  function __asyncGenerator(e, t, n) {
    if (!Symbol.asyncIterator)
      throw new TypeError('Symbol.asyncIterator is not defined.');
    var i,
      r = n.apply(e, t || []),
      o = [];
    return (
      (i = {}),
      s('next'),
      s('throw'),
      s('return'),
      (i[Symbol.asyncIterator] = function () {
        return this;
      }),
      i
    );
    function s(e) {
      r[e] &&
        (i[e] = function (t) {
          return new Promise(function (n, i) {
            o.push([e, t, n, i]) > 1 || a(e, t);
          });
        });
    }
    function a(e, t) {
      try {
        (n = r[e](t)).value instanceof __await
          ? Promise.resolve(n.value.v).then(u, l)
          : d(o[0][2], n);
      } catch (e) {
        d(o[0][3], e);
      }
      var n;
    }
    function u(e) {
      a('next', e);
    }
    function l(e) {
      a('throw', e);
    }
    function d(e, t) {
      e(t), o.shift(), o.length && a(o[0][0], o[0][1]);
    }
  }
  function __asyncDelegator(e) {
    var t, n;
    return (
      (t = {}),
      i('next'),
      i('throw', function (e) {
        throw e;
      }),
      i('return'),
      (t[Symbol.iterator] = function () {
        return this;
      }),
      t
    );
    function i(i, r) {
      t[i] = e[i]
        ? function (t) {
            return (n = !n)
              ? { value: __await(e[i](t)), done: 'return' === i }
              : r
              ? r(t)
              : t;
          }
        : r;
    }
  }
  function __asyncValues(e) {
    if (!Symbol.asyncIterator)
      throw new TypeError('Symbol.asyncIterator is not defined.');
    var t,
      n = e[Symbol.asyncIterator];
    return n
      ? n.call(e)
      : ((e =
          'function' == typeof __values ? __values(e) : e[Symbol.iterator]()),
        (t = {}),
        i('next'),
        i('throw'),
        i('return'),
        (t[Symbol.asyncIterator] = function () {
          return this;
        }),
        t);
    function i(n) {
      t[n] =
        e[n] &&
        function (t) {
          return new Promise(function (i, r) {
            !(function (e, t, n, i) {
              Promise.resolve(i).then(function (t) {
                e({ value: t, done: n });
              }, t);
            })(i, r, (t = e[n](t)).done, t.value);
          });
        };
    }
  }
  function __makeTemplateObject(e, t) {
    return (
      Object.defineProperty
        ? Object.defineProperty(e, 'raw', { value: t })
        : (e.raw = t),
      e
    );
  }
  var __setModuleDefault = Object.create
    ? function (e, t) {
        Object.defineProperty(e, 'default', { enumerable: !0, value: t });
      }
    : function (e, t) {
        e.default = t;
      };
  function __importStar(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e)
      for (var n in e)
        'default' !== n &&
          {}.hasOwnProperty.call(e, n) &&
          __createBinding(t, e, n);
    return __setModuleDefault(t, e), t;
  }
  function __importDefault(e) {
    return e && e.__esModule ? e : { default: e };
  }
  function __classPrivateFieldGet(e, t, n, i) {
    if ('a' === n && !i)
      throw new TypeError('Private accessor was defined without a getter');
    if ('function' == typeof t ? e !== t || !i : !t.has(e))
      throw new TypeError(
        'Cannot read private member from an object whose class did not declare it'
      );
    return 'm' === n ? i : 'a' === n ? i.call(e) : i ? i.value : t.get(e);
  }
  function __classPrivateFieldSet(e, t, n, i, r) {
    if ('m' === i) throw new TypeError('Private method is not writable');
    if ('a' === i && !r)
      throw new TypeError('Private accessor was defined without a setter');
    if ('function' == typeof t ? e !== t || !r : !t.has(e))
      throw new TypeError(
        'Cannot write private member to an object whose class did not declare it'
      );
    return 'a' === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n), n;
  }
  var tslib_es6 = Object.freeze({
      __proto__: null,
      __extends: __extends,
      get __assign() {
        return __assign;
      },
      __rest: __rest,
      __decorate: __decorate,
      __param: __param,
      __metadata: __metadata,
      __awaiter: __awaiter,
      __generator: __generator,
      __createBinding: __createBinding,
      __exportStar: __exportStar,
      __values: __values,
      __read: __read,
      __spread: __spread,
      __spreadArrays: __spreadArrays,
      __spreadArray: __spreadArray,
      __await: __await,
      __asyncGenerator: __asyncGenerator,
      __asyncDelegator: __asyncDelegator,
      __asyncValues: __asyncValues,
      __makeTemplateObject: __makeTemplateObject,
      __importStar: __importStar,
      __importDefault: __importDefault,
      __classPrivateFieldGet: __classPrivateFieldGet,
      __classPrivateFieldSet: __classPrivateFieldSet
    }),
    require$$0 = getAugmentedNamespace(tslib_es6),
    hasOwnProperty,
    hasDontEnumBug,
    dontEnums,
    dontEnumsLength;
  'object' != typeof JSON && (JSON = {}),
    (function () {
      var rx_one = /^[\],:{}\s]*$/,
        rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        rx_three =
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        rx_four = /(?:^|:|,)(?:\s*\[)+/g,
        rx_escapable =
          /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        rx_dangerous =
          /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta,
        rep;
      function f(e) {
        return 10 > e ? '0' + e : e;
      }
      function this_value() {
        return this.valueOf();
      }
      function quote(e) {
        return (
          (rx_escapable.lastIndex = 0),
          rx_escapable.test(e)
            ? '"' +
              e.replace(rx_escapable, function (e) {
                var t = meta[e];
                return 'string' == typeof t
                  ? t
                  : '\\u' + ('0000' + e.charCodeAt(0).toString(16)).slice(-4);
              }) +
              '"'
            : '"' + e + '"'
        );
      }
      function str(e, t) {
        var n,
          i,
          r,
          o,
          s,
          a = gap,
          u = t[e];
        switch (
          (u &&
            'object' == typeof u &&
            'function' == typeof u.toJSON &&
            (u = u.toJSON(e)),
          'function' == typeof rep && (u = rep.call(t, e, u)),
          typeof u)
        ) {
          case 'string':
            return quote(u);
          case 'number':
            return isFinite(u) ? u + '' : 'null';
          case 'boolean':
          case 'null':
            return u + '';
          case 'object':
            if (!u) return 'null';
            if (
              ((gap += indent),
              (s = []),
              '[object Array]' === {}.toString.apply(u))
            ) {
              for (o = u.length, n = 0; o > n; n += 1)
                s[n] = str(n, u) || 'null';
              return (
                (r =
                  0 === s.length
                    ? '[]'
                    : gap
                    ? '[\n' + gap + s.join(',\n' + gap) + '\n' + a + ']'
                    : '[' + s.join(',') + ']'),
                (gap = a),
                r
              );
            }
            if (rep && 'object' == typeof rep)
              for (o = rep.length, n = 0; o > n; n += 1)
                'string' == typeof rep[n] &&
                  (r = str((i = rep[n]), u)) &&
                  s.push(quote(i) + (gap ? ': ' : ':') + r);
            else
              for (i in u)
                ({}.hasOwnProperty.call(u, i) &&
                  (r = str(i, u)) &&
                  s.push(quote(i) + (gap ? ': ' : ':') + r));
            return (
              (r =
                0 === s.length
                  ? '{}'
                  : gap
                  ? '{\n' + gap + s.join(',\n' + gap) + '\n' + a + '}'
                  : '{' + s.join(',') + '}'),
              (gap = a),
              r
            );
        }
      }
      'function' != typeof Date.prototype.toJSON &&
        ((Date.prototype.toJSON = function () {
          return isFinite(this.valueOf())
            ? this.getUTCFullYear() +
                '-' +
                f(this.getUTCMonth() + 1) +
                '-' +
                f(this.getUTCDate()) +
                'T' +
                f(this.getUTCHours()) +
                ':' +
                f(this.getUTCMinutes()) +
                ':' +
                f(this.getUTCSeconds()) +
                'Z'
            : null;
        }),
        (Boolean.prototype.toJSON = this_value),
        (Number.prototype.toJSON = this_value),
        (String.prototype.toJSON = this_value)),
        'function' != typeof JSON.stringify &&
          ((meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
          }),
          (JSON.stringify = function (e, t, n) {
            var i;
            if (((gap = ''), (indent = ''), 'number' == typeof n))
              for (i = 0; n > i; i += 1) indent += ' ';
            else 'string' == typeof n && (indent = n);
            if (
              ((rep = t),
              t &&
                'function' != typeof t &&
                ('object' != typeof t || 'number' != typeof t.length))
            )
              throw Error('JSON.stringify');
            return str('', { '': e });
          })),
        'function' != typeof JSON.parse &&
          (JSON.parse = function (text, reviver) {
            var j;
            function walk(e, t) {
              var n,
                i,
                r = e[t];
              if (r && 'object' == typeof r)
                for (n in r)
                  ({}.hasOwnProperty.call(r, n) &&
                    (void 0 !== (i = walk(r, n)) ? (r[n] = i) : delete r[n]));
              return reviver.call(e, t, r);
            }
            if (
              ((text += ''),
              (rx_dangerous.lastIndex = 0),
              rx_dangerous.test(text) &&
                (text = text.replace(rx_dangerous, function (e) {
                  return (
                    '\\u' + ('0000' + e.charCodeAt(0).toString(16)).slice(-4)
                  );
                })),
              rx_one.test(
                text
                  .replace(rx_two, '@')
                  .replace(rx_three, ']')
                  .replace(rx_four, '')
              ))
            )
              return (
                (j = eval('(' + text + ')')),
                'function' == typeof reviver ? walk({ '': j }, '') : j
              );
            throw new SyntaxError('JSON.parse');
          });
    })(),
    void 0 === window.console && (window.console = void 0),
    'function' != typeof Object.assign &&
      Object.defineProperty(Object, 'assign', {
        value: function (e, t) {
          if (null == e)
            throw new TypeError('Cannot convert undefined or null to object');
          for (var n = Object(e), i = 1; arguments.length > i; i++) {
            var r = arguments[i];
            if (null != r)
              for (var o in r) ({}.hasOwnProperty.call(r, o) && (n[o] = r[o]));
          }
          return n;
        },
        writable: !0,
        configurable: !0
      }),
    'function' != typeof [].equals &&
      ((Array.prototype.equals = function (e) {
        if (!e) return !1;
        if (this.length != e.length) return !1;
        for (var t = 0, n = this.length; n > t; t++)
          if (this[t] != e[t]) return !1;
        return !0;
      }),
      Object.defineProperty(Array.prototype, 'equals', { enumerable: !1 })),
    [].includes ||
      Object.defineProperty(Array.prototype, 'includes', {
        value: function (e, t) {
          if (null == this)
            throw new TypeError('"this" is null or not defined');
          var n = Object(this),
            i = n.length >>> 0;
          if (0 === i) return !1;
          for (
            var r, o, s = 0 | t, a = Math.max(0 > s ? i - Math.abs(s) : s, 0);
            i > a;

          ) {
            if (
              (r = n[a]) === (o = e) ||
              ('number' == typeof r &&
                'number' == typeof o &&
                isNaN(r) &&
                isNaN(o))
            )
              return !0;
            a++;
          }
          return !1;
        }
      }),
    Object.keys ||
      (Object.keys =
        ((hasOwnProperty = {}.hasOwnProperty),
        (hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString')),
        (dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ]),
        (dontEnumsLength = dontEnums.length),
        function (e) {
          if (('object' != typeof e && 'function' != typeof e) || null === e)
            throw new TypeError('Object.keys called on non-object');
          var t = [];
          for (var n in e) hasOwnProperty.call(e, n) && t.push(n);
          if (hasDontEnumBug)
            for (var i = 0; dontEnumsLength > i; i++)
              hasOwnProperty.call(e, dontEnums[i]) && t.push(dontEnums[i]);
          return t;
        }));
  var growingio = {},
    embed = {},
    utils$1 = {};
  Object.defineProperty(utils$1, '__esModule', { value: !0 }),
    (utils$1.getItem =
      utils$1.detectIE =
      utils$1.query =
      utils$1.path =
      utils$1.normalizePath =
        void 0);
  var normalizePath = function (e) {
    var t = e.length;
    return t > 1 && '/' === e.charAt(t - 1) ? e.slice(0, t - 1) : e;
  };
  utils$1.normalizePath = normalizePath;
  var path = function () {
    var e = window.location.pathname;
    if (window.vds.hashtag) {
      var t = location.hash;
      -1 !== t.indexOf('?') ? (e += t.split('?')[0]) : (e += t);
    }
    return e;
  };
  utils$1.path = path;
  var query = function (e) {
    var t = window.location.search,
      n = window.location.hash;
    return (
      (e ? e.hashtag : window.vds.hashtag) &&
        -1 !== n.indexOf('?') &&
        (t = t + '&' + n.substring(n.indexOf('?') + 1)),
      t.length > 1 && ['?', '&'].includes(t.charAt(0)) && (t = t.slice(1)),
      t
    );
  };
  utils$1.query = query;
  var detectIE = function () {
    var e = window.navigator.userAgent;
    if (window.ActiveXObject) {
      var t = e.indexOf('MSIE ');
      if (t > 0) return parseInt(e.substring(t + 5, e.indexOf('.', t)), 10);
    }
    if (e.indexOf('Trident/') > 0) {
      var n = e.indexOf('rv:');
      return parseInt(e.substring(n + 3, e.indexOf('.', n)), 10);
    }
    var i = e.indexOf('Edge/');
    return i > 0 && parseInt(e.substring(i + 5, e.indexOf('.', i)), 10);
  };
  utils$1.detectIE = detectIE;
  var getItem = function (e) {
    return e && 'object' == typeof e && e.id && e.key
      ? {
          id: 'string' == typeof e.id ? e.id : JSON.stringify(e.id),
          key: 'string' == typeof e.key ? e.key : JSON.stringify(e.key)
        }
      : null;
  };
  utils$1.getItem = getItem;
  var cookie = {},
    memoryStorage = {};
  Object.defineProperty(memoryStorage, '__esModule', { value: !0 });
  var MemoryStorage = function () {
    var e = this;
    (this.getItem = function (t) {
      return e.data[t];
    }),
      (this.setItem = function (t, n) {
        (e.data[t] = n),
          e.keys.includes(t) || e.keys.push(t),
          (e.length = e.keys.length);
      }),
      (this.removeItem = function (t) {
        (e.data[t] = void 0),
          (e.keys = e.keys.filter(function (e) {
            return e !== t;
          })),
          (e.length = e.keys.length);
      }),
      (this.key = function (t) {
        return Number.isInteger(t) && t >= 0 ? e.keys[t] : void 0;
      }),
      (this.clear = function () {
        (e.keys = []), (e.data = {}), (e.length = e.keys.length);
      }),
      (this.keys = []),
      (this.data = {}),
      (this.length = this.keys.length);
  };
  (memoryStorage.default = MemoryStorage),
    (function (e) {
      Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.docCookies = void 0);
      var t,
        n = (0, require$$0.__importDefault)(memoryStorage),
        i =
          '' === document.domain ||
          ['', 'localhost', '127.0.0.1'].includes(window.location.hostname) ||
          !['http:', 'https:'].includes(window.location.protocol),
        r = window.self !== window.top;
      (t = r
        ? 'memory'
        : i
        ? 'local'
        : (function () {
            var e = !1;
            if (navigator.cookieEnabled) return !0;
            var t = document.cookie;
            return (
              (document.cookie = 'testcookie=yes;'),
              document.cookie.indexOf('testcookie=yes') > -1 && (e = !0),
              (document.cookie = t),
              e
            );
          })()
        ? 'cookie'
        : 'memory'),
        (e.docCookies = {
          getItem: function (e) {
            return (
              (e &&
                decodeURIComponent(
                  document.cookie.replace(
                    RegExp(
                      '(?:(?:^|.*;)\\s*' +
                        encodeURIComponent(e).replace(/[\-\.\+\*]/g, '\\$&') +
                        '\\s*\\=\\s*([^;]*).*$)|^.*$'
                    ),
                    '$1'
                  )
                )) ||
              ''
            );
          },
          setItem: function (e, t, n, i, r, o) {
            if (!e || /^(?:expires|max\-age|path|domain|secure)$/i.test(e))
              return !1;
            var s = '';
            if (n)
              switch (n.constructor) {
                case Number:
                  s =
                    n === 1 / 0
                      ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
                      : '; expires=' +
                        new Date(new Date().getTime() + 1e3 * n).toUTCString();
                  break;
                case String:
                  s = '; expires=' + n;
                  break;
                case Date:
                  s = '; expires=' + n.toUTCString();
              }
            return (
              (document.cookie =
                encodeURIComponent(e) +
                '=' +
                encodeURIComponent(t) +
                s +
                (r ? '; domain=' + r : '') +
                (i ? '; path=' + i : '') +
                (o ? '; secure' : '')),
              !0
            );
          },
          removeItem: function (e, t, n) {
            return (
              !!this.hasItem(e) &&
              ((document.cookie =
                encodeURIComponent(e) +
                '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
                (n ? '; domain=' + n : '') +
                (t ? '; path=' + t : '')),
              !0)
            );
          },
          hasItem: function (e) {
            return (
              !!e &&
              RegExp(
                '(?:^|;\\s*)' +
                  encodeURIComponent(e).replace(/[\-\.\+\*]/g, '\\$&') +
                  '\\s*\\='
              ).test(document.cookie)
            );
          },
          keys: function () {
            for (
              var e = document.cookie
                  .replace(
                    /((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,
                    ''
                  )
                  .split(/\s*(?:\=[^;]*)?;\s*/),
                t = e.length,
                n = 0;
              t > n;
              n++
            )
              e[n] = decodeURIComponent(e[n]);
            return e;
          }
        });
      var o = new n.default(),
        s = 'local' === t ? window.localStorage : o,
        a = {
          getItem: function (e) {
            var t = s.getItem(e) || '';
            try {
              var n = JSON.parse(t);
              return n.expiredAt > Date.now() ? n.value : null;
            } catch (e) {
              return null;
            }
          },
          setItem: function (e, t, n) {
            var i = n ? Date.now() + 1e3 * n : new Date(9999, 12).getTime();
            s.setItem(e, JSON.stringify({ expiredAt: i, value: t }));
          },
          removeItem: function (e) {
            s.removeItem(e);
          },
          hasItem: function (e) {
            return e && -1 !== this.keys().indexOf(e);
          },
          keys: function () {
            return Array(s.length).map(function (e, t) {
              return s.key(t);
            });
          }
        },
        u = /^(\.br\.|\.co\.|\.com\.|\.org\.|\.edu\.|\.net\.)/,
        l = {
          getItem: function (n) {
            return ['local', 'memory'].includes(t)
              ? a.getItem(n)
              : e.docCookies.getItem(n);
          },
          hasItem: function (n) {
            return ['local', 'memory'].includes(t)
              ? a.hasItem(n)
              : e.docCookies.hasItem(n);
          },
          keys: function () {
            return ['local', 'memory'].includes(t)
              ? a.keys()
              : e.docCookies.keys();
          },
          setItem: function (n, i, r, o, s, l) {
            void 0 === l && (l = !1);
            for (var d = 0; d < s.length; d++)
              if (!u.test(s[d])) {
                ['local', 'memory'].includes(t)
                  ? a.setItem(n, i, r)
                  : e.docCookies.setItem(n, i, r, o, s[d], l);
                break;
              }
          },
          removeItem: function (n, i, r) {
            for (var o = 0; o < r.length; o++)
              if (!u.test(r[o])) {
                ['local', 'memory'].includes(t)
                  ? a.removeItem(n)
                  : e.docCookies.removeItem(n, i, r[o]);
                break;
              }
          }
        };
      e.default = l;
    })(cookie);
  var utils = {},
    constant = {};
  Object.defineProperty(constant, '__esModule', { value: !0 }),
    (constant.AUTO_TRACK =
      constant.SUPPORT_IGNORED_FIELDS =
      constant.DIRECT_CIRCLE_TAGS =
      constant.ICON_TAGS =
      constant.CIRCLE_UNSUPPORTED_TAGS =
      constant.UNSUPPORTED_TAGS =
        void 0),
    (constant.UNSUPPORTED_TAGS = {
      tspan: 1,
      text: 1,
      g: 1,
      rect: 1,
      path: 1,
      defs: 1,
      clipPath: 1,
      desc: 1,
      title: 1,
      math: 1,
      use: 1
    }),
    (constant.CIRCLE_UNSUPPORTED_TAGS = {
      form: 1,
      hr: 1,
      br: 1,
      script: 1,
      noscript: 1,
      style: 1,
      head: 1,
      base: 1,
      link: 1,
      meta: 1,
      title: 1,
      body: 1,
      html: 1,
      template: 1,
      code: 1
    }),
    (constant.ICON_TAGS = ['i', 'span', 'em', 'svg']),
    (constant.DIRECT_CIRCLE_TAGS = ['select', 'a', 'button', 'input', 'img']),
    (constant.SUPPORT_IGNORED_FIELDS = ['screenWidth', 'screenHeight']),
    (constant.AUTO_TRACK = ['VIEW_CLICK', 'VIEW_CHANGE', 'FORM_SUBMIT']),
    (function (e) {
      Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.getValidIgnoreFields =
          e.cookieDomains =
          e.getDomain =
          e.getPlatform =
          e.supportPlatform =
          e.isWebview =
          e.nodeIsInPoint =
          e.omit =
          e.debounce =
          e.addEventListener =
          e.isStrEmpty =
          e.deepRemoveValueOfEmpty =
          e.isEmptyValue =
          e.getTopDomains =
          e.iosMainVersion =
          e.isOnIos =
          e.indexOf =
          e._addObserverListener =
          e.getDataByPath =
          e.stringifyVar =
          e.validVar =
          e.isUndefined =
          e.isFunction =
          e.isString =
          e.isArray =
          e.isObject =
            void 0);
      var t = constant;
      (e.default = {
        getScreenHeight: function () {
          return window.screen.height;
        },
        getScreenWidth: function () {
          return window.screen.width;
        },
        isEmpty: function (e) {
          for (var t in e) if (e.hasOwnProperty(t)) return !1;
          return !0;
        },
        normalizePath: function (e) {
          var t = e.length;
          return t > 1 && '/' === e.charAt(t - 1) ? e.slice(0, t - 1) : e;
        }
      }),
        (e.isObject = function (e) {
          return e && 'object' == typeof e && e.constructor === Object;
        }),
        (e.isArray = function (e) {
          return e && 'object' == typeof e && e.constructor === Array;
        }),
        (e.isString = function (e) {
          return e && 'string' == typeof e && e.constructor === String;
        }),
        (e.isFunction = function (e) {
          return e && 'function' == typeof e;
        }),
        (e.isUndefined = function (e) {
          return void 0 === e;
        }),
        (e.validVar = function (e) {
          if (null !== e && '[object Object]' === {}.toString.call(e)) {
            var t = 0;
            for (var n in e) e.hasOwnProperty(n) && t++;
            if (t > 0) return !0;
          }
          return !1;
        }),
        (e.stringifyVar = function (e) {
          var t = e;
          for (var n in e)
            'string' != typeof e[n] && (t[n] = JSON.stringify(e[n]));
          return t;
        }),
        (e.getDataByPath = function (e, t, n) {
          if (!e || !t) return n;
          var i = e;
          return (
            t.split('.').map(function (e) {
              i = 'object' == typeof i && null != i ? i[e] : void 0;
            }),
            void 0 !== i ? i : n
          );
        }),
        (e._addObserverListener = function (e, t, n, i) {
          void 0 === i && (i = !0),
            document.addEventListener
              ? e.addEventListener(t, n, i)
              : e.attachEvent
              ? e.attachEvent('on' + t, n)
              : (e['on' + t] = n);
        }),
        (e.indexOf = function (e, t) {
          if ([].indexOf) return e.indexOf(t);
          for (var n = e.length, i = -1; ++i < n; ) if (e[i] === t) return i;
          return -1;
        }),
        (e.isOnIos = !!window.navigator.userAgent.match(/(iPad|iPhone|iPod)/g)),
        (e.iosMainVersion = function () {
          var e = navigator.userAgent
            .toLowerCase()
            .match(/cpu iphone os (.*?) like mac os/);
          return !e || 2 > e.length ? 0 : e[1].split('_')[0];
        }),
        (e.getTopDomains = function () {
          var e = document.domain;
          try {
            var t = e.split('.');
            if (
              0 >= parseInt(t[t.length - 1]) ||
              parseInt(t[t.length - 1]) > 255
            )
              return ['.' + t.slice(-2).join('.'), '.' + t.slice(-3).join('.')];
          } catch (e) {}
          return [e];
        }),
        (e.isEmptyValue = function (e) {
          return null == e || '' === e;
        }),
        (e.deepRemoveValueOfEmpty = function (t) {
          if ((0, e.isArray)(t))
            for (var n = t.length, i = 0; n > i; i++) {
              var r = t[i];
              (0, e.isEmptyValue)(r)
                ? (t.splice(i, 1), i--, n--)
                : (0, e.deepRemoveValueOfEmpty)(r);
            }
          else
            (0, e.isObject)(t) &&
              Object.keys(t).forEach(function (n) {
                var i = t[n];
                (0, e.isEmptyValue)(i)
                  ? delete t[n]
                  : (0, e.deepRemoveValueOfEmpty)(i);
              });
        }),
        (e.isStrEmpty = function (e) {
          return null == e || 0 === e.length;
        }),
        (e.addEventListener = function (e, t, n, i) {
          if ((void 0 === i && (i = !1), !e)) return !1;
          e.addEventListener
            ? e.addEventListener(t, n, i)
            : e.attachEvent
            ? e.attachEvent('on'.concat(t), function () {
                var t = window.event;
                (t.target = t.srcElement), (t.currentTarget = e), n.call(e, t);
              })
            : (e['on'.concat(t)] = n);
        }),
        (e.debounce = function (e, t) {
          var n = null;
          return function () {
            var i = arguments;
            n && (clearTimeout(n), (n = null)),
              (n = setTimeout(function () {
                e.apply(void 0, i);
              }, t));
          };
        }),
        (e.omit = function (e) {
          for (var t = [], n = 1; arguments.length > n; n++)
            t[n - 1] = arguments[n];
          var i = {};
          return (
            Object.keys(e).forEach(function (n) {
              -1 == t.indexOf(n) && (i[n] = e[n]);
            }),
            i
          );
        }),
        (e.nodeIsInPoint = function (e, t, n) {
          return document.elementFromPoint(t, n) === e;
        }),
        (e.isWebview = function (e) {
          return -1 === ['web', 'wxwv'].indexOf(e);
        }),
        (e.supportPlatform = [
          'web',
          'wxwv',
          'minp',
          'alip',
          'baidup',
          'qq',
          'bytedance'
        ]),
        (e.getPlatform = function (t) {
          return t && -1 != e.supportPlatform.indexOf(t.toLowerCase())
            ? 'minp' == t
              ? 'MinP'
              : t
            : 'web';
        }),
        (e.getDomain = function (t) {
          return (0, e.isWebview)(t.platform)
            ? t.appId
            : location.host || t.appId;
        });
      var n = null;
      (e.cookieDomains = function () {
        if (!n)
          try {
            var e = window.location.hostname.split('.');
            n =
              e[e.length - 1] > 0 && 255 >= e[e.length - 1]
                ? [window.location.hostname]
                : ['.' + e.slice(-2).join('.'), '.' + e.slice(-3).join('.')];
          } catch (e) {
            n = [window.location.hostname];
          }
        return n;
      }),
        (e.getValidIgnoreFields = function (n) {
          return n
            ? (n = (0, e.isArray)(n) ? n : [n]).filter(function (e) {
                return t.SUPPORT_IGNORED_FIELDS.includes(e);
              })
            : null;
        });
    })(utils);
  var querystringify$1 = {},
    has = {}.hasOwnProperty,
    undef;
  function decode(e) {
    try {
      return decodeURIComponent(e.replace(/\+/g, ' '));
    } catch (e) {
      return null;
    }
  }
  function encode(e) {
    try {
      return encodeURIComponent(e);
    } catch (e) {
      return null;
    }
  }
  function querystring(e) {
    for (var t, n = /([^=?#&]+)=?([^&]*)/g, i = {}; (t = n.exec(e)); ) {
      var r = decode(t[1]),
        o = decode(t[2]);
      null === r || null === o || r in i || (i[r] = o);
    }
    return i;
  }
  function querystringify(e, t) {
    t = t || '';
    var n,
      i,
      r = [];
    for (i in ('string' != typeof t && (t = '?'), e))
      if (has.call(e, i)) {
        if (
          ((n = e[i]) || (null !== n && n !== undef && !isNaN(n)) || (n = ''),
          (i = encode(i)),
          (n = encode(n)),
          null === i || null === n)
        )
          continue;
        r.push(i + '=' + n);
      }
    return r.length ? t + r.join('&') : '';
  }
  (querystringify$1.stringify = querystringify),
    (querystringify$1.parse = querystring),
    (function (e) {
      Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.initGioQuery =
          e.inheritDataCollect =
          e.useInherit =
          e.gioQuery =
          e.GIO_KEYS =
          e.GIO_EXTRA_KEYS =
          e.GIO_DEF_KEYS =
            void 0);
      var t = require$$0,
        n = utils$1,
        i = (0, t.__importDefault)(cookie),
        r = utils,
        o = (0, t.__importDefault)(querystringify$1),
        s = 'gio_search_cookie';
      (e.GIO_DEF_KEYS = [
        'giou',
        'gios',
        'gioid',
        'giouserkey',
        'giocs1',
        'gioplatform',
        'gioprojectid',
        'gioappid',
        'giodatasourceid',
        'giodatacollect'
      ]),
        (e.GIO_EXTRA_KEYS = [
          'gioappChannel',
          'giodeviceBrand',
          'giodeviceModel',
          'giodeviceType',
          'giooperatingSystem',
          'gionetworkState',
          'gioplatformVersion',
          'giolanguage',
          'gioscreenHeight',
          'gioscreenWidth'
        ]),
        (e.GIO_KEYS = (0, t.__spreadArray)(
          (0, t.__spreadArray)([], (0, t.__read)(e.GIO_DEF_KEYS), !1),
          (0, t.__read)(e.GIO_EXTRA_KEYS),
          !1
        )),
        (e.gioQuery = null),
        (e.useInherit = !1),
        (e.inheritDataCollect = void 0),
        (e.initGioQuery = function (a, u, l) {
          if (null == u || 'string' != typeof u) return !1;
          var d = (0, t.__read)(
              (function (e) {
                var t = (0, n.query)(e),
                  r = o.default.parse(t);
                return r.gioprojectid && r.giodatasourceid
                  ? [t, !1]
                  : [i.default.getItem(s), !0];
              })(l),
              2
            ),
            c = d[0],
            f = d[1];
          if (!c) return !1;
          var h = (function (t) {
            var n = o.default.parse(t),
              i = {};
            return (
              e.GIO_KEYS.forEach(function (e) {
                i[e] = 'undefined' === n[e] || 'null' === n[e] ? '' : n[e];
              }),
              i
            );
          })(c);
          return (
            h &&
              Object.keys(h).length > 0 &&
              (function (t) {
                var n = t ? t.hashtag : window.vds.hashtag,
                  i = window.location.search;
                i.startsWith('?') && (i = i.replace('?', ''));
                var r = window.location.hash,
                  s = r.substring(r.indexOf('?') + 1),
                  a = !1,
                  u = function (t) {
                    var n = {},
                      i = o.default.parse(t);
                    return (
                      Object.keys(i).forEach(function (t) {
                        e.GIO_KEYS.includes(t) || (n[t] = i[t]);
                      }),
                      Object.keys(n)
                        .map(function (e) {
                          return ''.concat(e, '=').concat(n[e]);
                        })
                        .join('&')
                    );
                  };
                if (
                  (n &&
                    s &&
                    -1 !== s.indexOf('giou') &&
                    ((s = u(s)),
                    (r = ''.concat(r.split('?')[0], '?').concat(s)),
                    (a = !0)),
                  -1 !== i.indexOf('giou') && ((i = u(i)), (a = !0)),
                  a)
                ) {
                  var l = ''
                    .concat(window.location.pathname, '?')
                    .concat(i)
                    .concat(r);
                  window.history.replaceState(null, document.title, l);
                }
              })(l),
            h &&
              h.gioprojectid == a &&
              h.gioappid == u &&
              h.giodatasourceid &&
              h.gioplatform &&
              ((e.useInherit = !0),
              ('true' !== h.giodatacollect && !0 !== h.giodatacollect) ||
                (e.inheritDataCollect = !0),
              ('false' !== h.giodatacollect && !1 !== h.giodatacollect) ||
                (e.inheritDataCollect = !1),
              (e.gioQuery = h),
              f ||
                (function (e) {
                  i.default.setItem(s, e, null, '/', (0, r.cookieDomains)());
                })(c)),
            {
              useInherit: e.useInherit,
              inheritDataCollect: e.inheritDataCollect
            }
          );
        });
    })(embed);
  var hybrid = {},
    webviewJavascriptBridge = {};
  Object.defineProperty(webviewJavascriptBridge, '__esModule', { value: !0 });
  var utils_1$c = utils,
    WebViewJavascriptBridge = (function () {
      function e() {
        this.hasWebViewBridge = this._setupWebViewJavascriptBridge();
      }
      return (
        (e.prototype.dispatchEvent = function (e) {
          this.hasWebViewBridge &&
            window.GrowingWebViewJavascriptBridge &&
            ((0, utils_1$c.deepRemoveValueOfEmpty)(e),
            window.GrowingWebViewJavascriptBridge.dispatchEvent(
              JSON.stringify(e)
            ));
        }),
        (e.prototype.getConfiguration = function () {
          if (this.hasWebViewBridge)
            return window.GrowingWebViewJavascriptBridge
              ? window.GrowingWebViewJavascriptBridge.configuration
              : void 0;
        }),
        (e.prototype.setNativeUserId = function (e) {
          this.hasWebViewBridge &&
            window.GrowingWebViewJavascriptBridge &&
            window.GrowingWebViewJavascriptBridge.setNativeUserId(e.toString());
        }),
        (e.prototype.clearNativeUserId = function () {
          this.hasWebViewBridge &&
            window.GrowingWebViewJavascriptBridge &&
            window.GrowingWebViewJavascriptBridge.clearNativeUserId();
        }),
        (e.prototype.setNativeUserIdAndUserKey = function (e, t) {
          this.hasWebViewBridge &&
            (window.GrowingWebViewJavascriptBridge &&
            window.GrowingWebViewJavascriptBridge.setNativeUserIdAndUserKey
              ? window.GrowingWebViewJavascriptBridge.setNativeUserIdAndUserKey(
                  ''.concat(e),
                  ['string', 'number'].includes(typeof t)
                    ? ''.concat(t)
                    : void 0
                )
              : this.setNativeUserId(''.concat(e)));
        }),
        (e.prototype.clearNativeUserIdAndUserKey = function () {
          this.hasWebViewBridge &&
            (window.GrowingWebViewJavascriptBridge &&
            window.GrowingWebViewJavascriptBridge.clearNativeUserIdAndUserKey
              ? window.GrowingWebViewJavascriptBridge.clearNativeUserIdAndUserKey()
              : this.clearNativeUserId());
        }),
        (e.prototype._setupWebViewJavascriptBridge = function () {
          return (
            !!e.isValid() &&
            (this._loadWebViewJavascriptBridgeConfiguration(), !0)
          );
        }),
        (e.prototype._loadWebViewJavascriptBridgeConfiguration = function () {
          if (e.isValid()) {
            if (window.GrowingWebViewJavascriptBridge.configuration) return;
            window.GrowingWebViewJavascriptBridge.getConfiguration &&
              (window.GrowingWebViewJavascriptBridge.configuration = JSON.parse(
                window.GrowingWebViewJavascriptBridge.getConfiguration()
              ));
          }
        }),
        (e.isValid = function () {
          return !!window.GrowingWebViewJavascriptBridge;
        }),
        e
      );
    })();
  (webviewJavascriptBridge.default = WebViewJavascriptBridge),
    Object.defineProperty(hybrid, '__esModule', { value: !0 });
  var tslib_1$v = require$$0,
    webview_javascript_bridge_1 = (0, tslib_1$v.__importDefault)(
      webviewJavascriptBridge
    ),
    SUPPORT_EVENT_TYPES = [
      'VIEW_CLICK',
      'VIEW_CHANGE',
      'FORM_SUBMIT',
      'PAGE',
      'CUSTOM',
      'LOGIN_USER_ATTRIBUTES'
    ],
    PENETRATED_EVENT_TYPES = ['LOGIN_USER_ATTRIBUTES'],
    Hybrid = (function (e) {
      function t(t) {
        var n = e.call(this) || this;
        return (
          (n.projectId = t.vdsConfig.projectId),
          (n.penetrateHybrid = t.vdsConfig.penetrateHybrid),
          n
        );
      }
      return (
        (0, tslib_1$v.__extends)(t, e),
        (t.prototype.allowWebTrack = function () {
          return !t.isValid() || !this.isSameAsNativeProject();
        }),
        (t.prototype.dispatchEvent = function (n) {
          var i = n ? n.eventType : '';
          t.isValid() &&
            SUPPORT_EVENT_TYPES.includes(i) &&
            (PENETRATED_EVENT_TYPES.includes(i)
              ? this.penetrateHybrid && e.prototype.dispatchEvent.call(this, n)
              : e.prototype.dispatchEvent.call(this, n));
        }),
        (t.prototype.setNativeUserId = function (t) {
          this.penetrateHybrid &&
            this.isSameAsNativeProject() &&
            e.prototype.setNativeUserId.call(this, t.toString());
        }),
        (t.prototype.clearNativeUserId = function () {
          this.penetrateHybrid &&
            this.isSameAsNativeProject() &&
            e.prototype.clearNativeUserId.call(this);
        }),
        (t.prototype.setNativeUserIdAndUserKey = function (t, n) {
          this.penetrateHybrid &&
            this.isSameAsNativeProject() &&
            e.prototype.setNativeUserIdAndUserKey.call(
              this,
              ''.concat(t),
              ['string', 'number'].includes(typeof n) ? ''.concat(n) : void 0
            );
        }),
        (t.prototype.clearNativeUserIdAndUserKey = function () {
          this.penetrateHybrid &&
            this.isSameAsNativeProject() &&
            e.prototype.clearNativeUserIdAndUserKey.call(this);
        }),
        (t.prototype.isSameAsNativeProject = function () {
          var e = this.getConfiguration();
          return !!e && this.projectId === e.projectId;
        }),
        t
      );
    })(webview_javascript_bridge_1.default);
  hybrid.default = Hybrid;
  var touchHandler = {};
  Object.defineProperty(touchHandler, '__esModule', { value: !0 });
  var tslib_1$u = require$$0,
    utils_1$b = utils,
    TAP_DELAY = 200,
    TAP_TIMEOUT = 700,
    TouchHandler = (function () {
      function e(e) {
        this.listener = e;
        var t = navigator.userAgent,
          n = /chrome/i.exec(t),
          i = /android/i.exec(t);
        this.hasTouch = 'ontouchstart' in window && !(n && !i);
      }
      return (
        (e.prototype.start = function () {
          var e,
            t,
            n,
            i,
            r,
            o,
            s = this.hasTouch ? ['touchstart'] : ['mousedown'],
            a = this.hasTouch
              ? ['touchend', 'touchcancel']
              : ['mouseup', 'mouseleave'],
            u = this.hasTouch ? ['touchmove'] : ['mousemove'];
          try {
            for (
              var l = (0, tslib_1$u.__values)(s), d = l.next();
              !d.done;
              d = l.next()
            ) {
              var c = d.value;
              (0, utils_1$b._addObserverListener)(
                window,
                c,
                this.touchStartHandler.bind(this)
              );
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              d && !d.done && (t = l.return) && t.call(l);
            } finally {
              if (e) throw e.error;
            }
          }
          try {
            for (
              var f = (0, tslib_1$u.__values)(u), h = f.next();
              !h.done;
              h = f.next()
            ) {
              var _ = h.value;
              (0, utils_1$b._addObserverListener)(
                window,
                _,
                this.touchMoveHandler.bind(this)
              );
            }
          } catch (e) {
            n = { error: e };
          } finally {
            try {
              h && !h.done && (i = f.return) && i.call(f);
            } finally {
              if (n) throw n.error;
            }
          }
          try {
            for (
              var p = (0, tslib_1$u.__values)(a), g = p.next();
              !g.done;
              g = p.next()
            ) {
              var v = g.value;
              (0, utils_1$b._addObserverListener)(
                window,
                v,
                this.touchStopHandler.bind(this)
              );
            }
          } catch (e) {
            r = { error: e };
          } finally {
            try {
              g && !g.done && (o = p.return) && o.call(p);
            } finally {
              if (r) throw r.error;
            }
          }
        }),
        (e.prototype.touchStartHandler = function (e) {
          if (1 >= e.which) {
            var t = +Date.now();
            this.safeguard !== t &&
              (this.touchTimeout && clearTimeout(this.touchTimeout),
              (this.safeguard = t),
              (this.touchEvent = {
                time: t,
                target: e.target,
                x: this._page('x', e),
                y: this._page('y', e),
                isTrusted: !0,
                type: 'click'
              }));
          }
        }),
        (e.prototype.touchMoveHandler = function (e) {
          var t = Math.abs(
              this._page('x', e) - (this.touchEvent && this.touchEvent.x) || 0
            ),
            n = Math.abs(
              this._page('y', e) - (this.touchEvent && this.touchEvent.y) || 0
            );
          (t > 10 || n > 10) && (this.touchEvent = null);
        }),
        (e.prototype.touchStopHandler = function (e) {
          var t = this,
            n = +Date.now() - (this.touchEvent && this.touchEvent.time) || 0;
          this.touchEvent && TAP_DELAY > n
            ? (this.touchTimeout = setTimeout(function () {
                t.listener(t.touchEvent), (t.touchEvent = null);
              }, 200))
            : this.touchEvent &&
              n >= TAP_DELAY &&
              TAP_TIMEOUT > n &&
              (this.listener(this.touchEvent), (this.touchEvent = null));
        }),
        (e.prototype._page = function (e, t) {
          return (this.hasTouch ? t.touches[0] : t)[
            'page'.concat(e.toUpperCase())
          ];
        }),
        (e.listener = function (t) {
          this.THAT || (this.THAT = new e(t)), this.THAT.start();
        }),
        e
      );
    })();
  touchHandler.default = TouchHandler;
  var webObserver = {},
    observer = {},
    actionHandlers = {},
    dom_node = {},
    dom_utils = {};
  Object.defineProperty(dom_utils, '__esModule', { value: !0 });
  var tslib_1$t = require$$0,
    DomUtils = {
      SUPPORTED_ICON_TAGS: ['i', 'span', 'em', 'svg', 'img'],
      SUPPORTED_CLICK_INPUT_TYPES: ['button', 'submit'],
      SUPPORTED_CHANGE_TYPES: ['radio', 'checkbox', 'search'],
      SUPPORTED_CONTAINER_TAGS: ['A', 'BUTTON', 'TR', 'LI', 'DL'],
      depthInside: function (e, t, n) {
        var i, r;
        if ((void 0 === n && (n = 1), e.hasChildNodes() && n > t)) return !1;
        try {
          for (
            var o = (0, tslib_1$t.__values)(e.children), s = o.next();
            !s.done;
            s = o.next()
          ) {
            var a = s.value;
            if (!DomUtils.depthInside(a, t, n + 1)) return !1;
          }
        } catch (e) {
          i = { error: e };
        } finally {
          try {
            s && !s.done && (r = o.return) && r.call(o);
          } finally {
            if (i) throw i.error;
          }
        }
        return t >= n;
      },
      isLeaf: function (e) {
        var t, n;
        if (e.hasChildNodes() && 'svg' !== e.tagName)
          try {
            for (
              var i = (0, tslib_1$t.__values)(e.childNodes), r = i.next();
              !r.done;
              r = i.next()
            )
              if (1 === r.value.nodeType) return !1;
          } catch (e) {
            t = { error: e };
          } finally {
            try {
              r && !r.done && (n = i.return) && n.call(i);
            } finally {
              if (t) throw t.error;
            }
          }
        return !0;
      },
      isParentOfLeaf: function (e) {
        var t, n;
        if (e.childNodes && 'svg' !== e.tagName) {
          try {
            for (
              var i = (0, tslib_1$t.__values)(e.children), r = i.next();
              !r.done;
              r = i.next()
            ) {
              var o = r.value;
              if (!DomUtils.isLeaf(o)) return !1;
            }
          } catch (e) {
            t = { error: e };
          } finally {
            try {
              r && !r.done && (n = i.return) && n.call(i);
            } finally {
              if (t) throw t.error;
            }
          }
          return !0;
        }
        return !1;
      },
      clickableInput: function (e) {
        return (
          'INPUT' === e.tagName &&
          -1 !== DomUtils.SUPPORTED_CLICK_INPUT_TYPES.indexOf(e.type)
        );
      },
      changeableInput: function (e) {
        return (
          'INPUT' === e.tagName &&
          -1 !== DomUtils.SUPPORTED_CHANGE_TYPES.indexOf(e.type)
        );
      },
      isContainerTag: function (e) {
        return (
          -1 !== DomUtils.SUPPORTED_CONTAINER_TAGS.indexOf(e.tagName) ||
          e.dataset.growingContainer
        );
      },
      onlyContainsIconChildren: function (e) {
        var t, n;
        if (0 === e.children.length) return !1;
        try {
          for (
            var i = (0, tslib_1$t.__values)(e.children), r = i.next();
            !r.done;
            r = i.next()
          ) {
            var o = r.value;
            if (
              -1 ===
                DomUtils.SUPPORTED_ICON_TAGS.indexOf(o.tagName.toLowerCase()) ||
              (e.textContent && e.textContent.length > 0)
            )
              return !1;
          }
        } catch (e) {
          t = { error: e };
        } finally {
          try {
            r && !r.done && (n = i.return) && n.call(i);
          } finally {
            if (t) throw t.error;
          }
        }
        return !0;
      },
      isDefaultContainer: function (e) {
        return -1 !== DomUtils.SUPPORTED_CONTAINER_TAGS.indexOf(e.tagName);
      },
      onlyContainsChildren: function (e, t) {
        var n, i;
        if (0 === e.children.length) return !1;
        try {
          for (
            var r = (0, tslib_1$t.__values)(Array.from(e.children)),
              o = r.next();
            !o.done;
            o = r.next()
          ) {
            var s = o.value;
            if (-1 === t.indexOf(s.tagName.toLowerCase())) return !1;
          }
        } catch (e) {
          n = { error: e };
        } finally {
          try {
            o && !o.done && (i = r.return) && i.call(r);
          } finally {
            if (n) throw n.error;
          }
        }
        return !0;
      },
      hasRealAttributes: function (e) {
        if (e.hasAttributes())
          for (var t = e.attributes, n = 0; n < t.length; n++) {
            var i = t[n].value;
            if (i && 'false' !== i) return !0;
          }
        return !1;
      },
      hasRealAttribute: function (e, t) {
        return e.hasAttribute(t) && 'false' !== e.getAttribute(t);
      },
      isTextInput: function (e) {
        return (
          (-1 !== ['INPUT', 'TEXTAREA'].indexOf(e.tagName) &&
            !DomUtils.clickableInput(e)) ||
          DomUtils.hasRealAttribute(e, 'contenteditable')
        );
      }
    };
  dom_utils.default = DomUtils;
  var node_factory = {},
    img_node = {},
    base_node = {};
  Object.defineProperty(base_node, '__esModule', { value: !0 });
  var tslib_1$s = require$$0,
    dom_utils_1$4 = (0, tslib_1$s.__importDefault)(dom_utils),
    node_factory_1$2 = node_factory,
    EXCLUDE_CLASS_RE =
      /(^| |[^ ]+\-)(clear|clearfix|active|hover|enabled|current|selected|unselected|hidden|display|focus|disabled|undisabled|open|checked|unchecked|undefined|null|ng-|growing-)[^\. ]*/g,
    VALID_ID_RE = /^([a-zA-Z\-\_]+)$/,
    VALID_CLASS_RE = /^([a-zA-Z\-\_0-9]+)$/,
    BaseNode = function e(t, n) {
      var i = this;
      void 0 === n && (n = !0),
        (this.href = function () {
          return null;
        }),
        (this.content = function () {
          return i.pseudoContainer ||
            dom_utils_1$4.default.isContainerTag(i.node) ||
            dom_utils_1$4.default.onlyContainsIconChildren(i.node)
            ? i._bestChildContent(i.node)
            : null;
        }),
        (this.xpath = function () {
          for (
            var t = [i], n = i.node.parentNode;
            n && 'BODY' !== n.tagName && 'html' !== n.tagName;

          )
            t.push(new e(n)), (n = n.parentNode);
          var r = 5;
          10 > t.length && (r = Math.min(t.length, 4));
          for (var o = '', s = 0; r > s; s++) o = t[s]._path() + o;
          return o;
        }),
        (this.index = function () {
          var e = i.node.dataset.index || i.node.dataset.growingIndex;
          if (!e) {
            var t = void 0,
              n = void 0,
              r = i.node.parentNode,
              o = 1;
            if (
              -1 === ['TR', 'LI', 'DL'].indexOf(i.node.tagName) &&
              !i.pseudoContainer
            )
              return null;
            for (t = 0; t < r.childNodes.length; t++)
              if ((n = r.childNodes[t]).tagName === i.node.tagName) {
                if (n === i.node) {
                  e = o;
                  break;
                }
                o += 1;
              }
          }
          return e;
        }),
        (this.autoDetectPseudoContainer = function () {
          var t,
            n,
            r = [],
            o = i.node.parentNode;
          if (3 > o.childNodes.length) i.pseudoContainer = !1;
          else {
            var s = i._klass();
            try {
              for (
                var a = (0, tslib_1$s.__values)(o.childNodes), u = a.next();
                !u.done;
                u = a.next()
              ) {
                var l = u.value;
                if (1 === l.nodeType) {
                  if (l.tagName !== i.node.tagName) return !1;
                  if (3 > r.length && l.hasAttribute('class') && s.length > 0) {
                    var d = new e(l, !1)._klass();
                    s.equals(d) && r.push(l);
                  }
                }
              }
            } catch (e) {
              t = { error: e };
            } finally {
              try {
                u && !u.done && (n = a.return) && n.call(a);
              } finally {
                if (t) throw t.error;
              }
            }
            3 > r.length ? (i.pseudoContainer = !1) : (i.pseudoContainer = !0);
          }
        }),
        (this._path = function () {
          var e,
            t,
            n = '/'.concat(i.node.tagName.toLowerCase()),
            r = i._id();
          r && (n += '#'.concat(r));
          var o = i._klass();
          if (o.length > 0)
            try {
              for (
                var s = (0, tslib_1$s.__values)(o), a = s.next();
                !a.done;
                a = s.next()
              ) {
                var u = a.value;
                n += '.'.concat(u);
              }
            } catch (t) {
              e = { error: t };
            } finally {
              try {
                a && !a.done && (t = s.return) && t.call(s);
              } finally {
                if (e) throw e.error;
              }
            }
          return n;
        }),
        (this._id = function () {
          return i.node.id && i.node.id.match(VALID_ID_RE) ? i.node.id : null;
        }),
        (this._klass = function () {
          if (void 0 !== i.memorizedClass) return i.memorizedClass;
          if (i.node.hasAttribute('name'))
            i.memorizedClass = [i.node.getAttribute('name')];
          else if (i.node.hasAttribute('class')) {
            var e = i.node
              .getAttribute('class')
              .replace(EXCLUDE_CLASS_RE, '')
              .trim();
            e.length > 0
              ? (i.memorizedClass = e
                  .split(/\s+/)
                  .map(function (e) {
                    return e.match(VALID_CLASS_RE)
                      ? e.replace(VALID_CLASS_RE, '$1')
                      : null;
                  })
                  .sort()
                  .reduce(function (e, t) {
                    return !t ||
                      t.match(/[a-z][A-Z][a-z][A-Z]/) ||
                      t.match(/[0-9][0-9][0-9][0-9]/)
                      ? e
                      : e.concat(t);
                  }, []))
              : (i.memorizedClass = []);
          } else i.memorizedClass = [];
          return i.memorizedClass;
        }),
        (this._bestChildContent = function (e) {
          var t,
            n,
            r,
            o = null,
            s = !1;
          try {
            for (
              var a = (0, tslib_1$s.__values)(e.childNodes), u = a.next();
              !u.done;
              u = a.next()
            ) {
              var l = u.value;
              if (
                3 === l.nodeType &&
                (r = l.textContent.replace(/[\n \t]+/g, ' ').trim()).length > 0
              )
                return r;
              if (
                1 === l.nodeType &&
                -1 === ['INPUT', 'SELECT'].indexOf(l.tagName)
              ) {
                (dom_utils_1$4.default.onlyContainsIconChildren(l) ||
                  -1 !==
                    ['i', 'em', 'svg', 'img'].indexOf(
                      l.tagName.toLowerCase()
                    )) &&
                  (s = !0);
                var d = (0, node_factory_1$2.createNode)(l);
                if (d.isPseudoContainer()) return null;
                var c = d.content();
                if (
                  (s
                    ? (c && (o = c), (s = !1))
                    : c
                    ? (r = c)
                    : l.childNodes.length > 0 && (r = i._bestChildContent(l)),
                  r)
                )
                  return r;
              }
            }
          } catch (e) {
            t = { error: e };
          } finally {
            try {
              u && !u.done && (n = a.return) && n.call(a);
            } finally {
              if (t) throw t.error;
            }
          }
          return o;
        }),
        (this.node = t),
        (this.memorizedClass = void 0),
        n && this.autoDetectPseudoContainer();
    };
  (base_node.default = BaseNode),
    Object.defineProperty(img_node, '__esModule', { value: !0 });
  var tslib_1$r = require$$0,
    base_node_1$8 = (0, tslib_1$r.__importDefault)(base_node),
    ImgNode = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        (0, tslib_1$r.__extends)(t, e),
        (t.prototype.href = function () {
          return this.node.src && -1 === this.node.src.indexOf('data:image')
            ? this.node.src
            : null;
        }),
        (t.prototype.content = function () {
          if (this.node.alt) return this.node.alt;
          var e = this.href();
          if (e) {
            var t = e.split('?')[0].split('/');
            if (t.length > 0) return t[t.length - 1];
          }
          return null;
        }),
        t
      );
    })(base_node_1$8.default);
  img_node.default = ImgNode;
  var svg_node = {};
  Object.defineProperty(svg_node, '__esModule', { value: !0 });
  var tslib_1$q = require$$0,
    base_node_1$7 = (0, tslib_1$q.__importDefault)(base_node),
    SvgNode = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        (0, tslib_1$q.__extends)(t, e),
        (t.prototype.content = function () {
          var e, t;
          try {
            for (
              var n = (0, tslib_1$q.__values)(this.node.childNodes),
                i = n.next();
              !i.done;
              i = n.next()
            ) {
              var r = i.value;
              if (
                1 === r.nodeType &&
                'use' === r.tagName &&
                r.hasAttribute('xlink:href')
              )
                return r.getAttribute('xlink:href');
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              i && !i.done && (t = n.return) && t.call(n);
            } finally {
              if (e) throw e.error;
            }
          }
        }),
        t
      );
    })(base_node_1$7.default);
  svg_node.default = SvgNode;
  var button_node = {};
  Object.defineProperty(button_node, '__esModule', { value: !0 });
  var tslib_1$p = require$$0,
    base_node_1$6 = (0, tslib_1$p.__importDefault)(base_node),
    ButtonNode = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        (0, tslib_1$p.__extends)(t, e),
        (t.prototype.content = function () {
          if (this.node.name.length > 0) return this.node.name;
          if (this.node.textContent) {
            var e = this.node.textContent.replace(/[\n \t]+/g, ' ').trim();
            return e.length > 0 && 50 > e.length ? e : e.slice(0, 50);
          }
          return this._bestChildContent(this.node);
        }),
        t
      );
    })(base_node_1$6.default);
  button_node.default = ButtonNode;
  var a_node = {};
  Object.defineProperty(a_node, '__esModule', { value: !0 });
  var tslib_1$o = require$$0,
    base_node_1$5 = (0, tslib_1$o.__importDefault)(base_node),
    dom_utils_1$3 = (0, tslib_1$o.__importDefault)(dom_utils),
    utils_1$a = (0, tslib_1$o.__importDefault)(utils),
    ANode = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        (0, tslib_1$o.__extends)(t, e),
        (t.prototype.href = function () {
          if (this.node.hasAttribute('href')) {
            var e = this.node.getAttribute('href');
            if (e && 0 !== e.indexOf('javascript'))
              return utils_1$a.default.normalizePath(e.slice(0, 320));
          }
          return null;
        }),
        (t.prototype.content = function () {
          if (
            (dom_utils_1$3.default.isLeaf(this.node) ||
              dom_utils_1$3.default.onlyContainsIconChildren(this.node)) &&
            this.node.textContent
          ) {
            var e = this.node.textContent.replace(/[\n \t]+/g, ' ').trim();
            if (e.length > 0) return 50 > e.length ? e : e.slice(0, 50);
          }
          var t = this.href();
          if (t) {
            var n = t.indexOf('?');
            return n > -1 ? t.slice(0, n) : t;
          }
          return null;
        }),
        t
      );
    })(base_node_1$5.default);
  a_node.default = ANode;
  var label_node = {};
  Object.defineProperty(label_node, '__esModule', { value: !0 });
  var tslib_1$n = require$$0,
    base_node_1$4 = (0, tslib_1$n.__importDefault)(base_node),
    LabelNode = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        (0, tslib_1$n.__extends)(t, e),
        (t.prototype.content = function () {
          if (this.pseudoContainer) return this._bestChildContent(this.node);
          if (this.node.textContent && this.node.textContent.length > 0) {
            var e = this.node.textContent.replace(/[\n \t]+/g, ' ').trim();
            return e.length > 0 && 50 > e.length ? e : e.slice(0, 50);
          }
        }),
        t
      );
    })(base_node_1$4.default);
  label_node.default = LabelNode;
  var input_node = {};
  Object.defineProperty(input_node, '__esModule', { value: !0 });
  var tslib_1$m = require$$0,
    base_node_1$3 = (0, tslib_1$m.__importDefault)(base_node),
    dom_utils_1$2 = (0, tslib_1$m.__importDefault)(dom_utils),
    node_factory_1$1 = node_factory,
    InputNode = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        (0, tslib_1$m.__extends)(t, e),
        (t.prototype.content = function () {
          var e,
            t,
            n = this.node;
          if (dom_utils_1$2.default.clickableInput(n)) return this.node.value;
          if ('password' !== n.type && n.hasAttribute('data-growing-track'))
            return n.value;
          if (dom_utils_1$2.default.changeableInput(n)) {
            var i,
              r = n.value,
              o = n.parentNode;
            if ('LABEL' === o.tagName) i = o;
            else if ('BODY' !== o.tagName)
              if ('LABEL' === (o = o.parentNode).tagName) i = o;
              else if (n.id) {
                var s = o.getElementsByTagName('label');
                try {
                  for (
                    var a = (0, tslib_1$m.__values)(s), u = a.next();
                    !u.done;
                    u = a.next()
                  ) {
                    var l = u.value;
                    if (l.for === n.id) {
                      i = l;
                      break;
                    }
                  }
                } catch (t) {
                  e = { error: t };
                } finally {
                  try {
                    u && !u.done && (t = a.return) && t.call(a);
                  } finally {
                    if (e) throw e.error;
                  }
                }
              }
            if (i) {
              var d = (0, node_factory_1$1.createNode)(i).content();
              d && d.length > 0 && (r = d + ' (' + n.checked + ')');
            }
            return r;
          }
        }),
        t
      );
    })(base_node_1$3.default);
  input_node.default = InputNode;
  var leaf_node = {};
  Object.defineProperty(leaf_node, '__esModule', { value: !0 });
  var tslib_1$l = require$$0,
    base_node_1$2 = (0, tslib_1$l.__importDefault)(base_node),
    LeafNode = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        (0, tslib_1$l.__extends)(t, e),
        (t.prototype.content = function () {
          if (this.node.textContent) {
            var e = this.node.textContent.replace(/[\n \t]+/g, ' ').trim();
            return e.length > 0 && 50 > e.length ? e : e.slice(0, 50);
          }
        }),
        t
      );
    })(base_node_1$2.default);
  leaf_node.default = LeafNode;
  var parent_of_leaf_node = {};
  Object.defineProperty(parent_of_leaf_node, '__esModule', { value: !0 });
  var tslib_1$k = require$$0,
    base_node_1$1 = (0, tslib_1$k.__importDefault)(base_node),
    ParentOfLeafNode = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        (0, tslib_1$k.__extends)(t, e),
        (t.prototype.content = function () {
          var e,
            t,
            n = '';
          try {
            for (
              var i = (0, tslib_1$k.__values)(this.node.childNodes),
                r = i.next();
              !r.done;
              r = i.next()
            ) {
              var o = r.value;
              n +=
                (3 === o.nodeType && o.textContent
                  ? o.textContent.trim()
                  : '') + ' ';
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              r && !r.done && (t = i.return) && t.call(i);
            } finally {
              if (e) throw e.error;
            }
          }
          return n.replace(/[\n \t]+/g, ' ').trim();
        }),
        t
      );
    })(base_node_1$1.default);
  (parent_of_leaf_node.default = ParentOfLeafNode),
    Object.defineProperty(node_factory, '__esModule', { value: !0 }),
    (node_factory.createNode = node_factory.NodeProxy = void 0);
  var tslib_1$j = require$$0,
    img_node_1 = (0, tslib_1$j.__importDefault)(img_node),
    svg_node_1 = (0, tslib_1$j.__importDefault)(svg_node),
    button_node_1 = (0, tslib_1$j.__importDefault)(button_node),
    a_node_1 = (0, tslib_1$j.__importDefault)(a_node),
    label_node_1 = (0, tslib_1$j.__importDefault)(label_node),
    input_node_1 = (0, tslib_1$j.__importDefault)(input_node),
    leaf_node_1 = (0, tslib_1$j.__importDefault)(leaf_node),
    parent_of_leaf_node_1 = (0, tslib_1$j.__importDefault)(parent_of_leaf_node),
    base_node_1 = (0, tslib_1$j.__importDefault)(base_node),
    dom_utils_1$1 = (0, tslib_1$j.__importDefault)(dom_utils),
    NodeProxy = (function () {
      function e(e) {
        this.node = e;
      }
      return (
        (e.prototype.href = function () {
          return this.node.href();
        }),
        (e.prototype.content = function () {
          var e = this.node.node,
            t =
              e.getAttribute('title') ||
              e.dataset.title ||
              e.dataset.growingTitle;
          return t && t.length > 0 ? t : this.node.content();
        }),
        (e.prototype.xpath = function () {
          return this.node.xpath();
        }),
        (e.prototype.index = function () {
          return this.node.index();
        }),
        (e.prototype.isPseudoContainer = function () {
          return this.node.pseudoContainer;
        }),
        e
      );
    })();
  node_factory.NodeProxy = NodeProxy;
  var createNode = function (e) {
    switch (e.tagName.toLowerCase()) {
      case 'img':
        e = new img_node_1.default(e);
        break;
      case 'svg':
        e = new svg_node_1.default(e);
        break;
      case 'button':
        e = new button_node_1.default(e);
        break;
      case 'a':
        e = new a_node_1.default(e);
        break;
      case 'label':
        e = new label_node_1.default(e);
        break;
      case 'input':
        e = new input_node_1.default(e);
        break;
      default:
        e = dom_utils_1$1.default.isLeaf(e)
          ? new leaf_node_1.default(e)
          : dom_utils_1$1.default.isParentOfLeaf(e) &&
            !dom_utils_1$1.default.onlyContainsIconChildren(e)
          ? new parent_of_leaf_node_1.default(e)
          : new base_node_1.default(e);
    }
    return new NodeProxy(e);
  };
  (node_factory.createNode = createNode),
    Object.defineProperty(dom_node, '__esModule', { value: !0 });
  var tslib_1$i = require$$0,
    dom_utils_1 = (0, tslib_1$i.__importDefault)(dom_utils),
    node_factory_1 = node_factory,
    UNSUPPORTED_CLICK_TAGS = ['textarea', 'body', 'html'],
    DomNode = (function () {
      function e(e, t, n) {
        void 0 === n && (n = !1),
          (this.node = this._realNode(e)),
          (this.actionType = t),
          (this.isDirectInteract = n),
          this.init();
      }
      return (
        (e.prototype.init = function () {
          (this.name = this.node.tagName.toLowerCase()),
            (this.isIgnore = this.node.dataset.growingIgnore),
            (this.nodeProxy = (0, node_factory_1.createNode)(this.node));
        }),
        Object.defineProperty(e.prototype, 'href', {
          get: function () {
            return this.nodeProxy.href();
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'content', {
          get: function () {
            return this.nodeProxy.content();
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'xpath', {
          get: function () {
            return this.nodeProxy.xpath();
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'index', {
          get: function () {
            return this.nodeProxy.index();
          },
          enumerable: !1,
          configurable: !0
        }),
        (e.prototype.shouldTrack = function () {
          if (this.isDirectInteract && 'click' === this.actionType) {
            if (-1 !== UNSUPPORTED_CLICK_TAGS.indexOf(this.name)) return !1;
            if (
              'INPUT' === this.node.tagName &&
              !dom_utils_1.default.clickableInput(this.node)
            )
              return !1;
            if (
              !dom_utils_1.default.isContainerTag(this.node) &&
              !dom_utils_1.default.depthInside(this.node, 5)
            )
              return !1;
          }
          return (
            !(!this.isDirectInteract || this.isIgnore) ||
            !!dom_utils_1.default.isContainerTag(this.node) ||
            !!this.nodeProxy.isPseudoContainer()
          );
        }),
        (e.prototype.parentDomNode = function () {
          return this.node.parentNode && this.node.parentNode.tagName
            ? new e(this.node.parentNode, this.actionType)
            : null;
        }),
        (e.prototype._realNode = function (e) {
          var t = e.parentNode;
          return dom_utils_1.default.onlyContainsIconChildren(t) ? t : e;
        }),
        e
      );
    })();
  dom_node.default = DomNode;
  var changeActionHandler = {},
    baseActionHandler = {};
  Object.defineProperty(baseActionHandler, '__esModule', { value: !0 });
  var BaseActionHandler = (function () {
    function e() {
      this.type = '';
    }
    return (
      (e.prototype.processable = function (e) {
        return e.type === this.type;
      }),
      (e.prototype.process = function (e) {
        throw Error(
          'process should be implemented by BaseActionHandler Children Class'
        );
      }),
      e
    );
  })();
  (baseActionHandler.default = BaseActionHandler),
    Object.defineProperty(changeActionHandler, '__esModule', { value: !0 });
  var tslib_1$h = require$$0,
    base_action_handler_1$2 = (0, tslib_1$h.__importDefault)(baseActionHandler),
    ChangeActionHandler = (function (e) {
      function t() {
        var t = e.call(this) || this;
        return (t.type = 'change'), t;
      }
      return (
        (0, tslib_1$h.__extends)(t, e),
        (t.prototype.process = function (e) {
          var t = this;
          return {
            eventType: 'VIEW_CHANGE',
            _elements: e.map(function (e) {
              return t._process(e);
            })
          };
        }),
        (t.prototype._process = function (e) {
          var t = {};
          t.xpath = e.xpath;
          var n = e.content;
          return n && n.length > 0 && (t.textValue = n), t;
        }),
        t
      );
    })(base_action_handler_1$2.default);
  changeActionHandler.default = ChangeActionHandler;
  var clickActionHandler = {};
  Object.defineProperty(clickActionHandler, '__esModule', { value: !0 });
  var tslib_1$g = require$$0,
    base_action_handler_1$1 = (0, tslib_1$g.__importDefault)(baseActionHandler),
    ClickActionHandler = (function (e) {
      function t() {
        var t = e.call(this) || this;
        return (t.type = 'click'), t;
      }
      return (
        (0, tslib_1$g.__extends)(t, e),
        (t.prototype.process = function (e, t) {
          var n,
            i,
            r = null,
            o = [];
          try {
            for (
              var s = (0, tslib_1$g.__values)(e), a = s.next();
              !a.done;
              a = s.next()
            ) {
              var u = a.value,
                l = this._process(u);
              r && (l.index = r),
                null == r && null != l.index && (r = l.index),
                o.push(l);
            }
          } catch (e) {
            n = { error: e };
          } finally {
            try {
              a && !a.done && (i = s.return) && i.call(s);
            } finally {
              if (n) throw n.error;
            }
          }
          return { eventType: 'VIEW_CLICK', _elements: o };
        }),
        (t.prototype._process = function (e) {
          var t = {};
          t.xpath = e.xpath;
          var n = e.index;
          n && (t.index = +n);
          var i = e.href;
          i && i.length > 0 && (t.hyperlink = i);
          var r = e.content;
          return r && r.length > 0 && (t.textValue = r), t;
        }),
        t
      );
    })(base_action_handler_1$1.default);
  clickActionHandler.default = ClickActionHandler;
  var submitActionHandler = {};
  Object.defineProperty(submitActionHandler, '__esModule', { value: !0 });
  var tslib_1$f = require$$0,
    base_action_handler_1 = (0, tslib_1$f.__importDefault)(baseActionHandler),
    dom_node_1$1 = (0, tslib_1$f.__importDefault)(dom_node),
    SubmitActionHandler = (function (e) {
      function t() {
        var t = e.call(this) || this;
        return (t.type = 'submit'), t;
      }
      return (
        (0, tslib_1$f.__extends)(t, e),
        (t.prototype.process = function (e) {
          var t = this;
          return {
            eventType: 'FORM_SUBMIT',
            _elements: e.map(function (e) {
              return t._process(e);
            })
          };
        }),
        (t.prototype._process = function (e) {
          var t,
            n,
            i = {};
          i.xpath = e.xpath;
          var r = e.node.getElementsByTagName('input');
          try {
            for (
              var o = (0, tslib_1$f.__values)(r), s = o.next();
              !s.done;
              s = o.next()
            ) {
              var a = s.value;
              if (
                'search' === a.type ||
                ('text' === a.type &&
                  ('q' === a.id ||
                    -1 !== a.id.indexOf('search') ||
                    'q' === a.name ||
                    -1 !== a.name.indexOf('search')))
              ) {
                var u = new dom_node_1$1.default(a);
                u.isIgnore || ((i.xpath = u.xpath), (i.textValue = u.content));
              }
            }
          } catch (e) {
            t = { error: e };
          } finally {
            try {
              s && !s.done && (n = o.return) && n.call(o);
            } finally {
              if (t) throw t.error;
            }
          }
          return i;
        }),
        t
      );
    })(base_action_handler_1.default);
  (submitActionHandler.default = SubmitActionHandler),
    Object.defineProperty(actionHandlers, '__esModule', { value: !0 });
  var tslib_1$e = require$$0,
    dom_node_1 = (0, tslib_1$e.__importDefault)(dom_node),
    change_action_handler_1 = (0, tslib_1$e.__importDefault)(
      changeActionHandler
    ),
    click_action_handler_1 = (0, tslib_1$e.__importDefault)(clickActionHandler),
    submit_action_handler_1 = (0, tslib_1$e.__importDefault)(
      submitActionHandler
    ),
    ActionHandlers = (function () {
      function e() {
        this.handlers = [
          new click_action_handler_1.default(),
          new change_action_handler_1.default(),
          new submit_action_handler_1.default()
        ];
      }
      return (
        (e.prototype.process = function (e, t) {
          var n, i;
          try {
            for (
              var r = (0, tslib_1$e.__values)(this.handlers), o = r.next();
              !o.done;
              o = r.next()
            ) {
              var s = o.value;
              if (s.processable(t)) return s.process(e);
            }
          } catch (e) {
            n = { error: e };
          } finally {
            try {
              o && !o.done && (i = r.return) && i.call(r);
            } finally {
              if (n) throw n.error;
            }
          }
        }),
        (e.prototype.trackingNodes = function (e, t) {
          var n = [],
            i = new dom_node_1.default(e, t, !0);
          if (this.isvConsoleNode(i.node)) return [];
          if (this.isGioKitNode(i.node)) return [];
          if (!i.shouldTrack()) return [];
          for (
            n.push(i), i = i.parentDomNode();
            i && 'body' !== i.name && 'html' !== i.name;

          ) {
            if (i.isIgnore) return [];
            i.shouldTrack() && n.unshift(i), (i = i.parentDomNode());
          }
          return n;
        }),
        (e.prototype.isvConsoleNode = function (e) {
          var t = [];
          return (
            this.getParentNodes(e, t),
            t.some(function (e) {
              return '__vconsole' === e.id && 'DIV' === e.tagName;
            })
          );
        }),
        (e.prototype.isGioKitNode = function (e) {
          var t = [];
          return (
            this.getParentNodes(e, t),
            t.some(function (e) {
              return '__giokit' === e.id && 'DIV' === e.tagName;
            })
          );
        }),
        (e.prototype.getParentNodes = function (e, t) {
          t.push(e), e.parentNode && this.getParentNodes(e.parentNode, t);
        }),
        e
      );
    })();
  (actionHandlers.default = ActionHandlers),
    Object.defineProperty(observer, '__esModule', { value: !0 });
  var tslib_1$d = require$$0,
    action_handlers_1 = (0, tslib_1$d.__importDefault)(actionHandlers),
    utils_1$9 = utils$1,
    constant_1$1 = constant,
    utils_2$2 = utils,
    Observer$1 = (function () {
      function e(e) {
        (this.growingio = e),
          (this.user = e.user),
          (this.actionHandlers = new action_handlers_1.default()),
          (this.vstSended = !1);
      }
      return (
        (e.prototype.getVisitorId = function () {
          return this.user.getUid();
        }),
        (e.prototype.getUserId = function () {
          return this.user.getUserId();
        }),
        (e.prototype.track = function (e, t, n) {
          throw Error('this a interface function');
        }),
        (e.prototype.setUserAttributes = function (e) {
          throw Error('this a interface function');
        }),
        (e.prototype.sendVisitEvent = function (e) {
          throw Error('this a interface function');
        }),
        (e.prototype.sendPage = function (e) {
          throw Error('this a interface function');
        }),
        (e.prototype.actionListener = function (e) {
          throw Error('this a interface function');
        }),
        (e.prototype._sendEvent = function (e) {
          var t = this;
          if (
            this.growingio.vdsConfig.dataCollect &&
            (this.growingio.vdsConfig.autotrack ||
              !constant_1$1.AUTO_TRACK.includes(e.eventType))
          ) {
            var n = this.growingio.vdsConfig,
              i = {
                deviceId: this.user.getUid(),
                sessionId: this.user.getSession(),
                dataSourceId: this.growingio.vdsConfig.dataSourceId,
                timestamp: e.timestamp || Date.now(),
                domain: (0, utils_2$2.getDomain)(n),
                path: (0, utils_1$9.path)(),
                platform: n.platform,
                screenHeight: window.screen.height,
                screenWidth: window.screen.width,
                sdkVersion: n.sdkVer
              },
              r =
                (0, utils_2$2.getDataByPath)(window, 'navigator.language') ||
                (0, utils_2$2.getDataByPath)(
                  window,
                  'navigator.browserLanguage'
                ) ||
                '';
            r && (i.language = r.toLowerCase());
            var o =
              this.growingio.vdsConfig.appVer ||
              this.growingio.vdsConfig.version;
            o && (i.appVersion = o),
              (i.userKey = this.user.getUserKey()),
              (i.userId = this.user.getUserId()),
              (i.gioId = this.user.getGioId());
            var s = (0, utils_1$9.query)();
            s && (i.query = s),
              (i.title = (document.title || '').slice(0, 255)),
              (this.prevUrl || (this.prevUrl = document.referrer)) &&
                (i.referralPage = this.prevUrl),
              ['VIEW_CLICK', 'VIEW_CHANGE', 'FORM_SUBMIT'].includes(
                e.eventType
              ) && (e.pageShowTimestamp = this.lastSendPage.timestamp),
              Object.assign(e, i),
              this._flatEvent(e).forEach(function (e) {
                Object.keys(e).forEach(function (t) {
                  [null, void 0, ''].includes(e[t]) && delete e[t];
                }),
                  t.growingio.sender.send(t.user.setSequenceId(e));
              });
          }
        }),
        (e.prototype._flatEvent = function (e) {
          var t = e.eventType + '';
          if (-1 === ['VIEW_CLICK', 'VIEW_CHANGE', 'FORM_SUBMIT'].indexOf(t))
            return [e];
          var n = e._elements;
          return n
            ? (delete e._elements,
              n.map(function (t) {
                return Object.assign({}, e, t);
              }))
            : void 0;
        }),
        e
      );
    })();
  observer.default = Observer$1;
  var guid = {};
  function default_1() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (e) {
        var t = (16 * Math.random()) | 0;
        return ('x' == e ? t : (3 & t) | 8).toString(16);
      }
    );
  }
  Object.defineProperty(guid, '__esModule', { value: !0 }),
    (guid.default = default_1),
    Object.defineProperty(webObserver, '__esModule', { value: !0 });
  var tslib_1$c = require$$0,
    embed_1$3 = embed,
    observer_1 = (0, tslib_1$c.__importDefault)(observer),
    guid_1$1 = (0, tslib_1$c.__importDefault)(guid),
    utils_1$8 = utils,
    utils_2$1 = utils$1,
    UNSUPPORTED_TAGS = {
      tspan: 1,
      text: 1,
      g: 1,
      rect: 1,
      path: 1,
      defs: 1,
      clipPath: 1,
      desc: 1,
      title: 1,
      math: 1,
      use: 1
    },
    Observer = (function (e) {
      function t(t) {
        var n = e.call(this, t) || this;
        return (n.growingio = t), (n.trackTimers = {}), n;
      }
      return (
        (0, tslib_1$c.__extends)(t, e),
        (t.prototype.setUserAttributes = function (e) {
          if ((0, utils_1$8.validVar)(e)) {
            var t = {};
            Object.keys(e).forEach(function (n) {
              ['string', 'number'].includes(typeof e[n]) && (t[n] = e[n]),
                Array.isArray(e[n]) && (t[n] = e[n].join('||'));
            });
            var n = {
              eventType: 'LOGIN_USER_ATTRIBUTES',
              attributes: (0, utils_1$8.stringifyVar)(t)
            };
            this._sendEvent(n);
          }
        }),
        (t.prototype.track = function (e, t, n) {
          if ('string' == typeof e && null != e && 0 !== e.length) {
            var i = {
              eventType: 'CUSTOM',
              pageShowTimestamp: this.lastSendPage.timestamp,
              eventName: e
            };
            if (null !== t && 'object' == typeof t) {
              var r = {};
              Object.keys(t).forEach(function (e) {
                ['string', 'number'].includes(typeof t[e]) && (r[e] = t[e]),
                  Array.isArray(t[e]) && (r[e] = t[e].join('||'));
              }),
                (i.attributes = r);
            }
            var o = (0, utils_2$1.getItem)(n);
            o && (i.resourceItem = o), this._sendEvent(i);
          }
        }),
        (t.prototype.sendPage = function (e, t) {
          if ((void 0 === t && (t = !1), e && this.lastSendPage))
            return (
              (this.lastSendPage = (0, tslib_1$c.__assign)(
                (0, tslib_1$c.__assign)({}, this.lastSendPage),
                {
                  timestamp:
                    'setSession' === e
                      ? +Date.now()
                      : this.lastSendPage.timestamp || +Date.now()
                }
              )),
              this._sendEvent(this.lastSendPage)
            );
          if (t || !this.lastUrl || this.lastUrl != window.location.href) {
            var n = {
              eventType: 'PAGE',
              protocolType: window.location.protocol.substring(
                0,
                window.location.protocol.length - 1
              )
            };
            this.growingio.vdsConfig.hashtag && (this.prevUrl = this.lastUrl),
              this._sendEvent(n),
              (this.lastUrl = window.location.href),
              (this.lastSendPage = n);
          }
        }),
        (t.prototype.sendVisitEvent = function (e) {
          void 0 === e && (e = !1),
            (!e && this.user.sessionValid()) ||
              embed_1$3.useInherit ||
              this._sendEvent({ eventType: 'VISIT' });
        }),
        (t.prototype.actionListener = function (e) {
          if (e && e.isTrusted) {
            for (
              var t = e.target;
              t && 1 == UNSUPPORTED_TAGS[t.tagName] && t.parentNode;

            )
              t = t.parentNode;
            var n = this.actionHandlers.trackingNodes(t, e.type);
            if (0 !== n.length) {
              var i = Object.assign(
                { pageShowTimestamp: this.lastSendPage.timestamp },
                this.actionHandlers.process(n, e)
              );
              this._sendEvent(i);
            }
          }
        }),
        (t.prototype.trackTimerStart = function (e, t) {
          if (this.growingio.vdsConfig.dataCollect)
            if (e && e.match(/^[a-zA-Z_][0-9a-zA-Z_]{0,50}$/)) {
              var n = (0, guid_1$1.default)();
              (0, utils_1$8.isFunction)(t)
                ? ((this.trackTimers[n] = {
                    eventName: e,
                    leng: 0,
                    start: +Date.now()
                  }),
                  t(n))
                : console.error('回调方法不合法，返回timerId失败!');
            } else
              console.error(
                '事件名格式不正确，只能包含数字、字母和下划线，且不能以数字开头!'
              );
        }),
        (t.prototype.trackTimerPause = function (e) {
          if (e && this.trackTimers[e]) {
            var t = this.trackTimers[e];
            t.start && (t.leng = t.leng + (+Date.now() - t.start)),
              (t.start = 0);
          }
        }),
        (t.prototype.trackTimerResume = function (e) {
          if (e && this.trackTimers[e]) {
            var t = this.trackTimers[e];
            0 === t.start && (t.start = +Date.now());
          }
        }),
        (t.prototype.trackTimerEnd = function (e, t) {
          if (this.growingio.vdsConfig.dataCollect)
            if (e && this.trackTimers[e]) {
              var n = this.trackTimers[e];
              if (0 !== n.start) {
                var i = +Date.now() - n.start;
                n.leng = i > 0 ? n.leng + i : 0;
              }
              this.track(
                n.eventName,
                (0, tslib_1$c.__assign)((0, tslib_1$c.__assign)({}, t), {
                  eventDuration: '' + (n.leng > 864e5 ? 0 : n.leng / 1e3)
                })
              ),
                this.removeTimer(e);
            } else console.error('未查找到对应的计时器，请检查!');
        }),
        (t.prototype.removeTimer = function (e) {
          e && this.trackTimers[e] && delete this.trackTimers[e];
        }),
        (t.prototype.clearTrackTimer = function () {
          this.trackTimers = {};
        }),
        (t.prototype.getAllTrackerTimer = function () {
          return this.trackTimers;
        }),
        t
      );
    })(observer_1.default);
  webObserver.default = Observer;
  var webSender = {},
    sender = {},
    plugins$1 = {};
  Object.defineProperty(plugins$1, '__esModule', { value: !0 }),
    (plugins$1.dispatchEvent2Plugin = void 0);
  var tslib_1$b = require$$0,
    utils_1$7 = utils,
    registeredPlugins = [],
    NONSUPPORT_TOUCH = ['VIEW_CLICK', 'VIEW_CHANGE', 'FORM_SUBMIT'],
    registerPlugin = function (e, t) {
      var n,
        i = [],
        r = !1,
        o = +new Date(),
        s = !1,
        a = document.createElement('script'),
        u = document.getElementsByTagName('script');
      (a.id = t.id), (a.async = t.async), (a.src = t.src);
      var l = u[u.length - 1];
      l && l.parentNode.insertBefore(a, l),
        (a.$onload = function (i) {
          (r = !0), (e.accountId = e.appId), (n = i(e, t)), d(null);
        });
      var d = function (e) {
        if (!s)
          if (o + t.timeout > +new Date()) s = !0;
          else if (r)
            if (0 == i.length && null !== e) n([e]);
            else {
              null !== e && i.push(e);
              try {
                n(i);
              } catch (e) {}
              i = [];
            }
          else i.push(e);
      };
      return (
        registeredPlugins.push(d),
        function () {
          var e = (0, utils_1$7.indexOf)(registeredPlugins, d);
          registeredPlugins.splice(e, 1);
        }
      );
    };
  function getOldType(e) {
    switch (e) {
      case 'LOGIN_USER_ATTRIBUTES':
        return '';
      case 'CUSTOM':
        return 'CUSTOM_EVENT';
      default:
        return e;
    }
  }
  function dispatchEvent2Plugin(e) {
    NONSUPPORT_TOUCH.includes(e.eventType) ||
      setTimeout(function () {
        for (var t = 0; t < registeredPlugins.length; )
          registeredPlugins[t](
            (0, tslib_1$b.__assign)(
              {
                type: getOldType(e.eventType),
                anonymousId: e.deviceId,
                eventKey: e.eventName
              },
              e
            )
          ),
            (t += 1);
      }, 0);
  }
  (plugins$1.dispatchEvent2Plugin = dispatchEvent2Plugin),
    (plugins$1.default = registerPlugin),
    Object.defineProperty(sender, '__esModule', { value: !0 });
  var tslib_1$a = require$$0,
    plugins_1$2 = plugins$1,
    utils_1$6 = utils,
    Sender$1 = (function () {
      function e(e) {
        (this.growingio = e),
          (this.messageQueue = []),
          (this.uploadingQueue = []),
          (this.uploadTimer = null),
          (this.user = e.user),
          (this.projectId = e.vdsConfig.projectId),
          (this.appId = e.vdsConfig.appId),
          (this.hybrid = e.hybrid),
          (this.config = e.vdsConfig);
      }
      return (
        (e.prototype.filterFields = function (e) {
          var t = this.config.ignoreFields;
          return t
            ? utils_1$6.omit.apply(
                void 0,
                (0, tslib_1$a.__spreadArray)([e], (0, tslib_1$a.__read)(t), !1)
              )
            : e;
        }),
        (e.prototype.send = function (e) {
          (e = this.filterFields(e)), this.hybrid.dispatchEvent(e);
          var t = this.growingio.vdsConfig.host,
            n = this.growingio.vdsConfig.scheme,
            i = ''
              .concat(n)
              .concat(t, '/v3/projects/')
              .concat(this.projectId, '/collect');
          this.sendRemote(e, i),
            (0, plugins_1$2.dispatchEvent2Plugin)(e),
            this.growingio.vdsConfig.debug &&
              console.log(JSON.stringify(e, 0, 2));
        }),
        (e.prototype.sendRemote = function (e, t) {
          throw Error('this a interface function');
        }),
        e
      );
    })();
  sender.default = Sender$1;
  var LZString = (function () {
      var e = String.fromCharCode,
        t = {
          compressToUTF16: function (n) {
            return null == n
              ? ''
              : t._compress(n, 15, function (t) {
                  return e(t + 32);
                }) + ' ';
          },
          compressToUint8Array: function (e) {
            for (
              var n = t.compress(e),
                i = new Uint8Array(2 * n.length),
                r = 0,
                o = n.length;
              o > r;
              r++
            ) {
              var s = n.charCodeAt(r);
              (i[2 * r] = s >>> 8), (i[2 * r + 1] = s % 256);
            }
            return i;
          },
          compressToEncodedURIComponent: function (e) {
            return null == e
              ? ''
              : t._compress(e, 6, function (e) {
                  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$'.charAt(
                    e
                  );
                });
          },
          compress: function (n) {
            return t._compress(n, 16, function (t) {
              return e(t);
            });
          },
          _compress: function (e, t, n) {
            if (null == e) return '';
            var i,
              r,
              o,
              s = {},
              a = {},
              u = '',
              l = '',
              d = '',
              c = 2,
              f = 3,
              h = 2,
              _ = [],
              p = 0,
              g = 0;
            for (o = 0; o < e.length; o += 1)
              if (
                ((u = e.charAt(o)),
                {}.hasOwnProperty.call(s, u) || ((s[u] = f++), (a[u] = !0)),
                (l = d + u),
                {}.hasOwnProperty.call(s, l))
              )
                d = l;
              else {
                if ({}.hasOwnProperty.call(a, d)) {
                  if (256 > d.charCodeAt(0)) {
                    for (i = 0; h > i; i++)
                      (p <<= 1),
                        g == t - 1 ? ((g = 0), _.push(n(p)), (p = 0)) : g++;
                    for (r = d.charCodeAt(0), i = 0; 8 > i; i++)
                      (p = (p << 1) | (1 & r)),
                        g == t - 1 ? ((g = 0), _.push(n(p)), (p = 0)) : g++,
                        (r >>= 1);
                  } else {
                    for (r = 1, i = 0; h > i; i++)
                      (p = (p << 1) | r),
                        g == t - 1 ? ((g = 0), _.push(n(p)), (p = 0)) : g++,
                        (r = 0);
                    for (r = d.charCodeAt(0), i = 0; 16 > i; i++)
                      (p = (p << 1) | (1 & r)),
                        g == t - 1 ? ((g = 0), _.push(n(p)), (p = 0)) : g++,
                        (r >>= 1);
                  }
                  0 == --c && ((c = Math.pow(2, h)), h++), delete a[d];
                } else
                  for (r = s[d], i = 0; h > i; i++)
                    (p = (p << 1) | (1 & r)),
                      g == t - 1 ? ((g = 0), _.push(n(p)), (p = 0)) : g++,
                      (r >>= 1);
                0 == --c && ((c = Math.pow(2, h)), h++),
                  (s[l] = f++),
                  (d = u + '');
              }
            if ('' !== d) {
              if ({}.hasOwnProperty.call(a, d)) {
                if (256 > d.charCodeAt(0)) {
                  for (i = 0; h > i; i++)
                    (p <<= 1),
                      g == t - 1 ? ((g = 0), _.push(n(p)), (p = 0)) : g++;
                  for (r = d.charCodeAt(0), i = 0; 8 > i; i++)
                    (p = (p << 1) | (1 & r)),
                      g == t - 1 ? ((g = 0), _.push(n(p)), (p = 0)) : g++,
                      (r >>= 1);
                } else {
                  for (r = 1, i = 0; h > i; i++)
                    (p = (p << 1) | r),
                      g == t - 1 ? ((g = 0), _.push(n(p)), (p = 0)) : g++,
                      (r = 0);
                  for (r = d.charCodeAt(0), i = 0; 16 > i; i++)
                    (p = (p << 1) | (1 & r)),
                      g == t - 1 ? ((g = 0), _.push(n(p)), (p = 0)) : g++,
                      (r >>= 1);
                }
                0 == --c && ((c = Math.pow(2, h)), h++), delete a[d];
              } else
                for (r = s[d], i = 0; h > i; i++)
                  (p = (p << 1) | (1 & r)),
                    g == t - 1 ? ((g = 0), _.push(n(p)), (p = 0)) : g++,
                    (r >>= 1);
              0 == --c && ((c = Math.pow(2, h)), h++);
            }
            for (r = 2, i = 0; h > i; i++)
              (p = (p << 1) | (1 & r)),
                g == t - 1 ? ((g = 0), _.push(n(p)), (p = 0)) : g++,
                (r >>= 1);
            for (;;) {
              if (((p <<= 1), g == t - 1)) {
                _.push(n(p));
                break;
              }
              g++;
            }
            return _.join('');
          }
        };
      return t;
    })(),
    lzString = LZString;
  Object.defineProperty(webSender, '__esModule', { value: !0 });
  var tslib_1$9 = require$$0,
    embed_1$2 = embed,
    sender_1 = (0, tslib_1$9.__importDefault)(sender),
    lz_string_1 = (0, tslib_1$9.__importDefault)(lzString),
    utils_1$5 = utils,
    utils_2 = utils$1,
    ie = (0, utils_2.detectIE)() || NaN,
    Sender = (function (e) {
      function t(t) {
        var n = e.call(this, t) || this;
        return (
          (n.growingio = t),
          (n.imgSendClear = function (e, t) {
            (e.onload = null), (e.onerror = null), (e.onabort = null);
          }),
          (n.retryIds = {}),
          n
        );
      }
      return (
        (0, tslib_1$9.__extends)(t, e),
        (t.prototype.sendRemote = function (e, t) {
          if (!this.hybrid.allowWebTrack()) {
            var n = this.user.getSession();
            return this.user.updateSessionIdSendStatus(n, !0);
          }
          embed_1$2.useInherit &&
            embed_1$2.GIO_EXTRA_KEYS.forEach(function (t) {
              if (embed_1$2.gioQuery[t]) {
                var n = t.replace('gio', '');
                e[n] = embed_1$2.gioQuery[t];
              }
            }),
            (window.grWaitTime = +Date.now() + 300);
          var i,
            r,
            o = !1,
            s = this.growingio.vdsConfig.compress;
          window.navigator &&
            window.navigator.sendBeacon &&
            (o = !utils_1$5.isOnIos || (0, utils_1$5.iosMainVersion)() >= 13),
            s
              ? ((i = '1'),
                (r = lz_string_1.default.compressToUint8Array(
                  JSON.stringify([e])
                )))
              : ((i = '0'), (r = JSON.stringify([e]))),
            this._sendRemote(e, r, t, i, o);
        }),
        (t.prototype._sendRemote = function (e, t, n, i, r) {
          var o = this,
            s = this.user.getSession(),
            a = this.growingio.vdsConfig.compress;
          if (
            this.retryIds[e.globalSequenceId] &&
            this.retryIds[e.globalSequenceId] >= 3
          )
            return !1;
          if (r)
            navigator.sendBeacon(
              n + '?stm=' + +Date.now() + '&compress=' + i,
              t
            )
              ? this.user.updateSessionIdSendStatus(s, !0)
              : (this.retryIds[e.globalSequenceId] ||
                  (this.retryIds[e.globalSequenceId] = 0),
                (this.retryIds[e.globalSequenceId] += 1),
                this._sendRemote(e, t, n, i, !1));
          else if (window.XMLHttpRequest && 7 !== ie) {
            var u = window.event && window.event.type,
              l = 'unload' === u || 'beforeunload' === u || 'pagehide' === u,
              d = new XMLHttpRequest();
            'withCredentials' in d
              ? (d.open(
                  'POST',
                  n + '?stm=' + +Date.now() + '&compress=' + i,
                  !l
                ),
                (d.onreadystatechange = function () {
                  4 === d.readyState &&
                    ((window.grWaitTime = +Date.now() + 10),
                    s &&
                      s.length > 0 &&
                      204 === d.status &&
                      o.user.updateSessionIdSendStatus(s, !0));
                }),
                d.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8'),
                d.send(t))
              : void 0 !== typeof window.XDomainRequest &&
                ((d = new window.XDomainRequest()),
                'http:' === document.location.protocol &&
                  (n = n.replace('https://', 'http://')),
                d.open(
                  'POST',
                  n + '?stm=' + +Date.now() + '&compress=' + i,
                  !l
                ),
                (d.onload = function () {
                  s &&
                    s.length > 0 &&
                    204 === d.status &&
                    o.user.updateSessionIdSendStatus(s, !0);
                }),
                d.send(t));
          } else {
            a &&
              (t = lz_string_1.default.compressToEncodedURIComponent(
                JSON.stringify([e])
              )),
              'http:' === document.location.protocol &&
                (n = n.replace('https://', 'http://'));
            var c = n + '?data=' + t + '&stm=' + +Date.now();
            a && (c += '&compress=11'), c.length > 2036 || this.imgSend(c, s);
          }
        }),
        (t.prototype.imgSend = function (e, t) {
          var n = this,
            i = document.createElement('img');
          (i.width = 1),
            (i.height = 1),
            (i.onload = function () {
              if ((n.imgSendClear(i, t), t && '' !== t))
                return n.user.updateSessionIdSendStatus(!0, t);
            }),
            (i.onerror = i.onabort =
              function () {
                return n.imgSendClear(i, t);
              }),
            (i.src = e);
        }),
        t
      );
    })(sender_1.default);
  webSender.default = Sender;
  var webUser = {},
    user = {},
    sequenceId = {};
  Object.defineProperty(sequenceId, '__esModule', { value: !0 });
  var tslib_1$8 = require$$0,
    cookie_1$1 = (0, tslib_1$8.__importDefault)(cookie),
    utils_1$4 = utils;
  function tryParse(e) {
    if (e)
      try {
        return JSON.parse(e);
      } catch (e) {}
    return null;
  }
  var SequenceId = (function () {
    function e(e) {
      (this.sequenceIdKey = ''.concat(e, '_gdp_sequence_ids')),
        (this.year10expires = 31536e4);
    }
    return (
      Object.defineProperty(e.prototype, 'domains', {
        get: function () {
          return (
            this._domains || (this._domains = (0, utils_1$4.getTopDomains)()),
            this._domains
          );
        },
        enumerable: !1,
        configurable: !0
      }),
      (e.prototype._getSequenceIdMap = function () {
        return (
          tryParse(cookie_1$1.default.getItem(this.sequenceIdKey)) || {
            globalKey: 1
          }
        );
      }),
      (e.prototype._storeSequenceIdMap = function (e) {
        return (
          void 0 === e && (e = { globalKey: 1 }),
          cookie_1$1.default.setItem(
            this.sequenceIdKey,
            JSON.stringify(e),
            this.year10expires,
            '/',
            this.domains
          ),
          this
        );
      }),
      (e.prototype._getAndAddFromMap = function (e) {
        void 0 === e && (e = ['globalKey']);
        var t = this._getSequenceIdMap(),
          n = e.map(function (e) {
            var n = t[e] || 1;
            return (t[e] = n + 1), n;
          });
        return this._storeSequenceIdMap(t), n;
      }),
      (e.prototype.refresh = function () {
        this._storeSequenceIdMap();
      }),
      (e.prototype.setSequenceId = function (e) {
        var t = e.eventType;
        if (t) {
          var n = (0, tslib_1$8.__read)(
              this._getAndAddFromMap(['globalKey', t]),
              2
            ),
            i = n[0],
            r = n[1];
          Object.assign(e, { globalSequenceId: i, eventSequenceId: r });
        }
        return e;
      }),
      e
    );
  })();
  (sequenceId.default = SequenceId),
    Object.defineProperty(user, '__esModule', { value: !0 });
  var tslib_1$7 = require$$0,
    sequence_id_1 = (0, tslib_1$7.__importDefault)(sequenceId),
    User$1 = (function () {
      function e(e) {
        (this.growingio = e),
          (this._uid = ''),
          (this._userId = ''),
          (this._userKey = void 0),
          (this._gioId = ''),
          (this._session = ''),
          (this._vstSendSuccess = !1),
          (this.lastSessionUpdated = 0);
        var t = e.vdsConfig.projectId;
        (this.uidCookieKey = 'gdp_user_id'),
          (this.userIdCookieKey = ''.concat(t, '_gdp_cs1')),
          (this.userKeyCookieKey = ''.concat(t, '_gdp_user_key')),
          (this.gioIdCookieKey = ''.concat(t, '_gdp_gio_id')),
          (this.sessionCookieKey = ''.concat(t, '_gdp_session_id')),
          (this.vstSendSuccessCookieKeyPrefix = ''.concat(
            t,
            '_gdp_session_id'
          )),
          (this.sequence = new sequence_id_1.default(t));
      }
      return (
        (e.prototype.setUid = function (e) {
          throw Error('this a interface function');
        }),
        (e.prototype.getUid = function () {
          throw Error('this a interface function');
        }),
        (e.prototype.setUserId = function (e, t, n) {
          throw Error('this a interface function');
        }),
        (e.prototype.getUserId = function () {
          throw Error('this a interface function');
        }),
        (e.prototype.getUserKey = function () {
          throw Error('this a interface function');
        }),
        (e.prototype.setUserKey = function (e) {
          throw Error('this a interface function');
        }),
        (e.prototype.setGioId = function (e) {
          throw Error('this a interface function');
        }),
        (e.prototype.getGioId = function () {
          throw Error('this a interface function');
        }),
        (e.prototype.hasSession = function () {
          throw Error('this a interface function');
        }),
        (e.prototype.sessionValid = function () {
          throw Error('this a interface function');
        }),
        (e.prototype.setSession = function (e) {
          throw Error('this a interface function');
        }),
        (e.prototype.getSession = function () {
          throw Error('this a interface function');
        }),
        (e.prototype._cookieDomain = function () {
          throw Error('this a interface function');
        }),
        (e.prototype.updateSessionIdSendStatus = function (e, t) {
          throw Error('this a interface function');
        }),
        (e.prototype.updateSession = function (e) {
          throw Error('this a interface function');
        }),
        (e.prototype.setSequenceId = function (e) {
          return this.sequence.setSequenceId(e);
        }),
        e
      );
    })();
  (user.default = User$1),
    Object.defineProperty(webUser, '__esModule', { value: !0 });
  var tslib_1$6 = require$$0,
    embed_1$1 = embed,
    user_1 = (0, tslib_1$6.__importDefault)(user),
    cookie_1 = (0, tslib_1$6.__importDefault)(cookie),
    guid_1 = (0, tslib_1$6.__importDefault)(guid),
    duration10year = 31536e4,
    duration30min = 1800,
    special = { A: 1, a: 1, Z: 1, z: 1, '@': 1 },
    User = (function (e) {
      function t(t) {
        var n = e.call(this, t) || this;
        return (
          (n.growingio = t),
          (n.mixCookieValue = function (e) {
            if (null == e) return e;
            try {
              return 'gioenc-'.concat(n.bitEncrypt(e));
            } catch (t) {
              return e;
            }
          }),
          (n.parseCookieValue = function (e) {
            if (null == e) return e;
            try {
              return 0 === e.indexOf('gioenc-')
                ? n.bitEncrypt(e.replace('gioenc-', ''))
                : e;
            } catch (t) {
              return e;
            }
          }),
          (n.bitEncrypt = function (e) {
            return (e = e || '')
              .split('')
              .map(function (e) {
                return special[e] ? e : n.xor(e);
              })
              .join('');
          }),
          (n.xor = function (e) {
            if (/[0-9]/.test(e)) return 1 ^ +e;
            var t = e.charCodeAt(0);
            return String.fromCharCode(1 ^ t);
          }),
          (n._uid = n.parseCookieValue(
            cookie_1.default.getItem(n.uidCookieKey)
          )),
          (n._userId = n.parseCookieValue(
            cookie_1.default.getItem(n.userIdCookieKey)
          )),
          n.growingio.vdsConfig.enableIdMapping &&
            (n._userKey = n.parseCookieValue(
              cookie_1.default.getItem(n.userKeyCookieKey)
            )),
          (n._gioId = n.parseCookieValue(
            cookie_1.default.getItem(n.gioIdCookieKey)
          )),
          (n._session = cookie_1.default.getItem(n.sessionCookieKey)),
          (n._vstSendSuccess =
            cookie_1.default.getItem(
              ''.concat(n.vstSendSuccessCookieKeyPrefix, '_').concat(n._session)
            ) +
              '' ==
            'true'),
          (n.lastSessionUpdated = Date.now()),
          embed_1$1.useInherit && (n._gioId = embed_1$1.gioQuery.gioid),
          n
        );
      }
      return (
        (0, tslib_1$6.__extends)(t, e),
        (t.prototype.setUid = function (e) {
          (this._uid = e),
            cookie_1.default.setItem(
              this.uidCookieKey,
              this.mixCookieValue(e),
              duration10year,
              '/',
              this._cookieDomain()
            );
        }),
        (t.prototype.getUid = function () {
          return (
            (this._uid && this._uid.length > 0) ||
              this.setUid((0, guid_1.default)()),
            this._uid
          );
        }),
        (t.prototype.setUserId = function (e, t) {
          var n = this.getUserId(),
            i = this._gioId;
          (this._userId = e),
            e
              ? (cookie_1.default.setItem(
                  this.userIdCookieKey,
                  this.mixCookieValue(e),
                  duration10year,
                  '/',
                  this._cookieDomain()
                ),
                this.setGioId(e),
                this.setUserKey(t),
                i !== e &&
                  (n || (i && !n)
                    ? this.setSession((0, guid_1.default)())
                    : embed_1$1.useInherit ||
                      (this.growingio.observer.sendVisitEvent(!0),
                      this.growingio.observer.sendPage('setUserId'))))
              : (cookie_1.default.removeItem(
                  this.userIdCookieKey,
                  '/',
                  this._cookieDomain()
                ),
                cookie_1.default.removeItem(
                  this.userKeyCookieKey,
                  '/',
                  this._cookieDomain()
                ));
        }),
        (t.prototype.getUserId = function () {
          return this.parseCookieValue(
            cookie_1.default.getItem(this.userIdCookieKey)
          );
        }),
        (t.prototype.getUserKey = function () {
          return this.parseCookieValue(
            cookie_1.default.getItem(this.userKeyCookieKey)
          );
        }),
        (t.prototype.setUserKey = function (e) {
          this.growingio.vdsConfig.enableIdMapping &&
            (e
              ? cookie_1.default.setItem(
                  this.userKeyCookieKey,
                  this.mixCookieValue(e),
                  duration10year,
                  '/',
                  this._cookieDomain()
                )
              : cookie_1.default.removeItem(
                  this.userKeyCookieKey,
                  '/',
                  this._cookieDomain()
                ),
            (this._userKey = e));
        }),
        (t.prototype.setGioId = function (e) {
          (this._gioId = e),
            cookie_1.default.setItem(
              this.gioIdCookieKey,
              this.mixCookieValue(e),
              duration10year,
              '/',
              this._cookieDomain()
            );
        }),
        (t.prototype.getGioId = function () {
          return this.parseCookieValue(
            cookie_1.default.getItem(this.gioIdCookieKey)
          );
        }),
        (t.prototype.hasSession = function () {
          var e = +Date.now();
          return (
            !!(
              this._session &&
              this.lastSessionUpdated &&
              e - this.lastSessionUpdated <
                (embed_1$1.useInherit ? duration10year : duration30min)
            ) ||
            ((this._session = cookie_1.default.getItem(this.sessionCookieKey)),
            this._session && this._session.length > 0)
          );
        }),
        (t.prototype.sessionValid = function () {
          return this._vstSendSuccess && this.hasSession();
        }),
        (t.prototype.setSession = function (e) {
          var t = this._session;
          (this._session = e),
            this.updateSession(e, !1),
            t &&
              t !== this._session &&
              (embed_1$1.useInherit ||
                (this.growingio.observer.sendVisitEvent(!0),
                this.growingio.observer.sendPage('setSession')));
        }),
        (t.prototype.getSession = function () {
          var e = cookie_1.default.getItem(this.sessionCookieKey);
          return (
            e ? this.setSession(e) : this.setSession((0, guid_1.default)()),
            this._session
          );
        }),
        (t.prototype.updateSession = function (e, t) {
          void 0 === t && (t = !0),
            (this.lastSessionUpdated = Date.now()),
            cookie_1.default.setItem(
              this.sessionCookieKey,
              e,
              embed_1$1.useInherit ? duration10year : duration30min,
              '/',
              this._cookieDomain()
            ),
            this.updateSessionIdSendStatus(e, this._vstSendSuccess && t);
        }),
        (t.prototype._cookieDomain = function () {
          if (!this.grCookieDomains)
            try {
              var e = window.location.hostname.split('.');
              e[e.length - 1] > 0 && 255 >= e[e.length - 1]
                ? (this.grCookieDomains = [window.location.hostname])
                : (this.grCookieDomains = [
                    '.' + e.slice(-2).join('.'),
                    '.' + e.slice(-3).join('.')
                  ]);
            } catch (e) {
              this.grCookieDomains = [window.location.hostname];
            }
          return this.grCookieDomains;
        }),
        (t.prototype.updateSessionIdSendStatus = function (e, t) {
          this._vstSendSuccess = t;
          for (var n = cookie_1.default.keys(), i = 0; i < n.length; i++)
            /.+_gdp_session_id_(.+)/.test(n[i] || '') &&
              RegExp.$1 !== e &&
              cookie_1.default.removeItem(
                n[i] || '',
                '/',
                this._cookieDomain()
              );
          cookie_1.default.setItem(
            ''.concat(this.vstSendSuccessCookieKeyPrefix, '_').concat(e),
            t,
            embed_1$1.useInherit ? duration10year : duration30min,
            '/',
            this._cookieDomain()
          );
        }),
        t
      );
    })(user_1.default);
  webUser.default = User;
  var plugins = {},
    webCircle = {};
  function injectCircle(e, t) {
    var n = document.createElement('link'),
      i = document.createElement('script');
    (n.rel = 'stylesheet'),
      (n.href = e),
      (i.src = t),
      document.head.appendChild(n),
      document.head.appendChild(i);
  }
  Object.defineProperty(webCircle, '__esModule', { value: !0 }),
    (webCircle.default = {
      register: function () {
        window.addEventListener('message', function (e) {
          var t = e.data,
            n = e.source,
            i = window.vds;
          if (t && 'SDK_INJECT_CIRCLE_SCRIPT' == t.type && n) {
            var r = n.vds,
              o = t.cssURL,
              s = t.jsURL;
            r &&
              i.projectId == r.projectId &&
              i.dataSourceId == r.dataSourceId &&
              injectCircle(o, s);
          }
        });
      }
    });
  var hybridCircle = {},
    domHelper = {},
    types = {};
  !(function (e) {
    var t;
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.VisibleStatus = void 0),
      ((t = e.VisibleStatus || (e.VisibleStatus = {}))[(t.OUTER = 0)] =
        'OUTER'),
      (t[(t.INNER_COVERED = 1)] = 'INNER_COVERED'),
      (t[(t.INNER_SHOW = 2)] = 'INNER_SHOW');
  })(types);
  var circleNode = {};
  Object.defineProperty(circleNode, '__esModule', { value: !0 });
  var tslib_1$5 = require$$0,
    constant_1 = constant,
    types_1$1 = types,
    utils_1$3 = utils,
    dom_utils_js_1 = (0, tslib_1$5.__importDefault)(dom_utils),
    node_factory_js_1 = node_factory,
    CircleNode = (function () {
      function e(e, t, n) {
        (this.node = e),
          (this.parentNodeDesc = t),
          (this.devicesInfo = n),
          (this.rect = void 0),
          (this.isContainer = void 0),
          (this.proxy = (0, node_factory_js_1.createNode)(e)),
          (this.name = this.node.tagName.toLowerCase()),
          (this.isIgnore = !!this.node.dataset.growingIgnore),
          (this.isUnSupported =
            !!constant_1.CIRCLE_UNSUPPORTED_TAGS[this.name]),
          this.computedWinRect();
      }
      return (
        (e.prototype.info = function () {
          var e = this.desc();
          e.zLevel += this.devicesInfo.webviewZLevel;
          var t = this.getDeviceRect(this.rect);
          return (0, tslib_1$5.__assign)(
            (0, tslib_1$5.__assign)(
              (0, tslib_1$5.__assign)(
                {},
                (0, utils_1$3.omit)(e, 'isContainer')
              ),
              t
            ),
            {
              parentXPath: this.parentNodeDesc.isContainer
                ? this.parentNodeDesc.xpath
                : void 0,
              href: this.proxy.href(),
              content: this.proxy.content(),
              nodeType: this.nodeType
            }
          );
        }),
        Object.defineProperty(e.prototype, 'nodeType', {
          get: function () {
            return 'input' != this.name ||
              dom_utils_js_1.default.changeableInput(this.node)
              ? this.node.tagName
              : 'INPUT_BTN';
          },
          enumerable: !1,
          configurable: !0
        }),
        (e.prototype.desc = function () {
          return {
            index: this.parentNodeDesc.index || this.proxy.index(),
            zLevel: this.zLevel(),
            xpath: this.proxy.xpath(),
            isContainer: this.isDefinedContainer()
          };
        }),
        (e.prototype.cssVisible = function () {
          var e = this.computedStyle();
          return (
            parseInt(e.opacity) > 0 &&
            'visible' === e.visibility &&
            'none' !== e.display
          );
        }),
        (e.prototype.viewportStatus = function () {
          var e = this.rect,
            t = e.top,
            n = e.left,
            i = e.width,
            r = e.height,
            o = this.devicesInfo,
            s = o.winWidth,
            a = o.winHeight;
          if (0 >= i || 0 >= r) return types_1$1.VisibleStatus.OUTER;
          var u = this.node;
          return a > t && s > n && i > 0 && r > 0
            ? (0, utils_1$3.nodeIsInPoint)(u, n + i / 2, t + r / 2) ||
              (0, utils_1$3.nodeIsInPoint)(u, n + 1, t + 1) ||
              (0, utils_1$3.nodeIsInPoint)(u, n + i - 1, t + 1) ||
              (0, utils_1$3.nodeIsInPoint)(u, n + 1, t + r - 1) ||
              (0, utils_1$3.nodeIsInPoint)(u, n + i - 1, t + r - 1)
              ? types_1$1.VisibleStatus.INNER_SHOW
              : types_1$1.VisibleStatus.INNER_COVERED
            : types_1$1.VisibleStatus.OUTER;
        }),
        (e.prototype.isCircleable = function () {
          return (
            !!this.isDefinedContainer() ||
            (('input' != this.name || 'password' != this.node.type) &&
              (-1 != constant_1.DIRECT_CIRCLE_TAGS.indexOf(this.name) ||
                (dom_utils_js_1.default.isLeaf(this.node)
                  ? !this.isBigBlank()
                  : this.hasBackgroundImage() &&
                    dom_utils_js_1.default.depthInside(this.node, 4))))
          );
        }),
        (e.prototype.isSimpleContainer = function () {
          return (
            'select' == this.name ||
            (this.isDefaultContainer() &&
              (dom_utils_js_1.default.onlyContainsChildren(
                this.node,
                constant_1.ICON_TAGS
              ) ||
                !this.node.childElementCount))
          );
        }),
        (e.prototype.isDefinedContainer = function () {
          return null == this.isContainer
            ? this.isDefaultContainer() ||
                this.isMarkContainer() ||
                (dom_utils_js_1.default.isParentOfLeaf(this.node) &&
                  (!!this.node.innerText.trim().length ||
                    dom_utils_js_1.default.hasRealAttributes(this.node))) ||
                'select' == this.name
            : this.isContainer;
        }),
        (e.prototype.isDefaultContainer = function () {
          return (
            dom_utils_js_1.default.isDefaultContainer(this.node) ||
            dom_utils_js_1.default.clickableInput(this.node)
          );
        }),
        (e.prototype.isMarkContainer = function () {
          return (
            this.node.hasAttribute('data-growing-container') ||
            this.node.hasAttribute('growing-container')
          );
        }),
        (e.prototype.isBigBlank = function () {
          var e = this.node.innerText.trim().length,
            t = this.rect,
            n = t.width,
            i = t.height,
            r = this.devicesInfo,
            o = r.winWidth,
            s = r.winHeight;
          return !e && (n > o >> 1 || i > s >> 1);
        }),
        (e.prototype.hasBackgroundImage = function () {
          var e = this.computedStyle().backgroundImage;
          return !!e && 'none' != e && e.length > 0;
        }),
        (e.prototype.zLevel = function () {
          var e = this.computedStyle(),
            t = e.zIndex;
          if ('auto' !== t)
            return parseInt(t || '0') + this.parentNodeDesc.zLevel;
          switch (e.position) {
            case 'relative':
              return this.parentNodeDesc.zLevel + 2;
            case 'sticky':
              return this.parentNodeDesc.zLevel + 3;
            case 'absolute':
              return this.parentNodeDesc.zLevel + 4;
            case 'fixed':
              return this.parentNodeDesc.zLevel + 5;
            default:
              return this.parentNodeDesc.zLevel + 1;
          }
        }),
        (e.prototype.computedWinRect = function () {
          if (this.rect) return this.rect;
          var e = this.node.getBoundingClientRect(),
            t = e.top,
            n = e.bottom,
            i = e.left,
            r = e.right - i,
            o = n - t;
          return (
            0 > t
              ? (o = t + o)
              : t + o > this.devicesInfo.winHeight &&
                (o = this.devicesInfo.winHeight - t),
            0 > i
              ? (r = i + r)
              : i + r > this.devicesInfo.winWidth &&
                (r = this.devicesInfo.winWidth - i),
            (this.rect = { top: t, left: i, width: r, height: o }),
            this.rect
          );
        }),
        (e.prototype.computedStyle = function () {
          return window.getComputedStyle(this.node);
        }),
        (e.prototype.getDeviceRect = function (e) {
          var t = this.devicesInfo,
            n = t.scale,
            i = t.webviewTop,
            r = t.webviewLeft;
          return {
            top: e.top * n + i,
            left: e.left * n + r,
            width: e.width * n,
            height: e.height * n
          };
        }),
        e
      );
    })();
  (circleNode.default = CircleNode),
    Object.defineProperty(domHelper, '__esModule', { value: !0 });
  var tslib_1$4 = require$$0,
    types_1 = types,
    hybrid_circle_1$1 = (0, tslib_1$4.__importDefault)(hybridCircle),
    utils_1$2 = utils,
    circle_node_1 = (0, tslib_1$4.__importDefault)(circleNode),
    DOM_EVENT = ['DOMContentLoaded', 'onreadystatechange'],
    WINDOW_EVENT = [
      'scroll',
      'resize',
      'load',
      'beforeunload',
      'popstate',
      'hashchange',
      'pagehide',
      'unload'
    ],
    DomHelper = (function () {
      function e() {
        this.addDomChangeListener();
      }
      return (
        (e.prototype.getDomTree = function (t, n, i, r, o, s) {
          console.info('HYBRID: 调用getDomTre方法，参数', arguments);
          var a = e.getDeviceInfo(t, n, i, r, o),
            u = { isContainer: !1, zLevel: 0 },
            l = this.getElementsByParent(s || document.body, u, a),
            d = { page: e.getPage(), elements: l };
          return console.log('HYBRID: 元素节点信息', d), d;
        }),
        (e.prototype.getElementsByParent = function (e, t, n) {
          var i = this,
            r = [];
          return (
            [].slice
              .call(e.childNodes, 0)
              .filter(function (e) {
                return 1 == e.nodeType;
              })
              .forEach(function (e) {
                var o = new circle_node_1.default(e, t, n);
                if (o.cssVisible() && !o.isIgnore) {
                  switch (o.viewportStatus()) {
                    case types_1.VisibleStatus.INNER_SHOW:
                      o.isCircleable() && r.push(o.info());
                      break;
                    case types_1.VisibleStatus.INNER_COVERED:
                      o.isDefaultContainer() && r.push(o.info());
                  }
                  o.isSimpleContainer() ||
                    [].push.apply(r, i.getElementsByParent(e, o.desc(), n));
                }
              }),
            r
          );
        }),
        (e.getDeviceInfo = function (e, t, n, i, r) {
          var o = document.documentElement.clientWidth;
          return {
            winWidth: o,
            winHeight: document.documentElement.clientHeight,
            scale: n / o,
            webviewTop: t,
            webviewLeft: e,
            webviewWidth: n,
            webviewHeight: i,
            webviewZLevel: r
          };
        }),
        (e.prototype.addDomChangeListener = function () {
          var e,
            t = function (t) {
              return (
                void 0 === t && (t = ''),
                function () {
                  'beforeunload' == t && e && e.disconnect(),
                    hybrid_circle_1$1.default.onDomChanged(t);
                }
              );
            };
          (e = new MutationObserver(t('mutation'))).observe(document.body, {
            attributes: !0,
            characterData: !0,
            childList: !0,
            subtree: !0
          }),
            DOM_EVENT.forEach(function (e) {
              (0, utils_1$2.addEventListener)(document, e, t(e));
            }),
            WINDOW_EVENT.forEach(function (e) {
              (0, utils_1$2.addEventListener)(window, e, t(e));
            });
        }),
        (e.getPage = function () {
          var e = location.hash,
            t = location.pathname,
            n = location.search;
          if (!(0, utils_1$2.isStrEmpty)(e)) {
            var i = e.split('?');
            (t += i[0]), i.length > 1 && (n = ''.concat(n, '&').concat(i[1]));
          }
          return {
            domain: window.location.host,
            path: t,
            query: n,
            title: document.title
          };
        }),
        e
      );
    })();
  (domHelper.default = DomHelper),
    Object.defineProperty(hybridCircle, '__esModule', { value: !0 });
  var tslib_1$3 = require$$0,
    dom_helper_1 = (0, tslib_1$3.__importDefault)(domHelper),
    HybridCircle = (function () {
      function e() {}
      return (
        (e.register = function () {
          this.hasBridge() &&
            (window.GrowingWebViewJavascriptBridge.getDomTree = function () {
              if (arguments.length >= 4)
                return (
                  e.bindGetDomTree(),
                  e.domHelper.getDomTree.apply(e.domHelper, arguments)
                );
            });
        }),
        (e.onDomChanged = function (e) {
          console.log('HYBRID: 调用桥onDomChanged方法，事件类型:', e),
            window.GrowingWebViewJavascriptBridge &&
              window.GrowingWebViewJavascriptBridge.onDomChanged();
        }),
        (e.bindGetDomTree = function () {
          this.domHelper ||
            ((this.domHelper = new dom_helper_1.default()),
            (window.GrowingWebViewJavascriptBridge.getDomTree =
              this.domHelper.getDomTree.bind(this.domHelper)));
        }),
        (e.hasBridge = function () {
          return !!window.GrowingWebViewJavascriptBridge;
        }),
        e
      );
    })();
  (hybridCircle.default = HybridCircle),
    Object.defineProperty(plugins, '__esModule', { value: !0 });
  var tslib_1$2 = require$$0,
    web_circle_1 = (0, tslib_1$2.__importDefault)(webCircle),
    hybrid_circle_1 = (0, tslib_1$2.__importDefault)(hybridCircle);
  (plugins.default = {
    register: function () {
      try {
        web_circle_1.default.register(), hybrid_circle_1.default.register();
      } catch (e) {}
    }
  }),
    Object.defineProperty(growingio, '__esModule', { value: !0 });
  var tslib_1$1 = require$$0,
    embed_1 = embed,
    hybrid_1$1 = (0, tslib_1$1.__importDefault)(hybrid),
    touch_handler_1 = (0, tslib_1$1.__importDefault)(touchHandler),
    web_observer_1 = (0, tslib_1$1.__importDefault)(webObserver),
    web_sender_1 = (0, tslib_1$1.__importDefault)(webSender),
    web_user_1 = (0, tslib_1$1.__importDefault)(webUser),
    plugins_1$1 = (0, tslib_1$1.__importDefault)(plugins),
    utils_1$1 = utils,
    sdkVer = '3.3.19',
    defaultOptions = {
      host: '',
      scheme: 'https://',
      version: void 0,
      debug: !1,
      hashtag: !1,
      dataCollect: !0,
      compress: !1,
      penetrateHybrid: !0,
      enableIdMapping: !1
    },
    useInherit,
    inheritDataCollect,
    GrowingIO = (function () {
      function e() {
        var e = this;
        (this.vdsConfig = defaultOptions),
          (this.pageTouch = function () {
            e.observer.sendPage();
          }),
          (this._beforeUnloadListener = function () {
            window.grTn = +Date.now();
            var e = +Date.now() + 200;
            if (window.grWaitTime)
              for (; window.grTn < e; ) window.grTn = +Date.now();
          }),
          (this.start = !1),
          (this.laucher = []);
      }
      return (
        (e.prototype.init = function (e, t, n, i) {
          if (
            (void 0 === i && (i = {}),
            !(0, utils_1$1.isString)(n) &&
              (0, utils_1$1.isObject)(n) &&
              ((i = n), (n = void 0)),
            i.host)
          ) {
            console && console.log('init growingio...');
            var r = (0, embed_1.initGioQuery)(e, n, i);
            (useInherit = r.useInherit),
              (inheritDataCollect = r.inheritDataCollect),
              (this.vdsConfig = (0, tslib_1$1.__assign)(
                (0, tslib_1$1.__assign)(
                  { projectId: e, dataSourceId: t, appId: n, sdkVer: sdkVer },
                  defaultOptions
                ),
                {
                  version: i.version,
                  appVer: i.appVer,
                  compress: i.compress,
                  touch: i.touch,
                  platform: (0, utils_1$1.getPlatform)(i.platform),
                  autotrack: (0, utils_1$1.getDataByPath)(i, 'autotrack', !0),
                  ignoreFields: (0, utils_1$1.getValidIgnoreFields)(
                    (0, utils_1$1.getDataByPath)(i, 'ignoreFields', null)
                  ),
                  enableIdMapping: !0 === i.enableIdMapping
                }
              )),
              useInherit &&
                ((this.vdsConfig.platform = embed_1.gioQuery.gioplatform),
                (this.vdsConfig.dataSourceId =
                  embed_1.gioQuery.giodatasourceid),
                (this.vdsConfig.enableIdMapping =
                  !!embed_1.gioQuery.giouserkey)),
              'boolean' == typeof i.penetrateHybrid &&
                (this.vdsConfig.penetrateHybrid = i.penetrateHybrid),
              this.config(i),
              useInherit &&
                'boolean' == typeof inheritDataCollect &&
                ((this.vdsConfig.dataCollect = inheritDataCollect),
                (window.vds.dataCollect = inheritDataCollect)),
              (this.hybrid = new hybrid_1$1.default(this)),
              (this.user = new web_user_1.default(this)),
              (this.sender = new web_sender_1.default(this)),
              (this.observer = new web_observer_1.default(this)),
              useInherit &&
                (this.user.setUid(embed_1.gioQuery.giou),
                this.user.updateSession(embed_1.gioQuery.gios),
                this.user.setUserId(
                  embed_1.gioQuery.giocs1,
                  embed_1.gioQuery.giouserkey
                )),
              this.vdsConfig.autotrack ||
                (console &&
                  console.log(
                    '%cGrowingIO 已关闭["VIEW_CLICK", "VIEW_CHANGE", "FORM_SUBMIT"]事件采集。',
                    'color: #C2950D'
                  )),
              this.vdsConfig.ignoreFields &&
                console &&
                console.log(
                  '%cGrowingIO 忽略以下字段上报: [' +
                    this.vdsConfig.ignoreFields.join(', ') +
                    ']。',
                  'color: #C2950D'
                );
          } else
            console &&
              console.log(
                '%c[gio-warning]',
                'color: red',
                'GrowingIO SDK 初始化失败，请配置发送数据的 host'
              );
        }),
        (e.prototype.send = function () {
          (this.start = !0),
            this.vdsConfig.host &&
              ('h5' === window.platform &&
                (this.hookHistory(), this.hookUnload()),
              this.appListener(),
              this.hookAction()),
            plugins_1$1.default.register();
        }),
        (e.prototype.setTrackerScheme = function (e) {
          var t = e.toLocaleLowerCase();
          ('http' !== t && 'https' !== t) ||
            ((this.vdsConfig.scheme = ''.concat(e, '://')),
            (window.vds = this.vdsConfig));
        }),
        (e.prototype.setTrackerHost = function (e) {
          (0, utils_1$1.isString)(e) &&
            this.vdsConfig.host !== e &&
            ((this.vdsConfig.host = e), (window.vds = this.vdsConfig));
        }),
        (e.prototype.enableHT = function (e) {
          this.vdsConfig.hashtag !== e &&
            ((this.vdsConfig.hashtag = e), (window.vds = this.vdsConfig));
        }),
        (e.prototype.enableDebug = function (e) {
          this.vdsConfig.debug !== e &&
            ((this.vdsConfig.debug = e), (window.vds = this.vdsConfig));
        }),
        (e.prototype.setAutoTrack = function (e) {
          this.vdsConfig.autotrack !== e &&
            ((this.vdsConfig.autotrack = e),
            (window.vds = this.vdsConfig),
            console &&
              console.log(
                '%cGrowingIO: 已' + (e ? '打开' : '关闭') + '无埋点数据采集。',
                'color: #C2950D'
              ));
        }),
        (e.prototype.setDataCollect = function (e) {
          e === this.vdsConfig.dataCollect ||
            (useInherit && 'boolean' == typeof inheritDataCollect) ||
            ((this.vdsConfig.dataCollect = e),
            e
              ? (this.observer.sendVisitEvent(!0),
                this.observer.sendPage('enableDataCollect', !0))
              : this.observer && (this.observer.trackTimers = {}),
            (window.vds = this.vdsConfig),
            console &&
              console.log(
                '%cGrowingIO: 已' + (e ? '打开' : '关闭') + '数据采集。',
                'color: #C2950D'
              ));
        }),
        (e.prototype.config = function (e) {
          var t = {
            hashtag: 'enableHT',
            dataCollect: 'setDataCollect',
            scheme: 'setTrackerScheme',
            host: 'setTrackerHost',
            debug: 'enableDebug'
          };
          for (var n in e) {
            var i = e[n];
            n in t && (n = t[n]), this[n] && this[n].call(this, i);
          }
          for (var n in (window.vds || (window.vds = {}), this.vdsConfig))
            window.vds[n] = this.vdsConfig[n];
          !1 === this.vdsConfig.dataCollect &&
            this.observer &&
            (this.observer.trackTimers = {});
        }),
        (e.prototype.appListener = function () {
          var e = this;
          this.observer.sendVisitEvent(),
            this.pageTouch(),
            this.laucher.length > 0 &&
              this.laucher.map(function (t) {
                e.observer[t[0]].apply(e.observer, t[1]);
              });
        }),
        (e.prototype.proxy = function (e, t) {
          try {
            if (this[e]) this[e].apply(this, t);
            else if (this.observer && this.observer[e]) {
              if (this.start) return this.observer[e].apply(this.observer, t);
              this.laucher.push([e, t]);
            }
          } catch (e) {
            console && console.error(e);
          }
        }),
        (e.prototype.setUserId = function (e, t) {
          if (
            !useInherit ||
            !(0, utils_1$1.isWebview)(this.vdsConfig.platform)
          ) {
            if (!['string', 'number'].includes(typeof e))
              return this.clearUserId();
            var n = e + '';
            n &&
              100 > n.length &&
              (this.hybrid &&
                (['string', 'number'].includes(typeof t) && t
                  ? this.hybrid.setNativeUserIdAndUserKey(e, t)
                  : this.hybrid.setNativeUserId(e)),
              this.user.setUserId(n, (t || '') + ''));
          }
        }),
        (e.prototype.clearUserId = function () {
          (useInherit && (0, utils_1$1.isWebview)(this.vdsConfig.platform)) ||
            (this.hybrid && this.hybrid.clearNativeUserIdAndUserKey(),
            this.user.setUserId());
        }),
        (e.prototype.hookHistory = function () {
          var e = this,
            t = window.history.pushState,
            n = window.history.replaceState;
          if (t) {
            try {
              window.history.pushState = function (n, i, r) {
                t.call(window.history, n, i, r),
                  setTimeout(function () {
                    return e.pageTouch();
                  }, 0);
              };
            } catch (e) {}
            (0, utils_1$1._addObserverListener)(
              window,
              'popstate',
              this.pageTouch
            );
          }
          if (n)
            try {
              window.history.replaceState = function (t, i, r) {
                n.call(window.history, t, i, r),
                  setTimeout(function () {
                    return e.pageTouch();
                  }, 0);
              };
            } catch (e) {}
          this.vdsConfig.hashtag &&
            (0, utils_1$1._addObserverListener)(
              window,
              'hashchange',
              this.pageTouch
            );
        }),
        (e.prototype._unloadListener = function () {}),
        (e.prototype.hookUnload = function () {
          var e = utils_1$1.isOnIos ? 'pagehide' : 'beforeunload';
          (0, utils_1$1._addObserverListener)(
            window,
            e,
            this._beforeUnloadListener,
            !0
          ),
            (0, utils_1$1._addObserverListener)(
              window,
              'unload',
              this._unloadListener,
              !0
            );
        }),
        (e.prototype.hookAction = function () {
          var e = this.observer.actionListener.bind(this.observer);
          (0, utils_1$1._addObserverListener)(window, 'change', e, !0),
            (0, utils_1$1._addObserverListener)(window, 'submit', e, !0),
            this.vdsConfig.touch
              ? touch_handler_1.default.listener(e)
              : (0, utils_1$1._addObserverListener)(window, 'click', e, !0);
        }),
        e
      );
    })();
  (growingio.default = GrowingIO),
    Object.defineProperty(main, '__esModule', { value: !0 });
  var tslib_1 = require$$0;
  try {
    var gio_platform = 'h5';
    window.platform = gio_platform;
  } catch (e) {}
  var growingio_1 = (0, tslib_1.__importDefault)(growingio),
    hybrid_1 = (0, tslib_1.__importDefault)(hybrid),
    utils_1 = utils,
    plugins_1 = (0, tslib_1.__importDefault)(plugins$1),
    gio;
  !(function () {
    var e,
      t,
      n = new growingio_1.default();
    if (window.gcdpSdkInstalled)
      console &&
        console.log('%c[gio-warning]', 'color: red', '重复加载GrowingIO SDK');
    else {
      if (
        ((window.gcdpSdkInstalled = !0),
        (gio = function () {
          var e = arguments[0];
          if (e)
            if (
              window._gr_ignore_local_rule ||
              hybrid_1.default.isValid() ||
              -1 ===
                (0, utils_1.indexOf)(
                  ['', 'localhost', '127.0.0.1'],
                  window.location.hostname
                )
            ) {
              var t = 2 > arguments.length ? [] : [].slice.call(arguments, 1);
              if ('init' !== e)
                return 'plugin' === e
                  ? (t.unshift(
                      (0, tslib_1.__assign)(
                        (0, tslib_1.__assign)({}, n.vdsConfig),
                        {
                          track: function (e, t) {
                            return n.proxy('track', [e, t]);
                          }
                        }
                      )
                    ),
                    plugins_1.default.apply(null, t))
                  : n.proxy(e, t);
              if (3 > t.length)
                console &&
                  console.log(
                    '%c[gio-warning]',
                    'color: red',
                    '初始化 GrowingIO SDK 失败。请使用 gio("init", "你的GrowingIO项目ID", "你的数据源 ID", "你的应用 ID", options);'
                  );
              else {
                var i = t[0],
                  r = t[1],
                  o = t[2],
                  s = t[3];
                n.init(i, r, o, s);
              }
            } else
              console &&
                console.log(
                  '%c[gio-warning]',
                  'color: red',
                  '初始化 GrowingIO SDK 失败。暂不支持 localhost， 127.0.0.1'
                );
        }),
        window.gdp && window.gdp.q)
      )
        try {
          for (
            var i = (0, tslib_1.__values)(window.gdp.q), r = i.next();
            !r.done;
            r = i.next()
          ) {
            var o = r.value;
            gio.apply(null, o);
          }
        } catch (t) {
          e = { error: t };
        } finally {
          try {
            r && !r.done && (t = i.return) && t.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
      window.gdp = gio;
    }
  })();
  var _default = (main.default = gio);
  return _default;
});
