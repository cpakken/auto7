import { IBlock, ILogicNodeModel } from "@main/controllers"
import { animate, MotionValue } from "framer-motion"
import { createContext, useContext, useLayoutEffect, useMemo } from "react"
import { action, computed, makeObservable, untracked } from "mobx"
import { SmartMap } from "smartmap"
import { CompositionState, useParentCompositionState } from "../use-composition-state"
import { BlockNodeState } from "./use-block-node-state"

export const gridSize = 35

export function valueToGrid(value: number) {
  return Math.round(value / gridSize)
}

export function gridToValue(grid: number) {
  return grid * gridSize
}

type Disposer = () => void
export class BlockState {
  block: IBlock
  motionXY: { x: MotionValue<number>; y: MotionValue<number> }
  composition: CompositionState
  inputs: SmartMap<string, ILogicNodeModel, BlockNodeState>
  outputs: SmartMap<string, ILogicNodeModel, BlockNodeState>

  dispose: Disposer

  constructor(block: IBlock, parent: CompositionState) {
    makeObservable(this)
    this.block = block
    this.composition = parent
    this.motionXY = untracked(() => ({ x: new MotionValue(this.x), y: new MotionValue(this.y) }))

    const { inputs, outputs } = block.logic.info!
    this.inputs = new SmartMap(inputs.store, (input) => new BlockNodeState(input), { eager: true })
    this.outputs = new SmartMap(outputs.store, (output) => new BlockNodeState(output), { eager: true })
  }

  @action.bound initialize() {
    this.inputs.forEach((input) => input.initializeInBlock())
    this.outputs.forEach((output) => output.initializeInBlock())
  }

  @computed get width() {
    return gridSize * 4
  }
  @computed get height() {
    return gridSize * 4
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

export function useBlockState(block: IBlock) {
  const composition = useParentCompositionState()
  const state = useMemo(() => composition.blocks.get(block._id)!, [composition])

  useLayoutEffect(state.initialize, [])

  return state
}

export const BlockStateContext = createContext({} as BlockState)

export function useParentBlockState() {
  return useContext(BlockStateContext)
}
