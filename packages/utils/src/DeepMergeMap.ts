import { observable } from "mobx"

type MergeNode<T> = { values: T[]; map: MapDeepMerge<T> }
type MapDeepMerge<T> = Map<string, MergeNode<T>>

export class DeepMergeMap<T> {
  private map: MapDeepMerge<T>

  constructor(isObservable = false) {
    this.map = isObservable ? observable.map() : new Map()
  }

  get(path: string[]): MergeNode<T> | undefined {
    let next: MergeNode<T> = { map: this.map, values: [] }

    for (const key of path) {
      const { map } = next
      if (!map.has(key)) return undefined
      next = map.get(key)!
    }

    return next
  }

  getValues(path: string[]): T[] | undefined {
    const node = this.get(path)
    return node?.values.length ? node.values : undefined
  }

  getOne(path: string[]): T | undefined {
    return this.getValues(path)?.[0]
  }

  set(path: string[], value: T) {
    let next = { map: this.map, values: [] as T[] }

    for (const key of path) {
      const { map } = next
      //TODO can be made recursive, instead of map -> new DeepMergeMap()
      if (!map.has(key)) map.set(key, { values: [], map: new Map() })
      next = map.get(key)!
    }

    next.values.push(value)
  }

  delete(path: string[], value: T): boolean {
    const node = this.get(path)
    return !!node && removeItem(node.values, value)
  }

  forEach() {

  }
}

function removeItem<T>(a: T[], val: T): boolean {
  const i = a.findIndex((x) => val === x)
  if (i >= 0) {
    a.splice(i, 1)
    return true
  }
  return false
}
