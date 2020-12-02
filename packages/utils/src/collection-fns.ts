import { reduceIter } from "./iterable-fns"

export function isObject(x) {
  return Object.prototype.toString.call(x) === "[object Object]"
}

export function mapValues<T extends {}, K extends keyof T, R>(
  obj: T,
  handler: (value: T[K], key: K, index: number) => R
): {
  [key in K]: R
}
export function mapValues<T, R>(arr: T[], handler: (value: T, index: number) => R): R[]
export function mapValues(objOrArr, handler) {
  if (Array.isArray(objOrArr)) return objOrArr.map(handler)
  if (isObject(objOrArr)) return Object.entries(objOrArr).reduce((a, [k, v], index) => ((a[k] = handler(v, k, index)), a), {})
  return objOrArr
}

export function mapToObj<V>(map: Map<string, V>): { [key: string]: V } {
  return reduceIter(map.entries(), (a, [k, v]) => ((a[k] = v), a), {})
}

export function createArray<T>(length: number, fn: (index: number) => T): T[] {
  return Array.from({ length }, (_, i) => fn(i))
}

export function objectToArray<V>(obj: { [key: string]: V }): V[]
export function objectToArray<V, R>(obj: { [key: string]: V }, mapper: (value: V, key: string) => R): R[]
export function objectToArray(obj, mapper?) {
  return Object.entries(obj).reduce((a, [k, v]) => (a.push(mapper ? mapper(v, k) : v), a), <any[]>[])
}

export function arrayToObject<A, V>(
  arr: A[],
  mapKey: (v: A, i: number) => string,
  mapValue: (v: A, i: number) => V
): { [key: string]: V }
export function arrayToObject<A>(arr: A[], mapKey: (v: A, i: number) => string): { [key: string]: A }
export function arrayToObject(arr, mapKey, mapValue?) {
  return arr.reduce((a, v, i) => ((a[mapKey(v, i)] = mapValue ? mapValue(v, i) : v), a), {})
}
