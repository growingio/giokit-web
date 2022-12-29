import {
  getPrototypeName,
  isArray,
  isBigInt,
  isFunction,
  isIterable,
  isObject,
  isString,
  isSymbol
} from './glodash';

// 生成uuid
export const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// 优化过的try...catch包裹体
export function niceTry(fn: Function) {
  try {
    return fn();
  } catch (e) {
    return undefined;
  }
}

/**
 * Get an object's constructor name.
 */
const _getObjNamePattern = /(function|class) ([^ \{\()}]{1,})[\(| ]/;
export function getObjName(obj: any) {
  // const constructorName = obj?.constructor?.name;
  // return constructorName || <string>Object.prototype.toString.call(obj).replace('[object ', '').replace(']', '');
  if (obj === null || obj === undefined) {
    return '';
  }
  const results = _getObjNamePattern.exec(obj?.constructor?.toString() || '');
  return results && results.length > 1 ? results[2] : '';
}

// keywords: `%c | %s | %d | %o`, must starts or ends with a blank
const logFormattingPattern = /(\%[csdo] )|( \%[csdo])/g;
/**
 * Styling log output (`%c`), or string substitutions (`%s`, `%d`, `%o`).
 * Apply to the first log only.
 */
export const getLogDatasWithFormatting = (oDatas: any[]) => {
  // reset RegExp.lastIndex to ensure search starts from beginning
  logFormattingPattern.lastIndex = 0;
  if (isString(oDatas[0]) && logFormattingPattern.test(oDatas[0])) {
    const rawDatas = [...oDatas];
    const firstData: string = rawDatas.shift();

    // use firstData as display logs
    const mainLogs = firstData.split(logFormattingPattern).filter((val) => {
      return val !== undefined && val !== '';
    });
    // use remain logs as replace item
    const subLogs = rawDatas;

    const logDataList: any[] = [];
    let isSetOrigData = false;
    let oData: any;
    let style = '';
    while (mainLogs.length > 0) {
      const mainText: string = mainLogs.shift() || '';
      if (/ ?\%c ?/.test(mainText)) {
        // Use subLogs[0] as CSS style.
        // If subLogs[0] is not set, use original mainText as oData.
        // If subLogs[0] is not a string, then leave style empty.
        if (subLogs.length > 0) {
          style = subLogs.shift();
          if (typeof style !== 'string') {
            style = '';
          }
        } else {
          oData = mainText;
          style = '';
          isSetOrigData = true;
        }
      } else if (/ ?\%[sd] ?/.test(mainText)) {
        // Use subLogs[0] as oData (as String).
        // If subLogs[0] is not set, use original mainText as oData.
        // If subLogs[0] is not a string, convert it to a string.
        if (subLogs.length > 0) {
          oData = isObject(subLogs[0])
            ? getObjName(subLogs.shift())
            : String(subLogs.shift());
        } else {
          oData = mainText;
        }
        isSetOrigData = true;
      } else if (/ ?\%o ?/.test(mainText)) {
        // Use subLogs[0] as oData (as original Object value).
        // If subLogs[0] is not set, use original mainText as oData.
        oData = subLogs.length > 0 ? subLogs.shift() : mainText;
        isSetOrigData = true;
      } else {
        oData = mainText;
        isSetOrigData = true;
      }

      if (isSetOrigData) {
        const log: any = { oData };
        if (style) {
          log.style = style;
        }
        logDataList.push(log);
        // reset
        isSetOrigData = false;
        oData = undefined;
        style = '';
      }
    }
    // If there are remaining subLogs, add them to logs.
    for (let i = 0; i < subLogs.length; i++) {
      logDataList.push({
        oData: subLogs[i]
      });
    }
    // (window as any)._vcOrigConsole.log('getLogDataWithSubstitutions format', logDataList);
    return logDataList;
  } else {
    const logDataList: any[] = [];
    for (let i = 0; i < oDatas.length; i++) {
      logDataList.push({
        oData: oDatas[i]
      });
    }
    // (window as any)._vcOrigConsole.log('getLogDataWithSubstitutions normal', logDataList);
    return logDataList;
  }
};

const _visibleTextPatterns = /[\n\t]/g;
const _visibleTextReplacer = (c: string) => {
  return { '\n': '\\n', '\t': '\\t' }[c];
};
/**
 * Convert a text's invisible characters to visible characters.
 */
export function getVisibleText(text: string) {
  if (typeof text !== 'string') {
    return text;
  }
  return String(text).replace(_visibleTextPatterns, _visibleTextReplacer);
}

/**
 * Get enumerable keys of an object or array.
 */
export function getEnumerableKeys(obj: any) {
  if (!isObject(obj) && !isArray(obj)) {
    return [];
  }
  return Object.keys(obj);
}

const _safeJSONStringifyCircularFinder = () => {
  const seen = new WeakSet();
  return (value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return true;
      }
      seen.add(value);
    }
    return false;
  };
};
const _safeJSONStringifyFlatValue = (value: any, maxLen = 0) => {
  let str = '';
  if (isString(value)) {
    if (maxLen > 0) {
      value = getStringWithinLength(value, maxLen);
    }
    str += '"' + getVisibleText(value) + '"';
  } else if (isSymbol(value)) {
    str += String(value).replace(/^Symbol\((.*)\)$/i, 'Symbol("$1")');
  } else if (isFunction(value)) {
    str += (value.name || 'function') + '()';
  } else if (isBigInt(value)) {
    str += String(value) + 'n';
  } else {
    // str += JSONStringify(value);
    str += String(value);
  }
  return str;
};

