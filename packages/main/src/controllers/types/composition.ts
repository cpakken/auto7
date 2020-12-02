import { getType, Instance, isStateTreeNode, IType, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { HasID, createOrderedMap } from "@utils/mst"
import { getTypeController, TypeNative, TypeComposed } from "."

export interface ITypeNodeNativeSnapshot extends SnapshotOut<typeof TypeNodeNative> {}
export interface ITypeNodeNativeSnapshotIn extends SnapshotIn<typeof TypeNodeNative> {}
export interface ITypeNodeNative extends Instance<typeof TypeNodeNative> {}

export const TypeNodeNative = HasID.props({ typeKey: types.string }).views((self) => ({
  get type(): TypeNative {
    return getTypeController(self).native.get(self.typeKey)
  },
}))

export interface ITypeNodeComposedSnapshot extends SnapshotOut<typeof TypeNodeComposed> {}
export interface ITypeNodeComposedSnapshotIn extends SnapshotIn<typeof TypeNodeComposed> {}
export interface ITypeNodeComposed extends Instance<typeof TypeNodeComposed> {}

export const TypeNodeComposed = HasID.props({ typeKey: types.string }).views((self) => ({
  get type(): TypeComposed {
    return getTypeController(self).composed.get(self.typeKey)
  },
}))

export type ITypeNode = ITypeNodeComposed | ITypeNodeNative
export type ITypeNodeSnapshot = ITypeNodeComposedSnapshot | ITypeNodeNativeSnapshot
export type ITypeNodeSnapshotIn = ITypeNodeComposedSnapshotIn | ITypeNodeNativeSnapshotIn

const dispatcher = ({ logicKey }) => ((<string>logicKey).startsWith("_") ? TypeNodeNative : TypeNodeComposed)
export const TypeNode = types.union({ dispatcher }, TypeNodeNative, TypeNodeComposed) as IType<
  ITypeNodeSnapshot,
  ITypeNodeSnapshotIn,
  ITypeNode
>

export interface ITypeCompositionSnapshot extends SnapshotOut<typeof TypeComposition> {}
export interface ITypeComposition extends Instance<typeof TypeComposition> {}
export const TypeComposition = createOrderedMap(TypeNode)

export function isTypeNodeComposed(typeNode): typeNode is ITypeNodeComposed {
  return isStateTreeNode(typeNode) && getType(typeNode) === TypeNodeComposed
}

export function isTypeNodeNative(TypeNode): TypeNode is ITypeNodeNative {
  return isStateTreeNode(TypeNode) && getType(TypeNode) === TypeNodeNative
}
