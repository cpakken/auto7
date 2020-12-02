import { getParentOfType, IAnyStateTreeNode, Instance, SnapshotIn, types } from "mobx-state-tree"
import { createTransformer } from "smartmap"
import { LogicComposedInfo, LogicComposition, LogicComposed } from ".."
import { createLoaderStore } from "@main/controllers/utils"
import { mapIter } from "@utils/iterable-fns"

export interface ILogicComposedStoreSnapshotIn extends SnapshotIn<typeof LogicComposedStore> {}
export interface ILogicComposedStore extends Instance<typeof LogicComposedStore> {}
export const LogicComposedStore = types
  .model({
    info: createLoaderStore(LogicComposedInfo),
    composition: createLoaderStore(LogicComposition),
  })
  .views((self: any) => ({
    get: createTransformer((logicKey: string) => new LogicComposed(logicKey, self)),
    // get: createTransformer((logicKey: string) => new LogicComposed(logicKey, self), { requiresReaction: true }),
  }))
  .actions((self) => ({
    updateAllKeysCache() {
      return Promise.all(mapIter(self.info.store.keys(), (key) => self.get(key).getKeysWhenReady()))
    },
  }))

export function getLogicComposedStore(inst: IAnyStateTreeNode): ILogicComposedStore {
  return getParentOfType(inst, LogicComposedStore)
}
