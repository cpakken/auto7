import { types, SnapshotIn, Instance } from "mobx-state-tree"
import { HasID, createStoreModel } from "@utils/mst"
import { getLogicComposition } from "."

export type INodeRef = {
  block?: string
  node: string
  //path: string[]
}

export const NodeRef = types.frozen<INodeRef>()

export interface IPath extends Instance<typeof Path> {}
export interface IPathSnapshot extends SnapshotIn<typeof Path> {}
export interface IPaths extends Instance<typeof Paths> {}
export const Path = HasID.props({
  from: NodeRef,
  to: NodeRef,
}).actions((self) => ({
  afterAttach() {
    const {
      from: { block: fromBlkId, node: fromNode },
      to: { block: toBlkId, node: toNode },
    } = self

    const path = self as IPath
    const composition = getLogicComposition(self)

    const toBlock = toBlkId ? composition.getBlock(toBlkId) : undefined
    const fromBlock = fromBlkId ? composition.getBlock(fromBlkId) : undefined

    //Set input connections
    const insStore = toBlock?.inputs || composition.outputs
    insStore.add(toNode, { path, node: fromNode, block: fromBlock })

    //Set output connections
    const outsStore = fromBlock?.outputs || composition.inputs
    outsStore.add(fromNode, { path, node: toNode, block: toBlock })
  },
  beforeDestroy() {
    const {
      from: { block: fromBlkId, node: fromKey },
      to: { block: toBlkId, node: toKey },
    } = self

    const path = self as IPath
    const composition = getLogicComposition(self)

    //Clean up references in blocks
    const insStore = toBlkId ? composition.getBlock(toBlkId)?.inputs : composition.outputs
    insStore?.remove(toKey, path)

    const outsStore = fromBlkId ? composition.getBlock(fromBlkId)?.outputs : composition.inputs
    outsStore?.remove(fromKey, path)
  },
}))

export const Paths = createStoreModel(Path)
