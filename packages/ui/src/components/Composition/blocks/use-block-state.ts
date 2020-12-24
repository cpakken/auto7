import { animate, MotionValue } from "framer-motion"
import { action, computed, makeObservable } from "mobx"
import { IBlock } from "@main/controllers"
import { CompositionState } from "../use-composition-state"
import { BlockInInterfaceState, BlockOutInterfaceState } from "./use-block-interface-state"
import { useLayoutEffect } from "react"

// @refresh reset
export class BlockState {
  block: IBlock
  composition: CompositionState

  inputs: BlockInInterfaceState
  outputs: BlockOutInterfaceState

  motionXY = { x: new MotionValue(0), y: new MotionValue(0) }

  constructor(block: IBlock, parent: CompositionState) {
    makeObservable(this)
    this.block = block
    this.composition = parent

    const { inputs, outputs } = block.logic.info!
    // this.inputs = new SmartMap(inputs.store, (input) => new BlockInNodeState(input, this), { eager: true })
    // this.outputs = new SmartMap(outputs.store, (output) => new BlockOutNodeState(output, this), { eager: true })

    this.inputs = new BlockInInterfaceState(inputs, this)
    this.outputs = new BlockOutInterfaceState(outputs, this)
  }

  get _id() {
    return this.block._id
  }

  @action.bound private initialize() {
    const { x, y } = this.motionXY
    x.set(this.x)
    y.set(this.y)
  }

  useInit = () => {
    useLayoutEffect(this.initialize, [])
  }

  // @action dispose() {
  //   this.inputs.dispose()
  //   this.outputs.dispose()
  // }

  @computed get width() {
    return gridSize * 5
  }
  @computed get height() {
    // return (this.inputs.size + this.outputs.size + 1) * gridSize
    return (this.inputs.store.size + this.outputs.store.size + 1) * gridSize
  }
  @computed get x() {
    return gridToValue(this.block.xy[0])
  }
  @computed get y() {
    return gridToValue(this.block.xy[1])
  }

  @computed get isHover() {
    return this.composition.blockHover === this
  }

  @computed get isDrag() {
    return this.composition.blockDrag === this
  }

  @action.bound onHoverStart() {
    // console.log(this.block._id, "hoverStart")
    this.composition.blockHover = this
  }

  @action.bound onHoverEnd() {
    // console.log(this.block._id, "hoverEnd")
    this.composition.blockHover = null
  }

  @action.bound onDragStart() {
    // console.log(this.block._id, "dragStart")
    this.composition.blockDrag = this
  }

  @action.bound onDragEnd() {
    // console.log(this.block._id, "dragEnd")
    this.composition.blockDrag = null
    this.setPosition()

    const { x, y } = this.motionXY
    const transition = { type: "spring", bounce: 0.05 } as const
    animate(x, this.x, transition)
    animate(y, this.y, transition)
  }
  @action.bound setPosition() {
    const { x, y } = this.motionXY
    const xy = [valueToGrid(x.get()), valueToGrid(y.get())] as const
    this.block.setXY(xy)
  }
}

export const gridSize = 30

export function valueToGrid(value: number) {
  return Math.round(value / gridSize)
}

export function gridToValue(grid: number) {
  return grid * gridSize
}
