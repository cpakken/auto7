//Maps the values of an object
export function forEachIter<T, V>(iter: Iterable<T>, fn: (v: T, i: number) => V) {
  let i = 0
  for (let v of iter) fn(v, i++)
}
//Maps the values of an object
export function mapIter<T, V>(iter: Iterable<T>, fn: (v: T, i: number) => V) {
  const ret: V[] = []
  let i = 0
  for (let v of iter) ret.push(fn(v, i++))
  return ret
}
//TODO test this

export function reduceIter<T, V>(iter: Iterable<T>, fn: (a, v: T, i: number) => V, init?) {
  let n = 0
  let acc = init
  for (let _v of iter) acc = fn(acc, _v, n++)
  return acc
}

export function isTrueReduce<T>(iter: Iterable<T>, mapFn: (val: T) => any = (val) => val): boolean {
  for (let val of iter) {
    if (!mapFn(val)) return false
  }
  return true
}

export function _for(length: number, fn: (i: number, acc?: any) => any, accInit?: any) {
  let acc = accInit
  for (let i = 0; i < length; i++) acc = fn(i, acc)
  return acc
}
