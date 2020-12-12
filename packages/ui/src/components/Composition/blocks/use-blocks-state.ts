import { reduceIter } from "@utils/iterable-fns"
import { IBlock, IBlocks } from "@main/controllers"
import { action, reaction, computed, makeObservable, observable } from "mobx"
import { SmartMap } from "smartmap"
import { BlockState } from "./use-block-state"
import { animate, MotionValue } from "framer-motion"
import { CompositionState, Dimensions, useParentCompositionState } from "../use-composition-state"

type Point = { x: number; y: number }
type MotionPoint = { x: MotionValue<number>; y: MotionValue<number> }
export const InitialPoint = { x: 0, y: 0 }

export class BlocksState {
  private store: SmartMap<string, IBlock, BlockState>

  composition: CompositionState
  @observable.ref motionOffset: MotionPoint | null = null

  get: (key: string) => BlockState | undefined

  constructor(blocks: IBlocks, composition: CompositionState) {
    makeObservable(this)
    this.composition = composition
    this.store = new SmartMap(blocks.store, (block) => new BlockState(block, this), { eager: true })
    this.get = this.store.get
  }

  //Run when Composition State is created
  @action.bound initialize() {
    //Initialize motionOffset
    const { x, y } = this.offset!
    const motionOffset = { x: new MotionValue(x), y: new MotionValue(y) }
    this.motionOffset = motionOffset

    //Sync mobx offset to motionOffset value
    const config = { type: "spring", bounce: 0.1 } as const
    return reaction(
      () => this.offset!,
      ({ x, y }) => {
        animate(motionOffset.x, x, config)
        animate(motionOffset.y, y, config)
      }
    )
  }

  @computed get min(): Point {
    return (
      reduceIter(this.store.values(), (a, { x, y }) => {
        return a ? { x: Math.min(x, a.x), y: Math.min(y, a.y) } : { x, y }
      }) || InitialPoint
    )
  }
  @computed get max(): Point {
    return (
      reduceIter(this.store.values(), (a, { width, height, x, y }) => {
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
  return blocks
}
