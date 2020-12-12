import { makeObservable, observable, action } from "mobx"
import { useMemo } from "react"
import { ILogicNode } from "@main/controllers"
import { IOState, useParentIOState } from "./use-io-state"

export class IONodeState {
  io: IOState
  node: ILogicNode

  @observable isFocus = false
  @observable isHover = false

  constructor(node: ILogicNode, io: IOState) {
    makeObservable(this)
    this.io = io
    this.node = node
  }

  @action.bound onFocus() {
    this.isFocus = true
  }
  @action.bound onBlur() {
    this.isFocus = false
  }
  @action.bound onHoverStart() {
    this.isHover = true
  }
  @action.bound onHoverEnd() {
    this.isHover = false
  }
}

export function useIONodeState(node: ILogicNode) {
  const io = useParentIOState()
  const state = useMemo(() => io.nodes.get(node._id)!, [io, node])

  return state
}
