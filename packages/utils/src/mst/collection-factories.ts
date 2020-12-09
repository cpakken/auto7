import { SnapshotOrInstance, types, destroy, Instance, SnapshotOut, IAnyType, getParent } from "mobx-state-tree"
import { moveItem } from "mobx-utils"
import { arrayToObject, objectToArray } from "../collection-fns"

export function createOrderedMap<T extends IAnyType>(model: T) {
  const _id = model.identifierAttribute || "_id"
  const _m = types
    .model({
      store: types.map(model),
      list: types.array(
        types.reference(model, {
          //Note: Can't use safeReference because sometimes global _id will clash
          get(id, self: any): Instance<T> {
            return getParent<any>(self).store.get(id)!
          },
          set(node) {
            return node[_id]
          },
          onInvalidated: ({ removeRef }) => removeRef(),
        })
      ),
    })
    .views((self) => ({
      get(key: string) {
        return self.store.get(key)
      },
      atIndex(i: number) {
        return self.list[i]
      },
    }))
    .actions((self) => ({
      add(value: SnapshotOrInstance<T>) {
        const instance = self.store.put(value)
        self.list.push(instance)
        return instance
      },
      move(from: number, to: number) {
        moveItem(self.list, from, to)
      },
      remove(item: Instance<T>) {
        destroy(item)
      },
      delete(_id: string) {
        return self.store.delete(_id)
      },
    }))

  return types.optional(
    types.snapshotProcessor(_m, {
      postProcessor({ store, list }) {
        return list.map((_id) => store[_id!])
      },
      preProcessor(snapshot: SnapshotOut<T>[]) {
        return {
          store: arrayToObject(snapshot, (item) => item[_id]),
          list: snapshot.map((item) => item[_id]),
        }
      },
    }),
    []
  )
}

/** Proxies a map of model and adds snapshot processor */
export function createStoreModel<T extends IAnyType>(model: T) {
  const _id = model.identifierAttribute || "_id"

  const _m = types
    .model({
      store: types.map(model),
    })
    .views((self) => ({
      get(key: string) {
        return self.store.get(key)
      },
      values() {
        return self.store.values()
      },
    }))
    .actions((self) => ({
      remove(item: Instance<T>) {
        destroy(item)
      },
      delete(_id: string) {
        return self.store.delete(_id)
      },
      add(item: SnapshotOrInstance<T>) {
        return self.store.put(item)
      },
    }))

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
