import { reduceIter } from "@utils/iterable-fns"
import { IBlock, IBlocks } from "@main/controllers"
import { autorun, computed, makeObservable, observable } from "mobx"
import { when } from "@utils/mobx"
import { SmartMap } from "smartmap"
import { BlockState } from "./use-block-state"
import { animate, MotionValue } from "framer-motion"
import { CompositionState, Dimensions, useParentCompositionState } from "./use-composition-state"
import { useEffect } from "react"

type Point = { x: number; y: number }
type MotionPoint = { x: MotionValue<number>; y: MotionValue<number> }
export const InitialPoint = { x: 0, y: 0 }

export class BlocksState {
  private map: SmartMap<string, IBlock, BlockState>

  composition: CompositionState
  @observable.ref motionOffset: MotionPoint | null = null

  get: (key: any) => BlockState | undefined

  constructor(blocks: IBlocks, composition: CompositionState) {
    makeObservable(this)
    this.composition = composition
    this.map = new SmartMap(blocks.store, (block) => new BlockState(block, this), { eager: true })
    this.get = this.map.get
  }

  //run in useEffect
  initialize() {
    //Initialize motionOffset
    if (!this.motionOffset) {
      when(
        () => this.offset,
        ({ x, y }) => {
          this.motionOffset = { x: new MotionValue(x), y: new MotionValue(y) }
        }
      )
    }

    //Sync mobx offset to motionOffset alue
    return autorun(() => {
      const { offset, motionOffset } = this
      const config = { type: "spring", bounce: 0.1 } as const

      if (offset && motionOffset) {
        animate(motionOffset.x, offset.x, config)
        animate(motionOffset.y, offset.y, config)
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
    const { min } = this
    return (
      dimensions && {
        x: -min.x + (dimensions.width - this.dimensions.width) / 2,
        y: -min.y + (dimensions.height - this.dimensions.height) / 2,
      }
    )
  }
}

export function useBlocksState() {
  const { blocks } = useParentCompositionState()
  useEffect(() => blocks.initialize(), [])
  return blocks
}
