import { IBlock } from "@main/controllers"
import { MotionValue } from "framer-motion"
import { action, computed, makeObservable } from "mobx"
import { BlocksState } from "./use-blocks-state"
import { useParentCompositionState } from "./use-composition-state"

const gridSize = 35
export class BlockState {
  block: IBlock
  motionXY: { x: MotionValue<number>; y: MotionValue<number> }
  parent: BlocksState

  constructor(block: IBlock, parent: BlocksState) {
    makeObservable(this)
    this.block = block
    this.parent = parent
    this.motionXY = { x: new MotionValue(this.x), y: new MotionValue(this.y) }
  }

  @computed get width() {
    return gridSize * 4
  }
  @computed get height() {
    return gridSize * 3
  }
  @computed get x() {
    return this.block.xy[0] * gridSize
  }
  @computed get y() {
    return this.block.xy[1] * gridSize
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
  }
}

// export type BlockState = ReturnType<typeof useBlockState>
export function useBlockState(block: IBlock) {
  const parent = useParentCompositionState()
  return parent.blocks.get(block._id)!
}