// use depth first traversal
const _safeJSONStringify = (obj: any, opt: any, _curDepth = 0) => {
  if (!isObject(obj) && !isArray(obj)) {
    opt.ret += _safeJSONStringifyFlatValue(obj, opt.keyMaxLen);
    return;
  }

  const isCircular = opt.circularFinder(obj);
  if (isCircular) {
    let circularText = '';
    if (isArray(obj)) {
      circularText = '(Circular Array)';
    } else if (isObject(obj)) {
      circularText = `(Circular ${obj.constructor?.name || 'Object'})`;
    }
    opt.ret += opt.standardJSON ? `"${circularText}"` : circularText;
    return;
  }

  let prettySpace = '',
    prettyWrap = '';
  if (opt.pretty) {
    for (let i = 0; i <= _curDepth; i++) {
      prettySpace += '  ';
    }
    prettyWrap = '\n';
  }

  let prefix = '{',
    suffix = '}';
  if (isArray(obj)) {
    prefix = '[';
    suffix = ']';
  }
  opt.ret += prefix + prettyWrap;

  const keys = getEnumerableKeys(obj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    // (window as any)._console.log('for key:', key, _curDepth);
    opt.ret += prettySpace;

    // handle key
    try {
      if (!isArray(obj)) {
        if (isObject(key) || isArray(key) || isSymbol(key)) {
          opt.ret += Object.prototype.toString.call(key);
        } else if (isString(key) && opt.standardJSON) {
          opt.ret += '"' + key + '"';
        } else {
          opt.ret += key;
        }
        opt.ret += ': ';
      }
    } catch (e) {
      // cannot stringify `key`, skip this key-value pair
      continue;
    }

    // handle value
    try {
      const value = obj[key];
      if (isArray(value)) {
        if (opt.maxDepth > -1 && _curDepth >= opt.maxDepth) {
          opt.ret += 'Array(' + value.length + ')';
        } else {
          _safeJSONStringify(value, opt, _curDepth + 1);
        }
      } else if (isObject(value)) {
        if (opt.maxDepth > -1 && _curDepth >= opt.maxDepth) {
          // opt.ret += Object.prototype.toString.call(value);
          opt.ret += (value.constructor?.name || 'Object') + ' {}';
        } else {
          _safeJSONStringify(value, opt, _curDepth + 1);
        }
      } else {
        // opt.ret += JSONStringify(value);
        opt.ret += _safeJSONStringifyFlatValue(value, opt.keyMaxLen);
      }
    } catch (e) {
      // cannot stringify `value`, use a default text
      opt.ret += opt.standardJSON ? '"(PARSE_ERROR)"' : '(PARSE_ERROR)';
    }

    if (opt.keyMaxLen > 0 && opt.ret.length >= opt.keyMaxLen * 10) {
      opt.ret += ', (...)';
      break;
    }
    if (i < keys.length - 1) {
      opt.ret += ', ';
    }
    opt.ret += prettyWrap;
  }
  opt.ret += prettySpace.substring(0, prettySpace.length - 2) + suffix;
};
/**
 * A safe `JSON.stringify` method.
 */
