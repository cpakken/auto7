import { IBlock } from "@main/controllers"
import { MotionValue } from "framer-motion"
import { action, computed, makeObservable, untracked } from "mobx"
import { useConstant } from "@utils/react"
import { BlocksState } from "./use-blocks-state"
import { useParentCompositionState } from "./use-composition-state"

const gridSize = 35

export function valueToGrid(value: number) {
  return Math.round(value / gridSize)
}

export function gridToValue(grid: number) {
  return grid * gridSize
}

export class BlockState {
  block: IBlock
  motionXY: { x: MotionValue<number>; y: MotionValue<number> }
  parent: BlocksState

  constructor(block: IBlock, parent: BlocksState) {
    makeObservable(this)
    this.block = block
    this.parent = parent
    this.motionXY = untracked(() => ({ x: new MotionValue(this.x), y: new MotionValue(this.y) }))

    // const { x, y } = this.motionXY
    // autorun(() => animate(x, this.x))
    // autorun(() => animate(y, this.y))
  }

  @computed get width() {
    return gridSize * 4
  }
  @computed get height() {
    return gridSize * 3
  }
  @computed get x() {
    return gridToValue(this.block.xy[0])
  }
  @computed get y() {
    return gridToValue(this.block.xy[1])
  }

  @computed get isHover() {
    return this.parent.composition.blockHover === this
  }

  @computed get isDrag() {
    return this.parent.composition.blockDrag === this
  }

  @action.bound onHoverStart() {
    this.parent.composition.blockHover = this
  }

  @action.bound onHoverEnd() {
    this.parent.composition.blockHover = null
  }

  @action.bound onDragStart() {
    this.parent.composition.blockDrag = this
  }

  @action.bound onDragEnd() {
    this.parent.composition.blockDrag = null
    this.setPosition()
  }
  @action.bound setPosition() {
    const { x, y } = this.motionXY
    const xy = [valueToGrid(x.get()), valueToGrid(y.get())] as const
    this.block.setXY(xy)
  }
}

export function useBlockState(block: IBlock) {
  const parent = useParentCompositionState()
  const state = useConstant(() => parent.blocks.get(block._id)!)
  // const state = parent.blocks.get(block._id)!
  return state
}
