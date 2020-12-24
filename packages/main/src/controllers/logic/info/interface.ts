import { HasID, createOrderedMap } from "@utils/mst"
import { getEnv, getParent, Instance, SnapshotOut, types } from "mobx-state-tree"
import { getLogicComposedInfo, getLogicComposedStore } from ".."
import { IType } from "@main/controllers/types"

export interface ILogicNodeModel extends Instance<typeof LogicNodeModel> {}
export const LogicNodeModel = HasID.props({
  label: types.optional(types.string, ""),
  typeKey: types.optional(types.string, ""),
}).views((self) => ({
  get type(): IType | null {
    const { typeKey } = self
    // return typeKey ? getTypeController(self).get(typeKey) : null
    return typeKey ? getEnv(self).typeController.get(typeKey) : null
  },
}))

export interface ILogicNode extends Instance<typeof LogicNode> {}
export const LogicNode = LogicNodeModel.actions((self) => ({
  setLabel(label: string) {
    self.label = label
  },
  setTypeKey(id: string) {
    self.typeKey = id
  },
})).actions((self) => ({
  beforeDestroy() {
    const { _id } = getLogicComposedInfo(self)
    const { composition } = getLogicComposedStore(self).get(_id)
    const { _id: nodeId } = self

    //  Delete paths connected to node
    if (composition) {
      const { inputs, outputs, paths } = composition
      const connections = inputs.get(nodeId) || outputs.get(nodeId)

      //NOTE: uses map frist to create a copy of the path since connections is modified whenever path is removed
      connections!.map(({ path }) => path).forEach((path) => paths.remove(path))
    } else console.warn("Indexies not connected to parent, no paths removed")
  },
}))

export interface ILogicInterfaceModelSnapshot extends SnapshotOut<typeof LogicInterfaceModel> {}
export interface ILogicInterfaceModel extends Instance<typeof LogicInterfaceModel> {}
export const LogicInterfaceModel = createOrderedMap(LogicNodeModel)

export interface ILogicInterfaceSnapshot extends SnapshotOut<typeof LogicInterface> {}
export interface ILogicInterface extends Instance<typeof LogicInterface> {}
export const LogicInterface = createOrderedMap(LogicNode)

export function getParentNodeStore(node: ILogicNodeModel) {
  return getParent(node, 2) as ILogicInterfaceModel
}