export function safeJSONStringify(
  obj: any,
  opt: {
    maxDepth?: number;
    keyMaxLen?: number;
    pretty?: boolean;
    standardJSON?: boolean;
  } = {
    maxDepth: -1,
    keyMaxLen: -1,
    pretty: false,
    standardJSON: false
  }
) {
  const option: any = Object.assign(
    {
      ret: '',
      maxDepth: -1,
      keyMaxLen: -1,
      pretty: false,
      standardJSON: false,
      circularFinder: _safeJSONStringifyCircularFinder()
    },
    opt
  );
  _safeJSONStringify(obj, option);
  return option.ret;
}

/**
 * Get the bytes of a string.
 * @example 'a' = 1
 * @example '好' = 3
 */
export function getStringBytes(str: string) {
  try {
    return encodeURI(str).split(/%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./).length - 1;
  } catch (e) {
    return 0;
  }
}

/**
 * Convert bytes number to 'MB' or 'KB' string.
 */
export function getBytesText(bytes: number) {
  if (bytes <= 0) {
    return '';
  }
  if (bytes >= 1000 * 1000) {
    return (bytes / 1000 / 1000).toFixed(1) + ' MB';
  }
  if (bytes >= 1000 * 1) {
    return (bytes / 1000).toFixed(1) + ' KB';
  }
  return bytes + ' B';
}

/**
 * Get a string within a limited max length.
 * The byte size of the string will be appended to the string when reached the limit.
 * @return 'some string...(3.1 MB)'
 */
export function getStringWithinLength(str: string, maxLen: number) {
  if (str.length > maxLen) {
    str =
      str.substring(0, maxLen) + `...(${getBytesText(getStringBytes(str))})`;
  }
  return str;
}

/**
 * Get formatted URL object by string.
 */
export const getURL = (urlString: string = '') => {
  if (urlString.startsWith('//')) {
    const baseUrl = new URL(window.location.href);
    urlString = `${baseUrl.protocol}${urlString}`;
  }
  if (urlString.startsWith('http')) {
    return new URL(urlString);
  } else {
    return new URL(urlString, window.location.href);
  }
};

/**
 * Generate formatted response body by XMLHttpRequestBodyInit.
 */
export const genFormattedBody = (body?: BodyInit) => {
  if (!body) {
    return null;
  }
  let ret: string | { [key: string]: string } = '';

  if (typeof body === 'string') {
    try {
      // '{a:1}' => try to parse as json
      ret = JSON.parse(body);
    } catch (e) {
      // 'a=1&b=2' => try to parse as query
      const arr = body.split('&');
      if (arr.length === 1) {
        // not a query, parse as original string
        ret = body;
      } else {
        // 'a=1&b=2&c' => parse as query
        ret = {};
        for (let q of arr) {
          const kv = q.split('=');
          ret[kv[0]] = kv[1] === undefined ? 'undefined' : kv[1];
        }
      }
    }
  } else if (isIterable(body)) {
    // FormData or URLSearchParams or Array
    ret = {};
    for (const [key, value] of <FormData | URLSearchParams>body) {
      ret[key] = typeof value === 'string' ? value : '[object Object]';
    }
  } else if (isPlainObject(body)) {
    ret = <any>body;
  } else {
    const type = getPrototypeName(body);
    ret = `[object ${type}]`;
  }
  return ret;
};

/**
 * check whether an object is plain (using {})
 * @param object obj
 * @return boolean
 */
export function isPlainObject(obj: any) {
  let hasOwn = Object.prototype.hasOwnProperty;
  // Must be an Object.
  if (!obj || typeof obj !== 'object' || obj.nodeType || isWindow(obj)) {
    return false;
  }
  try {
    if (
      obj.constructor &&
      !hasOwn.call(obj, 'constructor') &&
      !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')
    ) {
      return false;
    }
  } catch (e) {
    return false;
  }
  let key;
  for (key in obj) {
  }
  return key === undefined || <boolean>hasOwn.call(obj, key);
}

export function isWindow(value: any) {
  const name = Object.prototype.toString.call(value);
  return (
    name === '[object Window]' ||
    name === '[object DOMWindow]' ||
    name === '[object global]'
  );
}
