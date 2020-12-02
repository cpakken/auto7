import { getEnv, getRoot, IAnyStateTreeNode, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { TypeComposedStore, TypeNativeStore, TypeComposed, TypeNative } from "."

export type IType = TypeNative | TypeComposed

export interface ITypeControllerSnapshotIn extends SnapshotIn<typeof TypeController> {}
export interface ITypeControllerSnapshot extends SnapshotOut<typeof TypeController> {}
export interface ITypeController extends Instance<typeof TypeController> {}
export const TypeController = types
  .model({
    native: types.optional(TypeNativeStore, {}),
    composed: types.optional(TypeComposedStore, {}),
  })
  .views((self) => ({
    get(typeKey: string): IType {
      return typeKey.startsWith("_") ? self.native.get(typeKey) : self.composed.get(typeKey)
    },
  }))

export function getTypeController(instance: IAnyStateTreeNode): ITypeController {
  return getEnv(instance).typeController || getRoot(instance)
}
