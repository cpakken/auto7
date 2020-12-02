import { getParentOfType, IAnyStateTreeNode, Instance, SnapshotIn, types } from "mobx-state-tree"
import { createTransformer } from "smartmap"
import { mapIter } from "@utils/iterable-fns"
import { TypeComposedInfo, TypeComposition, TypeComposed } from ".."
import { createLoaderStore } from "@main/controllers/utils"

export interface ITypeComposedStoreSnapshotIn extends SnapshotIn<typeof TypeComposedStore> {}
export interface ITypeComposedStore extends Instance<typeof TypeComposedStore> {}
export const TypeComposedStore = types
  .model({
    info: createLoaderStore(TypeComposedInfo),
    composition: createLoaderStore(TypeComposition),
  })
  .views((self: any) => ({
    get: createTransformer((typeKey: string) => new TypeComposed(typeKey, self)),
  }))
  .actions((self) => ({
    updateAllTypeKeysCache() {
      return Promise.all(mapIter(self.info.store.keys(), (key) => self.get(key).getKeysWhenReady()))
    },
  }))

export function getTypeComposedStore(inst: IAnyStateTreeNode): ITypeComposedStore {
  return getParentOfType(inst, TypeComposedStore)
}
