import { reduceIter } from "@utils/iterable-fns"
import { IBlock, IBlocks } from "@main/controllers"
import { autorun, computed, makeObservable } from "mobx"
import { SmartMap } from "smartmap"
import { BlockState } from "./use-block-state"
import { MotionValue } from "framer-motion"
import { CompositionState, Dimensions, useParentCompositionState } from "./use-composition-state"

type Point = { x: number; y: number }
export const InitialPoint = { x: 0, y: 0 }

export class BlocksState {
  private map: SmartMap<string, IBlock, BlockState>

  composition: CompositionState
  motionOffset = { x: new MotionValue(0), y: new MotionValue(0) }

  get: (key: any) => BlockState | undefined
  dispose: () => void

  constructor(blocks: IBlocks, composition: CompositionState) {
    makeObservable(this)
    this.composition = composition
    this.map = new SmartMap(blocks.store, (block) => new BlockState(block, this), { eager: true })

    this.get = this.map.get

    //TODO turn this into function mobxToMotion
    //TODO also make MotiontoMobx

    //Sync mobx offset to motionOffset alue
    this.dispose = autorun(() => {
      const { offset, motionOffset } = this
      if (offset) {
        motionOffset.x.set(offset.x)
        motionOffset.y.set(offset.y)
      }
    })
  }

  @computed get min(): Point {
    return (
      reduceIter(this.map.values(), (a, { x, y }) => {
        return a ? { x: Math.min(x, a.x), y: Math.min(y, a.y) } : { x, y }
      }) || InitialPoint
    )
  }
  @computed get max(): Point {
    return (
      reduceIter(this.map.values(), (a, { width, height, x, y }) => {
        const next = { x: x + width, y: y + height }
        return a ? { x: Math.max(a.x, next.x), y: Math.max(a.y, next.y) } : next
      }) || InitialPoint
    )
  }

  @computed get dimensions(): Dimensions {
    return { width: this.max.x - this.min.x, height: this.max.y - this.min.y }
  }

  @computed get offset(): Point | null {
    const { dimensions } = this.composition
    return (
      dimensions && {
        x: (dimensions.width - this.dimensions.width) / 2,
        y: (dimensions.height - this.dimensions.height) / 2,
      }
    )
  }
}

export function useBlocksState() {
  const { blocks } = useParentCompositionState()
  return blocks
}
