import { makeObservable, observable, action } from "mobx"
import { createRef, useLayoutEffect, useMemo } from "react"
import { ILogicNode } from "@main/controllers"
import { IOState, useParentIOState } from "./use-io-state"
import { MotionValue } from "framer-motion"

export class NodeState {
  io: IOState
  node: ILogicNode
  ref = createRef<HTMLDivElement>()

  @observable isFocus = false
  @observable isHover = false
  @observable isDrag = false

  @observable yValue: MotionValue<number> | null = null
  @observable zIndex = 1

  constructor(node: ILogicNode, io: IOState) {
    makeObservable(this)
    this.io = io
    this.node = node
  }

  @action.bound initialize() {
    // console.log(this.node._id, this.ref.current!.offsetTop)
    // this.yValue = new MotionValue(this.ref.current!.offsetTop)
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
  @action.bound onDragStart() {
    this.isDrag = true
    this.zIndex = 10
  }
  @action.bound onDragEnd() {
    this.isDrag = false
  }
}

export function useNodeState(node: ILogicNode) {
  const io = useParentIOState()
  const state = useMemo(() => io.nodes.get(node._id)!, [io, node])
  // useLayoutEffect(state.initialize, [])

  return state
}
