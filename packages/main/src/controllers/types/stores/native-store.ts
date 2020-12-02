import { Instance, SnapshotIn, types } from "mobx-state-tree"
import { createTransformer } from "smartmap"
import { createLoaderStore } from "@main/controllers/utils"
import { TypeNativeInfo, TypeNative } from ".."

export interface ITypeNativeStoreSnapshotIn extends SnapshotIn<typeof TypeNativeStore> {}
export interface ITypeNativeStore extends Instance<typeof TypeNativeStore> {}
export const TypeNativeStore = types
  .model({
    info: createLoaderStore(TypeNativeInfo),
  })
  .views((self: any) => ({
    get: createTransformer((typeKey: string) => new TypeNative(typeKey, self)),
  }))
