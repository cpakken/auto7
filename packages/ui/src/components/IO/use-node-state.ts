import { makeObservable, observable, action, computed } from "mobx"
import { useEffect, useMemo } from "react"
import { ILogicNode } from "@main/controllers"
import { IOState, useParentIOState } from "./use-io-state"
import { MotionValue } from "framer-motion"
import { useConstant } from "@utils/react"
import { when } from "@utils/mobx"

// @refresh reset
export class NodeState {
  io: IOState
  node: ILogicNode
  y = new MotionValue(0)

  @observable isFocus = false
  @observable isHover = false
  @observable isDrag = false

  @observable zIndex = 1

  constructor(node: ILogicNode, io: IOState) {
    makeObservable(this)
    this.io = io
    this.node = node
  }

  @action.bound initialize() {
    return when(
      () => this.offsetY,
      (y) => this.y.set(y)
    )
  }

  @computed get index() {
    return this.io.indexies.get(this.node)!
  }

  @computed get offsetY() {
    const { spacer } = this.io
    if (spacer) {
      return (spacer + NODE_HEIGHT) * (this.index + 1) - NODE_HEIGHT / 2
    }
    return null
  }

  getUpperNodeY() {
    const upper: ILogicNode | undefined = this.io.io.list[this.index - 1]
    return (upper && this.io.nodes.get(upper._id)?.offsetY) || null
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
  }
  @action.bound onDragEnd() {
    this.isDrag = false
  }
  @action.bound onDrag({ y }) {
    const { offsetY } = this
    if (y < offsetY!) {
      //move up
    }
  }
}

export function useNodeState(node: ILogicNode) {
  const io = useParentIOState()
  // const state = useMemo(() => io.nodes.get(node._id)!, [io, node])
  const state = useConstant(() => io.nodes.get(node._id)!)
  useEffect(state.initialize, [])

  return state
}

export const NODE_WIDTH = 110
export const NODE_CONTENT_HEIGHT = 75
export const NODE_HEIGHT = 110
