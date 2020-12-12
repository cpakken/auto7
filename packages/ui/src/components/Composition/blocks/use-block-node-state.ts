import { ILogicNodeModel } from "@main/controllers"
import { action, makeObservable, observable } from "mobx"
import { createRef, useMemo } from "react"
import { IOType } from "../blocks/BlockContent"
import { useParentBlockState } from "./use-block-state"

export class BlockNodeState {
  ref = createRef<HTMLDivElement>()
  node: ILogicNodeModel

  @observable height = 0

  constructor(node: ILogicNodeModel) {
    makeObservable(this)
    this.node = node
  }

  //Initialize in block
  @action.bound initializeInBlock() {
    this.height = this.ref.current!.offsetTop
  }
}

export function useBlockNodeState(ioType: IOType, node: ILogicNodeModel) {
  const block = useParentBlockState()
  const state = useMemo(() => {
    return ioType === "in" ? block.inputs.get(node._id)! : block.outputs.get(node._id)!
  }, [ioType, node, block])

  return state
}
