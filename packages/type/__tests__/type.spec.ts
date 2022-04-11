import {
  isString,
  toTypeString,
  isBoolean,
  isNumber,
  isSymbol,
  isNull,
  isUndefined,
  isObject,
  isFunction,
  isRegExp,
  isArray,
  isArrayLike,
  isDate,
  isMap,
  isWeakMap,
  isSet,
  isWeakSet,
  isNil,
  isFalsy,
  isTruthy,
  isLength,
  isEmpty
} from '@v-utils/type'

describe('type', () => {
  test('toTypeString', () => {
    expect(toTypeString(true)).toBe('[object Boolean]')
    expect(toTypeString(1)).toBe('[object Number]')
    expect(toTypeString(Symbol('foo'))).toBe('[object Symbol]')
    expect(toTypeString(null)).toBe('[object Null]')
    expect(toTypeString(undefined)).toBe('[object Undefined]')
    expect(toTypeString('')).toBe('[object String]')
    expect(toTypeString([])).toBe('[object Array]')
    expect(toTypeString({})).toBe('[object Object]')
    expect(toTypeString(() => {})).toBe('[object Function]')
    expect(toTypeString(/foo/)).toBe('[object RegExp]')
    expect(toTypeString(new Date())).toBe('[object Date]')
    expect(toTypeString(new Map())).toBe('[object Map]')
    expect(toTypeString(new Set())).toBe('[object Set]')
    expect(toTypeString(new WeakMap())).toBe('[object WeakMap]')
    expect(toTypeString(new WeakSet())).toBe('[object WeakSet]')
    expect(toTypeString(new Error())).toBe('[object Error]')
    expect(toTypeString(new Promise(() => {}))).toBe('[object Promise]')
    expect(toTypeString(new Proxy({}, {}))).toBe('[object Object]')
    function fn() {
      expect(toTypeString(arguments)).toBe('[object Arguments]')
    }
    fn()
  })

  test('isString', () => {
    const str = 'string'
    const str2 = new String('string')
    const num = 100
    expect(isString(str)).toBe(true)
    expect(isString(str2)).toBe(false)
    expect(isString(num)).toBe(false)
  })

  test('isBoolean', () => {
    const bool = true
    const bool2 = new Boolean(true)
    const num = 100
    expect(isBoolean(bool)).toBe(true)
    expect(isBoolean(bool2)).toBe(false)
    expect(isBoolean(num)).toBe(false)
    expect(isBoolean(!num)).toBe(true)
  })

  test('isNumber', () => {
    const num = 100
    const nan = NaN
    const num2 = new Number(100)
    const str = 'string'
    expect(isNumber(num)).toBe(true)
    expect(isNumber(nan)).toBe(true)
    expect(isNumber(num2)).toBe(false)
    expect(isNumber(str)).toBe(false)
  })

  test('isSymbol', () => {
    expect(isSymbol(Symbol('foo'))).toBe(true)
    expect(isSymbol(Symbol.toPrimitive)).toBe(true)
  })

  test('isNull', () => {
    expect(isNull(null)).toBe(true)
    expect(isNull(undefined)).toBe(false)
    expect(isNull(0)).toBe(false)
  })

  test('isUndefined', () => {
    expect(isUndefined(undefined)).toBe(true)
    expect(isUndefined(null)).toBe(false)
    expect(isUndefined(0)).toBe(false)
  })
  test('isObject', () => {
    expect(isObject(null)).toBe(false)
    expect(isObject(undefined)).toBe(false)
    expect(isObject(Symbol('foo'))).toBe(false)
    expect(isObject(() => {})).toBe(false)
    expect(isObject(new Date())).toBe(true)
    expect(isObject(new Map())).toBe(true)
    expect(isObject(new Set())).toBe(true)
    expect(isObject(new WeakMap())).toBe(true)
    expect(isObject(new WeakSet())).toBe(true)
    expect(isObject(new Error())).toBe(true)
    expect(isObject(new Promise(() => {}))).toBe(true)
    expect(isObject(new Proxy({}, {}))).toBe(true)
  })

  test('isFunction', () => {
    const fn = jest.fn()
    expect(isFunction(fn)).toBe(true)
  })

  test('isRegExp', () => {
    expect(isRegExp(/foo/)).toBe(true)
  })

  test('isArray', () => {
    expect(isArray([])).toBe(true)
    function fn() {
      expect(isArray(arguments)).toBe(false)
      expect(isArray([...arguments])).toBe(true)
    }
    fn()
  })

  test('isArrayLike', () => {
    const arrayLikeObj = {
      length: 1
    }
    expect(isArrayLike([])).toBe(true)
    expect(isArrayLike(arrayLikeObj)).toBe(true)
    function fn() {
      expect(isArrayLike(arguments)).toBe(true)
    }
    fn()
  })

  test('isDate', () => {
    expect(isDate(new Date())).toBe(true)
  })
  test('isMap', () => {
    expect(isMap(new Map())).toBe(true)
  })

  test('isWeakMap', () => {
    expect(isWeakMap(new WeakMap())).toBe(true)
  })

  test('isSet', () => {
    expect(isSet(new Set())).toBe(true)
  })

  test('isWeakSet', () => {
    expect(isWeakSet(new WeakSet())).toBe(true)
  })

  test('isNaN', () => {
    expect(isNaN(NaN)).toBe(true)
    expect(isNaN(Number('NaN'))).toBe(true)
  })

  test('isNil', () => {
    expect(isNil(null)).toBe(true)
    expect(isNil(undefined)).toBe(true)
    expect(isNil(0)).toBe(false)
    expect(isNil('')).toBe(false)
  })

  test('isFalsy', () => {
    expect(isFalsy(null)).toBe(true)
    expect(isFalsy(undefined)).toBe(true)
    expect(isFalsy(0)).toBe(true)
    expect(isFalsy('')).toBe(true)
    expect(isFalsy(false)).toBe(true)
    expect(isFalsy(NaN)).toBe(true)
  })

  test('isTruthy', () => {
    expect(isTruthy(null)).toBe(false)
    expect(isTruthy(undefined)).toBe(false)
    expect(isTruthy(0)).toBe(false)
    expect(isTruthy('')).toBe(false)
    expect(isTruthy(false)).toBe(false)
    expect(isTruthy(NaN)).toBe(false)
    expect(isTruthy([])).toBe(true)
    expect(isTruthy({})).toBe(true)
    expect(isTruthy(1)).toBe(true)
    expect(isTruthy(-1)).toBe(true)
    expect(isTruthy(/foo/)).toBe(true)
    expect(isTruthy(new Date())).toBe(true)
    expect(isTruthy(jest.fn())).toBe(true)
  })

  test('isLength', () => {
    expect(isLength(1)).toBe(true)
    expect(isLength(0)).toBe(true)
    expect(isLength(-1)).toBe(false)
    expect(isLength(Number.MAX_SAFE_INTEGER)).toBe(true)
    expect(isLength(Infinity)).toBe(false)
    expect(isLength(NaN)).toBe(false)
  })

  test('isEmpty', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty(0)).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty(false)).toBe(true)
    const arr: any[] = []
    const obj: {
      [key: string]: any
    } = {}
    const map = new Map()
    const set = new Set()
    expect(isEmpty(arr)).toBe(true)
    expect(isEmpty(obj)).toBe(true)
    expect(isEmpty(map)).toBe(true)
    expect(isEmpty(set)).toBe(true)
    arr.push(1)
    obj['test'] = true
    map.set(arr, obj)
    set.add(arr)
    expect(isEmpty(arr)).toBe(false)
    expect(isEmpty(obj)).toBe(false)
    expect(isEmpty(map)).toBe(false)
    expect(isEmpty(set)).toBe(false)
  })
})
