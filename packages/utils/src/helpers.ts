export function isValid<T>(test: T): test is Exclude<T, false | null | undefined | Error> {
  return !!test && !(test instanceof Error)
}

export function shallowCompare(a: {}, b: {}): boolean {
  if (Object.keys(a).length !== Object.keys(b).length) return false
  for (let key in a) {
    if (a[key] !== b[key]) return false
  }
  return true
}

export function combineLast<A, R>(fn: (prev, next: A) => R, def?) {
  let prev = def
  return (next: A) => {
    const ret = fn(prev, next)
    prev = next
    return ret
  }
}

export function compareLast() {
  return combineLast((a, b) => a !== b)
}
