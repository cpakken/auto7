import { arrayToObject, objectToArray } from "@utils/collection-fns"
import { IAnyType, SnapshotOut, types } from "mobx-state-tree"
import { createTransformer } from "smartmap"

export function createLoaderStore<T extends IAnyType>(model: T) {
  const _id = model.identifierAttribute || "_id"

  const _m = types.model({ store: types.map(model) }).views((self) => {
    const temp = new Map()

    return {
      get: createTransformer((key: string): T["Type"] | undefined => {
        const item = self.store.get(key)
        if (item) return item
        //item not available --> load
        if (temp.has(key)) return temp.get(key)
        temp.set(key, null)

        //fetch and put into store
      }),
    }
  })

  return types.optional(
    types.snapshotProcessor(_m, {
      postProcessor({ store }) {
        return objectToArray(store)
      },
      preProcessor(snapshot: SnapshotOut<T>[]) {
        return { store: arrayToObject(snapshot, (item) => item[_id]) }
      },
    }),
    []
  )
}
