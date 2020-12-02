import { Instance, SnapshotIn, types } from "mobx-state-tree"
import { createTransformer } from "smartmap"
import { createLoaderStore } from "@main/controllers/utils"
import { LogicNativeInfo, LogicNative } from ".."

export interface ILogicNativeStoreSnapshotIn extends SnapshotIn<typeof LogicNativeStore> {}
export interface ILogicNativeStore extends Instance<typeof LogicNativeStore> {}
export const LogicNativeStore = types
  .model({
    info: createLoaderStore(LogicNativeInfo),
  })
  .views((self: any) => ({
    get: createTransformer((logicKey: string) => new LogicNative(logicKey, self)),
  }))
