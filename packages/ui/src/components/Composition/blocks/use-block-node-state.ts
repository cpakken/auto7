import { ILogicNodeModel } from "@main/controllers"
import { computed, makeObservable } from "mobx"
import { BlockInterfaceState } from "./use-block-interface-state"
import { gridSize } from "./use-block-state"

// @refresh reset
export abstract class BlockNodeState {
  get _id() {
    return this.node._id
  }

  get ioType() {
    return this.io.ioType
  }

  node: ILogicNodeModel
  io: BlockInterfaceState

  constructor(node: ILogicNodeModel, io: BlockInterfaceState) {
    makeObservable(this)
    this.node = node
    this.io = io
  }

  @computed get index() {
    return this.io.indexies.get(this)!
  }

  @computed get height() {
    return this.index * gridSize
  }
}

export class BlockInNodeState extends BlockNodeState {}
export class BlockOutNodeState extends BlockNodeState {}

// export function useBlockNodeState(ioType: IOType, node: ILogicNodeModel) {
//   const block = useParentBlockState()
//   const state = useConstant(() => {
//     return ioType === "in" ? block.inputs.get(node._id)! : block.outputs.get(node._id)!
//   })

//   return state
// }
