import { isDayjs } from 'dayjs'
import { isMoment } from 'moment'

export function deepClone(source: any, call?: (item: any) => any): any {
  if (typeof source !== 'object' || isDayjs(source) || isMoment(source)) {
    // 非对象类型(undefined、boolean、number、string、symbol)，直接返回原值即可
    if (call) {
      return call(source)
    }
    return source
  }
  if (source === null) {
    // 为null类型的时候
    return source
  }
  if (source instanceof Date) {
    // Date类型
    return new Date(source)
  }
  if (source instanceof RegExp) {
    // RegExp正则类型
    return new RegExp(source)
  }

  let result: any
  if (Array.isArray(source)) {
    // 数组
    result = []
    source.forEach((item) => {
      result.push(deepClone(item, call))
    })
    return result
  } else {
    // 为对象的时候
    result = {}
    const keys = [
      ...Object.getOwnPropertyNames(source),
      ...Object.getOwnPropertySymbols(source)
    ] // 取出对象的key以及symbol类型的key
    keys.forEach((key) => {
      const item = source[key]
      result[key] = deepClone(item, call)
    })
    return result
  }
}
