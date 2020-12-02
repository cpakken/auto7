import { Instance, SnapshotOut, SnapshotIn, getParentOfType, IAnyStateTreeNode } from "mobx-state-tree"
import { HasID } from "@utils/mst"
import { Blocks, Paths, IBlock, createConnections } from "."

export interface ILogicCompositionSnapshot extends SnapshotOut<typeof LogicComposition> {}
export interface ILogicCompositionSnapshotIn extends SnapshotIn<typeof LogicComposition> {}
export interface ILogicComposition extends Instance<typeof LogicComposition> {}
export const LogicComposition = HasID.props({
  blocks: Blocks,
  paths: Paths,
})
  .volatile(createConnections)
  .views((self) => ({
    getBlock(blockId: string): IBlock | undefined {
      return self.blocks.get(blockId)
    },
  }))
  .actions((self) => ({
    afterCreate() {
      //Initialize path to hydrate path references in blocks and composition
      for (let path of self.paths.store.values()) path
    },
  }))

export function getLogicComposition(inst: IAnyStateTreeNode): ILogicComposition {
  return getParentOfType(inst, LogicComposition)
}
