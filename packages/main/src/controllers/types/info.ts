import { Instance, types, SnapshotOut, SnapshotIn } from "mobx-state-tree"

export type IAvatar = { color: string } & ({ icon: string } | { abbr: string })

export interface ITypeNativeInfoSnapshotIn extends SnapshotIn<typeof TypeNativeInfo> {}
export interface ITypeNativeInfoSnapshot extends SnapshotOut<typeof TypeNativeInfo> {}
export interface ITypeNativeInfo extends Instance<typeof TypeNativeInfo> {}
export const TypeNativeInfo = types.model({
  label: types.string,
  description: types.string,
  avatar: types.frozen<IAvatar>(),
})

export interface ITypeComposedInfoSnapshotIn extends SnapshotIn<typeof TypeComposedInfo> {}
export interface ITypeComposedInfoSnapshot extends SnapshotOut<typeof TypeComposedInfo> {}
export interface ITypeComposedInfo extends Instance<typeof TypeComposedInfo> {}
export const TypeComposedInfo = TypeNativeInfo.props({
  keysCache: types.maybeNull(types.frozen<string[]>()),
}).actions((self) => ({
  setLabel(label: string) {
    self.label = label
  },
  setDescription(description: string) {
    self.description = description
  },
  setAvatar(avatar: IAvatar) {
    self.avatar = avatar
  },
  setKeysCache(keys: string[]) {
    self.keysCache = keys
  },
}))
