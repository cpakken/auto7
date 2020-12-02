export class MapFromObject<T> {
   readonly obj

   constructor(obj: { [key: string]: T }) {
      this.obj = obj
   }

   get(key: string): T | undefined {
      return this.obj[key]
   }
   has(key: string): boolean {
      return !!this.obj[key]
   }
   set(key: string, val: T) {
      this.obj[key] = val
      return this
   }
   delete(key: string) {
      return delete this.obj[key]
   }
   keys() {
      return Object.keys(this.obj)[Symbol.iterator]()
   }
   get size() {
      return Object.keys(this.obj).length
   }
   *values(): IterableIterator<T> {
      for (let k of this.keys()) yield this.get(k) as T
   }
   *entries(): IterableIterator<[string, T]> {
      for (let k of this.keys()) yield [k, this.get(k) as T]
   }
   forEach(fn: (v: T, k: string) => any) {
      for (const [key, value] of this.entries()) {
         fn(value, key)
      }
   }
}
