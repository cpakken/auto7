import { createContext, createRef, RefObject, useContext, useLayoutEffect, useMemo } from "react"
import { animate, MotionValue } from "framer-motion"
import { action, computed, makeObservable, observable, reaction } from "mobx"
import { SmartMap } from "smartmap"
import { reduceIter } from "@utils/iterable-fns"
import { IBlock, ILogicComposition } from "@main/controllers"
import { BlockState } from "./blocks/use-block-state"
import { ComposerState, useParentComposerState } from "../Composer/use-composer-state"

export type Dimensions = { width: number; height: number }
type Point = { x: number; y: number }
type MotionPoint = { x: MotionValue<number>; y: MotionValue<number> }
export const InitialPoint = { x: 0, y: 0 }

export class CompositionState {
  ref: RefObject<HTMLDivElement>
  composition: ILogicComposition

  composer: ComposerState
  blocks: SmartMap<string, IBlock, BlockState>
  //paths

  @observable.ref motionOffset: MotionPoint | null = null

  @observable blockHover: BlockState | null = null
  @observable blockDrag: BlockState | null = null

  @observable.ref border: null | Dimensions = null

  constructor(composition: ILogicComposition, composer: ComposerState) {
    makeObservable(this)
    this.ref = createRef()
    this.composer = composer
    this.composition = composition
    this.blocks = new SmartMap(composition.blocks.store, (block) => new BlockState(block, this), { eager: true })
  }

  @action.bound intialize() {
    //Set Composition Border Dimensions
    const { offsetHeight, offsetWidth } = this.ref.current!
    this.border = { width: offsetWidth, height: offsetHeight }

    //TODO sync border with window size change

    //Initialize motionOffset and sync with mobx offset
    const { x, y } = this.offset!
    const motionOffset = { x: new MotionValue(x), y: new MotionValue(y) }
    this.motionOffset = motionOffset

    const config = { type: "spring", bounce: 0.1 } as const
    const dispose = reaction(
      () => this.offset!,
      ({ x, y }) => {
        animate(motionOffset.x, x, config)
        animate(motionOffset.y, y, config)
      }
    )

    return dispose
  }

  @computed get min(): Point {
    return (
      reduceIter(this.blocks.values(), (a, { x, y }) => {
        return a ? { x: Math.min(x, a.x), y: Math.min(y, a.y) } : { x, y }
      }) || InitialPoint
    )
  }
  @computed get max(): Point {
    return (
      reduceIter(this.blocks.values(), (a, { width, height, x, y }) => {
        const next = { x: x + width, y: y + height }
        return a ? { x: Math.max(a.x, next.x), y: Math.max(a.y, next.y) } : next
      }) || InitialPoint
    )
  }

  @computed get dimensions(): Dimensions {
    return { width: this.max.x - this.min.x, height: this.max.y - this.min.y }
  }

  @computed get offset(): Point | null {
    const { border } = this
    const { min } = this
    return (
      border && {
        x: -min.x + (border.width - this.dimensions.width) / 2,
        y: -min.y + (border.height - this.dimensions.height) / 2,
      }
    )
  }
}

export function useCompositionState(_composer?: ComposerState) {
  const composer = _composer ?? useParentComposerState()
  const state = useMemo(() => composer.composition, [composer])

  useLayoutEffect(state.intialize, [])

  return state
}

export const CompositionContext = createContext({} as CompositionState)

export function useParentCompositionState() {
  return useContext(CompositionContext)
}

//TODO use createRef instead of useRef
// use MotionValue instea dof useMotionValue
