import { getEnv, getRoot, IAnyStateTreeNode, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { LogicComposedStore, LogicNativeStore } from "."

export interface ILogicControllerSnapshotIn extends SnapshotIn<typeof LogicController> {}
export interface ILogicControllerSnapshot extends SnapshotOut<typeof LogicController> {}
export interface ILogicController extends Instance<typeof LogicController> {}
export const LogicController = types.model({
  composed: types.optional(LogicComposedStore, {}),
  native: types.optional(LogicNativeStore, {}),
})

export function getLogicController(instance: IAnyStateTreeNode): ILogicController {
  return getEnv(instance).logicController || getRoot(instance)
}
