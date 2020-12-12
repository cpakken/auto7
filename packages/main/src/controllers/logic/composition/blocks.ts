import { HasID, createStoreModel } from "@utils/mst"
import { getType, Instance, isStateTreeNode, IType, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { LogicNative, LogicComposed, getLogicComposition, getLogicController, ConnectionsMap } from ".."

export type IOConnections = { inputs: ConnectionsMap; outputs: ConnectionsMap }
export function createConnections(): IOConnections {
  return { inputs: new ConnectionsMap(), outputs: new ConnectionsMap() }
}

const XYPosition = types.frozen<[number, number]>()
const BlockModel = HasID.props({
  xy: types.optional(XYPosition, [0, 0]),
  logicKey: types.string,
})
  .volatile(createConnections)
  .actions((self) => ({
    setXY(xy: readonly [number, number]) {
      self.xy = xy as any
    },
    beforeDestroy() {
      //Remove all connected paths
      const { paths } = getLogicComposition(self)

      self.inputs.forAll(({ path }) => paths.remove(path))
      self.outputs.forAll(({ path }) => paths.remove(path))
    },
  }))

export interface IBlockNativeSnapshotIn extends SnapshotIn<typeof BlockNative> {}
export interface IBlockNativeSnapshot extends SnapshotOut<typeof BlockNative> {}
export interface IBlockNative extends Instance<typeof BlockNative> {}
export const BlockNative = BlockModel.views((self) => ({
  get logic(): LogicNative {
    return getLogicController(self).native.get(self.logicKey)
  },
}))

export interface IBlockComposedSnapshotIn extends SnapshotIn<typeof BlockComposed> {}
export interface IBlockComposedSnapshot extends SnapshotOut<typeof BlockComposed> {}
export interface IBlockComposed extends Instance<typeof BlockComposed> {}

export const BlockComposed = BlockModel.views((self) => ({
  get logic(): LogicComposed {
    return getLogicController(self).composed.get(self.logicKey)
  },
}))

export type IBlock = IBlockComposed | IBlockNative
export type IBlockSnapshotIn = IBlockNativeSnapshotIn | IBlockComposedSnapshotIn
export type IBlockSnapshot = IBlockNativeSnapshot | IBlockComposedSnapshot
const dispatcher = ({ logicKey }) => ((<string>logicKey).startsWith("_") ? BlockNative : BlockComposed)
export const Block = types.union({ dispatcher }, BlockComposed, BlockNative) as IType<IBlockSnapshot, IBlockSnapshotIn, IBlock>

export function isBlockComposed(block): block is IBlockComposed {
  return isStateTreeNode(block) && getType(block) === BlockComposed
}

export function isBlockNative(block): block is IBlockNative {
  return isStateTreeNode(block) && getType(block) === BlockNative
}

export interface IBlocks extends Instance<typeof Blocks> {}
export const Blocks = createStoreModel(Block)
