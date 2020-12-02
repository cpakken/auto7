import { HasID } from "@utils/mst"
import { getParentOfType, IAnyStateTreeNode, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { LogicInterface, LogicInterfaceModel } from "."

export interface ILogicNativeInfoSnapshotIn extends SnapshotIn<typeof LogicNativeInfo> {}
export interface ILogicNativeInfoSnapshot extends SnapshotOut<typeof LogicNativeInfo> {}
export interface ILogicNativeInfo extends Instance<typeof LogicNativeInfo> {}
export const LogicNativeInfo = HasID.props({
  label: types.string,
  //description: types.string,
  inputs: LogicInterfaceModel,
  outputs: LogicInterfaceModel,
})

export interface ILogicComposedInfoSnapshotIn extends SnapshotIn<typeof LogicComposedInfo> {}
export interface ILogicComposedInfoSnapshot extends SnapshotOut<typeof LogicComposedInfo> {}
export interface ILogicComposedInfo extends Instance<typeof LogicComposedInfo> {}
export const LogicComposedInfo = HasID.props({
  label: types.string,
  //description: types.string,
  inputs: LogicInterface,
  outputs: LogicInterface,
  keysCache: types.maybeNull(types.frozen<string[]>()),
}).actions((self) => ({
  setKeysCache(keys: string[]) {
    self.keysCache = keys
  },
  //updateDescription(desc: string){ self.description = desc}
}))

export function getLogicComposedInfo(inst: IAnyStateTreeNode): ILogicComposedInfo {
  return getParentOfType(inst, LogicComposedInfo)
}
